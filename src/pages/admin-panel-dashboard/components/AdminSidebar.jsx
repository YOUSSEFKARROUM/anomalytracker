import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '../../../components/AppIcon';

const AdminSidebar = () => {
  const [currentLanguage, setCurrentLanguage] = useState('fr');
  const location = useLocation();

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') || 'fr';
    setCurrentLanguage(savedLanguage);
  }, []);

  const translations = {
    fr: {
      dashboard: 'Tableau de bord',
      userManagement: 'Gestion des utilisateurs',
      anomalyOversight: 'Supervision des anomalies',
      contentManagement: 'Gestion du contenu',
      systemConfig: 'Configuration système',
      reports: 'Rapports',
      notifications: 'Notifications',
      settings: 'Paramètres'
    },
    ar: {
      dashboard: 'لوحة التحكم',
      userManagement: 'إدارة المستخدمين',
      anomalyOversight: 'الإشراف على الشذوذ',
      contentManagement: 'إدارة المحتوى',
      systemConfig: 'تكوين النظام',
      reports: 'التقارير',
      notifications: 'الإشعارات',
      settings: 'الإعدادات'
    }
  };

  const t = translations[currentLanguage];

  const navigationItems = [
    {
      label: t.dashboard,
      icon: 'LayoutDashboard',
      path: '/admin-panel-dashboard',
      active: true
    },
    {
      label: t.userManagement,
      icon: 'Users',
      path: '/admin/user-management',
      active: false
    },
    {
      label: t.anomalyOversight,
      icon: 'AlertTriangle',
      path: '/admin/anomaly-supervision',
      active: false
    },
    {
      label: t.contentManagement,
      icon: 'FileText',
      path: '/admin/content-management',
      active: false
    },
    {
      label: t.systemConfig,
      icon: 'Settings',
      path: '/admin/system-configuration',
      active: false
    },
    {
      label: t.reports,
      icon: 'BarChart3',
      path: '/admin/reports',
      active: false
    },
    {
      label: t.notifications,
      icon: 'Bell',
      path: '/admin/notifications',
      active: false
    },
    {
      label: t.settings,
      icon: 'Cog',
      path: '/admin/settings',
      active: false
    }
  ];

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <div className="w-64 bg-background border-r border-border h-full overflow-y-auto">
      <div className="p-6">
        <h2 className="text-lg font-heading font-semibold text-text-primary mb-6">
          Administration
        </h2>
        
        <nav className="space-y-2">
          {navigationItems.map((item, index) => (
            <Link
              key={index}
              to={item.path}
              className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-smooth ${
                isActive(item.path)
                  ? 'bg-primary-50 text-primary border border-primary-200' :'text-text-secondary hover:text-text-primary hover:bg-surface'
              }`}
            >
              <Icon name={item.icon} size={20} />
              <span className="text-sm font-body">{item.label}</span>
            </Link>
          ))}
        </nav>
      </div>
    </div>
  );
};

export default AdminSidebar;