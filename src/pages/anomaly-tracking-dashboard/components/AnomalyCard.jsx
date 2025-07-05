import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import StatusBadge from './StatusBadge';
import PriorityBadge from './PriorityBadge';

const AnomalyCard = ({ anomaly, onViewDetails, onAddComment }) => {
  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  return (
    <div className="bg-background border border-border rounded-lg p-4 hover:shadow-card-hover transition-smooth">
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <h3 className="text-base font-semibold text-text-primary mb-1 line-clamp-2">
            {anomaly.title}
          </h3>
          <p className="text-sm text-text-secondary mb-2">
            ID: #{anomaly.id}
          </p>
        </div>
        <div className="flex flex-col items-end space-y-2">
          <StatusBadge status={anomaly.status} />
          <PriorityBadge priority={anomaly.priority} />
        </div>
      </div>

      <div className="space-y-2 mb-4">
        <div className="flex items-center space-x-2 text-sm text-text-secondary">
          <Icon name="Calendar" size={16} />
          <span>Soumis le {formatDate(anomaly.submittedDate)}</span>
        </div>
        
        <div className="flex items-center space-x-2 text-sm text-text-secondary">
          <Icon name="MapPin" size={16} />
          <span>{anomaly.location}</span>
        </div>

        {anomaly.assignedTo && (
          <div className="flex items-center space-x-2 text-sm text-text-secondary">
            <Icon name="User" size={16} />
            <span>Assigné à {anomaly.assignedTo}</span>
          </div>
        )}

        <div className="flex items-center space-x-2 text-sm text-text-secondary">
          <Icon name="Tag" size={16} />
          <span>{anomaly.category}</span>
        </div>
      </div>

      <div className="flex items-center justify-between pt-3 border-t border-border">
        <div className="flex items-center space-x-3">
          <Button
            variant="outline"
            size="sm"
            iconName="Eye"
            iconPosition="left"
            onClick={() => onViewDetails(anomaly)}
          >
            Détails
          </Button>
          <Button
            variant="ghost"
            size="sm"
            iconName="MessageCircle"
            iconPosition="left"
            onClick={() => onAddComment(anomaly)}
          >
            Commenter
          </Button>
        </div>
        
        {anomaly.lastUpdate && (
          <span className="text-xs text-text-muted">
            Mis à jour {formatDate(anomaly.lastUpdate)}
          </span>
        )}
      </div>
    </div>
  );
};

export default AnomalyCard;