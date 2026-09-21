import React, { useState } from 'react';
import { subscribeToNewsletter } from '../../utils/mailchimp';
import { useSeo } from '../../utils/useSeo';
import { t, ntCls } from '../../Components/LanguageToggle/LanguageToggle';

const Newsletter: React.FC = () => {
  useSeo(
    'The Zenflo Letter — Monthly Shopify & Marketing Tips | Zenflo Studios',
    'One email a month with Shopify plays, digital marketing ideas, and free class invites — written for founders starting a business and doing their own marketing.',
    '/newsletter'
  );
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
    <div className={ntCls('newsletter')}>
      <div className="newsletter-inner">
        <div className="newsletter-left">
          <div className="lbl"><span>{t('The newsletter', 'El boletín')}</span></div>
          <h1>{t(<>The Zenflo <span className="pop">letter</span>.</>, <>La <span className="pop">carta</span> de Zenflo.</>)}</h1>
          <p className="newsletter-lead">
            {t(
              'One email a month — Shopify plays, content ideas, and behind-the-scenes from the studio. Written for founders who do their own marketing.',
              'Un correo al mes: jugadas de Shopify, ideas de contenido y detrás de cámaras del estudio. Escrito para fundadores que hacen su propio marketing.'
            )}
          </p>
          <div className="newsletter-tags">
            <span className="tag">{t('SHOPIFY TIPS', 'TIPS DE SHOPIFY')}</span>
            <span className="tag">{t('CONTENT IDEAS', 'IDEAS DE CONTENIDO')}</span>
            <span className="tag">{t('CLASS INVITES', 'INVITACIONES A CLASES')}</span>
            <span className="tag">{t('ONCE A MONTH', 'UNA VEZ AL MES')}</span>
          </div>
        </div>
        <div className="newsletter-right">
          {status === 'success' ? (
            <div className="newsletter-card">
              <div className="newsletter-success">
                <h3>{t("You're on the list!", '¡Ya estás en la lista!')}</h3>
                <p>{t('Keep an eye on your inbox — the next letter is already growing.', 'Pendiente de tu correo: la próxima carta ya está creciendo.')}</p>
              </div>
            </div>
          ) : (
            <form className="newsletter-card" onSubmit={handleSubmit}>
              <label>
                <span>{t('First name', 'Nombre')}</span>
                <input name="fname" type="text" placeholder={t('Your name', 'Tu nombre')} />
              </label>
              <label>
                <span>{t('Email', 'Correo')}</span>
                <input name="email" type="email" placeholder={t('hello@yourbrand.com', 'hola@tumarca.com')} required />
              </label>
              <button type="submit" className="newsletter-submit" disabled={status === 'sending'}>
                {status === 'sending' ? t('Planting…', 'Sembrando…') : t('Sign me up →', 'Suscribirme →')}
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
