import { ArrowLeft, ArrowUpRight, CalendarDays } from 'lucide-react';
import { useEffect } from 'react';

import blogImage from './assets/samavet-ganesh-procession.webp';
import samavetLogo from './assets/samavet-logo-transparent.png';
import { applyPageSeo } from './seo';
import './blog.css';

const ARTICLE_URL = 'https://mahaenews.com/2026/07/29/samavets-digital-e-receipt-concept-for-ganesha-mandals-trusts-and-temples/';
const CHANNEL_URL = 'https://whatsapp.com/channel/0029Va5jlQT0AgWBH38B5t26';

export default function BlogPage() {
  useEffect(() => {
    applyPageSeo({
      title: 'समवेत ब्लॉग | ई-पावती, डिजिटल वर्गणी आणि समुदाय तंत्रज्ञान',
      description: 'गणेश मंडळे, मंदिरे आणि ट्रस्टसाठी डिजिटल ई-पावती, वर्गणी व्यवस्थापन आणि समुदाय तंत्रज्ञानाविषयी समवेतच्या बातम्या आणि लेख.',
      path: '/blog',
      lang: 'mr',
      type: 'article',
    });
  }, []);

  return (
    <main className="samavet-blog-page">
      <header className="blog-page-header">
        <a className="blog-page-brand" href="/" aria-label="Samavet home">
          <img alt="Samavet logo" src={samavetLogo} />
          <span><strong>SAMAVET</strong><small>Community Technology</small></span>
        </a>
        <a className="blog-page-home" href="/"><ArrowLeft aria-hidden="true" size={18} />मुख्यपृष्ठ</a>
      </header>

      <section className="blog-page-content" aria-labelledby="blog-page-title">
        <div className="blog-page-heading">
          <p>Insights</p>
          <h1 id="blog-page-title">Latest Blogs</h1>
          <span>समुदाय तंत्रज्ञान, डिजिटल देणगी व्यवस्थापन आणि समवेतच्या वाटचालीतील ताज्या बातम्या.</span>
        </div>

        <div className="blog-page-list">
          <article className="blog-article-card">
            <div className="blog-article-image">
              <img alt="गणेश मंडळांच्या समुदायाचे प्रतिनिधित्व करणारी गणेश मिरवणूक" src={blogImage} />
            </div>
            <div className="blog-article-body">
              <div className="blog-article-meta">
                <span><CalendarDays aria-hidden="true" size={17} /><time dateTime="2026-07-29">29/07/2026</time></span>
                <span>MahaeNews</span>
              </div>
              <h2>गणेश मंडळे, ट्रस्ट आणि मंदिरांसाठी ‘SAMAVET’ची डिजिटल ई-पावती संकल्पना</h2>
              <h3>देणगी व्यवस्थापनाला आधुनिक व पारदर्शक दिशा</h3>
              <p>डिजिटल पावती, सुरक्षित नोंदी, तत्काळ WhatsApp संदेश आणि स्मार्ट व्यवस्थापनाची एकत्रित सुविधा.</p>
              <div className="blog-article-actions">
                <a href={ARTICLE_URL} rel="noreferrer" target="_blank">सविस्तर वाचा <ArrowUpRight aria-hidden="true" size={18} /></a>
                <a href={CHANNEL_URL} rel="noreferrer" target="_blank">WhatsApp चॅनेल <ArrowUpRight aria-hidden="true" size={16} /></a>
              </div>
            </div>
          </article>
        </div>
      </section>

      <footer className="blog-page-footer">
        <span>&copy; {new Date().getFullYear()} Samavet.</span>
        <a href="https://bracketdex.com" rel="noreferrer" target="_blank">Powered by BracketDex Technologies</a>
      </footer>
    </main>
  );
}
