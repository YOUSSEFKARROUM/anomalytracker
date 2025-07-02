import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const PendingActionsQueue = () => {
  const [currentLanguage, setCurrentLanguage] = useState('fr');

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') || 'fr';
    setCurrentLanguage(savedLanguage);
  }, []);

  const translations = {
    fr: {
      title: 'Actions en attente',
      priority: 'Priorité',
      assign: 'Assigner',
      resolve: 'Résoudre',
      viewAll: 'Voir tout',
      high: 'Élevée',
      medium: 'Moyenne',
      low: 'Faible',
      urgent: 'Urgent'
    },
    ar: {
      title: 'الإجراءات المعلقة',
      priority: 'الأولوية',
      assign: 'تعيين',
      resolve: 'حل',
      viewAll: 'عرض الكل',
      high: 'عالية',
      medium: 'متوسطة',
      low: 'منخفضة',
      urgent: 'عاجل'
    }
  };

  const t = translations[currentLanguage];

  const pendingActions = [
    {
      id: 1,
      title: "Problème de chauffage - Amphithéâtre A",
      description: "Le système de chauffage ne fonctionne pas correctement",
      priority: "high",
      submittedBy: "Ahmed Benali",
      timeAgo: "Il y a 2 heures",
      category: "Infrastructure"
    },
    {
      id: 2,
      title: "Éclairage défaillant - Laboratoire 3",
      description: "Plusieurs néons ne s\'allument plus",
      priority: "medium",
      submittedBy: "Fatima Zahra",
      timeAgo: "Il y a 4 heures",
      category: "Électricité"
    },
    {
      id: 3,
      title: "Fuite d\'eau - Toilettes étage 2",
      description: "Fuite importante au niveau des robinets",
      priority: "high",
      submittedBy: "Mohamed Alami",
      timeAgo: "Il y a 1 heure",
      category: "Plomberie"
    },
    {
      id: 4,
      title: "Problème réseau WiFi - Salle informatique",
      description: "Connexion internet instable",
      priority: "medium",
      submittedBy: "Aicha Bennani",
      timeAgo: "Il y a 6 heures",
      category: "Informatique"
    }
  ];

  const getPriorityColor = (priority) => {
    const colors = {
      high: 'bg-error-50 text-error border-error-200',
      medium: 'bg-warning-50 text-warning border-warning-200',
      low: 'bg-success-50 text-success border-success-200'
    };
    return colors[priority] || colors.medium;
  };

  const getPriorityLabel = (priority) => {
    const labels = {
      high: t.high,
      medium: t.medium,
      low: t.low
    };
    return labels[priority] || t.medium;
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
      
      <div className="divide-y divide-border">
        {pendingActions.map((action) => (
          <div key={action.id} className="p-6 hover:bg-surface transition-smooth">
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-2">
                  <h4 className="text-sm font-semibold text-text-primary">
                    {action.title}
                  </h4>
                  <span className={`px-2 py-1 rounded-full text-xs font-semibold border ${getPriorityColor(action.priority)}`}>
                    {getPriorityLabel(action.priority)}
                  </span>
                </div>
                <p className="text-sm text-text-secondary mb-2">
                  {action.description}
                </p>
                <div className="flex items-center space-x-4 text-xs text-text-muted">
                  <span className="flex items-center space-x-1">
                    <Icon name="User" size={12} />
                    <span>{action.submittedBy}</span>
                  </span>
                  <span className="flex items-center space-x-1">
                    <Icon name="Clock" size={12} />
                    <span>{action.timeAgo}</span>
                  </span>
                  <span className="flex items-center space-x-1">
                    <Icon name="Tag" size={12} />
                    <span>{action.category}</span>
                  </span>
                </div>
              </div>
              
              <div className="flex items-center space-x-2 ml-4">
                <Button variant="outline" size="sm" iconName="UserPlus">
                  {t.assign}
                </Button>
                <Button variant="primary" size="sm" iconName="Check">
                  {t.resolve}
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PendingActionsQueue;