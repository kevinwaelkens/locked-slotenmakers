import { Outlet, createRootRoute } from "@tanstack/react-router";
import { AnalyticsIntegration } from "~/components/AnalyticsIntegration";
import { CookieConsentBanner } from "~/components/CookieConsentBanner";
import { Header } from "~/components/Header";
import { Footer } from "~/components/Footer";
import { MobileCallPill } from "~/components/MobileCallPill";

export const Route = createRootRoute({
  component: RootLayout,
});

function RootLayout() {
  return (
    <>
      <AnalyticsIntegration />
      <Header />
      <main id="main-content">
        <Outlet />
      </main>
      <Footer />
      <MobileCallPill />
      <CookieConsentBanner />
    </>
  );
}
