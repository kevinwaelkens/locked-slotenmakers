import { createFileRoute } from "@tanstack/react-router";
import { Resend } from "resend";

type Body = {
  name?: string;
  email?: string;
  phone?: string;
  message?: string;
  /** honeypot — should always be empty if real human */
  website?: string;
};

const FROM = "Locked Slotenmakers <noreply@locked-slotenmakers.be>";
const TO = "info@locked-slotenmakers.be";

export const Route = createFileRoute("/api/contact")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        let body: Body;
        try {
          body = (await request.json()) as Body;
        } catch {
          return json({ error: "Invalid JSON" }, 400);
        }

        // Honeypot — silently accept (don't tip off bots that we noticed)
        if (body.website && body.website.trim() !== "") {
          return json({ ok: true }, 200);
        }

        const name = (body.name ?? "").trim();
        const email = (body.email ?? "").trim();
        const message = (body.message ?? "").trim();
        const phone = (body.phone ?? "").trim();

        if (!name || !email || !message) {
          return json({ error: "Vul naam, e-mail en bericht in." }, 400);
        }

        if (name.length > 200 || email.length > 200 || message.length > 5000) {
          return json({ error: "Bericht te lang." }, 400);
        }

        const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
        if (!emailOk) {
          return json({ error: "Ongeldig e-mailadres." }, 400);
        }

        const apiKey = process.env.RESEND_API_KEY;
        if (!apiKey) {
          console.error("RESEND_API_KEY is not configured");
          return json({ error: "Server niet geconfigureerd." }, 500);
        }

        const resend = new Resend(apiKey);

        const subject = `Nieuwe aanvraag via website — ${name}`;
        const text = [
          `Nieuwe aanvraag via locked-slotenmakers.be`,
          ``,
          `Naam:    ${name}`,
          `E-mail:  ${email}`,
          phone ? `Telefoon: ${phone}` : null,
          ``,
          `Bericht:`,
          message,
        ]
          .filter(Boolean)
          .join("\n");

        const html = `
    <div style="font-family: system-ui, -apple-system, sans-serif; max-width: 560px; margin: 0 auto;">
      <h2 style="color: #042B8D; font-size: 18px; margin: 0 0 16px;">Nieuwe aanvraag via website</h2>
      <table style="border-collapse: collapse; width: 100%; font-size: 14px;">
        <tr>
          <td style="padding: 6px 12px 6px 0; color: #5B6577; vertical-align: top; width: 90px;">Naam</td>
          <td style="padding: 6px 0;"><strong>${escapeHtml(name)}</strong></td>
        </tr>
        <tr>
          <td style="padding: 6px 12px 6px 0; color: #5B6577; vertical-align: top;">E-mail</td>
          <td style="padding: 6px 0;"><a href="mailto:${escapeHtml(email)}" style="color: #042B8D;">${escapeHtml(email)}</a></td>
        </tr>
        ${
          phone
            ? `
        <tr>
          <td style="padding: 6px 12px 6px 0; color: #5B6577; vertical-align: top;">Telefoon</td>
          <td style="padding: 6px 0;"><a href="tel:${escapeHtml(phone)}" style="color: #042B8D;">${escapeHtml(phone)}</a></td>
        </tr>`
            : ""
        }
      </table>
      <hr style="border: none; border-top: 1px solid #E4E7EE; margin: 20px 0;" />
      <p style="white-space: pre-wrap; color: #0B0F1A; line-height: 1.55; margin: 0;">${escapeHtml(message)}</p>
    </div>
  `;

        try {
          const { error } = await resend.emails.send({
            from: FROM,
            to: TO,
            replyTo: email,
            subject,
            text,
            html,
          });

          if (error) {
            console.error("Resend error:", error);
            const debug = process.env.CONTACT_DEBUG === "1";
            return json(
              {
                error: "Verzenden mislukt. Probeer opnieuw of bel direct.",
                ...(debug && {
                  resend: { name: error.name, message: error.message },
                }),
              },
              502,
            );
          }

          return json({ ok: true }, 200);
        } catch (err) {
          console.error("Unexpected error:", err);
          return json(
            { error: "Er ging iets mis. Probeer opnieuw of bel direct." },
            500,
          );
        }
      },
    },
  },
});

function json(body: unknown, status: number): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}
