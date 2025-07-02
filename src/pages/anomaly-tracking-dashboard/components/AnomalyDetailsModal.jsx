import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import StatusBadge from './StatusBadge';
import PriorityBadge from './PriorityBadge';
import Image from '../../../components/AppImage';

const AnomalyDetailsModal = ({ anomaly, isOpen, onClose, onAddComment }) => {
  if (!isOpen || !anomaly) return null;

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const statusTimeline = [
    { status: 'submitted', label: 'Soumis', date: anomaly.submittedDate, completed: true },
    { status: 'acknowledged', label: 'Accusé de réception', date: anomaly.acknowledgedDate, completed: !!anomaly.acknowledgedDate },
    { status: 'assigned', label: 'Assigné', date: anomaly.assignedDate, completed: !!anomaly.assignedDate },
    { status: 'in-progress', label: 'En cours', date: anomaly.startedDate, completed: anomaly.status === 'in-progress' || anomaly.status === 'resolved' },
    { status: 'resolved', label: 'Résolu', date: anomaly.resolvedDate, completed: anomaly.status === 'resolved' }
  ];

  return (
    <div className="fixed inset-0 z-modal bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-background rounded-lg shadow-modal max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-background border-b border-border p-6 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-text-primary mb-2">
              Détails de l'anomalie #{anomaly.id}
            </h2>
            <div className="flex items-center space-x-3">
              <StatusBadge status={anomaly.status} size="lg" />
              <PriorityBadge priority={anomaly.priority} size="lg" />
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            iconName="X"
            onClick={onClose}
          />
        </div>

        <div className="p-6 space-y-6">
          {/* Basic Information */}
          <div>
            <h3 className="text-lg font-semibold text-text-primary mb-3">
              Informations générales
            </h3>
            <div className="bg-surface rounded-lg p-4 space-y-3">
              <div>
                <label className="text-sm font-medium text-text-secondary">Titre</label>
                <p className="text-text-primary">{anomaly.title}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-text-secondary">Description</label>
                <p className="text-text-primary whitespace-pre-wrap">{anomaly.description}</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-text-secondary">Localisation</label>
                  <p className="text-text-primary">{anomaly.location}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-text-secondary">Catégorie</label>
                  <p className="text-text-primary">{anomaly.category}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-text-secondary">Soumis par</label>
                  <p className="text-text-primary">{anomaly.submittedBy}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-text-secondary">Date de soumission</label>
                  <p className="text-text-primary">{formatDate(anomaly.submittedDate)}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Images */}
          {anomaly.images && anomaly.images.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold text-text-primary mb-3">
                Photos jointes
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {anomaly.images.map((image, index) => (
                  <div key={index} className="aspect-square rounded-lg overflow-hidden border border-border">
                    <Image
                      src={image}
                      alt={`Anomalie ${anomaly.id} - Photo ${index + 1}`}
                      className="w-full h-full object-cover hover:scale-105 transition-transform cursor-pointer"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Timeline */}
          <div>
            <h3 className="text-lg font-semibold text-text-primary mb-3">
              Suivi du statut
            </h3>
            <div className="space-y-4">
              {statusTimeline.map((step, index) => (
                <div key={step.status} className="flex items-start space-x-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    step.completed ? 'bg-success-500' : 'bg-gray-300'
                  }`}>
                    {step.completed ? (
                      <Icon name="Check" size={16} className="text-white" />
                    ) : (
                      <span className="w-2 h-2 bg-white rounded-full"></span>
                    )}
                  </div>
                  <div className="flex-1">
                    <p className={`font-medium ${step.completed ? 'text-text-primary' : 'text-text-secondary'}`}>
                      {step.label}
                    </p>
                    {step.date && (
                      <p className="text-sm text-text-secondary">
                        {formatDate(step.date)}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Assignment Information */}
          {anomaly.assignedTo && (
            <div>
              <h3 className="text-lg font-semibold text-text-primary mb-3">
                Assignation
              </h3>
              <div className="bg-surface rounded-lg p-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-text-secondary">Assigné à</label>
                    <p className="text-text-primary">{anomaly.assignedTo}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-text-secondary">Date d'assignation</label>
                    <p className="text-text-primary">
                      {anomaly.assignedDate ? formatDate(anomaly.assignedDate) : '-'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Comments */}
          {anomaly.comments && anomaly.comments.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold text-text-primary mb-3">
                Commentaires
              </h3>
              <div className="space-y-3">
                {anomaly.comments.map((comment, index) => (
                  <div key={index} className="bg-surface rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium text-text-primary">{comment.author}</span>
                      <span className="text-sm text-text-secondary">
                        {formatDate(comment.date)}
                      </span>
                    </div>
                    <p className="text-text-primary">{comment.content}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="sticky bottom-0 bg-background border-t border-border p-6 flex items-center justify-between">
          <div className="text-sm text-text-secondary">
            Dernière mise à jour: {anomaly.lastUpdate ? formatDate(anomaly.lastUpdate) : 'N/A'}
          </div>
          <div className="flex items-center space-x-3">
            <Button
              variant="outline"
              iconName="MessageCircle"
              iconPosition="left"
              onClick={() => onAddComment(anomaly)}
            >
              Ajouter un commentaire
            </Button>
            <Button variant="primary" onClick={onClose}>
              Fermer
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnomalyDetailsModal;