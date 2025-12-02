import React from 'react';

const Logo = () => {
  return (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M6 6.5C6 4.01472 8.01472 2 10.5 2C12.9853 2 15 4.01472 15 6.5V18.5" stroke="hsl(var(--primary))" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M12 11C12 8.51472 14.0147 6.5 16.5 6.5C18.9853 6.5 21 8.51472 21 11V18.5" stroke="hsl(var(--accent))" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M3 18.5H21" stroke="hsl(var(--foreground))" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
};

export default Logo;
