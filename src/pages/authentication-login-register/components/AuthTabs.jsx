import React from 'react';

const AuthTabs = ({ activeTab, onTabChange, currentLanguage }) => {
  const translations = {
    fr: {
      login: 'Connexion',
      register: 'Inscription'
    },
    ar: {
      login: 'تسجيل الدخول',
      register: 'التسجيل'
    }
  };

  const t = translations[currentLanguage];

  const tabs = [
    { id: 'login', label: t.login },
    { id: 'register', label: t.register }
  ];

  return (
    <div className="flex bg-surface rounded-lg p-1 mb-8">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onTabChange(tab.id)}
          className={`flex-1 py-3 px-4 text-sm font-semibold rounded-md transition-all duration-300 ${
            activeTab === tab.id
              ? 'bg-primary text-primary-foreground shadow-sm'
              : 'text-text-secondary hover:text-text-primary hover:bg-background'
          }`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
};

export default AuthTabs;