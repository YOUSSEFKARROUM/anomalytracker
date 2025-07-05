import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const SubmissionSuccess = ({ trackingNumber, currentLanguage = 'fr' }) => {
  const [countdown, setCountdown] = useState(10);
  const navigate = useNavigate();

  const translations = {
    fr: {
      title: 'Signalement soumis avec succès !',
      subtitle: 'Votre signalement a été enregistré et sera traité dans les plus brefs délais',
      trackingNumber: 'Numéro de suivi',
      trackingInfo: 'Conservez ce numéro pour suivre l\'état de votre signalement',
      nextSteps: 'Prochaines étapes',
      step1: 'Votre signalement sera examiné par notre équipe',
      step2: 'Vous recevrez une notification de confirmation par email',
      step3: 'Un technicien sera assigné selon la priorité',
      step4: 'Vous serez informé des mises à jour du statut',
      expectedResponse: 'Temps de réponse estimé',
      responseTime: '24-48 heures pour les problèmes normaux\n2-4 heures pour les problèmes urgents',
      actions: 'Actions disponibles',
      trackIssue: 'Suivre ce signalement',
      reportAnother: 'Signaler un autre problème',
      backToDashboard: 'Retour au tableau de bord',
      autoRedirect: 'Redirection automatique dans',
      seconds: 'secondes',
      copyTracking: 'Copier le numéro',
      copied: 'Copié !',
      thankYou: 'Merci pour votre signalement'
    },
    ar: {
      title: 'تم إرسال التقرير بنجاح!',
      subtitle: 'تم تسجيل تقريرك وسيتم معالجته في أقرب وقت ممكن',
      trackingNumber: 'رقم التتبع',
      trackingInfo: 'احتفظ بهذا الرقم لتتبع حالة تقريرك',
      nextSteps: 'الخطوات التالية',
      step1: 'سيتم فحص تقريرك من قبل فريقنا',
      step2: 'ستتلقى إشعار تأكيد عبر البريد الإلكتروني',
      step3: 'سيتم تعيين فني حسب الأولوية',
      step4: 'ستتم إعلامك بتحديثات الحالة',
      expectedResponse: 'وقت الاستجابة المتوقع',
      responseTime: '24-48 ساعة للمشاكل العادية\n2-4 ساعات للمشاكل العاجلة',
      actions: 'الإجراءات المتاحة',
      trackIssue: 'تتبع هذا التقرير',
      reportAnother: 'الإبلاغ عن مشكلة أخرى',
      backToDashboard: 'العودة إلى لوحة التحكم',
      autoRedirect: 'إعادة التوجيه التلقائي خلال',
      seconds: 'ثانية',
      copyTracking: 'نسخ الرقم',
      copied: 'تم النسخ!',
      thankYou: 'شكراً لك على التقرير'
    }
  };

  const t = translations[currentLanguage];

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          navigate('/anomaly-tracking-dashboard');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [navigate]);

  const handleCopyTracking = async () => {
    try {
      await navigator.clipboard.writeText(trackingNumber);
      // Show copied feedback (you could add a toast notification here)
    } catch (err) {
      console.error('Failed to copy tracking number:', err);
    }
  };

  const handleTrackIssue = () => {
    navigate(`/anomaly-tracking-dashboard?track=${trackingNumber}`);
  };

  const handleReportAnother = () => {
    navigate('/anomaly-reporting-form');
  };

  const handleBackToDashboard = () => {
    navigate('/anomaly-tracking-dashboard');
  };

  return (
    <div className="min-h-screen bg-surface flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        {/* Success Animation */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-success rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
            <Icon name="CheckCircle" size={40} className="text-success-foreground" />
          </div>
          <h1 className="text-3xl font-heading font-bold text-text-primary mb-2">
            {t.title}
          </h1>
          <p className="text-text-secondary text-lg">
            {t.subtitle}
          </p>
        </div>

        {/* Tracking Number Card */}
        <div className="bg-background border border-border rounded-lg p-6 mb-6 shadow-card">
          <div className="text-center">
            <h2 className="text-lg font-semibold text-text-primary mb-2">
              {t.trackingNumber}
            </h2>
            <div className="flex items-center justify-center space-x-3 mb-3">
              <div className="bg-primary-50 border border-primary-200 rounded-lg px-6 py-3">
                <span className="text-2xl font-mono font-bold text-primary">
                  {trackingNumber}
                </span>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleCopyTracking}
                iconName="Copy"
                iconSize={16}
              >
                {t.copyTracking}
              </Button>
            </div>
            <p className="text-sm text-text-secondary">
              {t.trackingInfo}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {/* Next Steps */}
          <div className="bg-background border border-border rounded-lg p-6">
            <h3 className="text-lg font-semibold text-text-primary mb-4 flex items-center">
              <Icon name="List" size={20} className="mr-2 text-primary" />
              {t.nextSteps}
            </h3>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-xs font-bold text-primary-foreground">1</span>
                </div>
                <p className="text-sm text-text-secondary">{t.step1}</p>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-xs font-bold text-primary-foreground">2</span>
                </div>
                <p className="text-sm text-text-secondary">{t.step2}</p>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-xs font-bold text-primary-foreground">3</span>
                </div>
                <p className="text-sm text-text-secondary">{t.step3}</p>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-xs font-bold text-primary-foreground">4</span>
                </div>
                <p className="text-sm text-text-secondary">{t.step4}</p>
              </div>
            </div>
          </div>

          {/* Expected Response */}
          <div className="bg-background border border-border rounded-lg p-6">
            <h3 className="text-lg font-semibold text-text-primary mb-4 flex items-center">
              <Icon name="Clock" size={20} className="mr-2 text-primary" />
              {t.expectedResponse}
            </h3>
            <div className="bg-warning-50 border border-warning-200 rounded-lg p-4">
              <p className="text-sm text-warning-700 whitespace-pre-line">
                {t.responseTime}
              </p>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="bg-background border border-border rounded-lg p-6 mb-6">
          <h3 className="text-lg font-semibold text-text-primary mb-4 flex items-center">
            <Icon name="Zap" size={20} className="mr-2 text-primary" />
            {t.actions}
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <Button
              variant="primary"
              onClick={handleTrackIssue}
              iconName="Search"
              iconPosition="left"
              fullWidth
            >
              {t.trackIssue}
            </Button>
            <Button
              variant="outline"
              onClick={handleReportAnother}
              iconName="Plus"
              iconPosition="left"
              fullWidth
            >
              {t.reportAnother}
            </Button>
            <Button
              variant="ghost"
              onClick={handleBackToDashboard}
              iconName="Home"
              iconPosition="left"
              fullWidth
            >
              {t.backToDashboard}
            </Button>
          </div>
        </div>

        {/* Auto Redirect Notice */}
        <div className="text-center">
          <div className="inline-flex items-center space-x-2 bg-primary-50 border border-primary-200 rounded-lg px-4 py-2">
            <Icon name="RotateCcw" size={16} className="text-primary" />
            <span className="text-sm text-primary">
              {t.autoRedirect} {countdown} {t.seconds}
            </span>
          </div>
        </div>

        {/* Thank You Message */}
        <div className="text-center mt-8">
          <p className="text-lg font-medium text-text-primary">
            {t.thankYou}
          </p>
        </div>
      </div>
    </div>
  );
};

export default SubmissionSuccess;