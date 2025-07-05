import React from 'react';
import { NavLink } from 'react-router-dom';
import Icon from '../AppIcon';

const navItems = [
  {
    label: 'Tableau de bord',
    icon: 'LayoutDashboard',
    path: '/admin-panel-dashboard',
  },
  {
    label: 'Gestion des utilisateurs',
    icon: 'Users',
    path: '/admin/user-management',
  },
  {
    label: 'Supervision des anomalies',
    icon: 'AlertTriangle',
    path: '/admin/anomaly-supervision',
  },
  {
    label: 'Gestion du contenu',
    icon: 'FileText',
    path: '/admin/content-management',
  },
  {
    label: 'Configuration système',
    icon: 'Settings',
    path: '/admin/system-configuration',
  },
  {
    label: 'Rapports',
    icon: 'BarChart3',
    path: '/admin/reports',
  },
  {
    label: 'Notifications',
    icon: 'Bell',
    path: '/admin/notifications',
  },
  {
    label: 'Paramètres',
    icon: 'Cog',
    path: '/admin/settings',
  },
];

const Sidebar = () => {
  return (
    <aside className="w-72 h-screen fixed top-0 left-0 bg-gray-50 border-r border-border p-6 flex flex-col z-sidebar">
      {/* Logo & School Name */}
      <div className="flex items-center gap-3 mb-8">
        <img src="/public/assets/images/no_image.png" alt="Logo" className="w-10 h-10 rounded bg-white object-contain border" />
        <div>
          <span className="block font-bold text-lg text-primary">AnomalyTracker</span>
          <span className="block text-xs text-gray-500">ENSA Béni Mellal</span>
        </div>
      </div>
      {/* Section Title */}
      <h2 className="text-base font-semibold text-text-primary mb-6">Administration</h2>
      {/* Navigation */}
      <nav className="flex-1">
        <ul className="space-y-1">
          {navItems.map((item) => (
            <li key={item.path}>
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-3 rounded-lg transition-all font-medium text-sm
                  ${isActive ? 'bg-primary text-white font-bold shadow-sm' : 'text-text-secondary hover:bg-primary/10 hover:text-primary'}`
                }
                end
              >
                <Icon name={item.icon} size={20} />
                <span>{item.label}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar; 