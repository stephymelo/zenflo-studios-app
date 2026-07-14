import React from 'react';

type Lang = 'en' | 'es';
const LANGS: Lang[] = ['en', 'es'];

// Language is carried in the URL as a path prefix (/es). English is the
// default and has no prefix. Google Translate performs the actual translation,
// driven by the googtrans cookie which index.html syncs from the URL on load.
export const currentLang = (): Lang => {
  const seg = window.location.pathname.split('/')[1] as Lang;
  return LANGS.includes(seg) ? seg : 'en';
};

export const isSpanish = () => currentLang() === 'es';

// Prefix an internal href with the active language (raw <a> tags bypass the
// router basename, so they need this).
export const langHref = (path: string) =>
  isSpanish() ? `/es${path === '/' ? '' : path}` : path;

const setLang = (lang: Lang) => {
  if (lang === currentLang()) return;
  const parts = window.location.pathname.split('/');
  if (LANGS.includes(parts[1] as Lang)) parts.splice(1, 1);
  const rest = parts.join('/') || '/';
  const target = lang === 'en' ? rest : `/es${rest === '/' ? '' : rest}`;
  document.cookie = `googtrans=/en/${lang}; path=/`;
  document.cookie = `googtrans=/en/${lang}; path=/; domain=.${window.location.hostname}`;
  window.location.assign(target + window.location.search + window.location.hash);
};

const LanguageToggle: React.FC = () => {
  const lang = currentLang();
  return (
    <div className="lang-toggle notranslate" aria-label="Language">
      <button className={lang === 'en' ? 'active' : ''} onClick={() => setLang('en')}>EN</button>
      <span className="lang-sep">/</span>
      <button className={lang === 'es' ? 'active' : ''} onClick={() => setLang('es')}>ES</button>
    </div>
  );
};

export default LanguageToggle;
