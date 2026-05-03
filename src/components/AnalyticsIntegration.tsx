import { useEffect } from "react";
import { useLocation } from "@tanstack/react-router";
import {
  GA_MEASUREMENT_ID,
  getStoredConsent,
  initAnalytics,
  pushConsentDenied,
  pushConsentGranted,
  trackPageView,
  trackPhoneClick,
} from "~/lib/analytics";
import { useConsent } from "~/providers/ConsentProvider";

/**
 * Laadt gtag wanneer een Measurement ID gezet is, past Consent Mode toe na keuze,
 * stuurt SPA-pageviews en registreert tel:-kliks (alleen na toestemming).
 */
export function AnalyticsIntegration() {
  const { consent } = useConsent();
  const location = useLocation();

  useEffect(() => {
    if (!GA_MEASUREMENT_ID) return;
    void initAnalytics();
  }, []);

  useEffect(() => {
    if (!GA_MEASUREMENT_ID) return;
    void initAnalytics().then(() => {
      if (consent === "granted") pushConsentGranted();
      if (consent === "denied") pushConsentDenied();
    });
  }, [consent]);

  useEffect(() => {
    if (!GA_MEASUREMENT_ID || consent !== "granted") return;
    const path = location.href || "/";
    void trackPageView(path);
  }, [consent, location.href]);

  useEffect(() => {
    if (!GA_MEASUREMENT_ID) return;

    const onClickCapture = (event: MouseEvent) => {
      if (getStoredConsent() !== "granted") return;
      const target = event.target;
      if (!(target instanceof Element)) return;
      const anchor = target.closest("a[href^='tel:']");
      if (!anchor) return;
      void trackPhoneClick();
    };

    document.addEventListener("click", onClickCapture, true);
    return () => document.removeEventListener("click", onClickCapture, true);
  }, []);

  return null;
}
