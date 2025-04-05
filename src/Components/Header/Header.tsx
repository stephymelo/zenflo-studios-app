import React, { useEffect, useState } from 'react';
import  Menu  from '../Menu/Menu';
import { ReactComponent as Logo } from '../../Assets/Logo/logo_zenflo.svg';

interface Header {
}

export const Header = () => {
    const [isScrolled, setIsScrolled] = useState(false);
  
    useEffect(() => {
      const handleScroll = () => {
        setIsScrolled(window.scrollY > 10);
      };
  
      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
    }, []);
  return (
    <header className={`header ${isScrolled ? 'scrolled' : ''}`}>
      <div className="logo-container">
        <Logo className="logo" />
      </div>
      <Menu />
    </header>
  );
};

export default Header;