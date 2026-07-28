export const PORTAL_URL = 'https://digital-vargani-landing-page.vercel.app';
export const WHATSAPP_PHONE = '9172227878';

function normalizeIndianPhone(phone) {
  const digits = String(phone).replace(/\D/g, '');
  return digits.length === 10 ? `91${digits}` : digits;
}

export function buildWhatsAppLink(phone, message) {
  const recipient = normalizeIndianPhone(phone);
  return `https://wa.me/${recipient}?text=${encodeURIComponent(message)}`;
}

export function shouldRenderSamavetLanding(hostname, pathname) {
  const host = String(hostname).toLowerCase();
  return host === 'samavet.in' || host === 'www.samavet.in' || host === 'samvet.vercel.app' || pathname === '/samavet';
}
