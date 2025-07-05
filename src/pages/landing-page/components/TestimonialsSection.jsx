import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const TestimonialsSection = () => {
  const [currentLanguage, setCurrentLanguage] = useState('fr');
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') || 'fr';
    setCurrentLanguage(savedLanguage);
  }, []);

  const translations = {
    fr: {
      title: "Ce que disent nos utilisateurs",
      subtitle: "Découvrez les témoignages de la communauté ENSA Béni Mellal",
      testimonials: [
        {
          name: "Sarah Benali",
          role: "Étudiante en Génie Informatique",
          avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
          content: `Grâce à AnomalyTracker, j'ai pu signaler rapidement un problème d'éclairage dans ma salle de classe. Le problème a été résolu en moins de 48 heures ! L'interface est intuitive et les notifications en temps réel sont très pratiques.`,
          rating: 5
        },
        {
          name: "Ahmed Tazi",
          role: "Professeur - Département Génie Civil",
          avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
          content: `En tant qu'enseignant, j'apprécie la transparence du système. Je peux suivre l'état des signalements de mes étudiants et voir les améliorations apportées à notre infrastructure. C'est un outil formidable pour notre établissement.`,
          rating: 5
        },
        {
          name: "Fatima El Mansouri",
          role: "Responsable Maintenance",
          avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
          content: `Du côté administratif, cette plateforme nous a permis d'optimiser notre gestion des interventions. Les rapports détaillés et les statistiques nous aident à prioriser les réparations et à améliorer notre temps de réponse.`,
          rating: 5
        },
        {
          name: "Youssef Alami",
          role: "Étudiant en Génie Électrique",
          avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
          content: `L'application mobile est parfaite ! Je peux signaler des problèmes directement depuis mon téléphone avec des photos. Le système de suivi me permet de voir quand mes signalements sont pris en charge.`,
          rating: 5
        },
        {
          name: "Khadija Berrada",
          role: "Étudiante en Génie Industriel",
          avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face",
          content: `Je recommande vivement cette plateforme à tous les étudiants. Elle nous donne une voix pour améliorer notre environnement d'étude. L'équipe de support est très réactive et professionnelle.`,
          rating: 5
        }
      ]
    },
    ar: {
      title: "ما يقوله مستخدمونا",
      subtitle: "اكتشف شهادات مجتمع المدرسة الوطنية للعلوم التطبيقية ببني ملال",
      testimonials: [
        {
          name: "سارة بنعلي",
          role: "طالبة في الهندسة المعلوماتية",
          avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
          content: `بفضل AnomalyTracker، تمكنت من الإبلاغ بسرعة عن مشكلة في الإضاءة في قاعة الدراسة. تم حل المشكلة في أقل من 48 ساعة! الواجهة بديهية والإشعارات الفورية عملية جداً.`,
          rating: 5
        },
        {
          name: "أحمد التازي",
          role: "أستاذ - قسم الهندسة المدنية",
          avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
          content: `كمدرس، أقدر شفافية النظام. يمكنني متابعة حالة تقارير طلابي ورؤية التحسينات المطبقة على بنيتنا التحتية. إنها أداة رائعة لمؤسستنا.`,
          rating: 5
        },
        {
          name: "فاطمة المنصوري",
          role: "مسؤولة الصيانة",
          avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
          content: `من الناحية الإدارية، مكنتنا هذه المنصة من تحسين إدارة تدخلاتنا. التقارير المفصلة والإحصائيات تساعدنا في ترتيب أولويات الإصلاحات وتحسين وقت الاستجابة.`,
          rating: 5
        },
        {
          name: "يوسف العلمي",
          role: "طالب في الهندسة الكهربائية",
          avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
          content: `التطبيق المحمول مثالي! يمكنني الإبلاغ عن المشاكل مباشرة من هاتفي مع الصور. نظام التتبع يسمح لي برؤية متى يتم التعامل مع تقاريري.`,
          rating: 5
        },
        {
          name: "خديجة برادة",
          role: "طالبة في الهندسة الصناعية",
          avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face",
          content: `أنصح بشدة بهذه المنصة لجميع الطلاب. تعطينا صوتاً لتحسين بيئة الدراسة. فريق الدعم متجاوب جداً ومهني.`,
          rating: 5
        }
      ]
    }
  };

  const t = translations[currentLanguage];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % t.testimonials.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [t.testimonials.length]);

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % t.testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + t.testimonials.length) % t.testimonials.length);
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Icon
        key={index}
        name="Star"
        size={16}
        className={index < rating ? "text-warning fill-current" : "text-border"}
      />
    ));
  };

  return (
    <section className="py-20 bg-background">
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

        {/* Main Testimonial */}
        <div className="max-w-4xl mx-auto mb-12">
          <div className="bg-surface rounded-2xl p-8 md:p-12 shadow-card border border-border relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary opacity-5 rounded-full -translate-y-16 translate-x-16"></div>
            
            {/* Quote Icon */}
            <div className="absolute top-6 left-6 w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
              <Icon name="Quote" size={24} className="text-primary" />
            </div>

            <div className="relative">
              {/* Content */}
              <div className="text-center mb-8">
                <p className="text-lg md:text-xl text-text-primary leading-relaxed mb-6 italic">
                  "{t.testimonials[currentTestimonial].content}"
                </p>
                
                {/* Rating */}
                <div className="flex justify-center space-x-1 mb-6">
                  {renderStars(t.testimonials[currentTestimonial].rating)}
                </div>
              </div>

              {/* Author */}
              <div className="flex items-center justify-center space-x-4">
                <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-primary-200">
                  <Image
                    src={t.testimonials[currentTestimonial].avatar}
                    alt={t.testimonials[currentTestimonial].name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="text-center sm:text-left">
                  <h4 className="font-heading font-semibold text-text-primary">
                    {t.testimonials[currentTestimonial].name}
                  </h4>
                  <p className="text-sm text-text-secondary">
                    {t.testimonials[currentTestimonial].role}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-center space-x-4 mt-8">
            <button
              onClick={prevTestimonial}
              className="w-10 h-10 bg-surface hover:bg-primary border border-border hover:border-primary rounded-full flex items-center justify-center transition-all duration-300 group"
            >
              <Icon name="ChevronLeft" size={20} className="text-text-secondary group-hover:text-primary-foreground" />
            </button>

            {/* Dots */}
            <div className="flex space-x-2">
              {t.testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentTestimonial(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    index === currentTestimonial ? 'bg-primary w-8' : 'bg-border hover:bg-primary-300'
                  }`}
                />
              ))}
            </div>

            <button
              onClick={nextTestimonial}
              className="w-10 h-10 bg-surface hover:bg-primary border border-border hover:border-primary rounded-full flex items-center justify-center transition-all duration-300 group"
            >
              <Icon name="ChevronRight" size={20} className="text-text-secondary group-hover:text-primary-foreground" />
            </button>
          </div>
        </div>

        {/* All Testimonials Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {t.testimonials.slice(0, 3).map((testimonial, index) => (
            <div
              key={index}
              className={`bg-surface rounded-xl p-6 border border-border hover:border-primary-200 transition-all duration-300 hover:shadow-card-hover ${
                index === currentTestimonial ? 'ring-2 ring-primary ring-opacity-50' : ''
              }`}
            >
              {/* Author */}
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-primary-200">
                  <Image
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-heading font-semibold text-text-primary text-sm">
                    {testimonial.name}
                  </h4>
                  <p className="text-xs text-text-secondary">
                    {testimonial.role}
                  </p>
                </div>
              </div>

              {/* Rating */}
              <div className="flex space-x-1 mb-3">
                {renderStars(testimonial.rating)}
              </div>

              {/* Content */}
              <p className="text-sm text-text-secondary leading-relaxed line-clamp-4">
                "{testimonial.content.substring(0, 120)}..."
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;