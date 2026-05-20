import React from 'react';
import logo from '../../Assets/Logo/logo-zenflo-2026.svg';

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-top">
          <div>
            <div className="footer-brand"><img src={logo} alt="Zenflo Studios" className="footer-logo" /></div>
            <p className="footer-tag">A creative studio building brands worth screenshotting.</p>
          </div>
          <div className="footer-col">
            <h4>Connect</h4>
            <a href="https://instagram.com/zenflo.studios" target="_blank" rel="noopener noreferrer">Instagram</a>
            <a href="https://x.com/ZenfloStudios" target="_blank" rel="noopener noreferrer">X / Twitter</a>
            <a href="mailto:hello@zenflostudios.com">hello@zenflostudios.com</a>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} Zenflo Studios</span>
          <span className="place">Built in Florida · Roots in Colombia</span>
          <span>v.2026.05</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
