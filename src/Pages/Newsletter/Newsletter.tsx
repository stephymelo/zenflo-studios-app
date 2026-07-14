import React, { useState } from 'react';
import { subscribeToNewsletter } from '../../utils/mailchimp';

const Newsletter: React.FC = () => {
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const email = (form.elements.namedItem('email') as HTMLInputElement).value;
    const fname = (form.elements.namedItem('fname') as HTMLInputElement).value;
    setStatus('sending');
    const res = await subscribeToNewsletter({ email, fname });
    if (res.ok) {
      setStatus('success');
    } else {
      setStatus('error');
      setMessage(res.msg);
    }
  };

  return (
    <div className="newsletter">
      <div className="newsletter-inner">
        <div className="newsletter-left">
          <div className="lbl"><span>The newsletter</span></div>
          <h1>The Zenflo <span className="pop">letter</span>.</h1>
          <p className="newsletter-lead">
            One email a month — Shopify plays, content ideas, and behind-the-scenes
            from the studio. Written for founders who do their own marketing.
          </p>
          <div className="newsletter-tags">
            <span className="tag">SHOPIFY TIPS</span>
            <span className="tag">CONTENT IDEAS</span>
            <span className="tag">CLASS INVITES</span>
            <span className="tag">ONCE A MONTH</span>
          </div>
        </div>
        <div className="newsletter-right">
          {status === 'success' ? (
            <div className="newsletter-card">
              <div className="newsletter-success">
                <h3>You're on the list!</h3>
                <p>Keep an eye on your inbox — the next letter is already growing.</p>
              </div>
            </div>
          ) : (
            <form className="newsletter-card" onSubmit={handleSubmit}>
              <label>
                <span>First name</span>
                <input name="fname" type="text" placeholder="Your name" />
              </label>
              <label>
                <span>Email</span>
                <input name="email" type="email" placeholder="hello@yourbrand.com" required />
              </label>
              <button type="submit" className="newsletter-submit" disabled={status === 'sending'}>
                {status === 'sending' ? 'Planting…' : 'Sign me up →'}
              </button>
              {status === 'error' && (
                <p className="newsletter-error" dangerouslySetInnerHTML={{ __html: message }} />
              )}
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default Newsletter;
