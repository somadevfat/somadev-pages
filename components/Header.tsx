"use client";

import Link from 'next/link';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const contactUrl = "/contact"; // Placeholder

  const navLinks = [
    { href: "/blog", text: "Blog" },
    { href: "https://www.linkedin.com/in/somahirano/", text: "LinkedIn", target: "_blank" },
    { href: "/projects", text: "Projects" },
    { href: contactUrl, text: "Contact" },
  ];

  return (
    <header className="w-full border-b border-gray-200">
      <div className="max-w-4xl w-full mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="text-header-title font-semibold text-textDark hover:text-chicBlue whitespace-nowrap">
          fanda-dev.com
        </Link>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:block">
          <ul className="flex space-x-4 sm:space-x-5 items-center">
            {navLinks.map((link) => (
              <li key={link.text}>
                <Link
                  href={link.href}
                  className="text-header-nav font-semibold text-textDark hover:text-chicBlue whitespace-nowrap"
                  target={link.target}
                  rel={link.target === "_blank" ? "noopener noreferrer" : undefined}
                >
                  {link.text}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Mobile Navigation Toggle */}
        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)} aria-expanded={isOpen} aria-label={isOpen ? "Close menu" : "Open menu"}>
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer & Overlay */}
      {isOpen && (
        <>
          {/* Overlay */}
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
            onClick={() => setIsOpen(false)}
            aria-hidden="true"
          />

          {/* Drawer */}
          <div
            className="fixed top-0 right-0 h-full bg-white w-64 p-5 z-50 transform transition-transform duration-300 ease-in-out md:hidden"
            role="dialog"
            aria-modal="true"
          >
            <div className="flex justify-end mb-4">
              <button onClick={() => setIsOpen(false)} aria-label="Close menu">
                <X className="h-6 w-6" />
              </button>
            </div>
            <nav>
              <ul className="space-y-4">
                {navLinks.map((link) => (
                  <li key={link.text}>
                    <Link
                      href={link.href}
                      className="text-header-nav font-semibold text-textDark hover:text-chicBlue block"
                      onClick={() => setIsOpen(false)}
                      target={link.target}
                      rel={link.target === "_blank" ? "noopener noreferrer" : undefined}
                    >
                      {link.text}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </>
      )}
    </header>
  );
};

export default Header; 