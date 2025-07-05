import React, { useState } from 'react';
import Input from '../../../components/ui/Input';
import Icon from '../../../components/AppIcon';

const DescriptionStep = ({ formData, setFormData, currentLanguage = 'fr' }) => {
  const [charCount, setCharCount] = useState(formData.description?.length || 0);
  const maxChars = 1000;
  const minChars = 50;

  const translations = {
    fr: {
      title: 'Description du problème',
      subtitle: 'Décrivez le problème en détail pour nous aider à mieux le comprendre',
      problemTitle: 'Titre du problème',
      problemTitlePlaceholder: 'Résumez le problème en quelques mots',
      description: 'Description détaillée',
      descriptionPlaceholder: `Décrivez le problème en détail :\n• Que s'est-il passé exactement ?\n• Quand avez-vous remarqué le problème ?\n• Le problème affecte-t-il d'autres personnes ?\n• Avez-vous essayé de résoudre le problème ?`,
      whenOccurred: 'Quand le problème s\'est-il produit ?',
      whenOccurredPlaceholder: 'Sélectionnez quand',
      frequency: 'Fréquence du problème',
      frequencyPlaceholder: 'À quelle fréquence cela se produit-il ?',
      impact: 'Impact sur les activités',
      impactPlaceholder: 'Comment cela affecte-t-il vos activités ?',
      charactersLeft: 'caractères restants',
      charactersMin: 'caractères minimum requis',
      required: 'Champ obligatoire'
    },
    ar: {
      title: 'وصف المشكلة',
      subtitle: 'صف المشكلة بالتفصيل لمساعدتنا على فهمها بشكل أفضل',
      problemTitle: 'عنوان المشكلة',
      problemTitlePlaceholder: 'لخص المشكلة في كلمات قليلة',
      description: 'الوصف التفصيلي',
      descriptionPlaceholder: `صف المشكلة بالتفصيل:\n• ما الذي حدث بالضبط؟\n• متى لاحظت المشكلة؟\n• هل تؤثر المشكلة على أشخاص آخرين؟\n• هل حاولت حل المشكلة؟`,
      whenOccurred: 'متى حدثت المشكلة؟',
      whenOccurredPlaceholder: 'اختر متى',
      frequency: 'تكرار المشكلة',
      frequencyPlaceholder: 'كم مرة يحدث هذا؟',
      impact: 'التأثير على الأنشطة',
      impactPlaceholder: 'كيف يؤثر هذا على أنشطتك؟',
      charactersLeft: 'حرف متبقي',
      charactersMin: 'حد أدنى من الأحرف مطلوب',
      required: 'حقل مطلوب'
    }
  };

  const t = translations[currentLanguage];

  const whenOccurredOptions = [
    { value: 'just-now', label: currentLanguage === 'fr' ? 'À l\'instant' : 'الآن' },
    { value: 'today', label: currentLanguage === 'fr' ? 'Aujourd\'hui' : 'اليوم' },
    { value: 'yesterday', label: currentLanguage === 'fr' ? 'Hier' : 'أمس' },
    { value: 'this-week', label: currentLanguage === 'fr' ? 'Cette semaine' : 'هذا الأسبوع' },
    { value: 'last-week', label: currentLanguage === 'fr' ? 'La semaine dernière' : 'الأسبوع الماضي' },
    { value: 'longer', label: currentLanguage === 'fr' ? 'Plus longtemps' : 'أطول من ذلك' }
  ];

  const frequencyOptions = [
    { value: 'first-time', label: currentLanguage === 'fr' ? 'Première fois' : 'المرة الأولى' },
    { value: 'occasionally', label: currentLanguage === 'fr' ? 'Occasionnellement' : 'أحياناً' },
    { value: 'frequently', label: currentLanguage === 'fr' ? 'Fréquemment' : 'بشكل متكرر' },
    { value: 'always', label: currentLanguage === 'fr' ? 'Toujours' : 'دائماً' }
  ];

  const impactOptions = [
    { value: 'no-impact', label: currentLanguage === 'fr' ? 'Aucun impact' : 'لا يوجد تأثير', color: 'text-success' },
    { value: 'minor', label: currentLanguage === 'fr' ? 'Impact mineur' : 'تأثير طفيف', color: 'text-warning' },
    { value: 'moderate', label: currentLanguage === 'fr' ? 'Impact modéré' : 'تأثير متوسط', color: 'text-warning' },
    { value: 'major', label: currentLanguage === 'fr' ? 'Impact majeur' : 'تأثير كبير', color: 'text-error' },
    { value: 'critical', label: currentLanguage === 'fr' ? 'Impact critique' : 'تأثير حرج', color: 'text-error font-bold' }
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));

    if (field === 'description') {
      setCharCount(value.length);
    }
  };

  const getCharCountColor = () => {
    if (charCount < minChars) return 'text-error';
    if (charCount > maxChars * 0.9) return 'text-warning';
    return 'text-success';
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-heading font-bold text-text-primary mb-2">
          {t.title}
        </h2>
        <p className="text-text-secondary">
          {t.subtitle}
        </p>
      </div>

      {/* Problem Title */}
      <div>
        <label className="block text-sm font-semibold text-text-primary mb-2">
          {t.problemTitle} <span className="text-error">*</span>
        </label>
        <Input
          type="text"
          value={formData.problemTitle || ''}
          onChange={(e) => handleInputChange('problemTitle', e.target.value)}
          placeholder={t.problemTitlePlaceholder}
          className="w-full"
          maxLength={100}
          required
        />
      </div>

      {/* Detailed Description */}
      <div>
        <label className="block text-sm font-semibold text-text-primary mb-2">
          {t.description} <span className="text-error">*</span>
        </label>
        <div className="relative">
          <textarea
            value={formData.description || ''}
            onChange={(e) => handleInputChange('description', e.target.value)}
            placeholder={t.descriptionPlaceholder}
            rows={8}
            maxLength={maxChars}
            className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-200 resize-none"
            required
          />
          <div className="flex justify-between items-center mt-2">
            <span className={`text-xs ${getCharCountColor()}`}>
              {charCount < minChars 
                ? `${minChars - charCount} ${t.charactersMin}`
                : `${maxChars - charCount} ${t.charactersLeft}`
              }
            </span>
            <div className="flex items-center space-x-2">
              {charCount >= minChars && (
                <Icon name="CheckCircle" size={16} className="text-success" />
              )}
              <span className="text-xs text-text-secondary">
                {charCount}/{maxChars}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* When Occurred */}
        <div>
          <label className="block text-sm font-semibold text-text-primary mb-2">
            {t.whenOccurred} <span className="text-error">*</span>
          </label>
          <select
            value={formData.whenOccurred || ''}
            onChange={(e) => handleInputChange('whenOccurred', e.target.value)}
            className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-200"
            required
          >
            <option value="">{t.whenOccurredPlaceholder}</option>
            {whenOccurredOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        {/* Frequency */}
        <div>
          <label className="block text-sm font-semibold text-text-primary mb-2">
            {t.frequency} <span className="text-error">*</span>
          </label>
          <select
            value={formData.frequency || ''}
            onChange={(e) => handleInputChange('frequency', e.target.value)}
            className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-200"
            required
          >
            <option value="">{t.frequencyPlaceholder}</option>
            {frequencyOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Impact Level */}
      <div>
        <label className="block text-sm font-semibold text-text-primary mb-3">
          {t.impact} <span className="text-error">*</span>
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          {impactOptions.map((impact) => (
            <button
              key={impact.value}
              type="button"
              onClick={() => handleInputChange('impact', impact.value)}
              className={`p-4 border-2 rounded-lg transition-all duration-200 hover:shadow-card-hover ${
                formData.impact === impact.value
                  ? 'border-primary bg-primary-50 text-primary' :'border-border bg-background text-text-secondary hover:border-primary-200'
              }`}
            >
              <div className="text-center">
                <div className={`text-sm font-medium ${
                  formData.impact === impact.value ? 'text-primary' : impact.color
                }`}>
                  {impact.label}
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DescriptionStep;