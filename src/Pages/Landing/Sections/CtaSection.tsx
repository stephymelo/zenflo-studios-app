import React, { useEffect, useRef, useState } from 'react';
import logo from '../../../Assets/Logo/logo-zenflo-2026.svg';
import { submitForm } from '../../../utils/submitForm';
import { t, ntCls } from '../../../Components/LanguageToggle/LanguageToggle';

const CtaSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add('in'); }),
      { threshold: 0.1 }
    );
    sectionRef.current?.querySelectorAll('.rv').forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSending(true);
    const form = e.currentTarget;
    const data = {
      name: (form.elements.namedItem('name') as HTMLInputElement).value,
      brand: (form.elements.namedItem('brand') as HTMLInputElement).value,
      email: (form.elements.namedItem('email') as HTMLInputElement).value,
      message: (form.elements.namedItem('message') as HTMLTextAreaElement).value,
      subject: 'New Contact — Zenflo Studios',
    };
    const ok = await submitForm(data);
    setSending(false);
    if (ok) setSent(true);
  };

  return (
    <section className={ntCls('cta-section')} id="contact" ref={sectionRef}>
      <div className="cta-section-mark"><img src={logo} alt="" /></div>
      <div className="cta-section-inner">
        <div>
          <h2 className="rv">{t(
            <>Let's <span className="pop">grow</span> something <span className="coral-text">together.</span></>,
            <>Vamos a <span className="pop">crear</span> algo <span className="coral-text">juntos.</span></>
          )}</h2>
          <p className="rv rv-2">{t('Tell us about your brand and your vision.', 'Cuéntanos sobre tu marca y tu visión.')}</p>
          {sent ? (
            <div className="cta-form rv rv-3" style={{ textAlign: 'center', padding: '40px 0' }}>
              <h3 style={{ color: '#FFDA63', marginBottom: 12 }}>{t('Sent!', '¡Enviado!')}</h3>
              <p style={{ color: 'var(--cream)' }}>{t("We'll be in touch within 48 hours.", 'Te respondemos en menos de 48 horas.')}</p>
            </div>
          ) : (
            <form className="cta-form rv rv-3" onSubmit={handleSubmit}>
              <div className="cta-row">
                <label><span>{t('Your name', 'Tu nombre')}</span><input name="name" type="text" required /></label>
                <label><span>{t('Your brand', 'Tu marca')}</span><input name="brand" type="text" placeholder={t('Brand Name', 'Nombre de la marca')} /></label>
              </div>
              <label><span>{t('Email', 'Correo')}</span><input name="email" type="email" placeholder={t('hello@yourbrand.com', 'hola@tumarca.com')} required /></label>
              <label><span>{t('What are you working on?', '¿En qué estás trabajando?')}</span><textarea name="message" placeholder={t('A skincare launch. Need brand + Shopify + first 90 days of content.', 'Un lanzamiento de skincare. Necesito marca + Shopify + los primeros 90 días de contenido.')} /></label>
              <button type="submit" disabled={sending}>{sending ? t('Sending…', 'Enviando…') : t('Send the seed →', 'Enviar la semilla →')}</button>
            </form>
          )}
        </div>
        <aside className="cta-aside">
          <div className="block rv rv-2">
            <h4>{t('Email us', 'Escríbenos')}</h4>
            <p><a href="mailto:hello@zenflostudios.com">hello@zenflostudios.com</a></p>
          </div>
          <div className="block rv rv-3">
            <h4>{t("We're based in", 'Estamos en')}</h4>
            <p>{t('Boca Raton, South Florida.', 'Boca Raton, sur de Florida.')}</p>
          </div>
          <div className="block rv rv-4">
            <h4>{t('Office hours', 'Horario')}</h4>
            <p>{t(<>Mon–Fri · 9am to 6pm EST<br />Async by default — meetings on purpose.</>, <>Lun–Vie · 9am a 6pm EST<br />Asíncronos por defecto: reuniones con propósito.</>)}</p>
          </div>
        </aside>
      </div>
    </section>
  );
};

export default CtaSection;
