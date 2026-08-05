export type SeoPageKey = 'mandals' | 'temples' | 'ngos';

export const seoPageKeyByPath: Record<string, SeoPageKey> = {
  '/epawati-for-ganesh-mandals': 'mandals',
  '/temple-donation-management-software': 'temples',
  '/ngo-digital-receipt-system': 'ngos',
};
