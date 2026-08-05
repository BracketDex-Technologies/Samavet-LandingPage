import { ArrowRight, Check, ChevronRight } from 'lucide-react';
import { useEffect } from 'react';

import samavetLogo from './assets/samavet-logo-transparent.png';
import { PORTAL_URL } from './links.js';
import { applyPageSeo, SITE_ORIGIN } from './seo';
import type { SeoPageKey } from './seoPageRoutes';
import './seo-pages.css';

interface SeoPageContent {
  path: string;
  title: string;
  description: string;
  eyebrow: string;
  heading: string;
  lead: string;
  audience: string;
  introTitle: string;
  intro: string[];
  benefitsTitle: string;
  benefits: Array<[string, string]>;
  processTitle: string;
  process: Array<[string, string]>;
  faqs: Array<[string, string]>;
}

const seoPages: Record<SeoPageKey, SeoPageContent> = {
  mandals: {
    path: '/epawati-for-ganesh-mandals',
    title: 'ePawati for Ganesh Mandals | Digital Vargani Software | Samavet',
    description: 'Create digital Vargani slips, send WhatsApp receipts and track collections with ePawati software built for Ganesh Mandals in Maharashtra.',
    eyebrow: 'ePawati for Ganesh Mandals',
    heading: 'Digital Vargani and receipt software for a better-organised utsav.',
    lead: 'Replace the paper Pawati Pustak with one shared system for Vargani collection, donor records, volunteer access and committee reports.',
    audience: 'Built for public Ganesh Mandals, housing-society mandals and festival committees.',
    introTitle: 'Keep every Vargani entry clear from day one.',
    intro: [
      'Ganesh Mandal collections move quickly across pandals, volunteers and neighbourhoods. Paper receipt books make it difficult to see who collected what or find a donor record later.',
      'ePawati gives your committee a digital Vargani workflow. Authorised karyakartas can record contributions, issue branded digital receipts and keep collection activity available to trustees in one portal.',
    ],
    benefitsTitle: 'What your Ganesh Mandal can manage',
    benefits: [
      ['Digital Vargani slips', 'Generate a clear digital receipt for each contribution instead of relying only on handwritten Pawati books.'],
      ['WhatsApp receipt delivery', 'Share the donor’s receipt through the channel communities already use every day.'],
      ['Volunteer-wise records', 'Use access roles and review collection activity by authorised team member.'],
      ['Festival collection reports', 'Keep donation records searchable and prepare clean summaries for the committee.'],
    ],
    processTitle: 'Start before the first collection',
    process: [
      ['Set up the mandal', 'Add your organisation details, identity and authorised team members.'],
      ['Record Vargani', 'Enter donor and contribution details and issue the digital receipt.'],
      ['Review the utsav', 'Track collection activity and export the records your committee needs.'],
    ],
    faqs: [
      ['Can volunteers use ePawati?', 'Yes. Role-based access can let authorised volunteers record collections while trustee controls remain protected.'],
      ['Can we record cash Vargani?', 'Yes. Authorised users can record cash contributions so they remain part of the same collection report.'],
      ['Do donors need an app?', 'No. Donors can receive their digital receipt without installing a separate ePawati app.'],
    ],
  },
  temples: {
    path: '/temple-donation-management-software',
    title: 'Temple Donation Management Software & Digital Receipts | Samavet',
    description: 'Manage temple donations, donor records and digital Pawati receipts with Samavet ePawati software for temples, shrines and religious trusts.',
    eyebrow: 'For temples and religious trusts',
    heading: 'Temple donation management built around clear records.',
    lead: 'Help your temple acknowledge offerings with digital receipts, maintain donor history and give trustees a consistent view of collection activity.',
    audience: 'Designed for temples, shrines, devasthan trusts and religious organisations.',
    introTitle: 'A respectful digital process for every offering.',
    intro: [
      'Temple donations may be received at counters, during festivals or through different authorised team members. Separate registers make donor history and day-to-day reporting harder to maintain.',
      'Samavet ePawati brings receipt generation, donor details and collection records into one searchable system while preserving the organisation’s identity on every receipt.',
    ],
    benefitsTitle: 'A clearer donation workflow for temple teams',
    benefits: [
      ['Digital donation receipts', 'Issue a consistent, branded acknowledgement for offerings received by the temple or trust.'],
      ['Searchable donor records', 'Keep names, contribution history and relevant details available for authorised users.'],
      ['Trustee oversight', 'Separate collection access from administrative control through user roles.'],
      ['Reports and exports', 'Download clean statements when trustees, committees or auditors request records.'],
    ],
    processTitle: 'Move from registers to one shared record',
    process: [
      ['Configure the trust', 'Add the temple or trust details and choose the receipt identity.'],
      ['Acknowledge offerings', 'Record each donation and share its digital receipt with the donor.'],
      ['Review and report', 'Search activity and prepare statements from one consistent record.'],
    ],
    faqs: [
      ['Can ePawati reflect our temple name?', 'Yes. The receipt workflow is designed to carry the organisation’s identity and relevant donation details.'],
      ['Can different counters use the portal?', 'Authorised users can be given collection access while administrative controls remain restricted.'],
      ['Can old donor details be searched later?', 'Digital donor records are kept in a searchable list for authorised users.'],
    ],
  },
  ngos: {
    path: '/ngo-digital-receipt-system',
    title: 'NGO Digital Donation Receipt System & Donor Tracker | Samavet',
    description: 'Organise NGO donor records, digital donation receipts and 80G-friendly summaries with Samavet ePawati donation management software.',
    eyebrow: 'For NGOs and social organisations',
    heading: 'Digital donation receipts and donor records your team can follow.',
    lead: 'Give fundraising teams one place to acknowledge donations, retain donor history and prepare structured, 80G-friendly collection summaries.',
    audience: 'Built for NGOs, charitable trusts, foundations and community organisations.',
    introTitle: 'Turn scattered donation entries into usable donor records.',
    intro: [
      'When donation details sit across receipt books and spreadsheets, follow-up and reporting take more time. Teams also risk repeating data entry whenever a donor contributes again.',
      'ePawati keeps receipt activity and donor history together. Authorised users can record contributions, share digital receipts and export organised summaries for internal review.',
    ],
    benefitsTitle: 'Practical tools for donor transparency',
    benefits: [
      ['Digital receipt generation', 'Create a clear donation acknowledgement with the organisation and donor details.'],
      ['Donor history', 'Maintain searchable contribution records instead of rebuilding lists for every campaign.'],
      ['Team access roles', 'Give fundraising staff the access needed for collection work without exposing every control.'],
      ['80G-friendly summaries', 'Organise receipt information into clean exports that can support your reporting workflow.'],
    ],
    processTitle: 'A simple workflow for each contribution',
    process: [
      ['Set up the organisation', 'Add the NGO or trust identity and authorised users.'],
      ['Record the donation', 'Capture donor details and issue the digital receipt.'],
      ['Use the records', 'Search donor history and export structured collection summaries.'],
    ],
    faqs: [
      ['Does ePawati replace professional tax advice?', 'No. It organises donation and receipt records; your organisation should follow its professional and statutory guidance for tax compliance.'],
      ['Can fundraising team members get separate access?', 'Yes. Role-based access can support collection work while protecting administrative controls.'],
      ['Can we export donation records?', 'Yes. The portal provides clean statements and exportable summaries for committee and reporting workflows.'],
    ],
  },
};

