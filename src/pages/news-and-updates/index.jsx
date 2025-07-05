import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import AuthenticatedHeader from '../../components/ui/AuthenticatedHeader';
import NewsCard from './components/NewsCard';
import NewsFilters from './components/NewsFilters';
import NewsPagination from './components/NewsPagination';
import NewsSkeletonLoader from './components/NewsSkeletonLoader';
import FeaturedNews from './components/FeaturedNews';
import NewsStats from './components/NewsStats';
import Icon from '../../components/AppIcon';

const NewsAndUpdates = () => {
  const [currentLanguage, setCurrentLanguage] = useState('fr');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('newest');
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [articles, setArticles] = useState([]);
  const [featuredArticle, setFeaturedArticle] = useState(null);
  const [stats, setStats] = useState({});

  const articlesPerPage = 6;

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') || 'fr';
    setCurrentLanguage(savedLanguage);
  }, []);

  useEffect(() => {
    // Simulate loading data
    const loadData = async () => {
      setIsLoading(true);
      
      // Mock data
      const mockArticles = [
        {
          id: 1,
          title: currentLanguage === 'fr' ? "Nouvelle mise à jour du système de signalement d'anomalies" :"تحديث جديد لنظام الإبلاغ عن الشذوذ",
          excerpt: currentLanguage === 'fr' ? "Découvrez les nouvelles fonctionnalités qui améliorent l'expérience utilisateur et la rapidité de traitement des signalements." :"اكتشف الميزات الجديدة التي تحسن تجربة المستخدم وسرعة معالجة التقارير.",
          content: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.\n\nUt enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.\n\nDuis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.`,
          image: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&h=600&fit=crop",
          category: 'system',
          categoryLabel: currentLanguage === 'fr' ? 'Système' : 'النظام',
          author: currentLanguage === 'fr' ? 'Équipe Technique' : 'الفريق التقني',
          publishedAt: new Date('2024-01-15'),
          readTime: 5,
          featured: true
        },
        {
          id: 2,
          title: currentLanguage === 'fr' 
            ? "Maintenance programmée du serveur - 20 Janvier 2024" :"صيانة مجدولة للخادم - 20 يناير 2024",
          excerpt: currentLanguage === 'fr'
            ? "Une maintenance programmée aura lieu le 20 janvier de 2h00 à 4h00. Les services seront temporairement indisponibles." :"ستتم صيانة مجدولة في 20 يناير من الساعة 2:00 إلى 4:00. ستكون الخدمات غير متاحة مؤقتاً.",
          content: `Maintenance details and procedures will be outlined here.\n\nExpected downtime: 2 hours\nAffected services: All reporting functions\nAlternative contact: emergency@ensa.ma`,
          image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&h=600&fit=crop",
          category: 'maintenance',
          categoryLabel: currentLanguage === 'fr' ? 'Maintenance' : 'الصيانة',
          author: currentLanguage === 'fr' ? 'Admin Système' : 'مدير النظام',
          publishedAt: new Date('2024-01-12'),
          readTime: 3,
          featured: false
        },
        {
          id: 3,
          title: currentLanguage === 'fr' 
            ? "Nouvelle fonctionnalité : Suivi en temps réel" :"ميزة جديدة: التتبع في الوقت الفعلي",
          excerpt: currentLanguage === 'fr'
            ? "Suivez maintenant vos signalements en temps réel avec des notifications push et des mises à jour automatiques."
            : "تتبع تقاريرك الآن في الوقت الفعلي مع إشعارات فورية وتحديثات تلقائية.",
          content: `Real-time tracking feature allows users to monitor their reports instantly.\n\nKey features:\n- Live status updates\n- Push notifications\n- Automatic refresh\n- Mobile optimization`,
          image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop",
          category: 'feature',
          categoryLabel: currentLanguage === 'fr' ? 'Fonctionnalités' : 'الميزات',
          author: currentLanguage === 'fr' ? 'Équipe Développement' : 'فريق التطوير',
          publishedAt: new Date('2024-01-10'),
          readTime: 4,
          featured: false
        },
        {
          id: 4,
          title: currentLanguage === 'fr' ? "Guide d'utilisation de la plateforme AnomalyTracker" :"دليل استخدام منصة AnomalyTracker",
          excerpt: currentLanguage === 'fr'
            ? "Un guide complet pour vous aider à utiliser efficacement toutes les fonctionnalités de la plateforme."
            : "دليل شامل لمساعدتك على استخدام جميع ميزات المنصة بفعالية.",
          content: `Complete user guide covering all platform features.\n\nTopics covered:\n- Account setup\n- Reporting process\n- Tracking submissions\n- Communication tools`,
          image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&h=600&fit=crop",
          category: 'general',
          categoryLabel: currentLanguage === 'fr' ? 'Général' : 'عام',
          author: currentLanguage === 'fr' ? 'Support Utilisateur' : 'دعم المستخدم',
          publishedAt: new Date('2024-01-08'),
          readTime: 8,
          featured: false
        },
        {
          id: 5,
          title: currentLanguage === 'fr' 
            ? "Amélioration de la sécurité des données" 
            : "تحسين أمان البيانات",
          excerpt: currentLanguage === 'fr'
            ? "Nouvelles mesures de sécurité implémentées pour protéger vos données personnelles et vos signalements."
            : "تدابير أمنية جديدة تم تنفيذها لحماية بياناتك الشخصية وتقاريرك.",
          content: `Enhanced security measures have been implemented to protect user data.\n\nSecurity improvements:\n- End-to-end encryption\n- Two-factor authentication\n- Regular security audits\n- GDPR compliance`,
          image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&h=600&fit=crop",
          category: 'system',
          categoryLabel: currentLanguage === 'fr' ? 'Système' : 'النظام',
          author: currentLanguage === 'fr' ? 'Équipe Sécurité' : 'فريق الأمان',
          publishedAt: new Date('2024-01-05'),
          readTime: 6,
          featured: false
        },
        {
          id: 6,
          title: currentLanguage === 'fr' 
            ? "Statistiques mensuelles - Décembre 2023" :"إحصائيات شهرية - ديسمبر 2023",
          excerpt: currentLanguage === 'fr'
            ? "Découvrez les statistiques du mois de décembre : 245 signalements traités, 98% de satisfaction utilisateur." :"اكتشف إحصائيات شهر ديسمبر: 245 تقريراً تم معالجته، 98% رضا المستخدمين.",
          content: `Monthly statistics report for December 2023.\n\nKey metrics:\n- 245 reports processed\n- 98% user satisfaction\n- Average resolution time: 2.3 days\n- 15% increase in user engagement`,
          image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop",
          category: 'general',
          categoryLabel: currentLanguage === 'fr' ? 'Général' : 'عام',
          author: currentLanguage === 'fr' ? 'Équipe Analytics' : 'فريق التحليلات',
          publishedAt: new Date('2024-01-03'),
          readTime: 5,
          featured: false
        }
      ];

      const mockStats = {
        totalArticles: 156,
        thisMonth: 12,
        categories: 4,
        lastUpdate: currentLanguage === 'fr' ? '15 Jan 2024' : '15 يناير 2024'
      };

      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1500));

      setArticles(mockArticles);
      setFeaturedArticle(mockArticles.find(article => article.featured));
      setStats(mockStats);
      setIsLoading(false);
    };

    loadData();
  }, [currentLanguage]);

  const filteredArticles = articles.filter(article => {
    const matchesCategory = selectedCategory === 'all' || article.category === selectedCategory;
    const matchesSearch = article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         article.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch && !article.featured;
  });

  const sortedArticles = [...filteredArticles].sort((a, b) => {
    switch (sortBy) {
      case 'oldest':
        return new Date(a.publishedAt) - new Date(b.publishedAt);
      case 'relevance':
        return searchTerm ? 
          b.title.toLowerCase().includes(searchTerm.toLowerCase()) - 
          a.title.toLowerCase().includes(searchTerm.toLowerCase()) : 0;
      default: // newest
        return new Date(b.publishedAt) - new Date(a.publishedAt);
    }
  });

  const totalPages = Math.ceil(sortedArticles.length / articlesPerPage);
  const paginatedArticles = sortedArticles.slice(
    (currentPage - 1) * articlesPerPage,
    currentPage * articlesPerPage
  );

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setCurrentPage(1);
  };

  const handleSearchChange = (term) => {
    setSearchTerm(term);
    setCurrentPage(1);
  };

  const handleSortChange = (sort) => {
    setSortBy(sort);
    setCurrentPage(1);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const mockUser = {
    name: currentLanguage === 'fr' ? 'Ahmed Benali' : 'أحمد بن علي',
    email: 'ahmed.benali@ensa.ma',
    role: 'student'
  };

  const mockNotifications = [
    {
      id: 1,
      title: currentLanguage === 'fr' ? 'Nouveau message' : 'رسالة جديدة',
      read: false
    }
  ];

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    window.location.href = '/landing-page';
  };

  const translations = {
    fr: {
      title: 'Actualités et Mises à Jour',
      subtitle: 'Restez informé des dernières nouvelles et améliorations de la plateforme AnomalyTracker',
      noResults: 'Aucun article trouvé',
      noResultsDesc: 'Essayez de modifier vos critères de recherche ou de filtrage.',
      loadingError: 'Erreur lors du chargement des articles',
      retry: 'Réessayer'
    },
    ar: {
      title: 'الأخبار والتحديثات',
      subtitle: 'ابق على اطلاع بآخر الأخبار وتحسينات منصة AnomalyTracker',
      noResults: 'لم يتم العثور على مقالات',
      noResultsDesc: 'حاول تعديل معايير البحث أو التصفية.',
      loadingError: 'خطأ في تحميل المقالات',
      retry: 'إعادة المحاولة'
    }
  };

  const t = translations[currentLanguage];

  return (
    <>
      <Helmet>
        <title>{t.title} - AnomalyTracker</title>
        <meta name="description" content={t.subtitle} />
      </Helmet>

      <div className="min-h-screen bg-surface">
        <AuthenticatedHeader
          user={mockUser}
          notifications={mockNotifications}
          onLogout={handleLogout}
        />

        <main className="pt-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {/* Header Section */}
            <div className="text-center mb-12">
              <div className="flex items-center justify-center space-x-3 mb-4">
                <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center">
                  <Icon name="Newspaper" size={24} className="text-primary-foreground" />
                </div>
                <h1 className="text-3xl lg:text-4xl font-heading font-bold text-text-primary">
                  {t.title}
                </h1>
              </div>
              <p className="text-lg text-text-secondary max-w-3xl mx-auto">
                {t.subtitle}
              </p>
            </div>

            {/* Stats Section */}
            {!isLoading && <NewsStats stats={stats} currentLanguage={currentLanguage} />}

            {/* Featured Article */}
            {!isLoading && featuredArticle && (
              <FeaturedNews article={featuredArticle} currentLanguage={currentLanguage} />
            )}

            {/* Filters */}
            {!isLoading && (
              <NewsFilters
                currentLanguage={currentLanguage}
                selectedCategory={selectedCategory}
                onCategoryChange={handleCategoryChange}
                searchTerm={searchTerm}
                onSearchChange={handleSearchChange}
                sortBy={sortBy}
                onSortChange={handleSortChange}
              />
            )}

            {/* Content Section */}
            {isLoading ? (
              <NewsSkeletonLoader count={6} />
            ) : paginatedArticles.length > 0 ? (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {paginatedArticles.map((article) => (
                    <NewsCard
                      key={article.id}
                      article={article}
                      currentLanguage={currentLanguage}
                    />
                  ))}
                </div>

                <NewsPagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={handlePageChange}
                  currentLanguage={currentLanguage}
                />
              </>
            ) : (
              <div className="text-center py-16">
                <div className="w-24 h-24 bg-surface rounded-full flex items-center justify-center mx-auto mb-6">
                  <Icon name="Search" size={32} className="text-text-muted" />
                </div>
                <h3 className="text-xl font-heading font-semibold text-text-primary mb-2">
                  {t.noResults}
                </h3>
                <p className="text-text-secondary mb-6">
                  {t.noResultsDesc}
                </p>
              </div>
            )}
          </div>
        </main>
      </div>
    </>
  );
};

export default NewsAndUpdates;