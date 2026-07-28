export const DEMO_REQUEST_EMAIL = 'bracketdevs.teams@gmail.com';

export function validateDemoRequest({ email = '', name = '', organization = '', request = '' }) {
  const errors = {};

  if (!name.trim()) errors.name = 'Enter your name.';
  if (!organization.trim()) errors.organization = 'Enter your organization name.';
  if (!/^\S+@\S+\.\S+$/.test(email.trim())) errors.email = 'Enter a valid email address.';
  if (!request.trim()) errors.request = 'Tell us what you need help with.';

  return { errors, valid: Object.keys(errors).length === 0 };
}

export function buildDemoRequestMailto({ email, name, organization, request }) {
  const subject = `Samavet demo request from ${organization.trim()}`;
  const body = [
    `Name: ${name.trim()}`,
    `Organization: ${organization.trim()}`,
    `Email: ${email.trim()}`,
    '',
    'Request:',
    request.trim(),
  ].join('\n');

  return `mailto:${DEMO_REQUEST_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}
