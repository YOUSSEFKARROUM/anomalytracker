import React, { useState, useRef, useEffect } from 'react';

import Icon from '../AppIcon';

const UserProfileDropdown = ({ user, onLogout, currentLanguage = 'fr' }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const translations = {
    fr: {
      profile: 'Profil',
      settings: 'Paramètres',
      help: 'Aide',
      logout: 'Déconnexion'
    },
    ar: {
      profile: 'الملف الشخصي',
      settings: 'الإعدادات',
      help: 'المساعدة',
      logout: 'تسجيل الخروج'
    }
  };

  const t = translations[currentLanguage];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    setIsOpen(false);
    onLogout();
  };

  const menuItems = [
    {
      label: t.profile,
      icon: 'User',
      action: () => {
        setIsOpen(false);
        // Navigate to profile page
      }
    },
    {
      label: t.settings,
      icon: 'Settings',
      action: () => {
        setIsOpen(false);
        // Navigate to settings page
      }
    },
    {
      label: t.help,
      icon: 'HelpCircle',
      action: () => {
        setIsOpen(false);
        // Navigate to help page
      }
    }
  ];

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 p-2 rounded-md hover:bg-surface transition-smooth focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
      >
        <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
          <span className="text-sm font-semibold text-primary-foreground">
            {user?.name?.charAt(0) || 'U'}
          </span>
        </div>
        <div className="hidden sm:block text-left">
          <p className="text-sm font-semibold text-text-primary">
            {user?.name || 'Utilisateur'}
          </p>
          <p className="text-xs text-text-secondary">
            {user?.role || 'Étudiant'}
          </p>
        </div>
        <Icon 
          name={isOpen ? 'ChevronUp' : 'ChevronDown'} 
          size={16} 
          className="text-text-secondary" 
        />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-56 bg-background border border-border rounded-lg shadow-dropdown z-dropdown">
          <div className="py-2">
            {/* User Info Header */}
            <div className="px-4 py-3 border-b border-border">
              <div className="flex items-center space-x-3">
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
            </div>

            {/* Menu Items */}
            <div className="py-2">
              {menuItems.map((item, index) => (
                <button
                  key={index}
                  onClick={item.action}
                  className="w-full flex items-center space-x-3 px-4 py-2 text-left text-sm text-text-secondary hover:text-text-primary hover:bg-surface transition-smooth"
                >
                  <Icon name={item.icon} size={16} />
                  <span>{item.label}</span>
                </button>
              ))}
            </div>

            {/* Logout */}
            <div className="border-t border-border pt-2">
              <button
                onClick={handleLogout}
                className="w-full flex items-center space-x-3 px-4 py-2 text-left text-sm text-error hover:bg-error-50 transition-smooth"
              >
                <Icon name="LogOut" size={16} />
                <span>{t.logout}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserProfileDropdown;