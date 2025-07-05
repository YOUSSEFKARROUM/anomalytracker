import React from 'react';

import Icon from '../../../components/AppIcon';

const CategoryStep = ({ formData, setFormData, currentLanguage = 'fr' }) => {
  const translations = {
    fr: {
      title: 'Catégorie du problème',
      subtitle: 'Sélectionnez le type de problème que vous souhaitez signaler',
      facilityType: 'Type d\'installation',
      facilityTypePlaceholder: 'Sélectionnez le type d\'installation',
      problemCategory: 'Catégorie du problème',
      problemCategoryPlaceholder: 'Sélectionnez la catégorie',
      priority: 'Niveau de priorité',
      priorityPlaceholder: 'Sélectionnez la priorité',
      required: 'Champ obligatoire'
    },
    ar: {
      title: 'فئة المشكلة',
      subtitle: 'اختر نوع المشكلة التي تريد الإبلاغ عنها',
      facilityType: 'نوع المرفق',
      facilityTypePlaceholder: 'اختر نوع المرفق',
      problemCategory: 'فئة المشكلة',
      problemCategoryPlaceholder: 'اختر الفئة',
      priority: 'مستوى الأولوية',
      priorityPlaceholder: 'اختر الأولوية',
      required: 'حقل مطلوب'
    }
  };

  const t = translations[currentLanguage];

  const facilityTypes = [
    { value: 'classroom', label: currentLanguage === 'fr' ? 'Salle de classe' : 'قاعة الدراسة' },
    { value: 'laboratory', label: currentLanguage === 'fr' ? 'Laboratoire' : 'المختبر' },
    { value: 'library', label: currentLanguage === 'fr' ? 'Bibliothèque' : 'المكتبة' },
    { value: 'cafeteria', label: currentLanguage === 'fr' ? 'Cafétéria' : 'الكافتيريا' },
    { value: 'restroom', label: currentLanguage === 'fr' ? 'Toilettes' : 'دورة المياه' },
    { value: 'corridor', label: currentLanguage === 'fr' ? 'Couloir' : 'الممر' },
    { value: 'outdoor', label: currentLanguage === 'fr' ? 'Extérieur' : 'الخارج' },
    { value: 'office', label: currentLanguage === 'fr' ? 'Bureau' : 'المكتب' }
  ];

  const problemCategories = [
    { value: 'electrical', label: currentLanguage === 'fr' ? 'Électricité' : 'الكهرباء', icon: 'Zap' },
    { value: 'plumbing', label: currentLanguage === 'fr' ? 'Plomberie' : 'السباكة', icon: 'Droplets' },
    { value: 'hvac', label: currentLanguage === 'fr' ? 'Climatisation' : 'التكييف', icon: 'Wind' },
    { value: 'furniture', label: currentLanguage === 'fr' ? 'Mobilier' : 'الأثاث', icon: 'Armchair' },
    { value: 'technology', label: currentLanguage === 'fr' ? 'Technologie' : 'التكنولوجيا', icon: 'Monitor' },
    { value: 'safety', label: currentLanguage === 'fr' ? 'Sécurité' : 'الأمان', icon: 'Shield' },
    { value: 'cleanliness', label: currentLanguage === 'fr' ? 'Propreté' : 'النظافة', icon: 'Sparkles' },
    { value: 'other', label: currentLanguage === 'fr' ? 'Autre' : 'أخرى', icon: 'MoreHorizontal' }
  ];

  const priorities = [
    { value: 'low', label: currentLanguage === 'fr' ? 'Faible' : 'منخفض', color: 'text-success' },
    { value: 'medium', label: currentLanguage === 'fr' ? 'Moyen' : 'متوسط', color: 'text-warning' },
    { value: 'high', label: currentLanguage === 'fr' ? 'Élevé' : 'عالي', color: 'text-error' },
    { value: 'urgent', label: currentLanguage === 'fr' ? 'Urgent' : 'عاجل', color: 'text-error font-bold' }
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Facility Type */}
        <div>
          <label className="block text-sm font-semibold text-text-primary mb-2">
            {t.facilityType} <span className="text-error">*</span>
          </label>
          <select
            value={formData.facilityType || ''}
            onChange={(e) => handleInputChange('facilityType', e.target.value)}
            className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-200"
            required
          >
            <option value="">{t.facilityTypePlaceholder}</option>
            {facilityTypes.map((type) => (
              <option key={type.value} value={type.value}>
                {type.label}
              </option>
            ))}
          </select>
        </div>

        {/* Priority Level */}
        <div>
          <label className="block text-sm font-semibold text-text-primary mb-2">
            {t.priority} <span className="text-error">*</span>
          </label>
          <select
            value={formData.priority || ''}
            onChange={(e) => handleInputChange('priority', e.target.value)}
            className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-200"
            required
          >
            <option value="">{t.priorityPlaceholder}</option>
            {priorities.map((priority) => (
              <option key={priority.value} value={priority.value}>
                {priority.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Problem Category */}
      <div>
        <label className="block text-sm font-semibold text-text-primary mb-3">
          {t.problemCategory} <span className="text-error">*</span>
        </label>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {problemCategories.map((category) => (
            <button
              key={category.value}
              type="button"
              onClick={() => handleInputChange('problemCategory', category.value)}
              className={`p-4 border-2 rounded-lg transition-all duration-200 hover:shadow-card-hover ${
                formData.problemCategory === category.value
                  ? 'border-primary bg-primary-50 text-primary' :'border-border bg-background text-text-secondary hover:border-primary-200'
              }`}
            >
              <div className="flex flex-col items-center space-y-2">
                <Icon name={category.icon} size={24} />
                <span className="text-sm font-medium text-center">
                  {category.label}
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoryStep;