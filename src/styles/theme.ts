// Oxygen Fitness Hub — design tokens
// Dark editorial athletic: Anton display + Plus Jakarta body, blood-red accents.

export const theme = {
  color: {
    bg: '#000',
    surface: '#0a0a0a',
    surface2: 'rgba(255,255,255,0.04)',
    border: 'rgba(255,255,255,0.08)',
    borderStrong: 'rgba(255,255,255,0.15)',
    borderRed: 'rgba(239,68,68,0.45)',
    red: '#ef4444',
    red2: '#b71c1c',
    redGlow: 'rgba(229,57,53,0.5)',
    text: '#fff',
    text2: 'rgba(255,255,255,0.72)',
    text3: 'rgba(255,255,255,0.48)',
    green: '#22c55e',
    yellow: '#fbbf24',
    blue: '#60a5fa',
  },
  font: {
    display: "'Anton', 'Plus Jakarta Sans', sans-serif",
    body: "'Plus Jakarta Sans', system-ui, sans-serif",
    mono: "'JetBrains Mono', ui-monospace, monospace",
  },
  // Type scale, mobile-first
  type: {
    hero: { size: 34, weight: 900, lh: 1.02, ls: '-0.02em' },
    h1: { size: 26, weight: 800, lh: 1.1, ls: '-0.01em' },
    h2: { size: 20, weight: 800, lh: 1.15, ls: '-0.005em' },
    h3: { size: 16, weight: 800, lh: 1.2 },
    body: { size: 14, weight: 500, lh: 1.5 },
    small: { size: 12, weight: 600, lh: 1.4 },
    micro: { size: 10, weight: 700, lh: 1.3, ls: '0.08em' },
  },
  // Spacing scale (4pt)
  space: {
    xs: 4,
    sm: 8,
    md: 12,
    lg: 16,
    xl: 22,
    xxl: 32,
    gutter: 20, // default page horizontal padding
  },
  radius: {
    sm: 10,
    md: 14,
    lg: 20,
    pill: 999,
  },
  shadow: {
    soft: '0 4px 18px rgba(0,0,0,0.45)',
    red: '0 8px 28px rgba(229,57,53,0.35)',
    insetTop: 'inset 0 1px 0 rgba(255,255,255,0.06)',
  },
  // Mobile-first breakpoints (min-width)
  breakpoint: {
    xs: 360,
    sm: 430,
    md: 768,
  },
  // Touch targets
  tap: { min: 44 },
  // Max content width (the app is mobile-first, single column)
  containerMaxWidth: 430,
};

export type Theme = typeof theme;
export default theme;
