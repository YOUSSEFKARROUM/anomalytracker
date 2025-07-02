import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Button from './Button';
import Icon from '../AppIcon';
import UserProfileDropdown from './UserProfileDropdown';
import NotificationBadge from './NotificationBadge';

const AuthenticatedHeader = ({ user, notifications = [], onLogout }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState('fr');
  const location = useLocation();
  const navigate = useNavigate();

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
      dashboard: 'Tableau de bord',
      reportIssue: 'Signaler',
      trackIssues: 'Suivi',
      news: 'Actualités',
      admin: 'Administration',
      language: 'العربية',
      notifications: 'Notifications'
    },
    ar: {
      dashboard: 'لوحة التحكم',
      reportIssue: 'الإبلاغ',
      trackIssues: 'التتبع',
      news: 'الأخبار',
      admin: 'الإدارة',
      language: 'Français',
      notifications: 'الإشعارات'
    }
  };

  const t = translations[currentLanguage];

  const isActive = (path) => location.pathname === path;

  const navigationItems = [
    {
      label: t.dashboard,
      path: '/anomaly-tracking-dashboard',
      icon: 'LayoutDashboard',
      visible: true
    },
    {
      label: t.reportIssue,
      path: '/anomaly-reporting-form',
      icon: 'AlertTriangle',
      visible: true
    },
    {
      label: t.trackIssues,
      path: '/anomaly-tracking-dashboard',
      icon: 'Search',
      visible: true
    },
    {
      label: t.news,
      path: '/news-and-updates',
      icon: 'Newspaper',
      visible: true
    },
    {
      label: t.admin,
      path: '/admin-panel-dashboard',
      icon: 'Settings',
      visible: user?.role === 'admin'
    }
  ];

  const handleNavigation = (path) => {
    navigate(path);
    setIsMenuOpen(false);
  };

  const unreadNotifications = notifications.filter(n => !n.read).length;

  return (
    <header className="fixed top-0 left-0 right-0 z-header bg-background border-b border-border shadow-card">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/anomaly-tracking-dashboard" className="flex items-center space-x-3">
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
          <nav className="hidden lg:flex items-center space-x-6">
            {navigationItems
              .filter(item => item.visible)
              .map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-body transition-smooth ${
                    isActive(item.path)
                      ? 'text-primary bg-primary-50 border border-primary-200' :'text-text-secondary hover:text-primary hover:bg-surface'
                  }`}
                >
                  <Icon name={item.icon} size={16} />
                  <span>{item.label}</span>
                </Link>
              ))}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center space-x-4">
            <button
              onClick={toggleLanguage}
              className="text-sm font-body text-text-secondary hover:text-primary transition-smooth"
            >
              {t.language}
            </button>
            
            <div className="relative">
              <NotificationBadge count={unreadNotifications} />
              <button className="p-2 rounded-md text-text-secondary hover:text-primary hover:bg-surface transition-smooth">
                <Icon name="Bell" size={20} />
              </button>
            </div>

            <UserProfileDropdown
              user={user}
              onLogout={onLogout}
              currentLanguage={currentLanguage}
            />
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center space-x-2">
            <div className="relative">
              <NotificationBadge count={unreadNotifications} />
              <button className="p-2 rounded-md text-text-secondary hover:text-primary hover:bg-surface transition-smooth">
                <Icon name="Bell" size={20} />
              </button>
            </div>
            
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-md text-text-secondary hover:text-primary hover:bg-surface transition-smooth"
            >
              <Icon name={isMenuOpen ? 'X' : 'Menu'} size={24} />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="lg:hidden fixed inset-0 top-16 z-overlay bg-background border-t border-border">
          <div className="px-4 py-6 space-y-6 h-full overflow-y-auto">
            {/* User Profile Section */}
            <div className="flex items-center space-x-3 pb-4 border-b border-border">
              <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                <span className="text-sm font-semibold text-primary-foreground">
                  {user?.name?.charAt(0) || 'U'}
                </span>
              </div>
              <div>
                <p className="text-sm font-semibold text-text-primary">
                  {user?.name || 'Utilisateur'}
                </p>
                <p className="text-xs text-text-secondary">
                  {user?.email || 'user@example.com'}
                </p>
              </div>
            </div>

            {/* Navigation Items */}
            <nav className="space-y-2">
              {navigationItems
                .filter(item => item.visible)
                .map((item) => (
                  <button
                    key={item.path}
                    onClick={() => handleNavigation(item.path)}
                    className={`w-full flex items-center space-x-3 px-3 py-3 rounded-md text-left transition-smooth ${
                      isActive(item.path)
                        ? 'text-primary bg-primary-50 border border-primary-200' :'text-text-secondary hover:text-primary hover:bg-surface'
                    }`}
                  >
                    <Icon name={item.icon} size={20} />
                    <span className="text-base font-body">{item.label}</span>
                  </button>
                ))}
            </nav>

            {/* Mobile Actions */}
            <div className="border-t border-border pt-6 space-y-4">
              <button
                onClick={toggleLanguage}
                className="w-full flex items-center space-x-3 px-3 py-3 text-left text-text-secondary hover:text-primary transition-smooth"
              >
                <Icon name="Globe" size={20} />
                <span className="text-base font-body">{t.language}</span>
              </button>
              
              <button
                onClick={() => {
                  onLogout();
                  setIsMenuOpen(false);
                }}
                className="w-full flex items-center space-x-3 px-3 py-3 text-left text-error hover:bg-error-50 rounded-md transition-smooth"
              >
                <Icon name="LogOut" size={20} />
                <span className="text-base font-body">
                  {currentLanguage === 'fr' ? 'Déconnexion' : 'تسجيل الخروج'}
                </span>
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default AuthenticatedHeader;