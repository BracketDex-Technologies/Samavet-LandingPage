export const PORTAL_URL = 'https://epawati.samavet.in/';
export const WHATSAPP_PHONE = '+918605589062';

function normalizeIndianPhone(phone) {
  const digits = String(phone).replace(/\D/g, '');
  return digits.length === 10 ? `91${digits}` : digits;
}

export function buildWhatsAppLink(phone, message) {
  const recipient = normalizeIndianPhone(phone);
  return `https://wa.me/${recipient}?text=${encodeURIComponent(message)}`;
}

export function shouldRenderSamavetLanding() {
  return true;
}
