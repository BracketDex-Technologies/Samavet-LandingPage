export const LANDING_HEADER_SCROLL_THRESHOLD = 24;

export function isLandingHeaderCondensed(scrollY) {
  return Number(scrollY) >= LANDING_HEADER_SCROLL_THRESHOLD;
}
