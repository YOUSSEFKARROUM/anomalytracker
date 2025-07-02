import React from 'react';
import Icon from '../../../components/AppIcon';

const MetricsCard = ({ title, value, change, changeType, icon, color = 'primary' }) => {
  const getColorClasses = (color) => {
    const colorMap = {
      primary: 'bg-primary-50 text-primary border-primary-200',
      success: 'bg-success-50 text-success border-success-200',
      warning: 'bg-warning-50 text-warning border-warning-200',
      error: 'bg-error-50 text-error border-error-200'
    };
    return colorMap[color] || colorMap.primary;
  };

  const getChangeColor = (type) => {
    return type === 'increase' ? 'text-success' : type === 'decrease' ? 'text-error' : 'text-text-secondary';
  };

  return (
    <div className="bg-background border border-border rounded-lg p-6 shadow-card hover:shadow-card-hover transition-smooth">
      <div className="flex items-center justify-between mb-4">
        <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${getColorClasses(color)}`}>
          <Icon name={icon} size={24} />
        </div>
        {change && (
          <div className={`flex items-center space-x-1 ${getChangeColor(changeType)}`}>
            <Icon 
              name={changeType === 'increase' ? 'TrendingUp' : changeType === 'decrease' ? 'TrendingDown' : 'Minus'} 
              size={16} 
            />
            <span className="text-sm font-semibold">{change}</span>
          </div>
        )}
      </div>
      
      <div>
        <h3 className="text-2xl font-heading font-bold text-text-primary mb-1">
          {value}
        </h3>
        <p className="text-sm text-text-secondary">
          {title}
        </p>
      </div>
    </div>
  );
};

export default MetricsCard;