import { ArrowUpRight, CalendarDays } from 'lucide-react';
import { useEffect, useState } from 'react';

import blogEcoFriendlyImage from './assets/blog-eco-friendly.png';
import blogWhatIsSamavetImage from './assets/blog-what-is-samavet.png';
import blogImage from './assets/samavet-ganesh-procession.webp';
import { LandingFooter } from './components/LandingFooter';
import { LandingHeader } from './components/LandingHeader';
import { localizedCopy, type LandingLanguage } from './content';
import { PORTAL_URL } from './links.js';
import { applyPageSeo } from './seo';
import './samavet.css';
import './blog.css';

const blogPosts = [
  {
    title: 'गणेश मंडळे, ट्रस्ट आणि मंदिरांसाठी ‘SAMAVET’ची डिजिटल ई-पावती संकल्पना',
    subtitle: 'देणगी व्यवस्थापनाला आधुनिक व पारदर्शक दिशा',
    description: 'डिजिटल पावती, सुरक्षित नोंदी, तत्काळ WhatsApp संदेश आणि स्मार्ट व्यवस्थापनाची एकत्रित सुविधा.',
    source: 'MahaeNews',
    date: '29/07/2026',
    dateTime: '2026-07-29',
    image: blogImage,
    imageAlt: 'गणेश मंडळांच्या समुदायाचे प्रतिनिधित्व करणारी गणेश मिरवणूक',
    url: 'https://mahaenews.com/2026/07/29/samavets-digital-e-receipt-concept-for-ganesha-mandals-trusts-and-temples/',
  },
  {
    title: 'कागदी पावत्यांपासून डिजिटल व्यवस्थापनाकडे; SAMAVET च्या ePawati उपक्रमामुळे पर्यावरण संवर्धनालाही चालना',
    subtitle: 'पुणे | प्रतिनिधी',
    description: 'गणेशोत्सव आणि समुदाय देणगी व्यवस्थापनात कागदी पावत्यांऐवजी डिजिटल ई-पावती वापरण्याचा पर्यावरणपूरक आणि पारदर्शक मार्ग.',
    source: 'आपला आवाज',
    date: '28/07/2026',
    dateTime: '2026-07-28',
    image: blogEcoFriendlyImage,
    imageAlt: 'SAMAVET ePawati पर्यावरणपूरक डिजिटल पावती उपक्रम पोस्टर',
    url: 'https://aaplaawajnews.com/2026/39369/',
  },
  {
    title: 'SAMAVET ePawati : गणेशोत्सवात डिजिटल व्यवस्थापनाची नवी दिशा; SAMAVET ePawati ठरत आहे मंडळांची पहिली पसंती!',
    subtitle: 'SAMAVET ePawati बातमी',
    description: 'गणेशोत्सवात डिजिटल व्यवस्थापन आणि ई-पावती वापर वाढवत मंडळांसाठी SAMAVET ePawati अधिक उपयुक्त ठरत असल्याची बातमी.',
    source: 'Newszenn',
    image: blogWhatIsSamavetImage,
    imageAlt: 'What is SAMAVET community technology platform poster',
    url: 'https://newszenn.com/post/samavet-epawati-samavet-epawati-',
  },
] as const;

function getInitialLanguage(): LandingLanguage {
  return new URLSearchParams(window.location.search).get('lang') === 'en' ? 'en' : 'mr';
}

export default function BlogPage() {
  const [language, setLanguage] = useState<LandingLanguage>(getInitialLanguage);
  const copy = localizedCopy[language];

  useEffect(() => {
    applyPageSeo({
      title: 'समवेत ब्लॉग | ई-पावती, डिजिटल वर्गणी आणि समुदाय तंत्रज्ञान',
      description: 'गणेश मंडळे, मंदिरे आणि ट्रस्टसाठी डिजिटल ई-पावती, वर्गणी व्यवस्थापन आणि समुदाय तंत्रज्ञानाविषयी समवेतच्या बातम्या आणि लेख.',
      path: '/blog',
      lang: 'mr',
      type: 'article',
    });
  }, []);

  function changeLanguage(nextLanguage: LandingLanguage) {
    const nextSearch = nextLanguage === 'en' ? '?lang=en' : '';
    window.history.replaceState({}, '', `/blog${nextSearch}`);
    setLanguage(nextLanguage);
  }

  return (
    <main className={`epawati-page samavet-blog-page${language === 'mr' ? ' epawati-page--mr' : ''}`}>
      <LandingHeader language={language} onLanguageChange={changeLanguage} portalUrl={PORTAL_URL} />
      <section className="blog-page-content" aria-labelledby="blog-page-title">
        <div className="blog-page-heading">
          <p>लेख</p>
          <h1 id="blog-page-title">ताजे ब्लॉग</h1>
          <span>समुदाय तंत्रज्ञान, डिजिटल देणगी व्यवस्थापन आणि समवेतच्या वाटचालीतील ताज्या बातम्या.</span>
        </div>

        <div className="blog-page-list">
          {blogPosts.map((post) => (
            <article className="blog-article-card" key={post.url}>
              <div className="blog-article-image">
                <img alt={post.imageAlt} src={post.image} />
              </div>
              <div className="blog-article-body">
                <div className="blog-article-meta">
                  {'date' in post ? <span><CalendarDays aria-hidden="true" size={17} /><time dateTime={post.dateTime}>{post.date}</time></span> : null}
                  <span>{post.source}</span>
                </div>
                <h2>{post.title}</h2>
                <h3>{post.subtitle}</h3>
                <p>{post.description}</p>
                <div className="blog-article-actions">
                  <a href={post.url} rel="noreferrer" target="_blank">सविस्तर वाचा <ArrowUpRight aria-hidden="true" size={18} /></a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
      <LandingFooter copy={copy} language={language} portalUrl={PORTAL_URL} />
    </main>
  );
}
