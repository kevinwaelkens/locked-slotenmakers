import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import {
  getStoredConsent,
  setStoredConsent as persistConsent,
  type StoredConsent,
} from "~/lib/analytics";

type ConsentContextValue = {
  consent: StoredConsent;
  setConsent: (value: "granted" | "denied") => void;
};

const ConsentContext = createContext<ConsentContextValue | null>(null);

export function ConsentProvider({ children }: { children: ReactNode }) {
  const [consent, setConsentState] = useState<StoredConsent>(() =>
    getStoredConsent(),
  );

  const setConsent = useCallback((value: "granted" | "denied") => {
    persistConsent(value);
    setConsentState(value);
  }, []);

  const value = useMemo(
    () => ({ consent, setConsent }),
    [consent, setConsent],
  );

  return (
    <ConsentContext.Provider value={value}>{children}</ConsentContext.Provider>
  );
}

export function useConsent(): ConsentContextValue {
  const ctx = useContext(ConsentContext);
  if (!ctx) {
    throw new Error("useConsent must be used within ConsentProvider");
  }
  return ctx;
}
