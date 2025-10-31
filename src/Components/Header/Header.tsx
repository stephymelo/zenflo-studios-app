import { useEffect, useState } from 'react';
import { ReactComponent as Logo } from '../../Assets/Logo/logo_zenflo.svg';
import { useNavigate, useLocation } from 'react-router-dom';
import Menu from '../Menu/Menu';

export const Header = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
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
            <div className='header-container'>
                <div className="logo-container" onClick={() => navigate("/")}>
                    <Logo className={getLogoClass()} />
                </div>
                <div className="header-right">
                    <div className="lets-talk-container">
                        <a
                            href="/contact"
                            className="lets-talk-link"
                            onClick={(e) => {
                                e.preventDefault();
                                navigate("/contact");
                            }}
                        >
                            Let's Talk
                        </a>
                        <button
                            className="hamburger-menu"
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            aria-label="Toggle menu"
                        >
                            <span className={`hamburger-line ${isMenuOpen ? 'open' : ''}`}></span>
                            <span className={`hamburger-line ${isMenuOpen ? 'open' : ''}`}></span>
                            <span className={`hamburger-line ${isMenuOpen ? 'open' : ''}`}></span>
                        </button>
                    </div>
                </div>
            </div>
            <Menu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
        </header>
    );
};

export default Header;