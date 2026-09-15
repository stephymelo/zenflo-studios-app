import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../../Assets/Logo/logo-zenflo-2026.svg';
import LanguageToggle, { isSpanish, langHref } from '../LanguageToggle/LanguageToggle';

// Section links point at the landing page in the current language plus the
// hash (/#about, /es/#about). A raw href keeps open-in-new-tab working; the
// click handler routes through the router so a click from another page such
// as /newsletter lands on the section instead of producing /newsletter#about.
// ScrollToTop scrolls to the hash once the landing page has rendered.
const sectionHref = (id: string) => `${isSpanish() ? '/es/' : '/'}#${id}`;

const Header: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const goToSection = (id: string) => (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    setMenuOpen(false);
    navigate({ pathname: '/', hash: `#${id}` });
  };

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
        <a href={sectionHref('about')} onClick={goToSection('about')}>About</a>
        <a href={sectionHref('services')} onClick={goToSection('services')}>Services</a>
        <a href={sectionHref('process')} onClick={goToSection('process')}>How we flow</a>
        <a href={langHref('/newsletter')} className="notranslate">{isSpanish() ? 'Boletín' : 'Newsletter'}</a>
        <a href={sectionHref('contact')} onClick={goToSection('contact')}>Contact</a>
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
        <a href={sectionHref('about')} onClick={goToSection('about')}>About</a>
        <a href={sectionHref('services')} onClick={goToSection('services')}>Services</a>
        <a href={sectionHref('process')} onClick={goToSection('process')}>How we flow</a>
        <a href={langHref('/newsletter')} className="notranslate" onClick={() => setMenuOpen(false)}>{isSpanish() ? 'Boletín' : 'Newsletter'}</a>
        <a href={sectionHref('contact')} onClick={goToSection('contact')}>Contact</a>
        <a href={langHref('/courses')} className="nav-mobile-cta" onClick={() => setMenuOpen(false)}>Online courses →</a>
        <LanguageToggle />
      </div>
    </nav>
  );
};

export default Header;
