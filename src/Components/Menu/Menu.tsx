import React, { useState } from 'react';
import Button from '../Button/Button';

type MenuItem = {
  label: string;
  href?: string;
  subItems?: string[];
};

const Menu: React.FC = () => {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  const menuItems: MenuItem[] = [
    // { 
    //   label: 'Services',
    //   subItems: ['Branding', 'Website', 'Social Media']
    // },
    { label: 'Our Work', href: '/work' },
    { label: 'Contact', href: '/contact' }
  ];

  const handleBookClick = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav className="menu">
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
        <li className="menu-item">

       
        {/* <Button 
  variant="solid" 
  size='md'
  color='primary'
  onClick={() => console.log('Clicked')}
>
  Book us
</Button> */}
        </li>
      </ul>
    </nav>
  );
};

export default Menu;