import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const AboutSection = () => {
  const [currentLanguage, setCurrentLanguage] = useState('fr');

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') || 'fr';
    setCurrentLanguage(savedLanguage);
  }, []);

  const translations = {
    fr: {
      title: "À propos d\'AnomalyTracker",
      subtitle: "Notre mission est de créer un environnement d\'apprentissage optimal pour tous",
      description: `AnomalyTracker est né de la volonté d'améliorer la qualité de vie étudiante à l'ENSA Béni Mellal. Notre plateforme moderne permet à chaque membre de la communauté universitaire de contribuer activement à l'amélioration de l'infrastructure et des services.

Nous croyons fermement que la collaboration entre étudiants, personnel et administration est la clé d'un environnement d'apprentissage exceptionnel. Grâce à notre système de signalement intuitif et transparent, nous transformons la façon dont les problèmes sont identifiés, traités et résolus.`,
      mission: {
        title: "Notre Mission",
        content: "Faciliter la communication entre tous les acteurs de l\'ENSA pour créer un campus plus sûr, plus fonctionnel et plus agréable pour l\'apprentissage et le travail."
      },
      vision: {
        title: "Notre Vision",
        content: "Devenir la référence en matière de gestion collaborative des infrastructures dans les établissements d\'enseignement supérieur au Maroc."
      },
      values: [
        {
          icon: "Users",
          title: "Collaboration",
          description: "Nous encourageons la participation active de toute la communauté universitaire"
        },
        {
          icon: "Eye",
          title: "Transparence",
          description: "Chaque signalement est suivi de manière transparente et accessible"
        },
        {
          icon: "Zap",
          title: "Efficacité",
          description: "Nous optimisons les processus pour des résolutions rapides et efficaces"
        },
        {
          icon: "Shield",
          title: "Fiabilité",
          description: "Notre plateforme garantit la sécurité et la confidentialité des données"
        }
      ],
      cta: "Rejoignez-nous",
      team: {
        title: "Notre Équipe",
        members: [
          {
            name: "Dr. Hassan Alami",
            role: "Directeur du Projet",
            avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&h=150&fit=crop&crop=face",
            description: "Expert en systèmes d'information"
          },
          {
            name: "Amina Berrada",
            role: "Responsable Technique",
            avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&h=150&fit=crop&crop=face",
            description: "Ingénieure en développement web"
          },
          {
            name: "Omar Tazi",
            role: "Coordinateur Étudiant",
            avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&h=150&fit=crop&crop=face",
            description: "Représentant des étudiants"
          }
        ]
      }
    },
    ar: {
      title: "حول AnomalyTracker",
      subtitle: "مهمتنا هي خلق بيئة تعلم مثلى للجميع",
      description: `وُلد AnomalyTracker من الرغبة في تحسين جودة الحياة الطلابية في المدرسة الوطنية للعلوم التطبيقية ببني ملال. تتيح منصتنا الحديثة لكل عضو في المجتمع الجامعي المساهمة بنشاط في تحسين البنية التحتية والخدمات.

نؤمن إيماناً راسخاً بأن التعاون بين الطلاب والموظفين والإدارة هو مفتاح بيئة تعلم استثنائية. بفضل نظام الإبلاغ البديهي والشفاف، نحول طريقة تحديد المشاكل ومعالجتها وحلها.`,
      mission: {
        title: "مهمتنا",
        content: "تسهيل التواصل بين جميع أطراف المدرسة الوطنية للعلوم التطبيقية لخلق حرم جامعي أكثر أماناً ووظيفية ومتعة للتعلم والعمل."
      },
      vision: {
        title: "رؤيتنا",
        content: "أن نصبح المرجع في إدارة البنية التحتية التعاونية في مؤسسات التعليم العالي في المغرب."
      },
      values: [
        {
          icon: "Users",
          title: "التعاون",
          description: "نشجع المشاركة النشطة لكامل المجتمع الجامعي"
        },
        {
          icon: "Eye",
          title: "الشفافية",
          description: "كل تقرير يتم متابعته بشكل شفاف ومتاح"
        },
        {
          icon: "Zap",
          title: "الكفاءة",
          description: "نحسن العمليات للحصول على حلول سريعة وفعالة"
        },
        {
          icon: "Shield",
          title: "الموثوقية",
          description: "تضمن منصتنا أمان وسرية البيانات"
        }
      ],
      cta: "انضم إلينا",
      team: {
        title: "فريقنا",
        members: [
          {
            name: "د. حسان العلمي",
            role: "مدير المشروع",
            avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&h=150&fit=crop&crop=face",
            description: "خبير في أنظمة المعلومات"
          },
          {
            name: "أمينة برادة",
            role: "المسؤولة التقنية",
            avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&h=150&fit=crop&crop=face",
            description: "مهندسة في تطوير الويب"
          },
          {
            name: "عمر التازي",
            role: "المنسق الطلابي",
            avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&h=150&fit=crop&crop=face",
            description: "ممثل الطلاب"
          }
        ]
      }
    }
  };

  const t = translations[currentLanguage];

  return (
    <section id="about" className="py-20 bg-surface">
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

        {/* Main Content */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
          {/* Text Content */}
          <div className="space-y-6">
            <div className="prose prose-lg max-w-none">
              <p className="text-text-secondary leading-relaxed">
                {t.description}
              </p>
            </div>

            {/* Mission & Vision */}
            <div className="space-y-6">
              <div className="bg-background rounded-xl p-6 border border-border">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Icon name="Target" size={24} className="text-primary" />
                  </div>
                  <div>
                    <h3 className="text-lg font-heading font-semibold text-text-primary mb-2">
                      {t.mission.title}
                    </h3>
                    <p className="text-text-secondary">
                      {t.mission.content}
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-background rounded-xl p-6 border border-border">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-accent-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Icon name="Telescope" size={24} className="text-accent" />
                  </div>
                  <div>
                    <h3 className="text-lg font-heading font-semibold text-text-primary mb-2">
                      {t.vision.title}
                    </h3>
                    <p className="text-text-secondary">
                      {t.vision.content}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* CTA */}
            <div className="pt-4">
              <Link to="/authentication-login-register">
                <Button 
                  variant="primary" 
                  size="lg"
                  iconName="ArrowRight"
                  iconPosition="right"
                >
                  {t.cta}
                </Button>
              </Link>
            </div>
          </div>

          {/* Visual Content */}
          <div className="relative">
            <div className="bg-background rounded-2xl p-8 shadow-card border border-border">
              {/* ENSA Building Image */}
              <div className="relative mb-6">
                <Image
                  src="https://images.unsplash.com/photo-1562774053-701939374585?w=500&h=300&fit=crop"
                  alt="ENSA Béni Mellal Campus"
                  className="w-full h-48 object-cover rounded-xl"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-xl"></div>
                <div className="absolute bottom-4 left-4 text-white">
                  <h4 className="font-semibold">ENSA Béni Mellal</h4>
                  <p className="text-sm opacity-90">Campus Principal</p>
                </div>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-4 bg-primary-50 rounded-lg">
                  <div className="text-2xl font-bold text-primary">2000+</div>
                  <div className="text-sm text-text-secondary">Étudiants</div>
                </div>
                <div className="text-center p-4 bg-accent-50 rounded-lg">
                  <div className="text-2xl font-bold text-accent">150+</div>
                  <div className="text-sm text-text-secondary">Personnel</div>
                </div>
              </div>
            </div>

            {/* Floating Elements */}
            <div className="absolute -top-4 -right-4 w-16 h-16 bg-success rounded-full flex items-center justify-center shadow-lg">
              <Icon name="CheckCircle" size={24} className="text-success-foreground" />
            </div>
          </div>
        </div>

        {/* Values */}
        <div className="mb-20">
          <h3 className="text-2xl font-heading font-bold text-text-primary text-center mb-12">
            {currentLanguage === 'fr' ? 'Nos Valeurs' : 'قيمنا'}
          </h3>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {t.values.map((value, index) => (
              <div
                key={index}
                className="bg-background rounded-xl p-6 text-center border border-border hover:border-primary-200 hover:shadow-card-hover transition-all duration-300 group"
              >
                <div className="w-16 h-16 bg-primary-100 group-hover:bg-primary rounded-full flex items-center justify-center mx-auto mb-4 transition-all duration-300">
                  <Icon 
                    name={value.icon} 
                    size={24} 
                    className="text-primary group-hover:text-primary-foreground transition-colors duration-300" 
                  />
                </div>
                <h4 className="text-lg font-heading font-semibold text-text-primary mb-2">
                  {value.title}
                </h4>
                <p className="text-sm text-text-secondary">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Team */}
        <div>
          <h3 className="text-2xl font-heading font-bold text-text-primary text-center mb-12">
            {t.team.title}
          </h3>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {t.team.members.map((member, index) => (
              <div
                key={index}
                className="bg-background rounded-xl p-6 text-center border border-border hover:border-primary-200 hover:shadow-card-hover transition-all duration-300"
              >
                <div className="w-20 h-20 mx-auto mb-4 rounded-full overflow-hidden border-4 border-primary-200">
                  <Image
                    src={member.avatar}
                    alt={member.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h4 className="text-lg font-heading font-semibold text-text-primary mb-1">
                  {member.name}
                </h4>
                <p className="text-primary font-medium mb-2">
                  {member.role}
                </p>
                <p className="text-sm text-text-secondary">
                  {member.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;