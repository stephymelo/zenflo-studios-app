import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../../Assets/Logo/logo-zenflo-2026.svg';
import { submitForm } from '../../utils/submitForm';
import { subscribeToNewsletter, COURSE_TAG_ID } from '../../utils/mailchimp';
import { useSeo } from '../../utils/useSeo';
import LanguageToggle, { langHref, t, ntCls } from '../../Components/LanguageToggle/LanguageToggle';

const Courses: React.FC = () => {
  useSeo(
    'Free Shopify Course for Beginners — Live Monthly Class | Zenflo Studios',
    'Learn Shopify live: a monthly class for beginners starting an online business. The first 30 minutes are free — theme, apps, product pages, and first sales. Next class October 24, 7pm EST.',
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
    <div className={ntCls('courses')}>
      {/* Nav */}
      <nav className="courses-nav">
        <div className="nav-brand" onClick={() => navigate('/')}>
          <img src={logo} alt="Zenflo Studios" className="nav-logo" />
        </div>
        <a href={langHref('/')} className="courses-back">{t('← Back to studio', '← Volver al estudio')}</a>
        <LanguageToggle />
        <a href="#save-seat" className="nav-cta">
          {t('Save your seat', 'Guarda tu cupo')}
          <svg className="arrow" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M1 13L13 1M13 1H3M13 1v10" /></svg>
        </a>
      </nav>

      {/* Hero */}
      <section className="courses-hero">
        <div className="courses-hero-inner">
          <div className="courses-hero-left">
            <div className="courses-badge">
              <span className="courses-badge-dot" />
              {t('The Zenflo Studio Course', 'El curso de Zenflo Studios')}
            </div>
            <h1>{t(
              <>Run your<br /><span className="scribble">own</span> <span className="shopify">Shopify.</span></>,
              <>Maneja tu<br /><span className="scribble">propio</span> <span className="shopify">Shopify.</span></>
            )}</h1>
            <p className="courses-lead">
              {t(
                <><strong>A live monthly class for Shopify beginners.</strong> The first 30 minutes — the full lesson — are free for everyone. When it clicks, stay for the build hour and we set up your store together, live.</>,
                <><strong>Una clase mensual en vivo para principiantes en Shopify.</strong> Los primeros 30 minutos, la lección completa, son gratis para todos. Cuando te haga clic, quédate a la hora de construcción y montamos tu tienda juntos, en vivo.</>
              )}
            </p>
            <p className="courses-sub">
              {t(
                'The build hour is $29, and you decide during class — the payment link drops in the chat at the half-hour mark. Build-hour guests keep the full replay, slides, and templates. Want everything? The series pass covers all seven classes and the replay library for $129.',
                'La hora de construcción cuesta $29 y lo decides durante la clase: el enlace de pago aparece en el chat a la media hora. Quienes se quedan conservan la grabación completa, las diapositivas y las plantillas. ¿Lo quieres todo? El pase de la serie cubre las siete clases y la biblioteca de grabaciones por $129.'
              )}
            </p>
          </div>
          <div className="courses-hero-right">
            <div className="courses-card">
              <div className="courses-card-free">{t('First 30 min free', 'Primeros 30 min gratis')}</div>
              <div className="courses-card-top">
                <span className="courses-card-label">{t('Next class', 'Próxima clase')}</span>
                <span className="courses-card-date">{t('October 24', '24 de octubre')}</span>
                <span className="courses-card-time">{t('Saturday · 7pm EST', 'Sábado · 7pm EST')}</span>
              </div>
              <div className="courses-card-grid">
                <div>
                  <span className="courses-card-label">{t('Topic', 'Tema')}</span>
                  <strong>{t('Shopify for beginners — jumpstart your first store', 'Shopify para principiantes: arranca tu primera tienda')}</strong>
                </div>
                <div>
                  <span className="courses-card-label">{t('Format', 'Formato')}</span>
                  <strong>{t('30 min lesson + 60 min build hour', '30 min de lección + 60 min de construcción')}</strong>
                </div>
              </div>
              <div className="courses-card-grid">
                <div>
                  <span className="courses-card-label">{t('The lesson', 'La lección')}</span>
                  <strong>{t('Free', 'Gratis')}</strong>
                </div>
                <div>
                  <span className="courses-card-label">{t('Build hour', 'Hora de construcción')}</span>
                  <strong>{t('$29 — only if you stay', '$29, solo si te quedas')}</strong>
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
            <div className="courses-eyebrow">{t('Save your seat', 'Guarda tu cupo')}</div>
            <h2>{t(
              <>Sign up for your <span className="scribble">first</span> class.</>,
              <>Inscríbete a tu <span className="scribble">primera</span> clase.</>
            )}</h2>
            <p>{t(
              "Saving a seat is free — you only ever pay if you stay past the lesson. We'll send the Zoom link 24 hours before, and you'll get invitations to the rest of the series.",
              'Guardar tu cupo es gratis: solo pagas si te quedas después de la lección. Te enviamos el enlace de Zoom 24 horas antes y recibirás invitaciones al resto de la serie.'
            )}</p>
            <ol className="courses-steps">
              <li><span className="step-num">1</span><span>{t(<><strong>Zoom link + reminder</strong> sent 24h and 1h before class.</>, <><strong>Enlace de Zoom + recordatorio</strong> 24h y 1h antes de la clase.</>)}</span></li>
              <li><span className="step-num">2</span><span>{t(<><strong>First 30 minutes free</strong> — the full lesson plus live Q&A, for everyone.</>, <><strong>Primeros 30 minutos gratis</strong>: la lección completa más preguntas en vivo, para todos.</>)}</span></li>
              <li><span className="step-num">3</span><span>{t(<><strong>Stay for the build hour ($29)</strong> — we set up your store together; replay, slides and templates included.</>, <><strong>Quédate a la hora de construcción ($29)</strong>: montamos tu tienda juntos; incluye grabación, diapositivas y plantillas.</>)}</span></li>
            </ol>
          </div>
          <div className="courses-signup-right">
            {submitted ? (
              <div className="courses-form-card">
                <div className="courses-form-success">
                  <h3>{t("You're in!", '¡Ya estás dentro!')}</h3>
                  <p>{t('Check your inbox for the Zoom link. See you October 24.', 'Revisa tu correo para el enlace de Zoom. Nos vemos el 24 de octubre.')}</p>
                </div>
              </div>
            ) : (
              <div className="courses-form-card">
                
                <form onSubmit={handleSubmit}>
                  <div className="courses-form-row">
                    <label><span>{t('Your name', 'Tu nombre')}</span><input name="name" type="text" placeholder="" required /></label>
                    <label><span>{t('Your brand', 'Tu marca')}</span><input name="brand" type="text" placeholder={t('Brand Name', 'Nombre de la marca')} required /></label>
                  </div>
                  <label><span>{t('Email', 'Correo')}</span><input name="email" type="email" placeholder={t('hello@yourbrand.com', 'hola@tumarca.com')} required /></label>
                  <div className="courses-form-field">
                    <span>{t('Where are you with Shopify?', '¿En qué punto estás con Shopify?')}</span>
                    <div className="courses-toggle">
                      {['from-zero', 'store-set-up', 'already-selling'].map((val) => (
                        <button
                          key={val}
                          type="button"
                          className={experience === val ? 'active' : ''}
                          onClick={() => setExperience(val)}
                        >
                          {val === 'from-zero' ? t('From zero', 'Desde cero') : val === 'store-set-up' ? t('Store set up', 'Tienda creada') : t('Already selling', 'Ya vendiendo')}
                        </button>
                      ))}
                    </div>
                  </div>
                  <label><span>{t('What do you want to walk away with?', '¿Con qué quieres salir de la clase?')}</span><textarea name="goals" placeholder={t('A storefront for my candle line. Mostly confused about apps and SEO.', 'Una tienda para mi línea de velas. Me confunden las apps y el SEO.')} /></label>
                  <button type="submit" className="courses-submit" disabled={sending}>
                    {sending ? t('Saving…', 'Guardando…') : t('Save my seat for October 24 →', 'Guardar mi cupo para el 24 de octubre →')}
                  </button>
                  <p className="courses-form-note">{t('Free to save a seat · Series pass: all 7 classes + replays for $129', 'Guardar cupo es gratis · Pase de la serie: las 7 clases + grabaciones por $129')}</p>
                </form>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="courses-faq">
        <div className="courses-faq-inner">
          <h2>{t(<>Questions, <span className="scribble">answered</span>.</>, <>Preguntas, <span className="scribble">respondidas</span>.</>)}</h2>
          <dl>
            {t([
              ['Is the Shopify course really free?', 'The first 30 minutes — the full lesson plus live Q&A — are free for everyone, every month. Staying for the guided build hour is $29, and the seven-class series pass with the replay library is $129.'],
              ['Do I need experience to learn Shopify in this class?', 'No — the class is built for beginners starting a business or their first online store. If you can use a web browser, you can follow along.'],
              ['What will I learn?', 'How to set up a Shopify store that converts: choosing a theme fast, the 3 apps you actually need, product pages and photos, shipping settings, and how to get your first sales with simple marketing.'],
              ['When is the next class?', 'Saturday, October 24 at 7pm EST, live on Zoom. A new class runs every month — the Zoom link arrives 24 hours before.'],
              ['English or Spanish?', 'The class runs in English, and we speak Spanish natively — preguntas en español are always welcome.'],
            ], [
              ['¿El curso de Shopify es gratis de verdad?', 'Los primeros 30 minutos, la lección completa más preguntas en vivo, son gratis para todos, cada mes. Quedarte a la hora de construcción guiada cuesta $29, y el pase de la serie de siete clases con la biblioteca de grabaciones cuesta $129.'],
              ['¿Necesito experiencia para aprender Shopify en esta clase?', 'No. La clase está hecha para principiantes que arrancan un negocio o su primera tienda en línea. Si sabes usar un navegador, puedes seguirla.'],
              ['¿Qué voy a aprender?', 'Cómo montar una tienda Shopify que convierte: elegir un tema rápido, las 3 apps que sí necesitas, páginas de producto y fotos, configuración de envíos y cómo lograr tus primeras ventas con marketing simple.'],
              ['¿Cuándo es la próxima clase?', 'Sábado 24 de octubre a las 7pm EST, en vivo por Zoom. Hay una clase nueva cada mes; el enlace de Zoom llega 24 horas antes.'],
              ['¿En inglés o en español?', 'La clase es en inglés y hablamos español nativo: las preguntas en español siempre son bienvenidas.'],
            ]).map(([q, a]) => <div key={q}><dt>{q}</dt><dd>{a}</dd></div>)}
          </dl>
        </div>
      </section>

      {/* Newsletter strip */}
      <section className="courses-newsletter">
        <div className="courses-newsletter-inner">
          <div>
            <h2>{t(<>Catch the recap in your <span className="scribble">inbox</span>.</>, <>Recibe el resumen en tu <span className="scribble">correo</span>.</>)}</h2>
            <p>{t('Class invites, dates, and the monthly Zenflo letter — Shopify plays and content ideas, once a month.', 'Invitaciones a clases, fechas y la carta mensual de Zenflo: jugadas de Shopify e ideas de contenido, una vez al mes.')}</p>
          </div>
          <a href={langHref('/newsletter')} className="courses-newsletter-btn">
            {t('Sign up to the newsletter', 'Suscríbete al boletín')}
            <svg className="arrow" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M1 13L13 1M13 1H3M13 1v10" /></svg>
          </a>
        </div>
      </section>
    </div>
  );
};

export default Courses;
