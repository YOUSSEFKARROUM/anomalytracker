import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const HeroSection = () => {
  const [currentLanguage, setCurrentLanguage] = useState('fr');

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') || 'fr';
    setCurrentLanguage(savedLanguage);
  }, []);

  const translations = {
    fr: {
      title: "Signalez et Suivez les Anomalies",
      subtitle: "ENSA Béni Mellal",
      description: "Plateforme moderne pour signaler, suivre et résoudre efficacement les problèmes d'infrastructure de votre établissement. Rejoignez notre communauté pour améliorer ensemble notre environnement d'apprentissage.",
      getStarted: "Commencer",
      learnMore: "En savoir plus",
      stats: {
        resolved: "Anomalies Résolues",
        users: "Utilisateurs Actifs",
        satisfaction: "Satisfaction"
      }
    },
    ar: {
      title: "الإبلاغ عن الشذوذات وتتبعها",
      subtitle: "المدرسة الوطنية للعلوم التطبيقية ببني ملال",
      description: "منصة حديثة للإبلاغ عن مشاكل البنية التحتية وتتبعها وحلها بكفاءة في مؤسستك. انضم إلى مجتمعنا لتحسين بيئة التعلم معًا.",
      getStarted: "ابدأ الآن",
      learnMore: "اعرف المزيد",
      stats: {
        resolved: "الشذوذات المحلولة",
        users: "المستخدمون النشطون",
        satisfaction: "الرضا"
      }
    }
  };

  const t = translations[currentLanguage];

  const [animatedStats, setAnimatedStats] = useState({
    resolved: 0,
    users: 0,
    satisfaction: 0
  });

  const targetStats = {
    resolved: 1247,
    users: 892,
    satisfaction: 94
  };

  useEffect(() => {
    const duration = 2000;
    const steps = 60;
    const stepDuration = duration / steps;

    let currentStep = 0;
    const timer = setInterval(() => {
      currentStep++;
      const progress = currentStep / steps;
      
      setAnimatedStats({
        resolved: Math.floor(targetStats.resolved * progress),
        users: Math.floor(targetStats.users * progress),
        satisfaction: Math.floor(targetStats.satisfaction * progress)
      });

      if (currentStep >= steps) {
        clearInterval(timer);
        setAnimatedStats(targetStats);
      }
    }, stepDuration);

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative bg-gradient-to-br from-primary-50 via-background to-accent-50 pt-20 pb-16 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 w-32 h-32 bg-primary rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-accent rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-secondary rounded-full blur-3xl"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[600px]">
          {/* Content */}
          <div className="text-center lg:text-left space-y-8">
            <div className="space-y-4">
              <div className="inline-flex items-center px-4 py-2 bg-primary-100 text-primary-700 rounded-full text-sm font-medium">
                <Icon name="Zap" size={16} className="mr-2" />
                Nouveau système de signalement
              </div>
              
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-heading font-bold text-text-primary leading-tight">
                {t.title}
                <span className="block text-primary mt-2">{t.subtitle}</span>
              </h1>
              
              <p className="text-lg sm:text-xl text-text-secondary max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                {t.description}
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link to="/authentication-login-register">
                <Button 
                  variant="primary" 
                  size="lg"
                  iconName="ArrowRight"
                  iconPosition="right"
                  className="w-full sm:w-auto"
                >
                  {t.getStarted}
                </Button>
              </Link>
              
              <Button 
                variant="outline" 
                size="lg"
                iconName="Play"
                iconPosition="left"
                className="w-full sm:w-auto"
                onClick={() => document.getElementById('features').scrollIntoView({ behavior: 'smooth' })}
              >
                {t.learnMore}
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 pt-8 border-t border-border">
              <div className="text-center lg:text-left">
                <div className="text-2xl sm:text-3xl font-bold text-primary">
                  {animatedStats.resolved.toLocaleString()}+
                </div>
                <div className="text-sm text-text-secondary font-medium">
                  {t.stats.resolved}
                </div>
              </div>
              
              <div className="text-center lg:text-left">
                <div className="text-2xl sm:text-3xl font-bold text-accent">
                  {animatedStats.users.toLocaleString()}+
                </div>
                <div className="text-sm text-text-secondary font-medium">
                  {t.stats.users}
                </div>
              </div>
              
              <div className="text-center lg:text-left">
                <div className="text-2xl sm:text-3xl font-bold text-success">
                  {animatedStats.satisfaction}%
                </div>
                <div className="text-sm text-text-secondary font-medium">
                  {t.stats.satisfaction}
                </div>
              </div>
            </div>
          </div>

          {/* Hero Image/Illustration */}
          <div className="relative">
            <div className="relative bg-background rounded-2xl shadow-xl p-8 border border-border">
              {/* Mock Dashboard Preview */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                      <Icon name="AlertTriangle" size={16} className="text-primary-foreground" />
                    </div>
                    <span className="font-semibold text-text-primary">AnomalyTracker</span>
                  </div>
                  <div className="flex space-x-2">
                    <div className="w-3 h-3 bg-error rounded-full"></div>
                    <div className="w-3 h-3 bg-warning rounded-full"></div>
                    <div className="w-3 h-3 bg-success rounded-full"></div>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-primary-50 rounded-lg p-4">
                    <div className="text-2xl font-bold text-primary">24</div>
                    <div className="text-sm text-text-secondary">En cours</div>
                  </div>
                  <div className="bg-success-50 rounded-lg p-4">
                    <div className="text-2xl font-bold text-success">156</div>
                    <div className="text-sm text-text-secondary">Résolues</div>
                  </div>
                </div>
                
                <div className="space-y-3">
                  {[
                    { title: "Éclairage défaillant - Salle A101", status: "En cours", priority: "high" },
                    { title: "Problème de climatisation - Bibliothèque", status: "Résolu", priority: "medium" },
                    { title: "Fuite d'eau - Toilettes RDC", status: "Nouveau", priority: "high" }
                  ].map((item, index) => (
                    <div key={index} className="flex items-center space-x-3 p-3 bg-surface rounded-lg">
                      <div className={`w-2 h-2 rounded-full ${
                        item.priority === 'high' ? 'bg-error' : 'bg-warning'
                      }`}></div>
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-medium text-text-primary truncate">
                          {item.title}
                        </div>
                        <div className="text-xs text-text-secondary">
                          {item.status}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Floating Elements */}
            <div className="absolute -top-4 -right-4 w-16 h-16 bg-primary rounded-full flex items-center justify-center shadow-lg animate-bounce">
              <Icon name="CheckCircle" size={24} className="text-primary-foreground" />
            </div>
            
            <div className="absolute -bottom-4 -left-4 w-12 h-12 bg-accent rounded-full flex items-center justify-center shadow-lg">
              <Icon name="Bell" size={16} className="text-accent-foreground" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;