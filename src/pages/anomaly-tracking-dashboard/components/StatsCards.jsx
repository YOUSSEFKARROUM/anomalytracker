import React from 'react';
import Icon from '../../../components/AppIcon';

const StatsCards = ({ stats }) => {
  const cards = [
    {
      title: 'Total des anomalies',
      value: stats.total,
      icon: 'FileText',
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      title: 'En attente',
      value: stats.pending,
      icon: 'Clock',
      color: 'text-warning-600',
      bgColor: 'bg-warning-50'
    },
    {
      title: 'En cours',
      value: stats.inProgress,
      icon: 'Activity',
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      title: 'Résolues',
      value: stats.resolved,
      icon: 'CheckCircle',
      color: 'text-success-600',
      bgColor: 'bg-success-50'
    }
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {cards.map((card, index) => (
        <div key={index} className="bg-background border border-border rounded-lg p-4 hover:shadow-card-hover transition-smooth">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-text-secondary mb-1">
                {card.title}
              </p>
              <p className="text-2xl font-bold text-text-primary">
                {card.value}
              </p>
            </div>
            <div className={`w-12 h-12 rounded-lg ${card.bgColor} flex items-center justify-center`}>
              <Icon name={card.icon} size={24} className={card.color} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StatsCards;