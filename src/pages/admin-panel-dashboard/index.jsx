import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthenticatedHeader from '../../components/ui/AuthenticatedHeader';
// import AdminSidebar from './components/AdminSidebar';
import MetricsCard from './components/MetricsCard';
import PendingActionsQueue from './components/PendingActionsQueue';
import SystemStatusMonitor from './components/SystemStatusMonitor';
import RecentAnomaliesTable from './components/RecentAnomaliesTable';
import QuickActions from './components/QuickActions';
import UserActivityLog from './components/UserActivityLog';

const AdminPanelDashboard = () => {
  const [currentLanguage, setCurrentLanguage] = useState('fr');
  const navigate = useNavigate();

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') || 'fr';
    setCurrentLanguage(savedLanguage);
  }, []);

  const translations = {
    fr: {
      title: 'Tableau de bord administrateur',
      subtitle: 'Vue d\'ensemble du système et gestion des anomalies',
      totalUsers: 'Utilisateurs actifs',
      pendingAnomalies: 'Anomalies en attente',
      avgResolutionTime: 'Temps de résolution moyen',
      systemHealth: 'Santé du système'
    },
    ar: {
      title: 'لوحة تحكم المدير',
      subtitle: 'نظرة عامة على النظام وإدارة الشذوذات',
      totalUsers: 'المستخدمون النشطون',
      pendingAnomalies: 'الشذوذات المعلقة',
      avgResolutionTime: 'متوسط وقت الحل',
      systemHealth: 'صحة النظام'
    }
  };

  const t = translations[currentLanguage];

  // Mock user data for authenticated header
  const mockUser = {
    name: 'Admin Système',
    email: 'admin@ensa-bm.ac.ma',
    role: 'admin',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face'
  };

  // Mock notifications
  const mockNotifications = [
    {
      id: 1,
      title: 'Nouvelle anomalie signalée',
      message: 'Problème de chauffage - Amphithéâtre A',
      read: false,
      timestamp: new Date(Date.now() - 900000)
    },
    {
      id: 2,
      title: 'Anomalie résolue',
      message: 'Éclairage défaillant - Laboratoire 3',
      read: false,
      timestamp: new Date(Date.now() - 1800000)
    }
  ];

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('authToken');
    navigate('/authentication-login-register');
  };

  // Key metrics data
  const metricsData = [
    {
      title: t.totalUsers,
      value: '1,247',
      change: '+12%',
      changeType: 'increase',
      icon: 'Users',
      color: 'primary'
    },
    {
      title: t.pendingAnomalies,
      value: '23',
      change: '-8%',
      changeType: 'decrease',
      icon: 'AlertTriangle',
      color: 'warning'
    },
    {
      title: t.avgResolutionTime,
      value: '2.4h',
      change: '-15%',
      changeType: 'decrease',
      icon: 'Clock',
      color: 'success'
    },
    {
      title: t.systemHealth,
      value: '98.5%',
      change: '+0.2%',
      changeType: 'increase',
      icon: 'Activity',
      color: 'success'
    }
  ];

  return (
    <div className="pt-16 p-8 space-y-8">
      <AuthenticatedHeader
        user={mockUser}
        notifications={mockNotifications}
        onLogout={handleLogout}
      />
      <div className="mb-8">
        <h1 className="text-3xl font-heading font-bold text-text-primary mb-2">
          {t.title}
        </h1>
        <p className="text-text-secondary">
          {t.subtitle}
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
        {metricsData.map((metric, index) => (
          <MetricsCard
            key={index}
            title={metric.title}
            value={metric.value}
            change={metric.change}
            changeType={metric.changeType}
            icon={metric.icon}
            color={metric.color}
          />
        ))}
      </div>
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        <div className="xl:col-span-2 space-y-8">
          <div className="bg-white rounded-xl shadow p-8">
            <PendingActionsQueue />
          </div>
          <div className="bg-white rounded-xl shadow p-8">
            <RecentAnomaliesTable />
          </div>
        </div>
        <div className="space-y-8">
          <div className="bg-white rounded-xl shadow p-8">
            <SystemStatusMonitor />
          </div>
          <div className="bg-white rounded-xl shadow p-8">
            <UserActivityLog />
          </div>
        </div>
      </div>
      <div className="bg-white rounded-xl shadow p-8">
        <QuickActions />
      </div>
    </div>
  );
};

export default AdminPanelDashboard;