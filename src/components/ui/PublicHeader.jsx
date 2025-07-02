import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Button from './Button';
import Icon from '../AppIcon';

const PublicHeader = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState('fr');
  const location = useLocation();

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') || 'fr';
    setCurrentLanguage(savedLanguage);
  }, []);

  const toggleLanguage = () => {
    const newLanguage = currentLanguage === 'fr' ? 'ar' : 'fr';
    setCurrentLanguage(newLanguage);
    localStorage.setItem('language', newLanguage);
  };

  const translations = {
    fr: {
      home: 'Accueil',
      about: 'À propos',
      contact: 'Contact',
      login: 'Connexion',
      register: 'S\'inscrire',
      reportIssue: 'Signaler un problème',
      language: 'العربية'
    },
    ar: {
      home: 'الرئيسية',
      about: 'حول',
      contact: 'اتصال',
      login: 'تسجيل الدخول',
      register: 'التسجيل',
      reportIssue: 'الإبلاغ عن مشكلة',
      language: 'Français'
    }
  };

  const t = translations[currentLanguage];

  const isActive = (path) => location.pathname === path;

  return (
    <header className="fixed top-0 left-0 right-0 z-header bg-background border-b border-border shadow-card">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/landing-page" className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="text-primary-foreground"
              >
                <path
                  d="M12 2L2 7L12 12L22 7L12 2Z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M2 17L12 22L22 17"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M2 12L12 17L22 12"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-heading font-semibold text-text-primary">
                AnomalyTracker
              </span>
              <span className="text-xs font-caption text-text-secondary">
                ENSA Béni Mellal
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link
              to="/landing-page"
              className={`text-sm font-body transition-smooth hover:text-primary ${
                isActive('/landing-page')
                  ? 'text-primary border-b-2 border-primary pb-1' :'text-text-secondary'
              }`}
            >
              {t.home}
            </Link>
            <a
              href="#about"
              className="text-sm font-body text-text-secondary hover:text-primary transition-smooth"
            >
              {t.about}
            </a>
            <a
              href="#contact"
              className="text-sm font-body text-text-secondary hover:text-primary transition-smooth"
            >
              {t.contact}
            </a>
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <button
              onClick={toggleLanguage}
              className="text-sm font-body text-text-secondary hover:text-primary transition-smooth"
            >
              {t.language}
            </button>
            <Link to="/authentication-login-register">
              <Button variant="ghost" size="sm">
                {t.login}
              </Button>
            </Link>
            <Link to="/authentication-login-register">
              <Button variant="primary" size="sm">
                {t.register}
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-md text-text-secondary hover:text-primary hover:bg-surface transition-smooth"
          >
            <Icon name={isMenuOpen ? 'X' : 'Menu'} size={24} />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden fixed inset-0 top-16 z-overlay bg-background border-t border-border">
          <div className="px-4 py-6 space-y-6">
            <nav className="space-y-4">
              <Link
                to="/landing-page"
                onClick={() => setIsMenuOpen(false)}
                className={`block text-base font-body transition-smooth ${
                  isActive('/landing-page')
                    ? 'text-primary font-semibold' :'text-text-secondary hover:text-primary'
                }`}
              >
                {t.home}
              </Link>
              <a
                href="#about"
                onClick={() => setIsMenuOpen(false)}
                className="block text-base font-body text-text-secondary hover:text-primary transition-smooth"
              >
                {t.about}
              </a>
              <a
                href="#contact"
                onClick={() => setIsMenuOpen(false)}
                className="block text-base font-body text-text-secondary hover:text-primary transition-smooth"
              >
                {t.contact}
              </a>
            </nav>

            <div className="border-t border-border pt-6 space-y-4">
              <button
                onClick={toggleLanguage}
                className="block w-full text-left text-base font-body text-text-secondary hover:text-primary transition-smooth"
              >
                {t.language}
              </button>
              <Link
                to="/authentication-login-register"
                onClick={() => setIsMenuOpen(false)}
                className="block"
              >
                <Button variant="ghost" fullWidth>
                  {t.login}
                </Button>
              </Link>
              <Link
                to="/authentication-login-register"
                onClick={() => setIsMenuOpen(false)}
                className="block"
              >
                <Button variant="primary" fullWidth>
                  {t.register}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default PublicHeader;