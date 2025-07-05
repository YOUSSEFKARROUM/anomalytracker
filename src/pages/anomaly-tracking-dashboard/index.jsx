import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AuthenticatedHeader from '../../components/ui/AuthenticatedHeader';
import Button from '../../components/ui/Button';
import Icon from '../../components/AppIcon';
import StatsCards from './components/StatsCards';
import FilterPanel from './components/FilterPanel';
import SearchBar from './components/SearchBar';
import AnomalyCard from './components/AnomalyCard';
import AnomalyTable from './components/AnomalyTable';
import AnomalyDetailsModal from './components/AnomalyDetailsModal';
import CommentModal from './components/CommentModal';

const AnomalyTrackingDashboard = () => {
  const [currentLanguage, setCurrentLanguage] = useState('fr');
  const [viewMode, setViewMode] = useState('cards'); // 'cards' or 'table'
  const [searchTerm, setSearchTerm] = useState('');
  const [isFilterExpanded, setIsFilterExpanded] = useState(false);
  const [selectedAnomaly, setSelectedAnomaly] = useState(null);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [isCommentModalOpen, setIsCommentModalOpen] = useState(false);
  const [sortField, setSortField] = useState('submittedDate');
  const [sortDirection, setSortDirection] = useState('desc');
  const [filters, setFilters] = useState({
    status: '',
    priority: '',
    category: '',
    assignedTo: '',
    startDate: '',
    endDate: ''
  });

  // Mock user data
  const currentUser = {
    id: 1,
    name: "Ahmed Benali",
    email: "ahmed.benali@ensa.ac.ma",
    role: "student",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg"
  };

  // Mock notifications
  const notifications = [
    {
      id: 1,
      title: "Anomalie #1234 mise à jour",
      message: "Votre signalement a été pris en charge",
      read: false,
      date: new Date(Date.now() - 3600000)
    },
    {
      id: 2,
      title: "Nouvelle réponse",
      message: "Un commentaire a été ajouté à votre signalement",
      read: false,
      date: new Date(Date.now() - 7200000)
    }
  ];

  // Mock anomalies data
  const mockAnomalies = [
    {
      id: 1234,
      title: "Fuite d\'eau dans les toilettes du bâtiment A",
      description: `Une fuite d'eau importante a été observée dans les toilettes du rez-de-chaussée du bâtiment A.\nL'eau s'accumule sur le sol et rend l'accès difficile.\nCela nécessite une intervention urgente pour éviter des dégâts plus importants.`,
      status: 'in-progress',
      priority: 'high',
      category: 'infrastructure',
      location: 'Bâtiment A - RDC - Toilettes',
      submittedBy: 'Ahmed Benali',
      submittedDate: new Date('2024-01-15T09:30:00'),
      acknowledgedDate: new Date('2024-01-15T10:15:00'),
      assignedDate: new Date('2024-01-15T11:00:00'),
      assignedTo: 'Service Maintenance - Mohamed Alami',
      startedDate: new Date('2024-01-16T08:00:00'),
      lastUpdate: new Date('2024-01-16T14:30:00'),
      images: [
        'https://images.pexels.com/photos/1108572/pexels-photo-1108572.jpeg',
        'https://images.pexels.com/photos/2724749/pexels-photo-2724749.jpeg'
      ],
      comments: [
        {
          author: 'Mohamed Alami',
          date: new Date('2024-01-16T14:30:00'),
          content: 'Intervention programmée pour demain matin. Nous allons remplacer la canalisation défectueuse.'
        }
      ]
    },
    {
      id: 1235,
      title: "Éclairage défaillant dans l\'amphithéâtre B",
      description: `Plusieurs néons ne fonctionnent plus dans l'amphithéâtre B.\nCela rend les cours difficiles à suivre, surtout en fin de journée.\nLes étudiants ont du mal à prendre des notes correctement.`,
      status: 'pending',priority: 'medium',category: 'equipment',location: 'Bâtiment B - 1er étage - Amphithéâtre B',submittedBy: 'Fatima Zahra',submittedDate: new Date('2024-01-14T16:45:00'),acknowledgedDate: new Date('2024-01-15T08:00:00'),lastUpdate: new Date('2024-01-15T08:00:00'),
      images: [
        'https://images.pexels.com/photos/207691/pexels-photo-207691.jpeg'
      ],
      comments: []
    },
    {
      id: 1236,
      title: "Problème de chauffage en salle informatique",
      description: `Le système de chauffage ne fonctionne pas correctement en salle informatique 3.\nLa température est trop basse pour travailler confortablement.\nCela affecte la concentration des étudiants pendant les TP.`,
      status: 'resolved',priority: 'medium',category: 'infrastructure',location: 'Bâtiment C - 2ème étage - Salle informatique 3',submittedBy: 'Youssef Idrissi',submittedDate: new Date('2024-01-10T11:20:00'),acknowledgedDate: new Date('2024-01-10T14:00:00'),assignedDate: new Date('2024-01-11T09:00:00'),assignedTo: 'Service Technique - Hassan Benjelloun',startedDate: new Date('2024-01-11T10:00:00'),resolvedDate: new Date('2024-01-12T16:00:00'),lastUpdate: new Date('2024-01-12T16:00:00'),
      images: [],
      comments: [
        {
          author: 'Hassan Benjelloun',date: new Date('2024-01-12T16:00:00'),content: 'Problème résolu. Le thermostat a été remplacé et le système fonctionne normalement.'
        }
      ]
    },
    {
      id: 1237,
      title: "Porte d\'entrée principale bloquée",
      description: `La porte d'entrée principale du bâtiment D se bloque régulièrement.\nIl faut forcer pour l'ouvrir, ce qui peut être dangereux.\nCela pose un problème de sécurité et d'accessibilité.`,
      status: 'pending',
      priority: 'urgent',
      category: 'security',
      location: 'Bâtiment D - Entrée principale',
      submittedBy: 'Aicha Bennani',
      submittedDate: new Date('2024-01-16T07:30:00'),
      lastUpdate: new Date('2024-01-16T07:30:00'),
      images: [
        'https://images.pexels.com/photos/277559/pexels-photo-277559.jpeg'
      ],
      comments: []
    },
    {
      id: 1238,
      title: "Nettoyage insuffisant dans la cafétéria",
      description: `Les tables de la cafétéria ne sont pas nettoyées régulièrement.\nIl y a souvent des restes de nourriture et des taches.\nCela pose un problème d'hygiène pour les étudiants.`,status: 'in-progress',priority: 'low',category: 'cleanliness',location: 'Bâtiment principal - Cafétéria',submittedBy: 'Omar Tazi',submittedDate: new Date('2024-01-13T12:15:00'),acknowledgedDate: new Date('2024-01-13T15:00:00'),assignedDate: new Date('2024-01-14T08:00:00'),assignedTo: 'Service Nettoyage - Khadija Alaoui',startedDate: new Date('2024-01-14T09:00:00'),lastUpdate: new Date('2024-01-15T17:00:00'),
      images: [],
      comments: [
        {
          author: 'Khadija Alaoui',date: new Date('2024-01-15T17:00:00'),content: 'Nous avons renforcé le planning de nettoyage. Les tables seront désormais nettoyées toutes les 2 heures.'
        }
      ]
    }
  ];

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') || 'fr';
    setCurrentLanguage(savedLanguage);
  }, []);

  // Filter and search anomalies
  const filteredAnomalies = mockAnomalies.filter(anomaly => {
    const matchesSearch = searchTerm === '' || 
      anomaly.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      anomaly.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      anomaly.id.toString().includes(searchTerm);

    const matchesStatus = filters.status === '' || anomaly.status === filters.status;
    const matchesPriority = filters.priority === '' || anomaly.priority === filters.priority;
    const matchesCategory = filters.category === '' || anomaly.category === filters.category;
    const matchesAssignedTo = filters.assignedTo === '' || 
      (anomaly.assignedTo && anomaly.assignedTo.toLowerCase().includes(filters.assignedTo.toLowerCase()));

    const matchesDateRange = (!filters.startDate || new Date(anomaly.submittedDate) >= new Date(filters.startDate)) &&
      (!filters.endDate || new Date(anomaly.submittedDate) <= new Date(filters.endDate));

    return matchesSearch && matchesStatus && matchesPriority && matchesCategory && matchesAssignedTo && matchesDateRange;
  });

  // Sort anomalies
  const sortedAnomalies = [...filteredAnomalies].sort((a, b) => {
    let aValue = a[sortField];
    let bValue = b[sortField];

    if (sortField === 'submittedDate' || sortField === 'lastUpdate') {
      aValue = new Date(aValue);
      bValue = new Date(bValue);
    }

    if (sortDirection === 'asc') {
      return aValue > bValue ? 1 : -1;
    } else {
      return aValue < bValue ? 1 : -1;
    }
  });

  // Calculate stats
  const stats = {
    total: mockAnomalies.length,
    pending: mockAnomalies.filter(a => a.status === 'pending').length,
    inProgress: mockAnomalies.filter(a => a.status === 'in-progress').length,
    resolved: mockAnomalies.filter(a => a.status === 'resolved').length
  };

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const handleClearFilters = () => {
    setFilters({
      status: '',
      priority: '',
      category: '',
      assignedTo: '',
      startDate: '',
      endDate: ''
    });
  };

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('desc');
    }
  };

  const handleViewDetails = (anomaly) => {
    setSelectedAnomaly(anomaly);
    setIsDetailsModalOpen(true);
  };

  const handleAddComment = (anomaly) => {
    setSelectedAnomaly(anomaly);
    setIsCommentModalOpen(true);
  };

  const handleSubmitComment = async (anomalyId, comment) => {
    // Mock comment submission
    console.log('Submitting comment for anomaly', anomalyId, ':', comment);
    // In real app, this would make an API call
    return Promise.resolve();
  };

  const handleLogout = () => {
    // Mock logout functionality
    console.log('User logged out');
  };

  const translations = {
    fr: {
      title: 'Tableau de bord - Suivi des anomalies',
      subtitle: 'Suivez l\'état de vos signalements en temps réel',
      reportNew: 'Signaler une anomalie',
      search: 'Rechercher...',
      viewMode: 'Mode d\'affichage',
      cards: 'Cartes',
      table: 'Tableau',
      noResults: 'Aucune anomalie trouvée',
      noResultsDesc: 'Aucune anomalie ne correspond à vos critères de recherche.',
      clearFilters: 'Effacer les filtres'
    },
    ar: {
      title: 'لوحة التحكم - تتبع الشذوذ',
      subtitle: 'تتبع حالة تقاريرك في الوقت الفعلي',
      reportNew: 'الإبلاغ عن شذوذ',
      search: 'البحث...',
      viewMode: 'وضع العرض',
      cards: 'البطاقات',
      table: 'الجدول',
      noResults: 'لم يتم العثور على شذوذ',
      noResultsDesc: 'لا يوجد شذوذ يطابق معايير البحث الخاصة بك.',
      clearFilters: 'مسح المرشحات'
    }
  };

  const t = translations[currentLanguage];

  return (
    <div className="min-h-screen bg-surface">
      <AuthenticatedHeader
        user={currentUser}
        notifications={notifications}
        onLogout={handleLogout}
      />

      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header Section */}
          <div className="mb-8">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
              <div>
                <h1 className="text-2xl font-bold text-text-primary mb-2">
                  {t.title}
                </h1>
                <p className="text-text-secondary">
                  {t.subtitle}
                </p>
              </div>
              <div className="mt-4 sm:mt-0">
                <Link to="/anomaly-reporting-form">
                  <Button
                    variant="primary"
                    iconName="Plus"
                    iconPosition="left"
                  >
                    {t.reportNew}
                  </Button>
                </Link>
              </div>
            </div>

            {/* Stats Cards */}
            <StatsCards stats={stats} />
          </div>

          {/* Search and Filters */}
          <div className="mb-6 space-y-4">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
              <div className="flex-1 max-w-md">
                <SearchBar
                  searchTerm={searchTerm}
                  onSearchChange={setSearchTerm}
                  onClearSearch={() => setSearchTerm('')}
                />
              </div>
              
              <div className="flex items-center space-x-3">
                <span className="text-sm text-text-secondary">{t.viewMode}:</span>
                <div className="flex items-center bg-background border border-border rounded-lg p-1">
                  <Button
                    variant={viewMode === 'cards' ? 'primary' : 'ghost'}
                    size="sm"
                    iconName="Grid3X3"
                    onClick={() => setViewMode('cards')}
                  >
                    {t.cards}
                  </Button>
                  <Button
                    variant={viewMode === 'table' ? 'primary' : 'ghost'}
                    size="sm"
                    iconName="List"
                    onClick={() => setViewMode('table')}
                  >
                    {t.table}
                  </Button>
                </div>
              </div>
            </div>

            <FilterPanel
              filters={filters}
              onFilterChange={handleFilterChange}
              onClearFilters={handleClearFilters}
              isExpanded={isFilterExpanded}
              onToggleExpanded={() => setIsFilterExpanded(!isFilterExpanded)}
            />
          </div>

          {/* Results */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-4">
              <p className="text-sm text-text-secondary">
                {sortedAnomalies.length} anomalie{sortedAnomalies.length !== 1 ? 's' : ''} trouvée{sortedAnomalies.length !== 1 ? 's' : ''}
              </p>
            </div>

            {sortedAnomalies.length === 0 ? (
              <div className="text-center py-12">
                <Icon name="Search" size={48} className="text-text-muted mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-text-primary mb-2">
                  {t.noResults}
                </h3>
                <p className="text-text-secondary mb-4">
                  {t.noResultsDesc}
                </p>
                <Button
                  variant="outline"
                  iconName="RotateCcw"
                  iconPosition="left"
                  onClick={handleClearFilters}
                >
                  {t.clearFilters}
                </Button>
              </div>
            ) : (
              <>
                {viewMode === 'cards' ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {sortedAnomalies.map((anomaly) => (
                      <AnomalyCard
                        key={anomaly.id}
                        anomaly={anomaly}
                        onViewDetails={handleViewDetails}
                        onAddComment={handleAddComment}
                      />
                    ))}
                  </div>
                ) : (
                  <AnomalyTable
                    anomalies={sortedAnomalies}
                    onViewDetails={handleViewDetails}
                    onAddComment={handleAddComment}
                    onSort={handleSort}
                    sortField={sortField}
                    sortDirection={sortDirection}
                  />
                )}
              </>
            )}
          </div>
        </div>
      </main>

      {/* Modals */}
      <AnomalyDetailsModal
        anomaly={selectedAnomaly}
        isOpen={isDetailsModalOpen}
        onClose={() => setIsDetailsModalOpen(false)}
        onAddComment={handleAddComment}
      />

      <CommentModal
        anomaly={selectedAnomaly}
        isOpen={isCommentModalOpen}
        onClose={() => setIsCommentModalOpen(false)}
        onSubmitComment={handleSubmitComment}
      />
    </div>
  );
};

export default AnomalyTrackingDashboard;