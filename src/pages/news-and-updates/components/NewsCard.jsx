import React from 'react';

import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const NewsCard = ({ article, currentLanguage }) => {
  const formatDate = (date) => {
    return new Date(date).toLocaleDateString(currentLanguage === 'fr' ? 'fr-FR' : 'ar-MA', {
      day: '2-digit',
      month: '2-digit',
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
    <div className="bg-background border border-border rounded-lg shadow-card hover:shadow-card-hover transition-smooth overflow-hidden group">
      <div className="relative overflow-hidden">
        <Image
          src={article.image}
          alt={article.title}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-3 left-3">
          <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getCategoryColor(article.category)}`}>
            {article.categoryLabel}
          </span>
        </div>
        <div className="absolute top-3 right-3 bg-background bg-opacity-90 px-2 py-1 rounded-md">
          <span className="text-xs font-medium text-text-secondary">
            {formatDate(article.publishedAt)}
          </span>
        </div>
      </div>

      <div className="p-6">
        <h3 className="text-lg font-heading font-semibold text-text-primary mb-2 line-clamp-2 group-hover:text-primary transition-smooth">
          {article.title}
        </h3>
        
        <p className="text-text-secondary text-sm mb-4 line-clamp-3">
          {article.excerpt}
        </p>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2 text-xs text-text-muted">
            <Icon name="User" size={14} />
            <span>{article.author}</span>
          </div>
          
          <Button
            variant="ghost"
            size="sm"
            iconName="ArrowRight"
            iconPosition="right"
            className="text-primary hover:text-primary-600"
          >
            {currentLanguage === 'fr' ? 'Lire plus' : 'اقرأ المزيد'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NewsCard;