import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../../Assets/Logo/logo-zenflo-2026.svg';
import { submitForm } from '../../utils/submitForm';
import { subscribeToNewsletter, COURSE_TAG_ID } from '../../utils/mailchimp';
import { useSeo } from '../../utils/useSeo';

const Courses: React.FC = () => {
  useSeo(
    'Free Shopify Course for Beginners — Live Monthly Class | Zenflo Studios',
    'Learn Shopify live: a monthly class for beginners starting an online business. The first 30 minutes are free — theme, apps, product pages, and first sales. Next class August 19, 7pm EST.',
    '/courses'
  );
  const navigate = useNavigate();
  const [experience, setExperience] = useState('from-zero');
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSending(true);
    const form = e.currentTarget;
    const data = {
      name: (form.elements.namedItem('name') as HTMLInputElement).value,
      brand: (form.elements.namedItem('brand') as HTMLInputElement).value,
      email: (form.elements.namedItem('email') as HTMLInputElement).value,
      experience,
      goals: (form.elements.namedItem('goals') as HTMLTextAreaElement).value,
      subject: 'New Course Registration — Run Your Own Shopify',
    };
    // Course signups also join the Mailchimp audience via the dedicated course form.
    subscribeToNewsletter({
      email: data.email,
      fname: data.name,
      company: data.brand,
      form: 'course',
      tags: COURSE_TAG_ID,
    });
    const ok = await submitForm(data);
    setSending(false);
    if (ok) setSubmitted(true);
  };

  return (
    <div className="courses">
      {/* Nav */}
      <nav className="courses-nav">
        <div className="nav-brand" onClick={() => navigate('/')}>
          <img src={logo} alt="Zenflo Studios" className="nav-logo" />
        </div>
        <a href="/" className="courses-back">← Back to studio</a>
        <a href="#save-seat" className="nav-cta">
          Save your seat
          <svg className="arrow" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M1 13L13 1M13 1H3M13 1v10" /></svg>
        </a>
      </nav>

      {/* Hero */}
      <section className="courses-hero">
        <div className="courses-hero-inner">
          <div className="courses-hero-left">
            <div className="courses-badge">
              <span className="courses-badge-dot" />
              The Zenflo Studio Course
            </div>
            <h1>Run your<br /><span className="scribble">own</span> <span className="shopify">Shopify.</span></h1>
            <p className="courses-lead">
              <strong>A live monthly class for Shopify beginners.</strong> The first 30 minutes — the full lesson — are free for everyone. When it clicks, stay for the build hour and we set up your store together, live.
            </p>
            <p className="courses-sub">
              The build hour is $29, and you decide during class — the payment link drops in the chat at the half-hour mark. Build-hour guests keep the full replay, slides, and templates. Want everything? The series pass covers all seven classes and the replay library for $129.
            </p>
          </div>
          <div className="courses-hero-right">
            <div className="courses-card">
              <div className="courses-card-free">First 30 min free</div>
              <div className="courses-card-top">
                <span className="courses-card-label">Next class</span>
                <span className="courses-card-date">August 19</span>
                <span className="courses-card-time">Wednesday · 7pm EST</span>
              </div>
              <div className="courses-card-grid">
                <div>
                  <span className="courses-card-label">Topic</span>
                  <strong>Shopify for beginners — jumpstart your first store</strong>
                </div>
                <div>
                  <span className="courses-card-label">Format</span>
                  <strong>30 min lesson + 60 min build hour</strong>
                </div>
              </div>
              <div className="courses-card-grid">
                <div>
                  <span className="courses-card-label">The lesson</span>
                  <strong>Free</strong>
                </div>
                <div>
                  <span className="courses-card-label">Build hour</span>
                  <strong>$29 — only if you stay</strong>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sign up */}
      <section className="courses-signup" id="save-seat">
        <div className="courses-signup-inner">
          <div className="courses-signup-left">
            <div className="courses-eyebrow">Save your seat</div>
            <h2>Sign up for your <span className="scribble">first</span> class.</h2>
            <p>Saving a seat is free — you only ever pay if you stay past the lesson. We'll send the Zoom link 24 hours before, and you'll get invitations to the rest of the series.</p>
            <ol className="courses-steps">
              <li><span className="step-num">1</span><span><strong>Zoom link + reminder</strong> sent 24h and 1h before class.</span></li>
              <li><span className="step-num">2</span><span><strong>First 30 minutes free</strong> — the full lesson plus live Q&A, for everyone.</span></li>
              <li><span className="step-num">3</span><span><strong>Stay for the build hour ($29)</strong> — we set up your store together; replay, slides and templates included.</span></li>
            </ol>
          </div>
          <div className="courses-signup-right">
            {submitted ? (
              <div className="courses-form-card">
                <div className="courses-form-success">
                  <h3>You're in!</h3>
                  <p>Check your inbox for the Zoom link. See you August 19.</p>
                </div>
              </div>
            ) : (
              <div className="courses-form-card">
                
                <form onSubmit={handleSubmit}>
                  <div className="courses-form-row">
                    <label><span>Your name</span><input name="name" type="text" placeholder="" required /></label>
                    <label><span>Your brand</span><input name="brand" type="text" placeholder="Brand Name" required /></label>
                  </div>
                  <label><span>Email</span><input name="email" type="email" placeholder="hello@yourbrand.com" required /></label>
                  <div className="courses-form-field">
                    <span>Where are you with Shopify?</span>
                    <div className="courses-toggle">
                      {['from-zero', 'store-set-up', 'already-selling'].map((val) => (
                        <button
                          key={val}
                          type="button"
                          className={experience === val ? 'active' : ''}
                          onClick={() => setExperience(val)}
                        >
                          {val === 'from-zero' ? 'From zero' : val === 'store-set-up' ? 'Store set up' : 'Already selling'}
                        </button>
                      ))}
                    </div>
                  </div>
                  <label><span>What do you want to walk away with?</span><textarea name="goals" placeholder="A storefront for my candle line. Mostly confused about apps and SEO." /></label>
                  <button type="submit" className="courses-submit" disabled={sending}>
                    {sending ? 'Saving…' : 'Save my seat for August 19 →'}
                  </button>
                  <p className="courses-form-note">Free to save a seat · Series pass: all 7 classes + replays for $129</p>
                </form>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="courses-faq">
        <div className="courses-faq-inner">
          <h2>Questions, <span className="scribble">answered</span>.</h2>
          <dl>
            <div><dt>Is the Shopify course really free?</dt><dd>The first 30 minutes — the full lesson plus live Q&A — are free for everyone, every month. Staying for the guided build hour is $29, and the seven-class series pass with the replay library is $129.</dd></div>
            <div><dt>Do I need experience to learn Shopify in this class?</dt><dd>No — the class is built for beginners starting a business or their first online store. If you can use a web browser, you can follow along.</dd></div>
            <div><dt>What will I learn?</dt><dd>How to set up a Shopify store that converts: choosing a theme fast, the 3 apps you actually need, product pages and photos, shipping settings, and how to get your first sales with simple marketing.</dd></div>
            <div><dt>When is the next class?</dt><dd>Wednesday, August 19 at 7pm EST, live on Zoom. A new class runs every month — the Zoom link arrives 24 hours before.</dd></div>
            <div><dt>English or Spanish?</dt><dd>The class runs in English, and we speak Spanish natively — preguntas en español are always welcome.</dd></div>
          </dl>
        </div>
      </section>

      {/* Newsletter strip */}
      <section className="courses-newsletter">
        <div className="courses-newsletter-inner">
          <div>
            <h2>Catch the recap in your <span className="scribble">inbox</span>.</h2>
            <p>Class invites, dates, and the monthly Zenflo letter — Shopify plays and content ideas, once a month.</p>
          </div>
          <a href="/newsletter" className="courses-newsletter-btn">
            Sign up to the newsletter
            <svg className="arrow" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M1 13L13 1M13 1H3M13 1v10" /></svg>
          </a>
        </div>
      </section>
    </div>
  );
};

export default Courses;
