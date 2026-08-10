import acceptableUsePolicy from './legal/ACCEPTABLE_USE_POLICY.md?raw';
import cookiePolicy from './legal/COOKIE_POLICY.md?raw';
import donationDisclaimer from './legal/DONATION_DISCLAIMER.md?raw';
import privacyPolicy from './legal/PRIVACY_POLICY.md?raw';
import refundPolicy from './legal/REFUND_AND_CANCELLATION_POLICY.md?raw';
import termsAndConditions from './legal/TERMS_AND_CONDITIONS.md?raw';

export const legalPages = [
  { path: '/privacy-policy', label: 'Privacy Policy', source: privacyPolicy },
  { path: '/terms-and-conditions', label: 'Terms & Conditions', source: termsAndConditions },
  { path: '/refund-and-cancellation-policy', label: 'Refund & Cancellation', source: refundPolicy },
  { path: '/cookie-policy', label: 'Cookie Policy', source: cookiePolicy },
  { path: '/acceptable-use-policy', label: 'Acceptable Use', source: acceptableUsePolicy },
  { path: '/donation-disclaimer', label: 'Donation Disclaimer', source: donationDisclaimer },
] as const;

export const legalPagePaths = new Set<string>(legalPages.map((page) => page.path));
