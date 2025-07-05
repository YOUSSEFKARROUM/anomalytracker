import React from 'react';

const PriorityBadge = ({ priority, size = 'sm' }) => {
  const priorityConfig = {
    low: {
      label: 'Faible',
      bgColor: 'bg-gray-100',
      textColor: 'text-gray-700'
    },
    medium: {
      label: 'Moyen',
      bgColor: 'bg-warning-100',
      textColor: 'text-warning-700'
    },
    high: {
      label: 'Élevé',
      bgColor: 'bg-primary-100',
      textColor: 'text-primary-700'
    },
    urgent: {
      label: 'Urgent',
      bgColor: 'bg-error-100',
      textColor: 'text-error-700'
    }
  };

  const config = priorityConfig[priority] || priorityConfig.medium;
  const sizeClasses = size === 'lg' ? 'px-3 py-2 text-sm' : 'px-2 py-1 text-xs';

  return (
    <span className={`inline-flex items-center ${sizeClasses} rounded-full font-medium ${config.bgColor} ${config.textColor}`}>
      {config.label}
    </span>
  );
};

export default PriorityBadge;