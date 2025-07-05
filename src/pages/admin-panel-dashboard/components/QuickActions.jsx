import React, { useState, useEffect } from 'react';
import Button from '../../../components/ui/Button';

const QuickActions = () => {
  const [currentLanguage, setCurrentLanguage] = useState('fr');

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') || 'fr';
    setCurrentLanguage(savedLanguage);
  }, []);

  const translations = {
    fr: {
      title: 'Actions rapides',
      assignAnomaly: 'Assigner une anomalie',
      createUser: 'Créer un utilisateur',
      publishAnnouncement: 'Publier une annonce',
      generateReport: 'Générer un rapport',
      systemMaintenance: 'Maintenance système',
      backupData: 'Sauvegarder les données',
      sendNotification: 'Envoyer une notification',
      exportData: 'Exporter les données'
    },
    ar: {
      title: 'الإجراءات السريعة',
      assignAnomaly: 'تعيين شذوذ',
      createUser: 'إنشاء مستخدم',
      publishAnnouncement: 'نشر إعلان',
      generateReport: 'إنشاء تقرير',
      systemMaintenance: 'صيانة النظام',
      backupData: 'نسخ احتياطي للبيانات',
      sendNotification: 'إرسال إشعار',
      exportData: 'تصدير البيانات'
    }
  };

  const t = translations[currentLanguage];

  const quickActions = [
    {
      label: t.assignAnomaly,
      icon: 'UserPlus',
      variant: 'primary',
      action: () => console.log('Assign anomaly')
    },
    {
      label: t.createUser,
      icon: 'UserPlus',
      variant: 'success',
      action: () => console.log('Create user')
    },
    {
      label: t.publishAnnouncement,
      icon: 'Megaphone',
      variant: 'info',
      action: () => console.log('Publish announcement')
    },
    {
      label: t.generateReport,
      icon: 'FileText',
      variant: 'outline',
      action: () => console.log('Generate report')
    },
    {
      label: t.systemMaintenance,
      icon: 'Settings',
      variant: 'warning',
      action: () => console.log('System maintenance')
    },
    {
      label: t.backupData,
      icon: 'Shield',
      variant: 'secondary',
      action: () => console.log('Backup data')
    },
    {
      label: t.sendNotification,
      icon: 'Bell',
      variant: 'outline',
      action: () => console.log('Send notification')
    },
    {
      label: t.exportData,
      icon: 'Download',
      variant: 'ghost',
      action: () => console.log('Export data')
    }
  ];

  return (
    <div className="bg-background border border-border rounded-lg shadow-card">
      <div className="p-6 border-b border-border">
        <h3 className="text-lg font-heading font-semibold text-text-primary">
          {t.title}
        </h3>
      </div>
      
      <div className="p-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {quickActions.map((action, index) => (
            <Button
              key={index}
              variant={action.variant}
              iconName={action.icon}
              iconPosition="left"
              onClick={action.action}
              fullWidth
              className="justify-start"
            >
              {action.label}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default QuickActions;