import React, { useState, useEffect } from 'react';
import Icon from '../AppIcon';
import Button from './Button';

const Toast = ({ 
  message, 
  type = 'info', 
  duration = 5000, 
  onClose,
  action = null
}) => {
  const [isVisible, setIsVisible] = useState(true);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    setIsAnimating(true);
    
    if (duration > 0) {
      const timer = setTimeout(() => {
        handleClose();
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [duration]);

  const handleClose = () => {
    setIsAnimating(false);
    setTimeout(() => {
      setIsVisible(false);
      if (onClose) onClose();
    }, 300);
  };

  const typeConfig = {
    success: {
      icon: 'CheckCircle',
      bgColor: 'bg-success-50',
      borderColor: 'border-success-200',
      textColor: 'text-success-800',
      iconColor: 'text-success'
    },
    error: {
      icon: 'XCircle',
      bgColor: 'bg-error-50',
      borderColor: 'border-error-200',
      textColor: 'text-error-800',
      iconColor: 'text-error'
    },
    warning: {
      icon: 'AlertTriangle',
      bgColor: 'bg-warning-50',
      borderColor: 'border-warning-200',
      textColor: 'text-warning-800',
      iconColor: 'text-warning'
    },
    info: {
      icon: 'Info',
      bgColor: 'bg-primary-50',
      borderColor: 'border-primary-200',
      textColor: 'text-primary-800',
      iconColor: 'text-primary'
    }
  };

  const config = typeConfig[type];

  if (!isVisible) return null;

  return (
    <div 
      className={`
        fixed top-4 right-4 z-50 min-w-80 max-w-md
        ${config.bgColor} ${config.borderColor} ${config.textColor}
        border rounded-lg shadow-lg p-4
        transform transition-all duration-300 ease-in-out
        ${isAnimating ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'}
      `}
    >
      <div className="flex items-start space-x-3">
        <Icon 
          name={config.icon} 
          size={20} 
          className={`${config.iconColor} flex-shrink-0 mt-0.5`} 
        />
        
        <div className="flex-1">
          <p className="text-sm font-medium">
            {message}
          </p>
          
          {action && (
            <div className="mt-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={action.onClick}
                className={`${config.textColor} hover:${config.bgColor}`}
              >
                {action.label}
              </Button>
            </div>
          )}
        </div>
        
        <Button
          variant="ghost"
          size="sm"
          onClick={handleClose}
          iconName="X"
          className={`${config.textColor} hover:${config.bgColor} p-1`}
        />
      </div>
    </div>
  );
};

// Toast Provider for managing multiple toasts
export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const addToast = (toast) => {
    const id = Date.now();
    setToasts(prev => [...prev, { ...toast, id }]);
  };

  const removeToast = (id) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  };

  // Make addToast available globally
  useEffect(() => {
    window.addToast = addToast;
    return () => {
      delete window.addToast;
    };
  }, []);

  return (
    <>
      {children}
      <div className="fixed top-4 right-4 z-50 space-y-2">
        {toasts.map(toast => (
          <Toast
            key={toast.id}
            {...toast}
            onClose={() => removeToast(toast.id)}
          />
        ))}
      </div>
    </>
  );
};

export default Toast;