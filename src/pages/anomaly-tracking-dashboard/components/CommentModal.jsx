import React, { useState } from 'react';

import Button from '../../../components/ui/Button';


const CommentModal = ({ anomaly, isOpen, onClose, onSubmitComment }) => {
  const [comment, setComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen || !anomaly) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!comment.trim()) return;

    setIsSubmitting(true);
    try {
      await onSubmitComment(anomaly.id, comment.trim());
      setComment('');
      onClose();
    } catch (error) {
      console.error('Error submitting comment:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-modal bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-background rounded-lg shadow-modal max-w-md w-full">
        <div className="p-6 border-b border-border">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-text-primary">
              Ajouter un commentaire
            </h2>
            <Button
              variant="ghost"
              size="sm"
              iconName="X"
              onClick={onClose}
            />
          </div>
          <p className="text-sm text-text-secondary mt-2">
            Anomalie #{anomaly.id}: {anomaly.title}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="p-6">
          <div className="mb-4">
            <label className="block text-sm font-medium text-text-primary mb-2">
              Votre commentaire
            </label>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Décrivez votre commentaire ou question..."
              rows={4}
              className="w-full px-3 py-2 border border-border rounded-md bg-background text-text-primary placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
              required
            />
            <p className="text-xs text-text-secondary mt-1">
              {comment.length}/500 caractères
            </p>
          </div>

          <div className="flex items-center justify-end space-x-3">
            <Button
              type="button"
              variant="ghost"
              onClick={onClose}
              disabled={isSubmitting}
            >
              Annuler
            </Button>
            <Button
              type="submit"
              variant="primary"
              iconName="Send"
              iconPosition="left"
              loading={isSubmitting}
              disabled={!comment.trim() || comment.length > 500}
            >
              Envoyer
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CommentModal;