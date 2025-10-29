import React, { useEffect, useState } from 'react';
import Menu from '../Menu/Menu';
import { ReactComponent as Logo } from '../../Assets/Logo/logo_zenflo.svg';
import { useNavigate, useLocation } from 'react-router-dom';

interface Header {}

export const Header = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    // Check if current path is /contact
    const isContactPage = location.pathname === '/contact';

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Determine logo class - green if on contact page OR scrolled
    const getLogoClass = () => {
        if (isContactPage) return 'logo logo-green';
        if (isScrolled) return 'logo logo-scrolled';
        return 'logo';
    };

    return (
        <header className={`header ${isScrolled ? 'scrolled' : ''} ${isContactPage ? 'contact-page' : ''}`}>
            <div className="logo-container" onClick={() => navigate("/")}>
                <Logo className={getLogoClass()} />
            </div>
            <div className="menu">
                <Menu />
            </div>
        </header>
    );
};

export default Header;