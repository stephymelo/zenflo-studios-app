import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../../Assets/Logo/logo-zenflo-2026.svg';
import { submitForm } from '../../utils/submitForm';

const Courses: React.FC = () => {
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
              The Zenflo Studio Course · Free Monthly
            </div>
            <h1>Run your<br /><span className="scribble">own</span> <span className="shopify">Shopify.</span></h1>
            <p className="courses-lead">
              <strong>A free, live, 90-minute class</strong> we run every month — for Shopify beginners who want to set up a store that converts without paying an agency to do it.
            </p>
            <p className="courses-sub">
              Stay for one. Stay for the whole seven-class series. Either way you leave with a real plan, not theory — and a recording you can share with your team.
            </p>
          </div>
          <div className="courses-hero-right">
            <div className="courses-card">
              <div className="courses-card-free">Free</div>
              <div className="courses-card-top">
                <span className="courses-card-label">Next class</span>
                <span className="courses-card-date">June 12</span>
                <span className="courses-card-time">Thursday · 7pm EST</span>
              </div>
              <div className="courses-card-grid">
                <div>
                  <span className="courses-card-label">Topic</span>
                  <strong>Shopify basics — does it suit your business?</strong>
                </div>
                <div>
                  <span className="courses-card-label">Format</span>
                  <strong>90 min live + Q&A</strong>
                </div>
              </div>
              <div className="courses-card-grid">
                <div>
                  <span className="courses-card-label">Price</span>
                  <strong>Free, forever</strong>
                </div>
                <div>
                  <span className="courses-card-label">Spots left</span>
                  <strong>17 of 50</strong>
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
            <h2>Sign up for the <span className="scribble">next</span> class.</h2>
            <p>Tell us a little about you and we'll send the Zoom link 24 hours before. You'll automatically get invitations to the rest of the series — opt out anytime.</p>
            <ol className="courses-steps">
              <li><span className="step-num">1</span><span><strong>Zoom link + reminder</strong> sent 24h and 1h before class.</span></li>
              <li><span className="step-num">2</span><span><strong>Replay + slides</strong> in your inbox the morning after.</span></li>
              <li><span className="step-num">3</span><span><strong>First dibs</strong> on the rest of the seven-class series.</span></li>
              <li><span className="step-num">4</span><span><strong>No spam, no sales calls</strong> — promise. Unsubscribe in one click.</span></li>
            </ol>
          </div>
          <div className="courses-signup-right">
            {submitted ? (
              <div className="courses-form-card">
                <div className="courses-form-success">
                  <h3>You're in!</h3>
                  <p>Check your inbox for the Zoom link. See you June 12.</p>
                </div>
              </div>
            ) : (
              <div className="courses-form-card">
                <div className="courses-form-title">Save your seat</div>
                <form onSubmit={handleSubmit}>
                  <div className="courses-form-row">
                    <label><span>Your name</span><input name="name" type="text" placeholder="Mariana Restrepo" required /></label>
                    <label><span>Your brand</span><input name="brand" type="text" placeholder="Aura Beauty" required /></label>
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
                    {sending ? 'Saving…' : 'Save my seat for June 12 →'}
                  </button>
                  <p className="courses-fine">Free · 90 min · Zoom link sent 24h before</p>
                </form>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Courses;
