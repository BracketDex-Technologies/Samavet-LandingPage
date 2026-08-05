export const SITE_ORIGIN = 'https://www.samavet.in';
export const DEFAULT_SOCIAL_IMAGE = `${SITE_ORIGIN}/ganpati_mandal_hero.png`;

interface AlternateLanguage {
  href: string;
  hrefLang: string;
}

interface PageSeo {
  title: string;
  description: string;
  path: string;
  lang: 'en' | 'mr';
  image?: string;
  type?: 'website' | 'article';
  alternates?: AlternateLanguage[];
  schema?: Record<string, unknown>;
}

function setMeta(selector: string, content: string) {
  document.querySelector<HTMLMetaElement>(selector)?.setAttribute('content', content);
}

function setLink(selector: string, href: string) {
  document.querySelector<HTMLLinkElement>(selector)?.setAttribute('href', href);
}

export function applyPageSeo({ title, description, path, lang, image = DEFAULT_SOCIAL_IMAGE, type = 'website', alternates = [], schema }: PageSeo) {
  const canonicalUrl = `${SITE_ORIGIN}${path}`;
  const locale = lang === 'mr' ? 'mr_IN' : 'en_IN';

  document.documentElement.lang = lang;
  document.title = title;
  setMeta('meta[name="description"]', description);
  setMeta('meta[name="robots"]', 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1');
  setMeta('meta[property="og:title"]', title);
  setMeta('meta[property="og:description"]', description);
  setMeta('meta[property="og:type"]', type);
  setMeta('meta[property="og:url"]', canonicalUrl);
  setMeta('meta[property="og:image"]', image);
  setMeta('meta[property="og:locale"]', locale);
  setMeta('meta[name="twitter:title"]', title);
  setMeta('meta[name="twitter:description"]', description);
  setMeta('meta[name="twitter:image"]', image);
  setLink('link[rel="canonical"]', canonicalUrl);

  const localeAlternate = document.querySelector<HTMLMetaElement>('meta[property="og:locale:alternate"]');
  const hasTranslatedAlternate = alternates.some(({ hrefLang }) => hrefLang !== lang && (hrefLang === 'en' || hrefLang === 'mr'));
  if (hasTranslatedAlternate) localeAlternate?.setAttribute('content', lang === 'mr' ? 'en_IN' : 'mr_IN');
  else localeAlternate?.remove();

  document.querySelectorAll('link[data-seo-alternate]').forEach((node) => node.remove());
  alternates.forEach(({ href, hrefLang }) => {
    const link = document.createElement('link');
    link.rel = 'alternate';
    link.hreflang = hrefLang;
    link.href = href;
    link.dataset.seoAlternate = 'true';
    document.head.append(link);
  });

  document.getElementById('page-seo-schema')?.remove();
  if (schema) {
    const script = document.createElement('script');
    script.id = 'page-seo-schema';
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(schema);
    document.head.append(script);
  }
}
