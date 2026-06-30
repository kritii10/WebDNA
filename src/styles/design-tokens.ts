export const radii = {
  sm: "0.75rem",
  md: "1rem",
  lg: "1.5rem",
  xl: "2rem"
} as const;

export const spacing = {
  section: "clamp(3.5rem, 4vw, 5.5rem)",
  container: "min(100% - 2rem, 90rem)"
} as const;

export const shadows = {
  soft: "0 20px 60px -32px rgba(15, 23, 42, 0.4)",
  glow: "0 0 0 1px rgba(255, 255, 255, 0.08), 0 24px 80px -40px rgba(14, 165, 233, 0.35)"
} as const;

export const gradients = {
  hero:
    "linear-gradient(135deg, rgba(15,23,42,0.98) 0%, rgba(12,74,110,0.94) 42%, rgba(8,145,178,0.88) 100%)",
  accent:
    "linear-gradient(135deg, rgba(34,197,94,0.28) 0%, rgba(6,182,212,0.22) 50%, rgba(59,130,246,0.28) 100%)"
} as const;
