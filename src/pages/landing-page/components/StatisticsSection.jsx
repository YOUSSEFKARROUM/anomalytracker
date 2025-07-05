import React, { useState, useEffect, useRef } from 'react';
import Icon from '../../../components/AppIcon';

const StatisticsSection = () => {
  const [currentLanguage, setCurrentLanguage] = useState('fr');
  const [isVisible, setIsVisible] = useState(false);
  const [animatedStats, setAnimatedStats] = useState({
    totalReports: 0,
    resolvedIssues: 0,
    activeUsers: 0,
    avgResolutionTime: 0,
    satisfactionRate: 0,
    monthlyReports: 0
  });
  
  const sectionRef = useRef(null);

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') || 'fr';
    setCurrentLanguage(savedLanguage);
  }, []);

  const translations = {
    fr: {
      title: "Nos Résultats en Chiffres",
      subtitle: "Découvrez l'impact positif de notre plateforme sur la communauté ENSA",
      stats: [
        {
          icon: "FileText",
          value: 2847,
          suffix: "+",
          label: "Signalements Total",
          description: "Problèmes signalés depuis le lancement"
        },
        {
          icon: "CheckCircle",
          value: 2156,
          suffix: "+",
          label: "Problèmes Résolus",
          description: "Taux de résolution de 87%"
        },
        {
          icon: "Users",
          value: 1234,
          suffix: "+",
          label: "Utilisateurs Actifs",
          description: "Étudiants et personnel engagés"
        },
        {
          icon: "Clock",
          value: 2.4,
          suffix: "j",
          label: "Temps de Résolution",
          description: "Délai moyen de traitement"
        },
        {
          icon: "Star",
          value: 94,
          suffix: "%",
          label: "Satisfaction",
          description: "Note moyenne des utilisateurs"
        },
        {
          icon: "TrendingUp",
          value: 156,
          suffix: "/mois",
          label: "Nouveaux Signalements",
          description: "Moyenne mensuelle actuelle"
        }
      ]
    },
    ar: {
      title: "نتائجنا بالأرقام",
      subtitle: "اكتشف التأثير الإيجابي لمنصتنا على مجتمع المدرسة الوطنية للعلوم التطبيقية",
      stats: [
        {
          icon: "FileText",
          value: 2847,
          suffix: "+",
          label: "إجمالي التقارير",
          description: "المشاكل المبلغ عنها منذ الإطلاق"
        },
        {
          icon: "CheckCircle",
          value: 2156,
          suffix: "+",
          label: "المشاكل المحلولة",
          description: "معدل الحل 87%"
        },
        {
          icon: "Users",
          value: 1234,
          suffix: "+",
          label: "المستخدمون النشطون",
          description: "الطلاب والموظفون المشاركون"
        },
        {
          icon: "Clock",
          value: 2.4,
          suffix: "ي",
          label: "وقت الحل",
          description: "متوسط وقت المعالجة"
        },
        {
          icon: "Star",
          value: 94,
          suffix: "%",
          label: "الرضا",
          description: "متوسط تقييم المستخدمين"
        },
        {
          icon: "TrendingUp",
          value: 156,
          suffix: "/شهر",
          label: "التقارير الجديدة",
          description: "المتوسط الشهري الحالي"
        }
      ]
    }
  };

  const t = translations[currentLanguage];

  const targetStats = {
    totalReports: 2847,
    resolvedIssues: 2156,
    activeUsers: 1234,
    avgResolutionTime: 2.4,
    satisfactionRate: 94,
    monthlyReports: 156
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [isVisible]);

  useEffect(() => {
    if (!isVisible) return;

    const duration = 2500;
    const steps = 60;
    const stepDuration = duration / steps;

    let currentStep = 0;
    const timer = setInterval(() => {
      currentStep++;
      const progress = Math.min(currentStep / steps, 1);
      
      setAnimatedStats({
        totalReports: Math.floor(targetStats.totalReports * progress),
        resolvedIssues: Math.floor(targetStats.resolvedIssues * progress),
        activeUsers: Math.floor(targetStats.activeUsers * progress),
        avgResolutionTime: Math.floor(targetStats.avgResolutionTime * progress * 10) / 10,
        satisfactionRate: Math.floor(targetStats.satisfactionRate * progress),
        monthlyReports: Math.floor(targetStats.monthlyReports * progress)
      });

      if (currentStep >= steps) {
        clearInterval(timer);
        setAnimatedStats(targetStats);
      }
    }, stepDuration);

    return () => clearInterval(timer);
  }, [isVisible]);

  const getAnimatedValue = (index) => {
    const values = [
      animatedStats.totalReports,
      animatedStats.resolvedIssues,
      animatedStats.activeUsers,
      animatedStats.avgResolutionTime,
      animatedStats.satisfactionRate,
      animatedStats.monthlyReports
    ];
    return values[index];
  };

  return (
    <section ref={sectionRef} className="py-20 bg-gradient-to-br from-primary-50 to-accent-50">
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

        {/* Statistics Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {t.stats.map((stat, index) => (
            <div
              key={index}
              className="bg-background rounded-xl p-6 shadow-card hover:shadow-card-hover transition-all duration-300 border border-border hover:border-primary-200 group"
            >
              {/* Icon */}
              <div className="w-12 h-12 bg-primary-100 group-hover:bg-primary rounded-lg flex items-center justify-center mb-4 transition-all duration-300">
                <Icon 
                  name={stat.icon} 
                  size={24} 
                  className="text-primary group-hover:text-primary-foreground transition-colors duration-300" 
                />
              </div>

              {/* Value */}
              <div className="mb-2">
                <span className="text-3xl sm:text-4xl font-bold text-text-primary">
                  {getAnimatedValue(index).toLocaleString()}
                </span>
                <span className="text-2xl font-bold text-primary ml-1">
                  {stat.suffix}
                </span>
              </div>

              {/* Label */}
              <h3 className="text-lg font-heading font-semibold text-text-primary mb-2">
                {stat.label}
              </h3>

              {/* Description */}
              <p className="text-sm text-text-secondary">
                {stat.description}
              </p>

              {/* Progress Bar */}
              <div className="mt-4 w-full bg-border rounded-full h-1">
                <div 
                  className="bg-primary h-1 rounded-full transition-all duration-1000 ease-out"
                  style={{ 
                    width: isVisible ? '100%' : '0%',
                    transitionDelay: `${index * 200}ms`
                  }}
                ></div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Achievement */}
        <div className="mt-16 text-center">
          <div className="inline-flex items-center px-6 py-3 bg-success-100 text-success-700 rounded-full">
            <Icon name="Award" size={20} className="mr-2" />
            <span className="font-semibold">
              {currentLanguage === 'fr' ?'Plateforme certifiée pour l\'excellence en gestion des anomalies' :'منصة معتمدة للتميز في إدارة الشذوذات'
              }
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StatisticsSection;