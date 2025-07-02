import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';

const FeaturesSection = () => {
  const [currentLanguage, setCurrentLanguage] = useState('fr');

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') || 'fr';
    setCurrentLanguage(savedLanguage);
  }, []);

  const translations = {
    fr: {
      title: "Fonctionnalités Principales",
      subtitle: "Découvrez comment notre plateforme simplifie la gestion des anomalies",
      features: [
        {
          icon: "AlertTriangle",
          title: "Signalement Rapide",
          description: "Signalez facilement les problèmes avec photos, descriptions détaillées et localisation précise en quelques clics."
        },
        {
          icon: "Activity",
          title: "Suivi en Temps Réel",
          description: "Suivez l'état de vos signalements avec des mises à jour automatiques et des notifications push."
        },
        {
          icon: "Users",
          title: "Collaboration Communautaire",
          description: "Travaillez ensemble pour identifier et résoudre les problèmes qui affectent votre environnement d'étude."
        },
        {
          icon: "BarChart3",
          title: "Analyses Détaillées",
          description: "Accédez aux statistiques complètes sur les anomalies résolues et les temps de réponse."
        },
        {
          icon: "Shield",
          title: "Sécurité Garantie",
          description: "Vos données sont protégées avec un système d'authentification sécurisé et un chiffrement avancé."
        },
        {
          icon: "Smartphone",
          title: "Interface Mobile",
          description: "Application responsive optimisée pour tous les appareils, accessible partout et à tout moment."
        }
      ]
    },
    ar: {
      title: "الميزات الرئيسية",
      subtitle: "اكتشف كيف تبسط منصتنا إدارة الشذوذات",
      features: [
        {
          icon: "AlertTriangle",
          title: "الإبلاغ السريع",
          description: "أبلغ عن المشاكل بسهولة مع الصور والأوصاف التفصيلية والموقع الدقيق في بضع نقرات."
        },
        {
          icon: "Activity",
          title: "التتبع في الوقت الفعلي",
          description: "تتبع حالة تقاريرك مع التحديثات التلقائية والإشعارات الفورية."
        },
        {
          icon: "Users",
          title: "التعاون المجتمعي",
          description: "اعملوا معًا لتحديد وحل المشاكل التي تؤثر على بيئة الدراسة الخاصة بكم."
        },
        {
          icon: "BarChart3",
          title: "التحليلات التفصيلية",
          description: "الوصول إلى الإحصائيات الكاملة حول الشذوذات المحلولة وأوقات الاستجابة."
        },
        {
          icon: "Shield",
          title: "الأمان المضمون",
          description: "بياناتك محمية بنظام مصادقة آمن وتشفير متقدم."
        },
        {
          icon: "Smartphone",
          title: "واجهة الهاتف المحمول",
          description: "تطبيق متجاوب محسن لجميع الأجهزة، يمكن الوصول إليه في أي مكان وفي أي وقت."
        }
      ]
    }
  };

  const t = translations[currentLanguage];

  return (
    <section id="features" className="py-20 bg-background">
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

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {t.features.map((feature, index) => (
            <div
              key={index}
              className="group bg-surface hover:bg-background border border-border hover:border-primary-200 rounded-xl p-6 transition-all duration-300 hover:shadow-card-hover hover:-translate-y-1"
            >
              {/* Icon */}
              <div className="w-12 h-12 bg-primary-100 group-hover:bg-primary rounded-lg flex items-center justify-center mb-4 transition-all duration-300">
                <Icon 
                  name={feature.icon} 
                  size={24} 
                  className="text-primary group-hover:text-primary-foreground transition-colors duration-300" 
                />
              </div>

              {/* Content */}
              <h3 className="text-xl font-heading font-semibold text-text-primary mb-3 group-hover:text-primary transition-colors duration-300">
                {feature.title}
              </h3>
              
              <p className="text-text-secondary leading-relaxed">
                {feature.description}
              </p>

              {/* Hover Arrow */}
              <div className="mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <Icon 
                  name="ArrowRight" 
                  size={16} 
                  className="text-primary" 
                />
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <div className="inline-flex items-center px-6 py-3 bg-primary-50 text-primary-700 rounded-full text-sm font-medium">
            <Icon name="Sparkles" size={16} className="mr-2" />
            {currentLanguage === 'fr' ? 'Et bien plus encore...' : 'والمزيد...'}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;