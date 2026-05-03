/** Google Analytics 4 via gtag.js — alleen actief na expliciete toestemming (Consent Mode). */

export const GA_MEASUREMENT_ID: string =
  import.meta.env.VITE_GA_MEASUREMENT_ID ?? "";

const CONSENT_STORAGE_KEY = "locked-slotenmakers-consent-analytics";

export type StoredConsent = "granted" | "denied" | null;

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag: (...args: unknown[]) => void;
  }
}

export function getStoredConsent(): StoredConsent {
  try {
    const value = localStorage.getItem(CONSENT_STORAGE_KEY);
    if (value === "granted" || value === "denied") return value;
  } catch {
    /* private mode / blocked storage */
  }
  return null;
}

export function setStoredConsent(value: "granted" | "denied"): void {
  try {
    localStorage.setItem(CONSENT_STORAGE_KEY, value);
  } catch {
    /* ignore */
  }
}

let loadPromise: Promise<void> | null = null;

function ensureGtagCallsQueued(): void {
  window.dataLayer = window.dataLayer || [];
  if (typeof window.gtag !== "function") {
    window.gtag = function gtag(...args: unknown[]) {
      window.dataLayer.push(args);
    };
  }
}

/**
 * Laadt gtag.js één keer en zet config met send_page_view: false (SPA stuurt handmatig page_view).
 */
export function initAnalytics(): Promise<void> {
  if (!GA_MEASUREMENT_ID) return Promise.resolve();

  ensureGtagCallsQueued();

  if (loadPromise) return loadPromise;

  loadPromise = new Promise<void>((resolve, reject) => {
    const existing = document.querySelector(
      `script[src*="googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}"]`,
    );
    if (existing) {
      resolve();
      return;
    }

    const script = document.createElement("script");
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(GA_MEASUREMENT_ID)}`;
    script.onload = () => {
      window.gtag("js", new Date());
      window.gtag("config", GA_MEASUREMENT_ID, {
        send_page_view: false,
      });
      resolve();
    };
    script.onerror = () => reject(new Error("Kon Google-tag niet laden."));
    document.head.appendChild(script);
  });

  return loadPromise;
}

/** Consent Mode v2 — analytics aan; advertentie-signalen uit (geen Ads in deze setup). */
export function pushConsentGranted(): void {
  ensureGtagCallsQueued();
  window.gtag("consent", "update", {
    analytics_storage: "granted",
    ad_storage: "denied",
    ad_user_data: "denied",
    ad_personalization: "denied",
  });
}

export function pushConsentDenied(): void {
  ensureGtagCallsQueued();
  window.gtag("consent", "update", {
    analytics_storage: "denied",
    ad_storage: "denied",
    ad_user_data: "denied",
    ad_personalization: "denied",
  });
}

/**
 * Handmatige page_view voor SPA — na GA4-docs: event page_view met page_title + page_location.
 */
export async function trackPageView(pathWithSearchHash: string): Promise<void> {
  if (!GA_MEASUREMENT_ID || getStoredConsent() !== "granted") return;
  await initAnalytics();

  const origin = window.location.origin;
  const path = pathWithSearchHash.startsWith("/")
    ? pathWithSearchHash
    : `/${pathWithSearchHash}`;
  const page_location = `${origin}${path}`;

  window.gtag("event", "page_view", {
    page_title: document.title,
    page_location,
  });
}

export async function trackGenerateLead(): Promise<void> {
  if (!GA_MEASUREMENT_ID || getStoredConsent() !== "granted") return;
  await initAnalytics();
  window.gtag("event", "generate_lead", {
    currency: "EUR",
    value: 0,
  });
}

export async function trackPhoneClick(): Promise<void> {
  if (!GA_MEASUREMENT_ID || getStoredConsent() !== "granted") return;
  await initAnalytics();
  window.gtag("event", "phone_click", {
    event_category: "engagement",
    event_label: "tel_link",
  });
}

export const OPEN_COOKIE_PREFERENCES_EVENT = "locked-open-cookie-preferences";

export function openCookiePreferences(): void {
  window.dispatchEvent(new CustomEvent(OPEN_COOKIE_PREFERENCES_EVENT));
}
