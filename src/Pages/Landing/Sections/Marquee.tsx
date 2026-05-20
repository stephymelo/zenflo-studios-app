import React from 'react';

interface MarqueeProps {
  variant?: 'default' | 'alt' | 'butter';
  children: React.ReactNode;
}

const Marquee: React.FC<MarqueeProps> = ({ variant = 'default', children }) => {
  const cls = variant === 'default' ? 'marquee' : `marquee ${variant}`;
  return (
    <div className={cls}>
      <div className="marquee-track">
        {children}
        {children}
      </div>
    </div>
  );
};

export const MarqueeItem: React.FC<{ text: string }> = ({ text }) => (
  <span className="marquee-item">{text} <span className="star">✦</span></span>
);

export default Marquee;
