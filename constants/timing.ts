export const TIMING = {
  hero: {
    intervalMs: 5500,
    fadeDuration: 1.2,
    contentDuration: 0.9,
    contentDelay: 0.15,
    quoteDelay: 0.35,
  },
  nav: {
    dropdownDuration: 0.25,
    dropdownOffsetY: -8,
  },
  filter: {
    underlineDuration: 0.35,
  },
  grid: {
    enterDuration: 0.45,
    enterOffsetY: 16,
  },
  revealStagger: {
    category: 0.06,
    press: 0.05,
    discover: 0.08,
    featured: 0.1,
  },
  asSeenOn: {
    /** Homepage mobile auto-advance interval for the celebrity slide track. */
    intervalMs: 3200,
    resumeMs: 6000,
  },
} as const;
