import React from 'react';

type Lang = 'en' | 'es';

// Google Translate's page-translation widget is driven by the `googtrans`
// cookie; setting it and reloading translates the whole app in place.
const getLang = (): Lang => (document.cookie.includes('googtrans=/en/es') ? 'es' : 'en');

const clearCookie = (name: string) => {
  const past = 'Thu, 01 Jan 1970 00:00:00 GMT';
  document.cookie = `${name}=; path=/; expires=${past}`;
  document.cookie = `${name}=; path=/; domain=.${window.location.hostname}; expires=${past}`;
};

const setLang = (lang: Lang) => {
  if (lang === getLang()) return;
  clearCookie('googtrans');
  if (lang === 'es') {
    document.cookie = 'googtrans=/en/es; path=/';
    document.cookie = `googtrans=/en/es; path=/; domain=.${window.location.hostname}`;
  }
  window.location.reload();
};

const LanguageToggle: React.FC = () => {
  const lang = getLang();
  return (
    <div className="lang-toggle notranslate" aria-label="Language">
      <button className={lang === 'en' ? 'active' : ''} onClick={() => setLang('en')}>EN</button>
      <span className="lang-sep">/</span>
      <button className={lang === 'es' ? 'active' : ''} onClick={() => setLang('es')}>ES</button>
    </div>
  );
};

export default LanguageToggle;
