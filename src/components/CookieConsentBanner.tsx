import { useEffect, useState } from "react";
import {
  GA_MEASUREMENT_ID,
  OPEN_COOKIE_PREFERENCES_EVENT,
  initAnalytics,
  pushConsentGranted,
} from "~/lib/analytics";
import { useConsent } from "~/providers/ConsentProvider";

/**
 * Cookiebanner voor GA4 — alleen getoond als VITE_GA_MEASUREMENT_ID gezet is.
 * Standaard Consent Mode staat op denied (zie index.html); pas na keuze wordt analytics_storage granted.
 */
export function CookieConsentBanner() {
  const { consent, setConsent } = useConsent();
  const [preferencesOpen, setPreferencesOpen] = useState(false);

  const visible =
    GA_MEASUREMENT_ID !== "" &&
    (consent === null || preferencesOpen);

  useEffect(() => {
    function openPreferences() {
      setPreferencesOpen(true);
    }
    window.addEventListener(OPEN_COOKIE_PREFERENCES_EVENT, openPreferences);
    return () =>
      window.removeEventListener(OPEN_COOKIE_PREFERENCES_EVENT, openPreferences);
  }, []);

  function acceptAnalytics() {
    void initAnalytics().then(() => {
      pushConsentGranted();
      setConsent("granted");
      setPreferencesOpen(false);
    });
  }

  function rejectAnalytics() {
    void initAnalytics().then(() => {
      setConsent("denied");
      setPreferencesOpen(false);
    });
  }

  function closePreferences() {
    setPreferencesOpen(false);
  }

  if (!GA_MEASUREMENT_ID) return null;

  if (!visible) return null;

  return (
    <div
      className="cookie-consent"
      role="dialog"
      aria-modal={preferencesOpen ? true : undefined}
      aria-labelledby="cookie-consent-title"
      aria-describedby="cookie-consent-desc"
    >
      <div className="cookie-consent-inner wrap">
        <div className="cookie-consent-text">
          <h2 id="cookie-consent-title" className="cookie-consent-title">
            {consent === null ? "Cookies en statistieken" : "Cookievoorkeuren"}
          </h2>
          <p id="cookie-consent-desc" className="cookie-consent-desc">
            We gebruiken Google Analytics 4 enkel om te begrijpen hoe bezoekers
            de site gebruiken (anonieme statistieken). Daarvoor vragen we uw
            toestemming. Zonder toestemming worden er geen analytics-cookies
            geplaatst voor dit doeleinde.
          </p>
        </div>
        <div className="cookie-consent-actions">
          {consent !== null && preferencesOpen && (
            <button
              type="button"
              className="cookie-consent-btn cookie-consent-btn-ghost"
              onClick={closePreferences}
            >
              Sluiten
            </button>
          )}
          <button
            type="button"
            className="cookie-consent-btn cookie-consent-btn-ghost"
            onClick={rejectAnalytics}
          >
            Weigeren
          </button>
          <button
            type="button"
            className="cookie-consent-btn cookie-consent-btn-primary"
            onClick={acceptAnalytics}
          >
            Statistieken toestaan
          </button>
        </div>
      </div>
    </div>
  );
}
