import React from 'react';
import logo from '../../Assets/Logo/logo-zenflo-2026.svg';
import { langHref, t, ntCls } from '../LanguageToggle/LanguageToggle';

const Footer: React.FC = () => {
  return (
    <footer className={ntCls('footer')}>
      <div className="footer-inner">
        <div className="footer-top">
          <div>
            <div className="footer-brand"><img src={logo} alt="Zenflo Studios" className="footer-logo" /></div>
            <p className="footer-tag">{t('A creative studio building brands worth screenshotting.', 'Un estudio creativo que construye marcas dignas de una captura de pantalla.')}</p>
          </div>
          <div className="footer-col">
            <h4>{t('Connect', 'Conecta')}</h4>
            <a href="https://instagram.com/zenflo.studios" target="_blank" rel="noopener noreferrer">Instagram</a>
            <a href="https://x.com/ZenfloStudios" target="_blank" rel="noopener noreferrer">X / Twitter</a>
            <a href="mailto:hello@zenflostudios.com">hello@zenflostudios.com</a>
            <a href={langHref('/newsletter')}>{t('Sign up to the newsletter', 'Suscríbete al boletín')}</a>
            <a href={langHref('/courses')}>{t('Online courses', 'Cursos en línea')}</a>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} Zenflo Studios</span>
          <span className="place">{t('Built in Florida · Roots in Colombia', 'Hecho en Florida · Raíces en Colombia')}</span>
          <span>v.2026.05</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
