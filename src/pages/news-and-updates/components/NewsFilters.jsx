import React from 'react';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Icon from '../../../components/AppIcon';

const NewsFilters = ({ 
  currentLanguage, 
  selectedCategory, 
  onCategoryChange, 
  searchTerm, 
  onSearchChange,
  sortBy,
  onSortChange 
}) => {
  const translations = {
    fr: {
      search: 'Rechercher des articles...',
      allCategories: 'Toutes les catégories',
      system: 'Système',
      maintenance: 'Maintenance',
      feature: 'Fonctionnalités',
      general: 'Général',
      sortBy: 'Trier par',
      newest: 'Plus récent',
      oldest: 'Plus ancien',
      relevance: 'Pertinence'
    },
    ar: {
      search: 'البحث عن المقالات...',
      allCategories: 'جميع الفئات',
      system: 'النظام',
      maintenance: 'الصيانة',
      feature: 'الميزات',
      general: 'عام',
      sortBy: 'ترتيب حسب',
      newest: 'الأحدث',
      oldest: 'الأقدم',
      relevance: 'الصلة'
    }
  };

  const t = translations[currentLanguage];

  const categories = [
    { value: 'all', label: t.allCategories },
    { value: 'system', label: t.system },
    { value: 'maintenance', label: t.maintenance },
    { value: 'feature', label: t.feature },
    { value: 'general', label: t.general }
  ];

  const sortOptions = [
    { value: 'newest', label: t.newest },
    { value: 'oldest', label: t.oldest },
    { value: 'relevance', label: t.relevance }
  ];

  return (
    <div className="bg-background border border-border rounded-lg p-6 mb-8 shadow-card">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0 lg:space-x-6">
        {/* Search Input */}
        <div className="flex-1 max-w-md">
          <div className="relative">
            <Icon 
              name="Search" 
              size={20} 
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-muted" 
            />
            <Input
              type="search"
              placeholder={t.search}
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <Button
              key={category.value}
              variant={selectedCategory === category.value ? 'primary' : 'ghost'}
              size="sm"
              onClick={() => onCategoryChange(category.value)}
              className="whitespace-nowrap"
            >
              {category.label}
            </Button>
          ))}
        </div>

        {/* Sort Options */}
        <div className="flex items-center space-x-2">
          <Icon name="ArrowUpDown" size={16} className="text-text-muted" />
          <select
            value={sortBy}
            onChange={(e) => onSortChange(e.target.value)}
            className="bg-background border border-border rounded-md px-3 py-2 text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
          >
            {sortOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default NewsFilters;