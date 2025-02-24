import React, { useState, useEffect } from 'react';
import { NavButton } from './NavButton';
import BrandLogo from '../assets/logo.png';

export const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`fixed top-0 left-0 w-full z-50 flex gap-10 justify-between items-center px-20 py-6 text-black max-md:px-5 shadow-xl transition-all duration-300 ${
      isScrolled 
        ? 'bg-gray-200/80 backdrop-blur-md' 
        : 'bg-gray-200'
    }`}>
      <div className="flex items-center gap-3">
        <img 
          src={BrandLogo} 
          alt="logo" 
          className="w-12 h-12 object-contain flex-shrink-0 max-md:w-10 max-md:h-10"
        />
        <h1 className="text-3xl font-bold whitespace-nowrap my-auto max-md:text-xl">
          Learn&Grow
        </h1>
      </div>
      
      <nav className="flex gap-1 self-stretch my-auto max-md:gap-1">
        <NavButton label="Login" variant="outlined" />
        <NavButton label="Sign Up" variant="outlined" />
      </nav>
    </header>
  );
};