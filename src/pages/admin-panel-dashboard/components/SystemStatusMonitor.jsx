import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';

const SystemStatusMonitor = () => {
  const [currentLanguage, setCurrentLanguage] = useState('fr');

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') || 'fr';
    setCurrentLanguage(savedLanguage);
  }, []);

  const translations = {
    fr: {
      title: 'État du système',
      serverStatus: 'Serveur principal',
      database: 'Base de données',
      apiService: 'Service API',
      emailService: 'Service email',
      fileStorage: 'Stockage fichiers',
      backup: 'Sauvegarde',
      operational: 'Opérationnel',
      warning: 'Attention',
      error: 'Erreur',
      lastUpdate: 'Dernière mise à jour'
    },
    ar: {
      title: 'حالة النظام',
      serverStatus: 'الخادم الرئيسي',
      database: 'قاعدة البيانات',
      apiService: 'خدمة API',
      emailService: 'خدمة البريد الإلكتروني',
      fileStorage: 'تخزين الملفات',
      backup: 'النسخ الاحتياطي',
      operational: 'يعمل',
      warning: 'تحذير',
      error: 'خطأ',
      lastUpdate: 'آخر تحديث'
    }
  };

  const t = translations[currentLanguage];

  const systemServices = [
    {
      name: t.serverStatus,
      status: 'operational',
      uptime: '99.9%',
      responseTime: '45ms',
      icon: 'Server'
    },
    {
      name: t.database,
      status: 'operational',
      uptime: '99.8%',
      responseTime: '12ms',
      icon: 'Database'
    },
    {
      name: t.apiService,
      status: 'warning',
      uptime: '98.5%',
      responseTime: '120ms',
      icon: 'Zap'
    },
    {
      name: t.emailService,
      status: 'operational',
      uptime: '99.7%',
      responseTime: '200ms',
      icon: 'Mail'
    },
    {
      name: t.fileStorage,
      status: 'operational',
      uptime: '99.9%',
      responseTime: '80ms',
      icon: 'HardDrive'
    },
    {
      name: t.backup,
      status: 'error',
      uptime: '95.2%',
      responseTime: 'N/A',
      icon: 'Shield'
    }
  ];

  const getStatusColor = (status) => {
    const colors = {
      operational: 'text-success',
      warning: 'text-warning',
      error: 'text-error'
    };
    return colors[status] || colors.operational;
  };

  const getStatusBgColor = (status) => {
    const colors = {
      operational: 'bg-success-50 border-success-200',
      warning: 'bg-warning-50 border-warning-200',
      error: 'bg-error-50 border-error-200'
    };
    return colors[status] || colors.operational;
  };

  const getStatusLabel = (status) => {
    const labels = {
      operational: t.operational,
      warning: t.warning,
      error: t.error
    };
    return labels[status] || t.operational;
  };

  const getStatusIcon = (status) => {
    const icons = {
      operational: 'CheckCircle',
      warning: 'AlertTriangle',
      error: 'XCircle'
    };
    return icons[status] || icons.operational;
  };

  return (
    <div className="bg-background border border-border rounded-lg shadow-card">
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-heading font-semibold text-text-primary">
            {t.title}
          </h3>
          <div className="flex items-center space-x-2 text-xs text-text-muted">
            <Icon name="RefreshCw" size={12} />
            <span>{t.lastUpdate}: {new Date().toLocaleTimeString()}</span>
          </div>
        </div>
      </div>
      
      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {systemServices.map((service, index) => (
            <div key={index} className={`p-4 rounded-lg border ${getStatusBgColor(service.status)}`}>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-2">
                  <Icon name={service.icon} size={16} className="text-text-secondary" />
                  <span className="text-sm font-semibold text-text-primary">
                    {service.name}
                  </span>
                </div>
                <div className="flex items-center space-x-1">
                  <Icon 
                    name={getStatusIcon(service.status)} 
                    size={16} 
                    className={getStatusColor(service.status)} 
                  />
                  <span className={`text-xs font-semibold ${getStatusColor(service.status)}`}>
                    {getStatusLabel(service.status)}
                  </span>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="text-text-secondary">Uptime:</span>
                  <span className="font-semibold text-text-primary">{service.uptime}</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-text-secondary">Response:</span>
                  <span className="font-semibold text-text-primary">{service.responseTime}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SystemStatusMonitor;