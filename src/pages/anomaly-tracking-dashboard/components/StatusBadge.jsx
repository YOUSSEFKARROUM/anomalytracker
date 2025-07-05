import React from 'react';

const StatusBadge = ({ status, size = 'sm' }) => {
  const statusConfig = {
    pending: {
      label: 'En attente',
      bgColor: 'bg-warning-100',
      textColor: 'text-warning-700',
      dotColor: 'bg-warning-500'
    },
    'in-progress': {
      label: 'En cours',
      bgColor: 'bg-blue-100',
      textColor: 'text-blue-700',
      dotColor: 'bg-blue-500'
    },
    resolved: {
      label: 'Résolu',
      bgColor: 'bg-success-100',
      textColor: 'text-success-700',
      dotColor: 'bg-success-500'
    },
    rejected: {
      label: 'Rejeté',
      bgColor: 'bg-error-100',
      textColor: 'text-error-700',
      dotColor: 'bg-error-500'
    }
  };

  const config = statusConfig[status] || statusConfig.pending;
  const sizeClasses = size === 'lg' ? 'px-3 py-2 text-sm' : 'px-2 py-1 text-xs';

  return (
    <span className={`inline-flex items-center space-x-1 ${sizeClasses} rounded-full font-medium ${config.bgColor} ${config.textColor}`}>
      <span className={`w-2 h-2 rounded-full ${config.dotColor}`}></span>
      <span>{config.label}</span>
    </span>
  );
};

export default StatusBadge;