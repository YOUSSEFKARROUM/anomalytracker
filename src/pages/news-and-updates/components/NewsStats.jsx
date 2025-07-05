import React from 'react';
import Icon from '../../../components/AppIcon';

const NewsStats = ({ stats, currentLanguage }) => {
  const translations = {
    fr: {
      totalArticles: 'Articles totaux',
      thisMonth: 'Ce mois-ci',
      categories: 'Catégories',
      lastUpdate: 'Dernière mise à jour'
    },
    ar: {
      totalArticles: 'إجمالي المقالات',
      thisMonth: 'هذا الشهر',
      categories: 'الفئات',
      lastUpdate: 'آخر تحديث'
    }
  };

  const t = translations[currentLanguage];

  const statItems = [
    {
      label: t.totalArticles,
      value: stats.totalArticles,
      icon: 'FileText',
      color: 'text-primary'
    },
    {
      label: t.thisMonth,
      value: stats.thisMonth,
      icon: 'Calendar',
      color: 'text-success'
    },
    {
      label: t.categories,
      value: stats.categories,
      icon: 'Tag',
      color: 'text-accent'
    },
    {
      label: t.lastUpdate,
      value: stats.lastUpdate,
      icon: 'Clock',
      color: 'text-warning'
    }
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {statItems.map((item, index) => (
        <div key={index} className="bg-background border border-border rounded-lg p-4 shadow-card">
          <div className="flex items-center space-x-3">
            <div className={`p-2 rounded-lg bg-surface ${item.color}`}>
              <Icon name={item.icon} size={20} />
            </div>
            <div>
              <p className="text-lg font-semibold text-text-primary">
                {item.value}
              </p>
              <p className="text-sm text-text-secondary">
                {item.label}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default NewsStats;