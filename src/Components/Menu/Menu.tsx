import React, { useState } from 'react';
import Button from '../Button/Button';

type MenuItem = {
  label: string;
  href?: string;
  subItems?: string[];
};

const Menu: React.FC = () => {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const menuItems: MenuItem[] = [
    { label: 'Our Work', href: '/work' },
    { label: 'Contact', href: '/contact' }
  ];

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <nav className="menu-container">
      {/* Mobile Burger Icon - Now on the left */}
      <div 
        className={`burger-menu ${mobileMenuOpen ? 'active' : ''}`}
        onClick={toggleMobileMenu}
      >
        <svg viewBox="0 0 100 80" width="25" height="25">
          <rect className='line top' width="100" height="10" rx="5"></rect>
          <rect className='line middle' y="30" width="100" height="10" rx="5"></rect>
          <rect className='line bottom' y="60" width="100" height="10" rx="5"></rect>
        </svg>
      </div>

      {/* Desktop Menu */}
      <div className="menu-web">
        <ul className="menu-list">
          {menuItems.map((item) => (
            <li
              key={item.label}
              className="menu-item"
              onMouseEnter={() => item.subItems && setActiveDropdown(item.label)}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              {item.href ? (
                <a href={item.href}>{item.label}</a>
              ) : (
                <span>{item.label}</span>
              )}
              {item.subItems && activeDropdown === item.label && (
                <ul className="dropdown">
                  {item.subItems.map((subItem) => (
                    <li key={subItem}>
                      <a href={`#${subItem.toLowerCase().replace(' ', '-')}`}>
                        {subItem}
                      </a>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </div>

      {/* Mobile Menu - Now sliding from left */}
      <div className={`menu-mobile ${mobileMenuOpen ? 'active' : ''}`}>
        <ul className="mobile-menu-list">
          {menuItems.map((item) => (
            <li key={item.label} className="mobile-menu-item">
              <a href={item.href} onClick={() => setMobileMenuOpen(false)}>
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default Menu;