import React from 'react';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const FeaturedNews = ({ article, currentLanguage }) => {
  const formatDate = (date) => {
    return new Date(date).toLocaleDateString(currentLanguage === 'fr' ? 'fr-FR' : 'ar-MA', {
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    });
  };

  const getCategoryColor = (category) => {
    const colors = {
      'system': 'bg-primary text-primary-foreground',
      'maintenance': 'bg-warning text-warning-foreground',
      'feature': 'bg-success text-success-foreground',
      'general': 'bg-accent text-accent-foreground'
    };
    return colors[category] || 'bg-accent text-accent-foreground';
  };

  return (
    <div className="bg-gradient-to-r from-primary-50 to-accent-50 border border-primary-200 rounded-lg overflow-hidden shadow-card-hover mb-8">
      <div className="flex flex-col lg:flex-row">
        <div className="lg:w-1/2 relative overflow-hidden">
          <Image
            src={article.image}
            alt={article.title}
            className="w-full h-64 lg:h-full object-cover"
          />
          <div className="absolute top-4 left-4">
            <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getCategoryColor(article.category)}`}>
              {article.categoryLabel}
            </span>
          </div>
          <div className="absolute top-4 right-4 bg-background bg-opacity-90 px-3 py-1 rounded-md">
            <span className="text-sm font-medium text-text-secondary">
              {formatDate(article.publishedAt)}
            </span>
          </div>
        </div>

        <div className="lg:w-1/2 p-8 flex flex-col justify-center">
          <div className="flex items-center space-x-2 mb-4">
            <Icon name="Star" size={16} className="text-primary fill-current" />
            <span className="text-sm font-semibold text-primary">
              {currentLanguage === 'fr' ? 'Article en vedette' : 'مقال مميز'}
            </span>
          </div>

          <h2 className="text-2xl lg:text-3xl font-heading font-bold text-text-primary mb-4 leading-tight">
            {article.title}
          </h2>
          
          <p className="text-text-secondary mb-6 text-lg leading-relaxed">
            {article.excerpt}
          </p>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3 text-sm text-text-muted">
              <Icon name="User" size={16} />
              <span>{article.author}</span>
              <span>•</span>
              <Icon name="Clock" size={16} />
              <span>{article.readTime} min</span>
            </div>
            
            <Button
              variant="primary"
              iconName="ArrowRight"
              iconPosition="right"
            >
              {currentLanguage === 'fr' ? 'Lire l\'article' : 'اقرأ المقال'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturedNews;