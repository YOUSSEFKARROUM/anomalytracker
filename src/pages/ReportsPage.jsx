import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import Button from '../components/ui/Button';
import Icon from '../components/AppIcon';
import AuthenticatedHeader from '../components/ui/AuthenticatedHeader';

// Card Components
const Card = ({ children, className = '' }) => (
  <div className={`bg-white rounded-xl shadow p-8 ${className}`}>
    {children}
  </div>
);

const CardHeader = ({ children, className = '' }) => (
  <div className={`border-b border-border pb-4 mb-6 ${className}`}>
    {children}
  </div>
);

const CardContent = ({ children, className = '' }) => (
  <div className={className}>
    {children}
  </div>
);

const CardFooter = ({ children, className = '' }) => (
  <div className={`border-t border-border pt-4 mt-6 ${className}`}>
    {children}
  </div>
);

// Form Components
const Select = ({ value, onChange, options, placeholder, className = '' }) => (
  <select
    value={value}
    onChange={(e) => onChange(e.target.value)}
    className={`w-full border border-border rounded-md px-3 py-2 text-sm bg-background text-text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary ${className}`}
  >
    {placeholder && (
      <option value="" disabled>
        {placeholder}
      </option>
    )}
    {options.map(option => (
      <option key={option.value} value={option.value}>
        {option.label}
      </option>
    ))}
  </select>
);

const DatePicker = ({ value, onChange, placeholder, className = '' }) => (
  <input
    type="date"
    value={value}
    onChange={(e) => onChange(e.target.value)}
    placeholder={placeholder}
    className={`w-full border border-border rounded-md px-3 py-2 text-sm bg-background text-text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary ${className}`}
  />
);

// Table Components
const Table = ({ children, className = '' }) => (
  <div className={`overflow-hidden border border-border rounded-lg ${className}`}>
    <table className="min-w-full divide-y divide-border">
      {children}
    </table>
  </div>
);

const TableHeader = ({ children }) => (
  <thead className="bg-surface">
    <tr>
      {children}
    </tr>
  </thead>
);

const TableHeaderCell = ({ children, className = '' }) => (
  <th className={`px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider ${className}`}>
    {children}
  </th>
);

const TableBody = ({ children }) => (
  <tbody className="bg-background divide-y divide-border">
    {children}
  </tbody>
);

const TableRow = ({ children, className = '' }) => (
  <tr className={`hover:bg-surface transition-colors ${className}`}>
    {children}
  </tr>
);

const TableCell = ({ children, className = '' }) => (
  <td className={`px-6 py-4 whitespace-nowrap text-sm text-text-primary ${className}`}>
    {children}
  </td>
);

// Badge Components
const StatusBadge = ({ status }) => {
  const config = {
    'Ouvert': 'bg-red-100 text-red-700',
    'En cours': 'bg-yellow-100 text-yellow-700',
    'Résolu': 'bg-green-100 text-green-700',
  };
  return (
    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-semibold ${config[status] || 'bg-gray-100 text-gray-700'}`}>
      {status}
    </span>
  );
};

const PriorityBadge = ({ priority }) => {
  const config = {
    'Haute': 'bg-red-100 text-red-700',
    'Moyenne': 'bg-yellow-100 text-yellow-700',
    'Faible': 'bg-green-100 text-green-700',
  };
  return (
    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-semibold ${config[priority] || 'bg-gray-100 text-gray-700'}`}>
      {priority}
    </span>
  );
};

