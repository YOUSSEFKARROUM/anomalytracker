import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const ContactSection = () => {
  const [currentLanguage, setCurrentLanguage] = useState('fr');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') || 'fr';
    setCurrentLanguage(savedLanguage);
  }, []);

  const translations = {
    fr: {
      title: "Contactez-nous",
      subtitle: "Nous sommes là pour vous aider. N\'hésitez pas à nous contacter pour toute question ou suggestion.",
      form: {
        name: "Nom complet",
        email: "Adresse email",
        subject: "Sujet",
        message: "Votre message",
        submit: "Envoyer le message",
        submitting: "Envoi en cours..."
      },
      contact: {
        title: "Informations de Contact",
        address: {
          title: "Adresse",
          value: "ENSA Béni Mellal\nAvenue Moulay Ismail\nBéni Mellal 23000, Maroc"
        },
        phone: {
          title: "Téléphone",
          value: "+212 523 48 52 01"
        },
        email: {
          title: "Email",
          value: "contact@ensabm.ac.ma"
        },
        hours: {
          title: "Heures d\'ouverture",
          value: "Lun - Ven: 8h00 - 16h00\nSam: 8h00 - 12h00"
        }
      },
      validation: {
        nameRequired: "Le nom est requis",
        emailRequired: "L\'email est requis",
        emailInvalid: "Format d\'email invalide",
        subjectRequired: "Le sujet est requis",
        messageRequired: "Le message est requis",
        messageMinLength: "Le message doit contenir au moins 10 caractères"
      },
      success: "Votre message a été envoyé avec succès !",
      error: "Une erreur s\'est produite. Veuillez réessayer."
    },
    ar: {
      title: "اتصل بنا",
      subtitle: "نحن هنا لمساعدتك. لا تتردد في الاتصال بنا لأي سؤال أو اقتراح.",
      form: {
        name: "الاسم الكامل",
        email: "عنوان البريد الإلكتروني",
        subject: "الموضوع",
        message: "رسالتك",
        submit: "إرسال الرسالة",
        submitting: "جاري الإرسال..."
      },
      contact: {
        title: "معلومات الاتصال",
        address: {
          title: "العنوان",
          value: "المدرسة الوطنية للعلوم التطبيقية ببني ملال\nشارع مولاي إسماعيل\nبني ملال 23000، المغرب"
        },
        phone: {
          title: "الهاتف",
          value: "+212 523 48 52 01"
        },
        email: {
          title: "البريد الإلكتروني",
          value: "contact@ensabm.ac.ma"
        },
        hours: {
          title: "ساعات العمل",
          value: "الإثنين - الجمعة: 8:00 - 16:00\nالسبت: 8:00 - 12:00"
        }
      },
      validation: {
        nameRequired: "الاسم مطلوب",
        emailRequired: "البريد الإلكتروني مطلوب",
        emailInvalid: "تنسيق البريد الإلكتروني غير صحيح",
        subjectRequired: "الموضوع مطلوب",
        messageRequired: "الرسالة مطلوبة",
        messageMinLength: "يجب أن تحتوي الرسالة على 10 أحرف على الأقل"
      },
      success: "تم إرسال رسالتك بنجاح!",
      error: "حدث خطأ. يرجى المحاولة مرة أخرى."
    }
  };

  const t = translations[currentLanguage];

  const contactInfo = [
    {
      icon: "MapPin",
      title: t.contact.address.title,
      value: t.contact.address.value,
      color: "text-primary"
    },
    {
      icon: "Phone",
      title: t.contact.phone.title,
      value: t.contact.phone.value,
      color: "text-accent"
    },
    {
      icon: "Mail",
      title: t.contact.email.title,
      value: t.contact.email.value,
      color: "text-secondary"
    },
    {
      icon: "Clock",
      title: t.contact.hours.title,
      value: t.contact.hours.value,
      color: "text-success"
    }
  ];

  const validateForm = () => {
    const errors = {};

    if (!formData.name.trim()) {
      errors.name = t.validation.nameRequired;
    }

    if (!formData.email.trim()) {
      errors.email = t.validation.emailRequired;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = t.validation.emailInvalid;
    }

    if (!formData.subject.trim()) {
      errors.subject = t.validation.subjectRequired;
    }

    if (!formData.message.trim()) {
      errors.message = t.validation.messageRequired;
    } else if (formData.message.trim().length < 10) {
      errors.message = t.validation.messageMinLength;
    }

    return errors;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Clear error when user starts typing
    if (formErrors[name]) {
      setFormErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Mock success
      setSubmitStatus('success');
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
      setFormErrors({});
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-20 bg-gradient-to-br from-background to-primary-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl font-heading font-bold text-text-primary mb-4">
            {t.title}
          </h2>
          <p className="text-lg text-text-secondary">
            {t.subtitle}
          </p>
          <div className="w-20 h-1 bg-primary mx-auto mt-6 rounded-full"></div>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="bg-background rounded-2xl p-8 shadow-card border border-border">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name */}
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-text-primary mb-2">
                  {t.form.name}
                </label>
                <Input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder={t.form.name}
                  className={formErrors.name ? 'border-error' : ''}
                />
                {formErrors.name && (
                  <p className="mt-1 text-sm text-error">{formErrors.name}</p>
                )}
              </div>

              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-text-primary mb-2">
                  {t.form.email}
                </label>
                <Input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder={t.form.email}
                  className={formErrors.email ? 'border-error' : ''}
                />
                {formErrors.email && (
                  <p className="mt-1 text-sm text-error">{formErrors.email}</p>
                )}
              </div>

              {/* Subject */}
              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-text-primary mb-2">
                  {t.form.subject}
                </label>
                <Input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  placeholder={t.form.subject}
                  className={formErrors.subject ? 'border-error' : ''}
                />
                {formErrors.subject && (
                  <p className="mt-1 text-sm text-error">{formErrors.subject}</p>
                )}
              </div>

              {/* Message */}
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-text-primary mb-2">
                  {t.form.message}
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder={t.form.message}
                  className={`w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-colors resize-none ${
                    formErrors.message ? 'border-error' : ''
                  }`}
                />
                {formErrors.message && (
                  <p className="mt-1 text-sm text-error">{formErrors.message}</p>
                )}
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                variant="primary"
                size="lg"
                fullWidth
                loading={isSubmitting}
                iconName={isSubmitting ? undefined : "Send"}
                iconPosition="right"
              >
                {isSubmitting ? t.form.submitting : t.form.submit}
              </Button>

              {/* Status Messages */}
              {submitStatus === 'success' && (
                <div className="flex items-center space-x-2 text-success bg-success-50 p-3 rounded-lg">
                  <Icon name="CheckCircle" size={20} />
                  <span className="text-sm font-medium">{t.success}</span>
                </div>
              )}

              {submitStatus === 'error' && (
                <div className="flex items-center space-x-2 text-error bg-error-50 p-3 rounded-lg">
                  <Icon name="AlertCircle" size={20} />
                  <span className="text-sm font-medium">{t.error}</span>
                </div>
              )}
            </form>
          </div>

          {/* Contact Information */}
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-heading font-bold text-text-primary mb-6">
                {t.contact.title}
              </h3>
              
              <div className="space-y-6">
                {contactInfo.map((info, index) => (
                  <div key={index} className="flex items-start space-x-4">
                    <div className={`w-12 h-12 bg-surface rounded-lg flex items-center justify-center flex-shrink-0 ${info.color}`}>
                      <Icon name={info.icon} size={24} />
                    </div>
                    <div>
                      <h4 className="font-semibold text-text-primary mb-1">
                        {info.title}
                      </h4>
                      <p className="text-text-secondary whitespace-pre-line">
                        {info.value}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Map */}
            <div className="bg-background rounded-xl p-4 shadow-card border border-border">
              <h4 className="font-semibold text-text-primary mb-4">
                {currentLanguage === 'fr' ? 'Notre Localisation' : 'موقعنا'}
              </h4>
              <div className="w-full h-64 rounded-lg overflow-hidden">
                <iframe
                  width="100%"
                  height="100%"
                  loading="lazy"
                  title="ENSA Béni Mellal Location"
                  referrerPolicy="no-referrer-when-downgrade"
                  src="https://www.google.com/maps?q=32.3372,-6.3498&z=15&output=embed"
                  className="border-0"
                />
              </div>
            </div>

            {/* Social Links */}
            <div className="bg-background rounded-xl p-6 shadow-card border border-border">
              <h4 className="font-semibold text-text-primary mb-4">
                {currentLanguage === 'fr' ? 'Suivez-nous' : 'تابعونا'}
              </h4>
              <div className="flex space-x-4">
                {[
                  { icon: "Facebook", color: "hover:text-blue-600" },
                  { icon: "Twitter", color: "hover:text-blue-400" },
                  { icon: "Instagram", color: "hover:text-pink-600" },
                  { icon: "Linkedin", color: "hover:text-blue-700" }
                ].map((social, index) => (
                  <button
                    key={index}
                    className={`w-10 h-10 bg-surface hover:bg-primary rounded-lg flex items-center justify-center transition-all duration-300 text-text-secondary hover:text-primary-foreground ${social.color}`}
                  >
                    <Icon name={social.icon} size={20} />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;