import { useEffect, useRef, useState } from "react";
import { business } from "~/data/business";
import { PhoneIcon } from "./icons";

export function MobileCallPill() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const heroCall = document.getElementById("hero-call");
    if (!heroCall) {
      // No hero on this route — show pill immediately so the contact path is always reachable
      setVisible(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          setVisible(!e.isIntersecting);
        }
      },
      { rootMargin: "-40px 0px 0px 0px" },
    );
    io.observe(heroCall);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`mobile-call ${visible ? "is-visible" : ""}`}
      role="complementary"
      aria-label="Snelbel-knop"
    >
      <a href={`tel:${business.phoneRaw}`} aria-label={`Bel ${business.phone}`}>
        <span className="ic-sm">
          <PhoneIcon />
        </span>
        <span className="num">{business.phone}</span>
      </a>
    </div>
  );
}