const CategoryBadge = ({ category }) => {
  const config = {
    'Infrastructure': 'bg-blue-100 text-blue-700',
    'Logiciel': 'bg-purple-100 text-purple-700',
    'Matériel': 'bg-orange-100 text-orange-700',
    'Réseau': 'bg-indigo-100 text-indigo-700',
  };
  return (
    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-semibold ${config[category] || 'bg-gray-100 text-gray-700'}`}>
      {category}
    </span>
  );
};

// Mock data
const MOCK_ANOMALIES = [
  { id: 1, title: 'Problème de chauffage', category: 'Infrastructure', priority: 'Haute', status: 'Ouvert', createdAt: '2024-01-15', resolvedAt: null, assignedTo: 'Jean Dupont' },
  { id: 2, title: 'Panne électrique', category: 'Infrastructure', priority: 'Haute', status: 'En cours', createdAt: '2024-01-14', resolvedAt: null, assignedTo: 'Marie Martin' },
  { id: 3, title: 'Bug application', category: 'Logiciel', priority: 'Moyenne', status: 'Résolu', createdAt: '2024-01-13', resolvedAt: '2024-01-16', assignedTo: 'Pierre Durand' },
  { id: 4, title: 'Problème réseau', category: 'Réseau', priority: 'Haute', status: 'Résolu', createdAt: '2024-01-12', resolvedAt: '2024-01-15', assignedTo: 'Sophie Bernard' },
  { id: 5, title: 'Écran cassé', category: 'Matériel', priority: 'Faible', status: 'Ouvert', createdAt: '2024-01-11', resolvedAt: null, assignedTo: 'Luc Moreau' },
  { id: 6, title: 'Serveur lent', category: 'Infrastructure', priority: 'Moyenne', status: 'En cours', createdAt: '2024-01-10', resolvedAt: null, assignedTo: 'Jean Dupont' },
  { id: 7, title: 'Erreur base de données', category: 'Logiciel', priority: 'Haute', status: 'Résolu', createdAt: '2024-01-09', resolvedAt: '2024-01-14', assignedTo: 'Marie Martin' },
  { id: 8, title: 'Clavier défectueux', category: 'Matériel', priority: 'Faible', status: 'Résolu', createdAt: '2024-01-08', resolvedAt: '2024-01-12', assignedTo: 'Pierre Durand' },
];

const ReportsPage = () => {
  const navigate = useNavigate();
  const [filters, setFilters] = useState({
    dateRange: { start: '2024-01-01', end: '2024-01-31' },
    status: '',
    category: '',
    priority: ''
  });

  // Mock user data for authenticated header
  const mockUser = {
    name: 'Admin Système',
    email: 'admin@ensa-bm.ac.ma',
    role: 'admin',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face'
  };

  // Mock notifications
  const mockNotifications = [
    {
      id: 1,
      title: 'Nouveau rapport disponible',
      message: 'Le rapport mensuel est prêt',
      read: false,
      timestamp: new Date(Date.now() - 900000)
    }
  ];

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('authToken');
    navigate('/authentication-login-register');
  };

  const handleExport = () => {
    // Mock export functionality
    console.log('Exporting current view...');
  };

  // Filter options
  const statusOptions = [
    { value: '', label: 'Tous' },
    { value: 'Ouvert', label: 'Ouvert' },
    { value: 'En cours', label: 'En cours' },
    { value: 'Résolu', label: 'Résolu' }
  ];

  const categoryOptions = [
    { value: '', label: 'Toutes' },
    { value: 'Infrastructure', label: 'Infrastructure' },
    { value: 'Logiciel', label: 'Logiciel' },
    { value: 'Matériel', label: 'Matériel' },
    { value: 'Réseau', label: 'Réseau' }
  ];

  const priorityOptions = [
    { value: '', label: 'Toutes' },
    { value: 'Haute', label: 'Haute' },
    { value: 'Moyenne', label: 'Moyenne' },
    { value: 'Faible', label: 'Faible' }
  ];

  // Filter anomalies based on current filters
  const filteredAnomalies = useMemo(() => {
    let data = MOCK_ANOMALIES;
    
    if (filters.status) {
      data = data.filter(a => a.status === filters.status);
    }
    if (filters.category) {
      data = data.filter(a => a.category === filters.category);
    }
    if (filters.priority) {
      data = data.filter(a => a.priority === filters.priority);
    }
    
    // Filter by date range
    data = data.filter(a => {
      const createdAt = new Date(a.createdAt);
      const startDate = new Date(filters.dateRange.start);
      const endDate = new Date(filters.dateRange.end);
      return createdAt >= startDate && createdAt <= endDate;
    });
    
    return data;
  }, [filters]);

  // Prepare chart data
  const lineChartData = useMemo(() => {
    const dailyData = {};
    filteredAnomalies.forEach(anomaly => {
      const date = anomaly.createdAt;
      dailyData[date] = (dailyData[date] || 0) + 1;
    });
    
    return Object.entries(dailyData).map(([date, count]) => ({
      date,
      anomalies: count
    })).sort((a, b) => new Date(a.date) - new Date(b.date));
  }, [filteredAnomalies]);

  const pieChartData = useMemo(() => {
    const statusCount = {};
    filteredAnomalies.forEach(anomaly => {
      statusCount[anomaly.status] = (statusCount[anomaly.status] || 0) + 1;
    });
    
    return Object.entries(statusCount).map(([status, count]) => ({
      name: status,
      value: count
    }));
  }, [filteredAnomalies]);

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  return (
    <div className="pt-16 p-8 space-y-8">
      <AuthenticatedHeader
        user={mockUser}
        notifications={mockNotifications}
        onLogout={handleLogout}
      />
      
      {/* Header Section */}
      <div className="flex items-center justify-between bg-white rounded-xl shadow p-8">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Rapports et Analytiques</h1>
          <p className="text-text-secondary mt-2">
            Générez des rapports personnalisés pour analyser les tendances et les performances.
          </p>
        </div>
        <Button 
          variant="primary" 
          iconName="Download" 
          onClick={handleExport}
        >
          Exporter la vue actuelle
        </Button>
      </div>

      {/* Section 1: Report Generator */}
      <Card>
        <CardHeader>
          <h2 className="text-xl font-semibold text-text-primary">Générer un rapport</h2>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Plage de dates</label>
              <div className="grid grid-cols-2 gap-2">
                <DatePicker
                  value={filters.dateRange.start}
                  onChange={(value) => setFilters(prev => ({ 
                    ...prev, 
                    dateRange: { ...prev.dateRange, start: value } 
                  }))}
                  placeholder="Date début"
                />
                <DatePicker
                  value={filters.dateRange.end}
                  onChange={(value) => setFilters(prev => ({ 
                    ...prev, 
                    dateRange: { ...prev.dateRange, end: value } 
                  }))}
                  placeholder="Date fin"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Statut</label>
              <Select
                value={filters.status}
                onChange={(value) => setFilters(prev => ({ ...prev, status: value }))}
                options={statusOptions}
                placeholder="Sélectionner un statut"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Catégorie</label>
              <Select
                value={filters.category}
                onChange={(value) => setFilters(prev => ({ ...prev, category: value }))}
                options={categoryOptions}
                placeholder="Sélectionner une catégorie"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Priorité</label>
              <Select
                value={filters.priority}
                onChange={(value) => setFilters(prev => ({ ...prev, priority: value }))}
                options={priorityOptions}
                placeholder="Sélectionner une priorité"
              />
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button 
            variant="primary" 
            onClick={() => console.log('Applying filters...')}
          >
            Appliquer les filtres
          </Button>
        </CardFooter>
      </Card>

      {/* Section 2: Data Visualization */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Line Chart */}
        <Card>
          <CardHeader>
            <h3 className="text-lg font-semibold text-text-primary">Tendance des anomalies par jour</h3>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={lineChartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line 
                    type="monotone" 
                    dataKey="anomalies" 
                    stroke="#8884d8" 
                    strokeWidth={2}
                    dot={{ fill: '#8884d8', strokeWidth: 2, r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Pie Chart */}
        <Card>
          <CardHeader>
            <h3 className="text-lg font-semibold text-text-primary">Répartition par statut</h3>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieChartData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {pieChartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Section 3: Detailed Data Table */}
      <Card>
        <CardHeader>
          <h2 className="text-xl font-semibold text-text-primary">Données détaillées du rapport</h2>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableHeaderCell>ID</TableHeaderCell>
              <TableHeaderCell>Titre</TableHeaderCell>
              <TableHeaderCell>Catégorie</TableHeaderCell>
              <TableHeaderCell>Priorité</TableHeaderCell>
              <TableHeaderCell>Statut</TableHeaderCell>
              <TableHeaderCell>Date de création</TableHeaderCell>
              <TableHeaderCell>Date de résolution</TableHeaderCell>
              <TableHeaderCell>Assigné à</TableHeaderCell>
            </TableHeader>
            <TableBody>
              {filteredAnomalies.map((anomaly) => (
                <TableRow key={anomaly.id}>
                  <TableCell>#{anomaly.id}</TableCell>
                  <TableCell className="font-medium">{anomaly.title}</TableCell>
                  <TableCell>
                    <CategoryBadge category={anomaly.category} />
                  </TableCell>
                  <TableCell>
                    <PriorityBadge priority={anomaly.priority} />
                  </TableCell>
                  <TableCell>
                    <StatusBadge status={anomaly.status} />
                  </TableCell>
                  <TableCell>{new Date(anomaly.createdAt).toLocaleDateString('fr-FR')}</TableCell>
                  <TableCell>
                    {anomaly.resolvedAt 
                      ? new Date(anomaly.resolvedAt).toLocaleDateString('fr-FR')
                      : '-'
                    }
                  </TableCell>
                  <TableCell>{anomaly.assignedTo}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          
          {filteredAnomalies.length === 0 && (
            <div className="text-center py-8 text-text-secondary">
              <Icon name="FileText" size={48} className="mx-auto mb-4 opacity-50" />
              <p>Aucune donnée trouvée avec les filtres actuels</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ReportsPage; 