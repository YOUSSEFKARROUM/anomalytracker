import React, { useState } from 'react';
import Input from '../../../components/ui/Input';
import Icon from '../../../components/AppIcon';

const LocationStep = ({ formData, setFormData, currentLanguage = 'fr' }) => {
  const [showMap, setShowMap] = useState(false);

  const translations = {
    fr: {
      title: 'Localisation du problème',
      subtitle: 'Précisez où se trouve le problème',
      building: 'Bâtiment',
      buildingPlaceholder: 'Sélectionnez le bâtiment',
      floor: 'Étage',
      floorPlaceholder: 'Sélectionnez l\'étage',
      room: 'Salle/Local',
      roomPlaceholder: 'Numéro de salle ou description',
      specificLocation: 'Localisation spécifique',
      specificLocationPlaceholder: 'Décrivez l\'emplacement exact (ex: près de la fenêtre, coin gauche...)',
      showMap: 'Afficher la carte',
      hideMap: 'Masquer la carte',
      mapTitle: 'Localisation sur la carte',
      required: 'Champ obligatoire'
    },
    ar: {
      title: 'موقع المشكلة',
      subtitle: 'حدد مكان المشكلة',
      building: 'المبنى',
      buildingPlaceholder: 'اختر المبنى',
      floor: 'الطابق',
      floorPlaceholder: 'اختر الطابق',
      room: 'الغرفة/المحل',
      roomPlaceholder: 'رقم الغرفة أو الوصف',
      specificLocation: 'الموقع المحدد',
      specificLocationPlaceholder: 'صف الموقع بالضبط (مثل: بالقرب من النافذة، الزاوية اليسرى...)',
      showMap: 'إظهار الخريطة',
      hideMap: 'إخفاء الخريطة',
      mapTitle: 'الموقع على الخريطة',
      required: 'حقل مطلوب'
    }
  };

  const t = translations[currentLanguage];

  const buildings = [
    { value: 'main', label: currentLanguage === 'fr' ? 'Bâtiment Principal' : 'المبنى الرئيسي' },
    { value: 'engineering', label: currentLanguage === 'fr' ? 'Bâtiment Ingénierie' : 'مبنى الهندسة' },
    { value: 'sciences', label: currentLanguage === 'fr' ? 'Bâtiment Sciences' : 'مبنى العلوم' },
    { value: 'library', label: currentLanguage === 'fr' ? 'Bibliothèque' : 'المكتبة' },
    { value: 'cafeteria', label: currentLanguage === 'fr' ? 'Cafétéria' : 'الكافتيريا' },
    { value: 'sports', label: currentLanguage === 'fr' ? 'Complexe Sportif' : 'المجمع الرياضي' },
    { value: 'residence', label: currentLanguage === 'fr' ? 'Résidence' : 'السكن الجامعي' }
  ];

  const floors = [
    { value: 'basement', label: currentLanguage === 'fr' ? 'Sous-sol' : 'الطابق السفلي' },
    { value: 'ground', label: currentLanguage === 'fr' ? 'Rez-de-chaussée' : 'الطابق الأرضي' },
    { value: '1', label: currentLanguage === 'fr' ? '1er étage' : 'الطابق الأول' },
    { value: '2', label: currentLanguage === 'fr' ? '2ème étage' : 'الطابق الثاني' },
    { value: '3', label: currentLanguage === 'fr' ? '3ème étage' : 'الطابق الثالث' },
    { value: '4', label: currentLanguage === 'fr' ? '4ème étage' : 'الطابق الرابع' }
  ];

  const commonRooms = [
    'A101', 'A102', 'A103', 'B201', 'B202', 'B203',
    'C301', 'C302', 'Lab1', 'Lab2', 'Lab3', 'Amphi1', 'Amphi2'
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
        {/* Building Selection */}
        <div>
          <label className="block text-sm font-semibold text-text-primary mb-2">
            {t.building} <span className="text-error">*</span>
          </label>
          <select
            value={formData.building || ''}
            onChange={(e) => handleInputChange('building', e.target.value)}
            className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-200"
            required
          >
            <option value="">{t.buildingPlaceholder}</option>
            {buildings.map((building) => (
              <option key={building.value} value={building.value}>
                {building.label}
              </option>
            ))}
          </select>
        </div>

        {/* Floor Selection */}
        <div>
          <label className="block text-sm font-semibold text-text-primary mb-2">
            {t.floor} <span className="text-error">*</span>
          </label>
          <select
            value={formData.floor || ''}
            onChange={(e) => handleInputChange('floor', e.target.value)}
            className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-200"
            required
          >
            <option value="">{t.floorPlaceholder}</option>
            {floors.map((floor) => (
              <option key={floor.value} value={floor.value}>
                {floor.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Room/Location */}
      <div>
        <label className="block text-sm font-semibold text-text-primary mb-2">
          {t.room} <span className="text-error">*</span>
        </label>
        <div className="relative">
          <Input
            type="text"
            value={formData.room || ''}
            onChange={(e) => handleInputChange('room', e.target.value)}
            placeholder={t.roomPlaceholder}
            className="w-full"
            list="common-rooms"
            required
          />
          <datalist id="common-rooms">
            {commonRooms.map((room) => (
              <option key={room} value={room} />
            ))}
          </datalist>
        </div>
      </div>

      {/* Specific Location */}
      <div>
        <label className="block text-sm font-semibold text-text-primary mb-2">
          {t.specificLocation}
        </label>
        <textarea
          value={formData.specificLocation || ''}
          onChange={(e) => handleInputChange('specificLocation', e.target.value)}
          placeholder={t.specificLocationPlaceholder}
          rows={3}
          className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-200 resize-none"
        />
      </div>

      {/* Map Toggle */}
      <div className="border border-border rounded-lg p-4">
        <button
          type="button"
          onClick={() => setShowMap(!showMap)}
          className="flex items-center space-x-2 text-primary hover:text-primary-600 transition-colors duration-200"
        >
          <Icon name={showMap ? 'ChevronUp' : 'ChevronDown'} size={20} />
          <span className="font-medium">
            {showMap ? t.hideMap : t.showMap}
          </span>
        </button>

        {showMap && (
          <div className="mt-4">
            <h4 className="text-sm font-semibold text-text-primary mb-3">
              {t.mapTitle}
            </h4>
            <div className="w-full h-64 bg-surface rounded-lg overflow-hidden">
              <iframe
                width="100%"
                height="100%"
                loading="lazy"
                title="ENSA Béni Mellal Location"
                referrerPolicy="no-referrer-when-downgrade"
                src="https://www.google.com/maps?q=32.3372,-6.3498&z=16&output=embed"
                className="border-0"
              />
            </div>
            <p className="text-xs text-text-secondary mt-2">
              {currentLanguage === 'fr' ?'Cliquez sur la carte pour marquer l\'emplacement exact (optionnel)'
                : 'انقر على الخريطة لتحديد الموقع بالضبط (اختياري)'
              }
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default LocationStep;