export function SeoLandingPage({ pageKey }: { pageKey: SeoPageKey }) {
  const page = seoPages[pageKey];
  const relatedPages = Object.entries(seoPages).filter(([key]) => key !== pageKey) as Array<[SeoPageKey, SeoPageContent]>;

  useEffect(() => {
    applyPageSeo({
      title: page.title,
      description: page.description,
      path: page.path,
      lang: 'en',
      schema: {
        '@context': 'https://schema.org',
        '@graph': [
          {
            '@type': 'WebPage',
            '@id': `${SITE_ORIGIN}${page.path}#webpage`,
            url: `${SITE_ORIGIN}${page.path}`,
            name: page.title,
            description: page.description,
            isPartOf: { '@id': `${SITE_ORIGIN}/#website` },
            about: { '@id': `${SITE_ORIGIN}/#epawati` },
            inLanguage: 'en-IN',
          },
          {
            '@type': 'FAQPage',
            mainEntity: page.faqs.map(([question, answer]) => ({
              '@type': 'Question',
              name: question,
              acceptedAnswer: { '@type': 'Answer', text: answer },
            })),
          },
          {
            '@type': 'BreadcrumbList',
            itemListElement: [
              { '@type': 'ListItem', position: 1, name: 'Samavet', item: `${SITE_ORIGIN}/` },
              { '@type': 'ListItem', position: 2, name: page.eyebrow, item: `${SITE_ORIGIN}${page.path}` },
            ],
          },
        ],
      },
    });
  }, [page]);

  return (
    <main className="seo-page">
      <header className="seo-page-header">
        <a className="seo-page-brand" href="/"><img alt="" src={samavetLogo} /><strong>SAMAVET</strong></a>
        <nav aria-label="Page navigation"><a href="#benefits">Benefits</a><a href="#how-it-works">How it works</a><a href="#questions">FAQ</a></nav>
        <a className="seo-page-portal" href={PORTAL_URL}>Portal login</a>
      </header>

      <section className="seo-page-hero">
        <div className="seo-page-shell">
          <nav aria-label="Breadcrumb" className="seo-breadcrumb"><a href="/">Samavet</a><ChevronRight size={14} /><span>{page.eyebrow}</span></nav>
          <p className="seo-page-eyebrow">{page.eyebrow}</p>
          <h1>{page.heading}</h1>
          <p className="seo-page-lead">{page.lead}</p>
          <p className="seo-page-audience">{page.audience}</p>
          <div className="seo-page-actions"><a href={PORTAL_URL}>Explore ePawati <ArrowRight size={17} /></a><a href="/#contact">Contact Samavet</a></div>
        </div>
      </section>

      <section className="seo-page-intro">
        <div className="seo-page-shell seo-page-split"><h2>{page.introTitle}</h2><div>{page.intro.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</div></div>
      </section>

      <section className="seo-page-benefits" id="benefits">
        <div className="seo-page-shell"><p className="seo-page-eyebrow">ePawati features</p><h2>{page.benefitsTitle}</h2><div className="seo-benefit-grid">{page.benefits.map(([title, description]) => <article key={title}><Check size={19} /><h3>{title}</h3><p>{description}</p></article>)}</div></div>
      </section>

      <section className="seo-page-process" id="how-it-works">
        <div className="seo-page-shell"><h2>{page.processTitle}</h2><ol>{page.process.map(([title, description], index) => <li key={title}><span>0{index + 1}</span><div><h3>{title}</h3><p>{description}</p></div></li>)}</ol></div>
      </section>

      <section className="seo-page-faq" id="questions">
        <div className="seo-page-shell seo-page-split"><h2>Questions about this solution</h2><div>{page.faqs.map(([question, answer]) => <details key={question}><summary>{question}</summary><p>{answer}</p></details>)}</div></div>
      </section>

      <section className="seo-related">
        <div className="seo-page-shell"><h2>Explore other Samavet solutions</h2><div>{relatedPages.map(([, related]) => <a href={related.path} key={related.path}><span>{related.eyebrow}</span><strong>{related.heading}</strong><ArrowRight size={17} /></a>)}</div></div>
      </section>

      <section className="seo-page-cta"><div className="seo-page-shell"><h2>Bring your donation receipts online.</h2><p>Talk to Samavet about a workflow for your organisation.</p><a href="/#contact">Contact Samavet <ArrowRight size={17} /></a></div></section>

      <footer className="seo-page-footer"><span>© {new Date().getFullYear()} Samavet. All rights reserved.</span><a href="/blog">Blog</a><a href="mailto:hello@samavet.in">hello@samavet.in</a></footer>
    </main>
  );
}
