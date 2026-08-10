import { useEffect, useMemo, useState, type ReactNode } from 'react';

import { LandingFooter } from './components/LandingFooter';
import { LandingHeader } from './components/LandingHeader';
import { localizedCopy, type LandingLanguage } from './content';
import { legalPages } from './legalPages';
import { PORTAL_URL } from './links.js';
import { applyPageSeo } from './seo';
import samavetLogoWatermark from './assets/samavet-logo-transparent.png';
import './samavet.css';
import './legal.css';

function getLegalPage(pathname = window.location.pathname) {
  const normalizedPath = pathname.replace(/\/+$/, '') || '/';
  return legalPages.find((page) => page.path === normalizedPath);
}

function getInitialLanguage(): LandingLanguage {
  return new URLSearchParams(window.location.search).get('lang') === 'mr' ? 'mr' : 'en';
}

function renderInlineText(text: string) {
  const parts = text.split(/(`[^`]+`)/g);
  return parts.map((part, index) => {
    if (part.startsWith('`') && part.endsWith('`')) return <code key={index}>{part.slice(1, -1)}</code>;
    return part;
  });
}

function renderMarkdown(markdown: string) {
  const lines = markdown.split(/\r?\n/);
  const blocks: ReactNode[] = [];
  let listItems: string[] = [];
  let paragraph: string[] = [];

  const flushParagraph = () => {
    if (!paragraph.length) return;
    blocks.push(<p key={`p-${blocks.length}`}>{renderInlineText(paragraph.join(' '))}</p>);
    paragraph = [];
  };

  const flushList = () => {
    if (!listItems.length) return;
    blocks.push(<ul key={`ul-${blocks.length}`}>{listItems.map((item) => <li key={item}>{renderInlineText(item)}</li>)}</ul>);
    listItems = [];
  };

  lines.forEach((line) => {
    const trimmed = line.trim();
    if (!trimmed) {
      flushParagraph();
      flushList();
      return;
    }

    const heading = trimmed.match(/^(#{1,3})\s+(.+)$/);
    if (heading) {
      flushParagraph();
      flushList();
      const level = heading[1].length;
      const content = renderInlineText(heading[2]);
      if (level === 1) blocks.push(<h1 key={`h-${blocks.length}`}>{content}</h1>);
      else if (level === 2) blocks.push(<h2 key={`h-${blocks.length}`}>{content}</h2>);
      else blocks.push(<h3 key={`h-${blocks.length}`}>{content}</h3>);
      return;
    }

    const listItem = trimmed.match(/^-\s+(.+)$/);
    if (listItem) {
      flushParagraph();
      listItems.push(listItem[1]);
      return;
    }

    flushList();
    paragraph.push(trimmed);
  });

  flushParagraph();
  flushList();
  return blocks;
}

export default function LegalPage() {
  const page = getLegalPage() ?? legalPages[0];
  const [language, setLanguage] = useState<LandingLanguage>(getInitialLanguage);
  const copy = localizedCopy[language];
  const body = useMemo(() => renderMarkdown(page.source), [page]);

  useEffect(() => {
    applyPageSeo({
      title: `${page.label} | Samavet`,
      description: `${page.label} for Samavet ePawati users, organisations, mandals, trusts and committees.`,
      path: page.path,
      lang: 'en',
      type: 'article',
    });
  }, [page]);

  function changeLanguage(nextLanguage: LandingLanguage) {
    const nextSearch = nextLanguage === 'mr' ? '?lang=mr' : '';
    window.history.replaceState({}, '', `${page.path}${nextSearch}`);
    setLanguage(nextLanguage);
  }

  return (
    <main className={`epawati-page legal-page${language === 'mr' ? ' epawati-page--mr' : ''}`}>
      <LandingHeader language={language} onLanguageChange={changeLanguage} portalUrl={PORTAL_URL} />
      <section className="legal-page__content">
        <article className="legal-page__article">
          <img alt="" aria-hidden="true" className="legal-page__watermark" src={samavetLogoWatermark} />
          {body}
        </article>
      </section>
      <LandingFooter copy={copy} language={language} portalUrl={PORTAL_URL} />
    </main>
  );
}
