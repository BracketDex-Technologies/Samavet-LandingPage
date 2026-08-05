import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';

const origin = 'https://www.samavet.in';
const socialImage = `${origin}/ganpati_mandal_hero.png`;
const routes = [
  {
    path: '/mr',
    lang: 'mr',
    type: 'website',
    title: 'समवेत | मंडळे आणि ट्रस्टसाठी डिजिटल पावती व वर्गणी सॉफ्टवेअर',
    description: 'गणेश मंडळे, मंदिरे आणि ट्रस्टसाठी डिजिटल देणगी पावत्या, ई-पावती आणि वर्गणी स्लिप व्यवस्थापित करा. समवेतशी संपर्क साधा.',
    alternates: true,
  },
  {
    path: '/blog',
    lang: 'mr',
    type: 'article',
    title: 'समवेत ब्लॉग | ई-पावती, डिजिटल वर्गणी आणि समुदाय तंत्रज्ञान',
    description: 'गणेश मंडळे, मंदिरे आणि ट्रस्टसाठी डिजिटल ई-पावती, वर्गणी व्यवस्थापन आणि समुदाय तंत्रज्ञानाविषयी समवेतच्या बातम्या आणि लेख.',
  },
  {
    path: '/epawati-for-ganesh-mandals',
    lang: 'en',
    type: 'website',
    title: 'ePawati for Ganesh Mandals | Digital Vargani Software | Samavet',
    description: 'Create digital Vargani slips, send WhatsApp receipts and track collections with ePawati software built for Ganesh Mandals in Maharashtra.',
  },
  {
    path: '/temple-donation-management-software',
    lang: 'en',
    type: 'website',
    title: 'Temple Donation Management Software & Digital Receipts | Samavet',
    description: 'Manage temple donations, donor records and digital Pawati receipts with Samavet ePawati software for temples, shrines and religious trusts.',
  },
  {
    path: '/ngo-digital-receipt-system',
    lang: 'en',
    type: 'website',
    title: 'NGO Digital Donation Receipt System & Donor Tracker | Samavet',
    description: 'Organise NGO donor records, digital donation receipts and 80G-friendly summaries with Samavet ePawati donation management software.',
  },
];

function escapeHtml(value) {
  return value.replaceAll('&', '&amp;').replaceAll('"', '&quot;').replaceAll('<', '&lt;').replaceAll('>', '&gt;');
}

function replaceMeta(html, attribute, key, value) {
  const pattern = new RegExp(`<meta\\s+${attribute}="${key.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}"\\s+content="[^"]*"\\s*\\/?>(?![\\s\\S]*<meta\\s+${attribute}="${key.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}")`);
  return html.replace(pattern, `<meta ${attribute}="${key}" content="${escapeHtml(value)}" />`);
}

function buildRouteHtml(source, route) {
  const canonical = `${origin}${route.path}`;
  let html = source
    .replace(/<html lang="[^"]*">/, `<html lang="${route.lang}">`)
    .replace(/<title>[\s\S]*?<\/title>/, `<title>${escapeHtml(route.title)}</title>`)
    .replace(/<link rel="canonical" href="[^"]*"\s*\/>/, `<link rel="canonical" href="${canonical}" />`)
    .replace(/\s*<link rel="alternate"[^>]*data-seo-alternate="true"[^>]*>/g, '');

  if (route.alternates) {
    html = html.replace('</head>', `    <link rel="alternate" hreflang="en" href="${origin}/" data-seo-alternate="true" />\n    <link rel="alternate" hreflang="mr" href="${origin}/mr" data-seo-alternate="true" />\n    <link rel="alternate" hreflang="x-default" href="${origin}/" data-seo-alternate="true" />\n  </head>`);
  } else {
    html = html.replace(/\s*<meta property="og:locale:alternate"[^>]*>/g, '');
  }

  for (const [attribute, key, value] of [
    ['name', 'description', route.description],
    ['property', 'og:title', route.title],
    ['property', 'og:description', route.description],
    ['property', 'og:type', route.type],
    ['property', 'og:url', canonical],
    ['property', 'og:image', socialImage],
    ['property', 'og:locale', route.lang === 'mr' ? 'mr_IN' : 'en_IN'],
    ['name', 'twitter:title', route.title],
    ['name', 'twitter:description', route.description],
    ['name', 'twitter:image', socialImage],
  ]) html = replaceMeta(html, attribute, key, value);
  if (route.alternates) html = replaceMeta(html, 'property', 'og:locale:alternate', route.lang === 'mr' ? 'en_IN' : 'mr_IN');

  const pageSchema = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': route.type === 'article' ? 'CollectionPage' : 'WebPage',
    url: canonical,
    name: route.title,
    description: route.description,
    isPartOf: { '@id': `${origin}/#website` },
    about: { '@id': `${origin}/#epawati` },
    inLanguage: route.lang === 'mr' ? 'mr-IN' : 'en-IN',
  }).replaceAll('<', '\\u003c');
  return html.replace('</head>', `    <script id="route-seo-schema" type="application/ld+json">${pageSchema}</script>\n  </head>`);
}

const distDirectory = path.resolve('dist');
const source = await readFile(path.join(distDirectory, 'index.html'), 'utf8');
await Promise.all(routes.map(async (route) => {
  const directory = path.join(distDirectory, route.path.slice(1));
  await mkdir(directory, { recursive: true });
  await writeFile(path.join(directory, 'index.html'), buildRouteHtml(source, route));
}));

console.log(`Generated SEO HTML for ${routes.length} routes.`);
