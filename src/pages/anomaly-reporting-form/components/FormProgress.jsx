import React from 'react';
import Icon from '../../../components/AppIcon';

const FormProgress = ({ currentStep, totalSteps, currentLanguage = 'fr' }) => {
  const translations = {
    fr: {
      step: 'Étape',
      of: 'sur'
    },
    ar: {
      step: 'خطوة',
      of: 'من'
    }
  };

  const t = translations[currentLanguage];

  const steps = [
    { id: 1, label: currentLanguage === 'fr' ? 'Catégorie' : 'الفئة' },
    { id: 2, label: currentLanguage === 'fr' ? 'Localisation' : 'الموقع' },
    { id: 3, label: currentLanguage === 'fr' ? 'Description' : 'الوصف' },
    { id: 4, label: currentLanguage === 'fr' ? 'Fichiers' : 'الملفات' },
    { id: 5, label: currentLanguage === 'fr' ? 'Révision' : 'المراجعة' }
  ];

  return (
    <div className="bg-background border border-border rounded-lg p-6 mb-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-heading font-semibold text-text-primary">
          {t.step} {currentStep} {t.of} {totalSteps}
        </h3>
        <span className="text-sm text-text-secondary">
          {Math.round((currentStep / totalSteps) * 100)}%
        </span>
      </div>
      
      <div className="w-full bg-surface rounded-full h-2 mb-4">
        <div 
          className="bg-primary h-2 rounded-full transition-all duration-300"
          style={{ width: `${(currentStep / totalSteps) * 100}%` }}
        />
      </div>

      <div className="flex justify-between">
        {steps.map((step) => (
          <div key={step.id} className="flex flex-col items-center">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold transition-all duration-200 ${
              step.id < currentStep 
                ? 'bg-success text-success-foreground' 
                : step.id === currentStep 
                  ? 'bg-primary text-primary-foreground' 
                  : 'bg-surface text-text-secondary'
            }`}>
              {step.id < currentStep ? (
                <Icon name="Check" size={16} />
              ) : (
                step.id
              )}
            </div>
            <span className={`text-xs mt-2 text-center ${
              step.id <= currentStep ? 'text-text-primary' : 'text-text-secondary'
            }`}>
              {step.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FormProgress;