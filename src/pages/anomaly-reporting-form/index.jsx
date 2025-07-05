import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthenticatedHeader from '../../components/ui/AuthenticatedHeader';
import Button from '../../components/ui/Button';
import Icon from '../../components/AppIcon';
import FormProgress from './components/FormProgress';
import CategoryStep from './components/CategoryStep';
import LocationStep from './components/LocationStep';
import DescriptionStep from './components/DescriptionStep';
import FileUploadStep from './components/FileUploadStep';
import ReviewStep from './components/ReviewStep';
import SubmissionSuccess from './components/SubmissionSuccess';

const AnomalyReportingForm = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [currentLanguage, setCurrentLanguage] = useState('fr');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [trackingNumber, setTrackingNumber] = useState('');
  const [formData, setFormData] = useState({
    facilityType: '',
    problemCategory: '',
    priority: '',
    building: '',
    floor: '',
    room: '',
    specificLocation: '',
    problemTitle: '',
    description: '',
    whenOccurred: '',
    frequency: '',
    impact: '',
    files: []
  });

  const navigate = useNavigate();
  const totalSteps = 5;

  // Mock user data
  const mockUser = {
    id: 1,
    name: "Ahmed Benali",
    email: "ahmed.benali@ensa.ac.ma",
    role: "student",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg"
  };

  // Mock notifications
  const mockNotifications = [
    {
      id: 1,
      title: "Signalement mis à jour",
      message: "Votre signalement #ANO-2024-001 a été pris en charge",
      read: false,
      timestamp: new Date(Date.now() - 3600000)
    },
    {
      id: 2,
      title: "Nouveau message",
      message: "Réponse du technicien sur votre signalement",
      read: false,
      timestamp: new Date(Date.now() - 7200000)
    }
  ];

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') || 'fr';
    setCurrentLanguage(savedLanguage);
  }, []);

  const translations = {
    fr: {
      pageTitle: 'Signaler un problème',
      next: 'Suivant',
      previous: 'Précédent',
      submit: 'Soumettre le signalement',
      submitting: 'Soumission en cours...',
      cancel: 'Annuler',
      saveDraft: 'Sauvegarder le brouillon',
      loadDraft: 'Charger le brouillon',
      confirmCancel: 'Êtes-vous sûr de vouloir annuler ? Toutes les données non sauvegardées seront perdues.',
      validationError: 'Veuillez remplir tous les champs obligatoires',
      draftSaved: 'Brouillon sauvegardé',
      draftLoaded: 'Brouillon chargé'
    },
    ar: {
      pageTitle: 'الإبلاغ عن مشكلة',
      next: 'التالي',
      previous: 'السابق',
      submit: 'إرسال التقرير',
      submitting: 'جاري الإرسال...',
      cancel: 'إلغاء',
      saveDraft: 'حفظ المسودة',
      loadDraft: 'تحميل المسودة',
      confirmCancel: 'هل أنت متأكد من الإلغاء؟ ستفقد جميع البيانات غير المحفوظة.',
      validationError: 'يرجى ملء جميع الحقول المطلوبة',
      draftSaved: 'تم حفظ المسودة',
      draftLoaded: 'تم تحميل المسودة'
    }
  };

  const t = translations[currentLanguage];

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/authentication-login-register');
  };

  const validateStep = (step) => {
    switch (step) {
      case 1:
        return formData.facilityType && formData.problemCategory && formData.priority;
      case 2:
        return formData.building && formData.floor && formData.room;
      case 3:
        return formData.problemTitle && formData.description && formData.description.length >= 50 && 
               formData.whenOccurred && formData.frequency && formData.impact;
      case 4:
        return true; // File upload is optional
      case 5:
        return true; // Review step
      default:
        return false;
    }
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, totalSteps));
    } else {
      alert(t.validationError);
    }
  };

  const handlePrevious = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const generateTrackingNumber = () => {
    const prefix = 'ANO';
    const year = new Date().getFullYear();
    const random = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
    return `${prefix}-${year}-${random}`;
  };

  const handleSubmit = async () => {
    if (!validateStep(currentStep - 1)) {
      alert(t.validationError);
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const newTrackingNumber = generateTrackingNumber();
      setTrackingNumber(newTrackingNumber);
      
      // Clear saved draft
      localStorage.removeItem('anomaly-form-draft');
      
      setIsSubmitted(true);
    } catch (error) {
      console.error('Submission error:', error);
      alert('Une erreur est survenue lors de la soumission. Veuillez réessayer.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    if (window.confirm(t.confirmCancel)) {
      navigate('/anomaly-tracking-dashboard');
    }
  };

  const saveDraft = () => {
    localStorage.setItem('anomaly-form-draft', JSON.stringify({
      formData,
      currentStep,
      timestamp: new Date().toISOString()
    }));
    alert(t.draftSaved);
  };

  const loadDraft = () => {
    const draft = localStorage.getItem('anomaly-form-draft');
    if (draft) {
      const { formData: draftData, currentStep: draftStep } = JSON.parse(draft);
      setFormData(draftData);
      setCurrentStep(draftStep);
      alert(t.draftLoaded);
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <CategoryStep
            formData={formData}
            setFormData={setFormData}
            currentLanguage={currentLanguage}
          />
        );
      case 2:
        return (
          <LocationStep
            formData={formData}
            setFormData={setFormData}
            currentLanguage={currentLanguage}
          />
        );
      case 3:
        return (
          <DescriptionStep
            formData={formData}
            setFormData={setFormData}
            currentLanguage={currentLanguage}
          />
        );
      case 4:
        return (
          <FileUploadStep
            formData={formData}
            setFormData={setFormData}
            currentLanguage={currentLanguage}
          />
        );
      case 5:
        return (
          <ReviewStep
            formData={formData}
            currentLanguage={currentLanguage}
          />
        );
      default:
        return null;
    }
  };

  // Show success page after submission
  if (isSubmitted) {
    return (
      <SubmissionSuccess
        trackingNumber={trackingNumber}
        currentLanguage={currentLanguage}
      />
    );
  }

  return (
    <div className="min-h-screen bg-surface">
      <AuthenticatedHeader
        user={mockUser}
        notifications={mockNotifications}
        onLogout={handleLogout}
      />

      <div className="pt-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Page Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-heading font-bold text-text-primary mb-2">
              {t.pageTitle}
            </h1>
            <div className="flex items-center justify-center space-x-4 text-sm text-text-secondary">
              <button
                onClick={loadDraft}
                className="flex items-center space-x-1 hover:text-primary transition-colors duration-200"
              >
                <Icon name="Download" size={16} />
                <span>{t.loadDraft}</span>
              </button>
              <span>•</span>
              <button
                onClick={saveDraft}
                className="flex items-center space-x-1 hover:text-primary transition-colors duration-200"
              >
                <Icon name="Save" size={16} />
                <span>{t.saveDraft}</span>
              </button>
            </div>
          </div>

          {/* Progress Indicator */}
          <FormProgress
            currentStep={currentStep}
            totalSteps={totalSteps}
            currentLanguage={currentLanguage}
          />

          {/* Form Content */}
          <div className="bg-background border border-border rounded-lg p-6 md:p-8 mb-8 shadow-card">
            {renderStep()}
          </div>

          {/* Navigation Buttons */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Button
                variant="ghost"
                onClick={handleCancel}
                iconName="X"
                iconPosition="left"
              >
                {t.cancel}
              </Button>
            </div>

            <div className="flex items-center space-x-3">
              {currentStep > 1 && (
                <Button
                  variant="outline"
                  onClick={handlePrevious}
                  iconName="ChevronLeft"
                  iconPosition="left"
                >
                  {t.previous}
                </Button>
              )}

              {currentStep < totalSteps ? (
                <Button
                  variant="primary"
                  onClick={handleNext}
                  iconName="ChevronRight"
                  iconPosition="right"
                  disabled={!validateStep(currentStep)}
                >
                  {t.next}
                </Button>
              ) : (
                <Button
                  variant="primary"
                  onClick={handleSubmit}
                  loading={isSubmitting}
                  iconName="Send"
                  iconPosition="left"
                  disabled={!validateStep(currentStep) || isSubmitting}
                >
                  {isSubmitting ? t.submitting : t.submit}
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnomalyReportingForm;