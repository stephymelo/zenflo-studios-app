import React from 'react';

type MenuItem = {
  label: string;
  href?: string;
};

interface MenuProps {
  isOpen?: boolean;
  onClose?: () => void;
}

const Menu: React.FC<MenuProps> = ({ isOpen = false, onClose }) => {
  const menuItems: MenuItem[] = [
    { label: 'About', href: '/' },
    { label: 'Our Work', href: '/work' },
  ];

  const handleItemClick = () => {
    if (onClose) {
      onClose();
    }
  };

  return (
    <>
      {/* Drawer Menu */}
      <div className={`menu-drawer ${isOpen ? 'open' : ''}`}>
        <a href="/contact" className="lets-talk-button" onClick={handleItemClick}>
          Let's Talk
        </a>
        <ul className="menu-drawer-list">
          {menuItems.map((item) => (
            <li key={item.label} className="menu-drawer-item">
              <a href={item.href} onClick={handleItemClick}>
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </div>

      {/* Overlay */}
      {isOpen && (
        <div className="menu-drawer-overlay" onClick={onClose} />
      )}
    </>
  );
};

export default Menu;