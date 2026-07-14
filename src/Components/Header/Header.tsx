import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../../Assets/Logo/logo-zenflo-2026.svg';
import LanguageToggle, { isSpanish, langHref } from '../LanguageToggle/LanguageToggle';

const Header: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  return (
    <nav className={`nav${scrolled ? ' scrolled' : ''}`}>
      <div className="nav-brand" onClick={() => navigate('/')}>
        <img src={logo} alt="Zenflo Studios" className="nav-logo" />
      </div>
      <div className="nav-links">
        <a href="#about">About</a>
        <a href="#services">Services</a>
        <a href="#process">How we flow</a>
        <a href={langHref('/newsletter')} className="notranslate">{isSpanish() ? 'Boletín' : 'Newsletter'}</a>
        <a href="#contact">Contact</a>
        <LanguageToggle />
      </div>
      <a href={langHref('/courses')} className="nav-cta courses">
        Online courses
        <svg className="arrow" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M1 13L13 1M13 1H3M13 1v10" /></svg>
      </a>
      <button className={`nav-hamburger${menuOpen ? ' open' : ''}`} onClick={() => setMenuOpen(!menuOpen)} aria-label="Menu">
        <span /><span /><span />
      </button>
      <div className={`nav-mobile${menuOpen ? ' open' : ''}`}>
        <a href="#about" onClick={() => setMenuOpen(false)}>About</a>
        <a href="#services" onClick={() => setMenuOpen(false)}>Services</a>
        <a href="#process" onClick={() => setMenuOpen(false)}>How we flow</a>
        <a href={langHref('/newsletter')} className="notranslate" onClick={() => setMenuOpen(false)}>{isSpanish() ? 'Boletín' : 'Newsletter'}</a>
        <a href="#contact" onClick={() => setMenuOpen(false)}>Contact</a>
        <a href={langHref('/courses')} className="nav-mobile-cta" onClick={() => setMenuOpen(false)}>Online courses →</a>
        <LanguageToggle />
      </div>
    </nav>
  );
};

export default Header;
