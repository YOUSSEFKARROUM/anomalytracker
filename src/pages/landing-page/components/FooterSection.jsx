import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';

const FooterSection = () => {
  const [currentLanguage, setCurrentLanguage] = useState('fr');
  const currentYear = new Date().getFullYear();

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') || 'fr';
    setCurrentLanguage(savedLanguage);
  }, []);

  const translations = {
    fr: {
      description: "Plateforme moderne de signalement et de suivi des anomalies pour l'ENSA Béni Mellal. Ensemble, améliorons notre environnement d'apprentissage.",
      quickLinks: {
        title: "Liens Rapides",
        links: [
          { label: "Accueil", path: "/landing-page" },
          { label: "Signaler", path: "/anomaly-reporting-form" },
          { label: "Suivi", path: "/anomaly-tracking-dashboard" },
          { label: "Actualités", path: "/news-and-updates" }
        ]
      },
      contact: {
        title: "Contact",
        address: "ENSA Béni Mellal, Avenue Moulay Ismail",
        phone: "+212 523 48 52 01",
        email: "contact@ensabm.ac.ma"
      },
      legal: {
        title: "Légal",
        links: [
          "Politique de Confidentialité",
          "Conditions d\'Utilisation",
          "Mentions Légales",
          "Cookies"
        ]
      },
      social: {
        title: "Suivez-nous"
      },
      newsletter: {
        title: "Newsletter",
        description: "Restez informé des dernières mises à jour",
        placeholder: "Votre email",
        subscribe: "S\'abonner"
      },
      copyright: `© ${currentYear} AnomalyTracker - ENSA Béni Mellal. Tous droits réservés.`,
      madeWith: "Fait avec",
      by: "par l\'équipe ENSA"
    },
    ar: {
      description: "منصة حديثة للإبلاغ عن الشذوذات وتتبعها في المدرسة الوطنية للعلوم التطبيقية ببني ملال. معاً، لنحسن بيئة التعلم.",
      quickLinks: {
        title: "روابط سريعة",
        links: [
          { label: "الرئيسية", path: "/landing-page" },
          { label: "الإبلاغ", path: "/anomaly-reporting-form" },
          { label: "التتبع", path: "/anomaly-tracking-dashboard" },
          { label: "الأخبار", path: "/news-and-updates" }
        ]
      },
      contact: {
        title: "اتصل بنا",
        address: "المدرسة الوطنية للعلوم التطبيقية ببني ملال، شارع مولاي إسماعيل",
        phone: "+212 523 48 52 01",
        email: "contact@ensabm.ac.ma"
      },
      legal: {
        title: "قانوني",
        links: [
          "سياسة الخصوصية",
          "شروط الاستخدام",
          "الإشعارات القانونية",
          "ملفات تعريف الارتباط"
        ]
      },
      social: {
        title: "تابعونا"
      },
      newsletter: {
        title: "النشرة الإخبارية",
        description: "ابق على اطلاع بآخر التحديثات",
        placeholder: "بريدك الإلكتروني",
        subscribe: "اشترك"
      },
      copyright: `© ${currentYear} AnomalyTracker - المدرسة الوطنية للعلوم التطبيقية ببني ملال. جميع الحقوق محفوظة.`,
      madeWith: "صنع بـ",
      by: "من قبل فريق المدرسة الوطنية للعلوم التطبيقية"
    }
  };

  const t = translations[currentLanguage];

  const socialLinks = [
    { icon: "Facebook", href: "#", color: "hover:text-blue-500" },
    { icon: "Twitter", href: "#", color: "hover:text-blue-400" },
    { icon: "Instagram", href: "#", color: "hover:text-pink-500" },
    { icon: "Linkedin", href: "#", color: "hover:text-blue-600" },
    { icon: "Youtube", href: "#", color: "hover:text-red-500" }
  ];

  const [email, setEmail] = useState('');
  const [subscribeStatus, setSubscribeStatus] = useState(null);

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    if (email) {
      setSubscribeStatus('success');
      setEmail('');
      setTimeout(() => setSubscribeStatus(null), 3000);
    }
  };

  return (
    <footer className="bg-accent text-accent-foreground">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="text-primary-foreground"
                >
                  <path
                    d="M12 2L2 7L12 12L22 7L12 2Z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M2 17L12 22L22 17"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M2 12L12 17L22 12"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-heading font-bold">AnomalyTracker</h3>
                <p className="text-sm opacity-80">ENSA Béni Mellal</p>
              </div>
            </div>
            
            <p className="text-sm opacity-80 leading-relaxed mb-6">
              {t.description}
            </p>

            {/* Social Links */}
            <div>
              <h4 className="font-semibold mb-3">{t.social.title}</h4>
              <div className="flex space-x-3">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    className={`w-9 h-9 bg-accent-700 hover:bg-primary rounded-lg flex items-center justify-center transition-all duration-300 ${social.color}`}
                  >
                    <Icon name={social.icon} size={18} />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-6">{t.quickLinks.title}</h4>
            <ul className="space-y-3">
              {t.quickLinks.links.map((link, index) => (
                <li key={index}>
                  <Link
                    to={link.path}
                    className="text-sm opacity-80 hover:opacity-100 hover:text-primary transition-all duration-300 flex items-center group"
                  >
                    <Icon name="ChevronRight" size={14} className="mr-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-semibold mb-6">{t.contact.title}</h4>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <Icon name="MapPin" size={16} className="text-primary mt-1 flex-shrink-0" />
                <p className="text-sm opacity-80">{t.contact.address}</p>
              </div>
              
              <div className="flex items-center space-x-3">
                <Icon name="Phone" size={16} className="text-primary flex-shrink-0" />
                <p className="text-sm opacity-80">{t.contact.phone}</p>
              </div>
              
              <div className="flex items-center space-x-3">
                <Icon name="Mail" size={16} className="text-primary flex-shrink-0" />
                <p className="text-sm opacity-80">{t.contact.email}</p>
              </div>
            </div>

            {/* Legal Links */}
            <div className="mt-8">
              <h4 className="font-semibold mb-4">{t.legal.title}</h4>
              <ul className="space-y-2">
                {t.legal.links.map((link, index) => (
                  <li key={index}>
                    <a
                      href="#"
                      className="text-sm opacity-80 hover:opacity-100 hover:text-primary transition-all duration-300"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="font-semibold mb-6">{t.newsletter.title}</h4>
            <p className="text-sm opacity-80 mb-4">
              {t.newsletter.description}
            </p>
            
            <form onSubmit={handleNewsletterSubmit} className="space-y-3">
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={t.newsletter.placeholder}
                  className="w-full px-4 py-3 bg-accent-700 border border-accent-600 rounded-lg text-accent-foreground placeholder-accent-300 focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
                  required
                />
              </div>
              
              <button
                type="submit"
                className="w-full bg-primary hover:bg-primary-600 text-primary-foreground px-4 py-3 rounded-lg font-medium transition-colors duration-300 flex items-center justify-center space-x-2"
              >
                <Icon name="Send" size={16} />
                <span>{t.newsletter.subscribe}</span>
              </button>
            </form>

            {subscribeStatus === 'success' && (
              <div className="mt-3 flex items-center space-x-2 text-success">
                <Icon name="CheckCircle" size={16} />
                <span className="text-sm">
                  {currentLanguage === 'fr' ? 'Inscription réussie !' : 'تم الاشتراك بنجاح!'}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-accent-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-sm opacity-80 text-center md:text-left">
              {t.copyright}
            </div>
            
            <div className="flex items-center space-x-2 text-sm opacity-80">
              <span>{t.madeWith}</span>
              <Icon name="Heart" size={16} className="text-red-500 fill-current" />
              <span>{t.by}</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterSection;