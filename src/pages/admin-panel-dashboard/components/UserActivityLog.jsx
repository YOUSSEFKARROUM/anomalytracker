import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const UserActivityLog = () => {
  const [currentLanguage, setCurrentLanguage] = useState('fr');

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') || 'fr';
    setCurrentLanguage(savedLanguage);
  }, []);

  const translations = {
    fr: {
      title: 'Journal d\'activité des utilisateurs',
      viewAll: 'Voir tout',
      user: 'Utilisateur',
      action: 'Action',
      time: 'Heure',
      details: 'Détails'
    },
    ar: {
      title: 'سجل نشاط المستخدمين',
      viewAll: 'عرض الكل',
      user: 'المستخدم',
      action: 'الإجراء',
      time: 'الوقت',
      details: 'التفاصيل'
    }
  };

  const t = translations[currentLanguage];

  const activityLog = [
    {
      id: 1,
      user: 'Ahmed Benali',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face',
      action: 'Anomalie signalée',
      details: 'Problème de chauffage - Amphithéâtre A',
      time: 'Il y a 15 minutes',
      type: 'report',
      icon: 'AlertTriangle'
    },
    {
      id: 2,
      user: 'Fatima Zahra',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=40&h=40&fit=crop&crop=face',
      action: 'Connexion',
      details: 'Connexion depuis l\'application mobile',
      time: 'Il y a 32 minutes',
      type: 'login',
      icon: 'LogIn'
    },
    {
      id: 3,
      user: 'Mohamed Alami',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face',
      action: 'Anomalie résolue',
      details: 'Éclairage défaillant - Laboratoire 3',
      time: 'Il y a 1 heure',
      type: 'resolve',
      icon: 'CheckCircle'
    },
    {
      id: 4,
      user: 'Aicha Bennani',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face',
      action: 'Profil mis à jour',
      details: 'Informations de contact modifiées',
      time: 'Il y a 2 heures',
      type: 'update',
      icon: 'Edit'
    },
    {
      id: 5,
      user: 'Youssef Tazi',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=40&h=40&fit=crop&crop=face',
      action: 'Commentaire ajouté',
      details: 'Commentaire sur ANO-003',
      time: 'Il y a 3 heures',
      type: 'comment',
      icon: 'MessageCircle'
    },
    {
      id: 6,
      user: 'Khadija Amrani',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=40&h=40&fit=crop&crop=face',
      action: 'Fichier téléchargé',
      details: 'Photo de l\'anomalie ANO-004',
      time: 'Il y a 4 heures',
      type: 'upload',
      icon: 'Upload'
    }
  ];

  const getActionColor = (type) => {
    const colors = {
      report: 'text-warning',
      login: 'text-primary',
      resolve: 'text-success',
      update: 'text-info',
      comment: 'text-secondary',
      upload: 'text-accent'
    };
    return colors[type] || 'text-text-secondary';
  };

  return (
    <div className="bg-background border border-border rounded-lg shadow-card">
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-heading font-semibold text-text-primary">
            {t.title}
          </h3>
          <Button variant="ghost" size="sm">
            {t.viewAll}
          </Button>
        </div>
      </div>
      
      <div className="divide-y divide-border max-h-96 overflow-y-auto">
        {activityLog.map((activity) => (
          <div key={activity.id} className="p-4 hover:bg-surface transition-smooth">
            <div className="flex items-start space-x-3">
              <div className="relative">
                <img
                  src={activity.avatar}
                  alt={activity.user}
                  className="w-10 h-10 rounded-full object-cover"
                  onError={(e) => {
                    e.target.src = '/assets/images/no_image.png';
                  }}
                />
                <div className={`absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-background border-2 border-background flex items-center justify-center ${getActionColor(activity.type)}`}>
                  <Icon name={activity.icon} size={12} />
                </div>
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-2 mb-1">
                  <span className="text-sm font-semibold text-text-primary">
                    {activity.user}
                  </span>
                  <span className="text-sm text-text-secondary">
                    {activity.action}
                  </span>
                </div>
                <p className="text-sm text-text-muted mb-1">
                  {activity.details}
                </p>
                <div className="flex items-center space-x-1 text-xs text-text-muted">
                  <Icon name="Clock" size={12} />
                  <span>{activity.time}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserActivityLog;