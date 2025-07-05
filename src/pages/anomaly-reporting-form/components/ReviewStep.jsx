import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const ReviewStep = ({ formData, currentLanguage = 'fr' }) => {
  const translations = {
    fr: {
      title: 'Révision de votre signalement',
      subtitle: 'Vérifiez les informations avant de soumettre votre signalement',
      category: 'Catégorie',
      location: 'Localisation',
      description: 'Description',
      files: 'Fichiers joints',
      facilityType: 'Type d\'installation',
      problemCategory: 'Catégorie du problème',
      priority: 'Priorité',
      building: 'Bâtiment',
      floor: 'Étage',
      room: 'Salle',
      specificLocation: 'Localisation spécifique',
      problemTitle: 'Titre du problème',
      detailedDescription: 'Description détaillée',
      whenOccurred: 'Quand',
      frequency: 'Fréquence',
      impact: 'Impact',
      noFiles: 'Aucun fichier joint',
      edit: 'Modifier',
      summary: 'Résumé du signalement'
    },
    ar: {
      title: 'مراجعة تقريرك',
      subtitle: 'تحقق من المعلومات قبل إرسال تقريرك',
      category: 'الفئة',
      location: 'الموقع',
      description: 'الوصف',
      files: 'الملفات المرفقة',
      facilityType: 'نوع المرفق',
      problemCategory: 'فئة المشكلة',
      priority: 'الأولوية',
      building: 'المبنى',
      floor: 'الطابق',
      room: 'الغرفة',
      specificLocation: 'الموقع المحدد',
      problemTitle: 'عنوان المشكلة',
      detailedDescription: 'الوصف التفصيلي',
      whenOccurred: 'متى',
      frequency: 'التكرار',
      impact: 'التأثير',
      noFiles: 'لا توجد ملفات مرفقة',
      edit: 'تعديل',
      summary: 'ملخص التقرير'
    }
  };

  const t = translations[currentLanguage];

  // Translation mappings
  const facilityTypes = {
    'classroom': currentLanguage === 'fr' ? 'Salle de classe' : 'قاعة الدراسة',
    'laboratory': currentLanguage === 'fr' ? 'Laboratoire' : 'المختبر',
    'library': currentLanguage === 'fr' ? 'Bibliothèque' : 'المكتبة',
    'cafeteria': currentLanguage === 'fr' ? 'Cafétéria' : 'الكافتيريا',
    'restroom': currentLanguage === 'fr' ? 'Toilettes' : 'دورة المياه',
    'corridor': currentLanguage === 'fr' ? 'Couloir' : 'الممر',
    'outdoor': currentLanguage === 'fr' ? 'Extérieur' : 'الخارج',
    'office': currentLanguage === 'fr' ? 'Bureau' : 'المكتب'
  };

  const problemCategories = {
    'electrical': currentLanguage === 'fr' ? 'Électricité' : 'الكهرباء',
    'plumbing': currentLanguage === 'fr' ? 'Plomberie' : 'السباكة',
    'hvac': currentLanguage === 'fr' ? 'Climatisation' : 'التكييف',
    'furniture': currentLanguage === 'fr' ? 'Mobilier' : 'الأثاث',
    'technology': currentLanguage === 'fr' ? 'Technologie' : 'التكنولوجيا',
    'safety': currentLanguage === 'fr' ? 'Sécurité' : 'الأمان',
    'cleanliness': currentLanguage === 'fr' ? 'Propreté' : 'النظافة',
    'other': currentLanguage === 'fr' ? 'Autre' : 'أخرى'
  };

  const priorities = {
    'low': currentLanguage === 'fr' ? 'Faible' : 'منخفض',
    'medium': currentLanguage === 'fr' ? 'Moyen' : 'متوسط',
    'high': currentLanguage === 'fr' ? 'Élevé' : 'عالي',
    'urgent': currentLanguage === 'fr' ? 'Urgent' : 'عاجل'
  };

  const buildings = {
    'main': currentLanguage === 'fr' ? 'Bâtiment Principal' : 'المبنى الرئيسي',
    'engineering': currentLanguage === 'fr' ? 'Bâtiment Ingénierie' : 'مبنى الهندسة',
    'sciences': currentLanguage === 'fr' ? 'Bâtiment Sciences' : 'مبنى العلوم',
    'library': currentLanguage === 'fr' ? 'Bibliothèque' : 'المكتبة',
    'cafeteria': currentLanguage === 'fr' ? 'Cafétéria' : 'الكافتيريا',
    'sports': currentLanguage === 'fr' ? 'Complexe Sportif' : 'المجمع الرياضي',
    'residence': currentLanguage === 'fr' ? 'Résidence' : 'السكن الجامعي'
  };

  const floors = {
    'basement': currentLanguage === 'fr' ? 'Sous-sol' : 'الطابق السفلي',
    'ground': currentLanguage === 'fr' ? 'Rez-de-chaussée' : 'الطابق الأرضي',
    '1': currentLanguage === 'fr' ? '1er étage' : 'الطابق الأول',
    '2': currentLanguage === 'fr' ? '2ème étage' : 'الطابق الثاني',
    '3': currentLanguage === 'fr' ? '3ème étage' : 'الطابق الثالث',
    '4': currentLanguage === 'fr' ? '4ème étage' : 'الطابق الرابع'
  };

  const whenOccurred = {
    'just-now': currentLanguage === 'fr' ? 'À l\'instant' : 'الآن',
    'today': currentLanguage === 'fr' ? 'Aujourd\'hui' : 'اليوم',
    'yesterday': currentLanguage === 'fr' ? 'Hier' : 'أمس',
    'this-week': currentLanguage === 'fr' ? 'Cette semaine' : 'هذا الأسبوع',
    'last-week': currentLanguage === 'fr' ? 'La semaine dernière' : 'الأسبوع الماضي',
    'longer': currentLanguage === 'fr' ? 'Plus longtemps' : 'أطول من ذلك'
  };

  const frequency = {
    'first-time': currentLanguage === 'fr' ? 'Première fois' : 'المرة الأولى',
    'occasionally': currentLanguage === 'fr' ? 'Occasionnellement' : 'أحياناً',
    'frequently': currentLanguage === 'fr' ? 'Fréquemment' : 'بشكل متكرر',
    'always': currentLanguage === 'fr' ? 'Toujours' : 'دائماً'
  };

  const impact = {
    'no-impact': currentLanguage === 'fr' ? 'Aucun impact' : 'لا يوجد تأثير',
    'minor': currentLanguage === 'fr' ? 'Impact mineur' : 'تأثير طفيف',
    'moderate': currentLanguage === 'fr' ? 'Impact modéré' : 'تأثير متوسط',
    'major': currentLanguage === 'fr' ? 'Impact majeur' : 'تأثير كبير',
    'critical': currentLanguage === 'fr' ? 'Impact critique' : 'تأثير حرج'
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getFileIcon = (fileType) => {
    if (fileType.startsWith('image/')) return 'Image';
    if (fileType === 'application/pdf') return 'FileText';
    if (fileType.includes('word')) return 'FileText';
    return 'File';
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'low': return 'text-success bg-success-50 border-success-200';
      case 'medium': return 'text-warning bg-warning-50 border-warning-200';
      case 'high': return 'text-error bg-error-50 border-error-200';
      case 'urgent': return 'text-error bg-error-100 border-error-300 font-bold';
      default: return 'text-text-secondary bg-surface border-border';
    }
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

      {/* Summary Card */}
      <div className="bg-primary-50 border border-primary-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-primary mb-4 flex items-center">
          <Icon name="FileText" size={20} className="mr-2" />
          {t.summary}
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
          <div>
            <span className="font-medium text-text-primary">{t.facilityType}:</span>
            <p className="text-text-secondary">{facilityTypes[formData.facilityType] || formData.facilityType}</p>
          </div>
          <div>
            <span className="font-medium text-text-primary">{t.problemCategory}:</span>
            <p className="text-text-secondary">{problemCategories[formData.problemCategory] || formData.problemCategory}</p>
          </div>
          <div>
            <span className="font-medium text-text-primary">{t.priority}:</span>
            <span className={`inline-block px-2 py-1 rounded text-xs border ${getPriorityColor(formData.priority)}`}>
              {priorities[formData.priority] || formData.priority}
            </span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Category Section */}
        <div className="bg-background border border-border rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-text-primary flex items-center">
              <Icon name="Tag" size={20} className="mr-2 text-primary" />
              {t.category}
            </h3>
          </div>
          
          <div className="space-y-3">
            <div>
              <span className="text-sm font-medium text-text-secondary">{t.facilityType}</span>
              <p className="text-text-primary">{facilityTypes[formData.facilityType] || formData.facilityType}</p>
            </div>
            <div>
              <span className="text-sm font-medium text-text-secondary">{t.problemCategory}</span>
              <p className="text-text-primary">{problemCategories[formData.problemCategory] || formData.problemCategory}</p>
            </div>
            <div>
              <span className="text-sm font-medium text-text-secondary">{t.priority}</span>
              <span className={`inline-block px-3 py-1 rounded-full text-sm border ${getPriorityColor(formData.priority)}`}>
                {priorities[formData.priority] || formData.priority}
              </span>
            </div>
          </div>
        </div>

        {/* Location Section */}
        <div className="bg-background border border-border rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-text-primary flex items-center">
              <Icon name="MapPin" size={20} className="mr-2 text-primary" />
              {t.location}
            </h3>
          </div>
          
          <div className="space-y-3">
            <div>
              <span className="text-sm font-medium text-text-secondary">{t.building}</span>
              <p className="text-text-primary">{buildings[formData.building] || formData.building}</p>
            </div>
            <div>
              <span className="text-sm font-medium text-text-secondary">{t.floor}</span>
              <p className="text-text-primary">{floors[formData.floor] || formData.floor}</p>
            </div>
            <div>
              <span className="text-sm font-medium text-text-secondary">{t.room}</span>
              <p className="text-text-primary">{formData.room}</p>
            </div>
            {formData.specificLocation && (
              <div>
                <span className="text-sm font-medium text-text-secondary">{t.specificLocation}</span>
                <p className="text-text-primary">{formData.specificLocation}</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Description Section */}
      <div className="bg-background border border-border rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-text-primary flex items-center">
            <Icon name="FileText" size={20} className="mr-2 text-primary" />
            {t.description}
          </h3>
        </div>
        
        <div className="space-y-4">
          <div>
            <span className="text-sm font-medium text-text-secondary">{t.problemTitle}</span>
            <p className="text-text-primary font-medium">{formData.problemTitle}</p>
          </div>
          
          <div>
            <span className="text-sm font-medium text-text-secondary">{t.detailedDescription}</span>
            <div className="mt-2 p-4 bg-surface rounded-lg">
              <p className="text-text-primary whitespace-pre-wrap">{formData.description}</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <span className="text-sm font-medium text-text-secondary">{t.whenOccurred}</span>
              <p className="text-text-primary">{whenOccurred[formData.whenOccurred] || formData.whenOccurred}</p>
            </div>
            <div>
              <span className="text-sm font-medium text-text-secondary">{t.frequency}</span>
              <p className="text-text-primary">{frequency[formData.frequency] || formData.frequency}</p>
            </div>
            <div>
              <span className="text-sm font-medium text-text-secondary">{t.impact}</span>
              <p className="text-text-primary">{impact[formData.impact] || formData.impact}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Files Section */}
      <div className="bg-background border border-border rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-text-primary flex items-center">
            <Icon name="Paperclip" size={20} className="mr-2 text-primary" />
            {t.files}
          </h3>
        </div>
        
        {formData.files && formData.files.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {formData.files.map((fileObj) => (
              <div key={fileObj.id} className="flex items-center space-x-3 p-3 bg-surface rounded-lg">
                <div className="flex-shrink-0">
                  {fileObj.preview ? (
                    <Image
                      src={fileObj.preview}
                      alt={fileObj.name}
                      className="w-10 h-10 object-cover rounded"
                    />
                  ) : (
                    <div className="w-10 h-10 bg-background rounded flex items-center justify-center">
                      <Icon name={getFileIcon(fileObj.type)} size={20} className="text-text-secondary" />
                    </div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-text-primary truncate">{fileObj.name}</p>
                  <p className="text-xs text-text-secondary">{formatFileSize(fileObj.size)}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <Icon name="FileX" size={48} className="text-text-secondary mx-auto mb-3" />
            <p className="text-text-secondary">{t.noFiles}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReviewStep;