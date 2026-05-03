import type { ReactNode } from "react";

type Props = { className?: string; size?: number };

const Wrap = ({
  children,
  className,
  size,
  viewBox = "0 0 24 24",
  strokeWidth = 2.2,
}: {
  children: ReactNode;
  viewBox?: string;
  strokeWidth?: number;
} & Props) => (
  <svg
    className={className}
    width={size}
    height={size}
    viewBox={viewBox}
    fill="none"
    stroke="currentColor"
    strokeWidth={strokeWidth}
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    {children}
  </svg>
);

export const PhoneIcon = (p: Props) => (
  <Wrap {...p}>
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.86 19.86 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.86 19.86 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.37 1.9.72 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.35 1.85.59 2.81.72A2 2 0 0 1 22 16.92z" />
  </Wrap>
);

export const ArrowRightIcon = (p: Props) => (
  <Wrap {...p}>
    <path d="M5 12h14M13 5l7 7-7 7" />
  </Wrap>
);

export const CheckIcon = (p: Props) => (
  <Wrap {...p} strokeWidth={3}>
    <polyline points="20 6 9 17 4 12" />
  </Wrap>
);

/* —— service icons (48×48 viewBox, lighter stroke) —— */

const SvcWrap = ({ children, className }: { children: ReactNode } & Props) => (
  <svg
    className={className}
    viewBox="0 0 48 48"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    {children}
  </svg>
);

export const SvcOpen = (p: Props) => (
  <SvcWrap {...p}>
    <circle cx="18" cy="24" r="8" />
    <circle cx="18" cy="24" r="2.5" fill="currentColor" />
    <path d="M26 24 H42 M38 24 V30 M34 24 V28" />
  </SvcWrap>
);

export const SvcPlace = (p: Props) => (
  <SvcWrap {...p}>
    <rect x="10" y="20" width="28" height="20" rx="2" />
    <path d="M16 20v-5a8 8 0 0 1 16 0v5" />
    <circle cx="24" cy="29" r="2" fill="currentColor" />
    <path d="M24 31v4" />
  </SvcWrap>
);

export const SvcDamage = (p: Props) => (
  <SvcWrap {...p}>
    <path d="M24 6 L40 12 V24 a16 16 0 0 1-16 16 a16 16 0 0 1-16-16 V12 Z" />
    <path d="M18 22 L23 27 L31 19" />
  </SvcWrap>
);

export const SvcSmart = (p: Props) => (
  <SvcWrap {...p}>
    <rect x="12" y="14" width="24" height="28" rx="2" />
    <path d="M18 22h12 M18 28h12 M18 34h8" />
    <circle cx="24" cy="9" r="3" />
    <path d="M24 12v2" />
  </SvcWrap>
);

export const SvcSecure = (p: Props) => (
  <SvcWrap {...p}>
    <path d="M24 6 L40 12 V24 a16 16 0 0 1-16 16 a16 16 0 0 1-16-16 V12 Z" />
    <circle cx="24" cy="22" r="4" />
    <path d="M24 26v6" />
  </SvcWrap>
);

export const SvcWindow = (p: Props) => (
  <SvcWrap {...p}>
    <rect x="8" y="10" width="32" height="28" rx="1" />
    <path d="M24 10v28 M8 24h32" />
    <path d="M14 16l4 4M30 16l4 4M14 32l4-4M30 32l4-4" opacity="0.5" />
  </SvcWrap>
);

export const ServiceIcon = ({
  type,
  className,
}: {
  type: "open" | "place" | "damage" | "smart" | "secure" | "window";
  className?: string;
}) => {
  const map = {
    open: SvcOpen,
    place: SvcPlace,
    damage: SvcDamage,
    smart: SvcSmart,
    secure: SvcSecure,
    window: SvcWindow,
  };
  const Cmp = map[type];
  return <Cmp className={className} />;
};
