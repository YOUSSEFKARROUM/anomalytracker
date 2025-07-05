import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthenticatedHeader from '../components/ui/AuthenticatedHeader';
import AdminSidebar from './admin-panel-dashboard/components/AdminSidebar';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import Icon from '../components/AppIcon';

// --- UI Components ---

// Tabs Component
const Tabs = ({ value, onValueChange, children }) => {
  const tabs = React.Children.toArray(children).filter(child => child.type === Tab);
  const panels = React.Children.toArray(children).filter(child => child.type === TabPanel);
  
  return (
    <div className="w-full">
      <div className="flex border-b border-border mb-6">
        {tabs.map(tab => (
          React.cloneElement(tab, {
            active: tab.props.value === value,
            onClick: () => onValueChange(tab.props.value)
          })
        ))}
      </div>
      {panels.find(panel => panel.props.value === value)}
    </div>
  );
};

const Tab = ({ value, children, active, onClick }) => (
  <button
    className={`px-6 py-3 font-semibold text-sm transition-all duration-200 border-b-2 ${
      active 
        ? 'border-primary text-primary bg-primary-50' 
        : 'border-transparent text-text-secondary hover:text-text-primary hover:bg-surface'
    }`}
    onClick={onClick}
    type="button"
  >
    {children}
  </button>
);

const TabPanel = ({ value, children }) => <div className="space-y-6">{children}</div>;

// Card Components
const Card = ({ children, className = '' }) => (
  <div className={`bg-background border border-border rounded-xl shadow-card p-6 ${className}`}>
    {children}
  </div>
);

const CardHeader = ({ title, subtitle, className = '' }) => (
  <div className={`mb-6 ${className}`}>
    <h2 className="text-xl font-heading font-semibold text-text-primary mb-1">
      {title}
    </h2>
    {subtitle && (
      <p className="text-text-secondary text-sm">
        {subtitle}
      </p>
    )}
  </div>
);

const CardContent = ({ children, className = '' }) => (
  <div className={`mb-6 ${className}`}>
    {children}
  </div>
);

const CardFooter = ({ children, className = '' }) => (
  <div className={`flex justify-end gap-3 ${className}`}>
    {children}
  </div>
);

// Switch Component
const Switch = ({ checked, onChange, id, label, className = '' }) => (
  <div className={`flex items-center justify-between ${className}`}>
    {label && (
      <label htmlFor={id} className="text-sm font-medium text-text-primary">
        {label}
      </label>
    )}
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 ${
        checked ? 'bg-primary' : 'bg-gray-200'
      }`}
    >
      <span
        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
          checked ? 'translate-x-6' : 'translate-x-1'
        }`}
      />
    </button>
  </div>
);

// Select Component
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

// Textarea Component
const Textarea = ({ value, onChange, rows = 4, placeholder, className = '' }) => (
  <textarea
    value={value}
    onChange={(e) => onChange(e.target.value)}
    rows={rows}
    placeholder={placeholder}
    className={`w-full border border-border rounded-md px-3 py-2 text-sm bg-background text-text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary resize-vertical ${className}`}
  />
);

// Badge Component
const Badge = ({ children, variant = 'default', className = '' }) => {
  const variantClasses = {
    default: 'bg-gray-100 text-gray-800',
    success: 'bg-success-100 text-success-800',
    warning: 'bg-warning-100 text-warning-800',
    error: 'bg-error-100 text-error-800',
    primary: 'bg-primary-100 text-primary-800'
  };

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${variantClasses[variant]} ${className}`}>
      {children}
    </span>
  );
};

// Label Component
const Label = ({ children, htmlFor, className = '' }) => (
  <label htmlFor={htmlFor} className={`block text-sm font-medium text-text-primary mb-2 ${className}`}>
    {children}
  </label>
);

// Separator Component
const Separator = ({ className = '' }) => (
  <div className={`border-t border-border my-4 ${className}`} />
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

// Dropdown Menu Components
const DropdownMenu = ({ children, trigger, className = '' }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={`relative ${className}`}>
      <div onClick={() => setIsOpen(!isOpen)}>
        {trigger}
      </div>
      {isOpen && (
        <>
          <div className="fixed inset-0 z-10" onClick={() => setIsOpen(false)} />
          <div className="absolute right-0 mt-2 w-48 bg-background border border-border rounded-lg shadow-dropdown z-20">
            {children}
          </div>
        </>
      )}
    </div>
  );
};

const DropdownMenuItem = ({ children, onClick, className = '' }) => (
  <button
    onClick={onClick}
    className={`w-full text-left px-4 py-2 text-sm text-text-primary hover:bg-surface transition-colors ${className}`}
  >
    {children}
  </button>
);

// --- Main Component ---

const SystemConfigurationPage = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('general');

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
      title: 'Nouvelle anomalie signalée',
      message: 'Problème de chauffage - Amphithéâtre A',
      read: false,
      timestamp: new Date(Date.now() - 900000)
    }
  ];

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('authToken');
    navigate('/authentication-login-register');
  };

  // --- State Management ---

  // General Tab
  const [appName, setAppName] = useState('AnomalyTracker');
  const [logo, setLogo] = useState(null);
  const [timezone, setTimezone] = useState('Europe/Paris');
  const [language, setLanguage] = useState('fr');
  const [generalChanged, setGeneralChanged] = useState(false);

  // Anomalies Tab
  const [categories, setCategories] = useState(['Infrastructure', 'Logiciel', 'Matériel', 'Réseau']);
  const [newCategory, setNewCategory] = useState('');
  const [editingCategory, setEditingCategory] = useState(null);
  const [categoryEditValue, setCategoryEditValue] = useState('');
  
  const [priorities, setPriorities] = useState([
    { name: 'Élevée', color: 'error' },
    { name: 'Moyenne', color: 'warning' },
    { name: 'Faible', color: 'success' }
  ]);
  const [newPriority, setNewPriority] = useState('');
  const [editingPriority, setEditingPriority] = useState(null);
  const [priorityEditValue, setPriorityEditValue] = useState('');

  // Security Tab
  const [force2FA, setForce2FA] = useState(false);
  const [apiKeys, setApiKeys] = useState([
    { id: 1, name: 'Clé principale', key: 'sk-1234-xxxx', created: '2024-01-15' },
    { id: 2, name: 'Clé de développement', key: 'sk-5678-xxxx', created: '2024-01-20' }
  ]);

  // Maintenance Tab
  const [maintenanceMode, setMaintenanceMode] = useState(false);
  const [maintenanceMessage, setMaintenanceMessage] = useState('');

  // --- Event Handlers ---

  // General handlers
  const handleGeneralChange = (setter) => (value) => {
    setter(value);
    setGeneralChanged(true);
  };

  const handleLogoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setLogo(URL.createObjectURL(file));
      setGeneralChanged(true);
    }
  };

  const handleSaveGeneral = () => {
    setGeneralChanged(false);
    // Here you would typically save to backend
  };

  // Category handlers
  const handleAddCategory = () => {
    if (newCategory.trim() && !categories.includes(newCategory.trim())) {
      setCategories([...categories, newCategory.trim()]);
      setNewCategory('');
    }
  };

  const handleEditCategory = (category) => {
    setEditingCategory(category);
    setCategoryEditValue(category);
  };

  const handleSaveEditCategory = () => {
    if (categoryEditValue.trim()) {
      setCategories(categories.map(c => c === editingCategory ? categoryEditValue.trim() : c));
      setEditingCategory(null);
      setCategoryEditValue('');
    }
  };

  const handleDeleteCategory = (category) => {
    setCategories(categories.filter(c => c !== category));
  };

  // Priority handlers
  const handleAddPriority = () => {
    if (newPriority.trim() && !priorities.find(p => p.name === newPriority.trim())) {
      setPriorities([...priorities, { name: newPriority.trim(), color: 'default' }]);
      setNewPriority('');
    }
  };

  const handleEditPriority = (priority) => {
    setEditingPriority(priority);
    setPriorityEditValue(priority.name);
  };

  const handleSaveEditPriority = () => {
    if (priorityEditValue.trim()) {
      setPriorities(priorities.map(p => 
        p.name === editingPriority.name 
          ? { ...p, name: priorityEditValue.trim() }
          : p
      ));
      setEditingPriority(null);
      setPriorityEditValue('');
    }
  };

  const handleDeletePriority = (priority) => {
    setPriorities(priorities.filter(p => p.name !== priority.name));
  };

  // API Key handlers
  const handleGenerateApiKey = () => {
    const newKey = {
      id: Date.now(),
      name: `Clé ${apiKeys.length + 1}`,
      key: `sk-${Math.random().toString(36).substr(2, 9)}-xxxx`,
      created: new Date().toISOString().split('T')[0]
    };
    setApiKeys([...apiKeys, newKey]);
  };

  const handleRevokeApiKey = (id) => {
    setApiKeys(apiKeys.filter(key => key.id !== id));
  };

  // Maintenance handlers
  const handleMaintenanceToggle = (enabled) => {
    setMaintenanceMode(enabled);
    if (!enabled) {
      setMaintenanceMessage('');
    }
  };

  const handleSaveMaintenance = () => {
    // Here you would typically save to backend
  };

  // Timezone options
  const timezoneOptions = [
    { value: 'UTC', label: 'UTC (Temps universel coordonné)' },
    { value: 'Europe/Paris', label: 'Europe/Paris (UTC+1/+2)' },
    { value: 'America/New_York', label: 'America/New_York (UTC-5/-4)' },
    { value: 'Asia/Tokyo', label: 'Asia/Tokyo (UTC+9)' }
  ];

  // Language options
  const languageOptions = [
    { value: 'fr', label: 'Français' },
    { value: 'en', label: 'English' },
    { value: 'ar', label: 'العربية' }
  ];

  return (
    <div className="min-h-screen bg-surface">
      <AuthenticatedHeader
        user={mockUser}
        notifications={mockNotifications}
        onLogout={handleLogout}
      />
      
      <div className="pt-16 p-6">
        {/* Header Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-heading font-bold text-text-primary mb-2">
            Configuration du système
          </h1>
          <p className="text-text-secondary">
            Gérez les paramètres et la configuration de votre application
          </p>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <Tab value="general">Général</Tab>
          <Tab value="anomalies">Gestion des Anomalies</Tab>
          <Tab value="security">Sécurité</Tab>
          <Tab value="maintenance">Maintenance</Tab>

          {/* Tab 1: Général */}
          <TabPanel value="general">
            <Card>
              <CardHeader 
                title="Paramètres Généraux" 
                subtitle="Gérez l'identité et les paramètres de base de l'application."
              />
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="appName">Nom de l'application</Label>
                    <Input
                      id="appName"
                      value={appName}
                      onChange={(e) => handleGeneralChange(setAppName)(e.target.value)}
                      placeholder="Entrez le nom de l'application"
                    />
                  </div>
                  
                  <div>
                    <Label>Logo principal</Label>
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 bg-surface border border-border rounded-lg flex items-center justify-center overflow-hidden">
                        {logo ? (
                          <img src={logo} alt="Logo" className="object-contain w-full h-full" />
                        ) : (
                          <Icon name="Image" size={32} className="text-text-muted" />
                        )}
                      </div>
                      <label className="inline-block">
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={handleLogoChange}
                        />
                        <Button variant="outline" iconName="Upload" iconPosition="left">
                          Changer
                        </Button>
                      </label>
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="timezone">Fuseau horaire</Label>
                    <Select
                      id="timezone"
                      value={timezone}
                      onChange={handleGeneralChange(setTimezone)}
                      options={timezoneOptions}
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="language">Langue par défaut</Label>
                    <Select
                      id="language"
                      value={language}
                      onChange={handleGeneralChange(setLanguage)}
                      options={languageOptions}
                    />
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button 
                  variant="primary" 
                  disabled={!generalChanged}
                  onClick={handleSaveGeneral}
                >
                  Sauvegarder les changements
                </Button>
              </CardFooter>
            </Card>
          </TabPanel>

          {/* Tab 2: Gestion des Anomalies */}
          <TabPanel value="anomalies">
            <Card>
              <CardHeader title="Logique Métier des Anomalies" />
              <CardContent>
                <div className="space-y-8">
                  {/* Section Catégories */}
                  <div>
                    <h3 className="text-lg font-semibold text-text-primary mb-4">
                      Catégories d'anomalies
                    </h3>
                    <div className="space-y-3 mb-4">
                      {categories.map((category) => (
                        <div key={category} className="flex items-center justify-between p-3 bg-surface rounded-lg border border-border">
                          {editingCategory === category ? (
                            <div className="flex items-center gap-2 flex-1">
                              <Input
                                value={categoryEditValue}
                                onChange={(e) => setCategoryEditValue(e.target.value)}
                                className="flex-1"
                              />
                              <Button size="sm" variant="primary" onClick={handleSaveEditCategory}>
                                <Icon name="Check" size={16} />
                              </Button>
                              <Button size="sm" variant="ghost" onClick={() => setEditingCategory(null)}>
                                <Icon name="X" size={16} />
                              </Button>
                            </div>
                          ) : (
                            <>
                              <span className="text-text-primary">{category}</span>
                              <div className="flex gap-2">
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  iconName="Pencil"
                                  onClick={() => handleEditCategory(category)}
                                />
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  iconName="Trash"
                                  onClick={() => handleDeleteCategory(category)}
                                />
                              </div>
                            </>
                          )}
                        </div>
                      ))}
                    </div>
                    <div className="flex gap-3">
                      <Input
                        value={newCategory}
                        onChange={(e) => setNewCategory(e.target.value)}
                        placeholder="Nouvelle catégorie"
                        className="flex-1"
                      />
                      <Button variant="primary" onClick={handleAddCategory}>
                        Ajouter une catégorie
                      </Button>
                    </div>
                  </div>

                  <Separator />

                  {/* Section Niveaux de priorité */}
                  <div>
                    <h3 className="text-lg font-semibold text-text-primary mb-4">
                      Niveaux de priorité
                    </h3>
                    <div className="space-y-3 mb-4">
                      {priorities.map((priority) => (
                        <div key={priority.name} className="flex items-center justify-between p-3 bg-surface rounded-lg border border-border">
                          {editingPriority === priority ? (
                            <div className="flex items-center gap-2 flex-1">
                              <Input
                                value={priorityEditValue}
                                onChange={(e) => setPriorityEditValue(e.target.value)}
                                className="flex-1"
                              />
                              <Button size="sm" variant="primary" onClick={handleSaveEditPriority}>
                                <Icon name="Check" size={16} />
                              </Button>
                              <Button size="sm" variant="ghost" onClick={() => setEditingPriority(null)}>
                                <Icon name="X" size={16} />
                              </Button>
                            </div>
                          ) : (
                            <>
                              <div className="flex items-center gap-3">
                                <span className="text-text-primary">{priority.name}</span>
                                <Badge variant={priority.color}>
                                  {priority.name}
                                </Badge>
                              </div>
                              <div className="flex gap-2">
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  iconName="Pencil"
                                  onClick={() => handleEditPriority(priority)}
                                />
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  iconName="Trash"
                                  onClick={() => handleDeletePriority(priority)}
                                />
                              </div>
                            </>
                          )}
                        </div>
                      ))}
                    </div>
                    <div className="flex gap-3">
                      <Input
                        value={newPriority}
                        onChange={(e) => setNewPriority(e.target.value)}
                        placeholder="Nouveau niveau de priorité"
                        className="flex-1"
                      />
                      <Button variant="primary" onClick={handleAddPriority}>
                        Ajouter une priorité
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabPanel>

          {/* Tab 3: Sécurité */}
          <TabPanel value="security">
            <Card>
              <CardHeader title="Sécurité et Accès" />
              <CardContent>
                <div className="space-y-6">
                  {/* 2FA Section */}
                  <div>
                    <Separator />
                    <div className="py-4">
                      <Switch
                        checked={force2FA}
                        onChange={setForce2FA}
                        label="Forcer la 2FA pour les comptes administrateur"
                      />
                    </div>
                  </div>

                  {/* API Keys Section */}
                  <div>
                    <Separator />
                    <div className="py-4">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-semibold text-text-primary">
                          Clés d'API
                        </h3>
                        <Button variant="primary" onClick={handleGenerateApiKey}>
                          Générer une nouvelle clé
                        </Button>
                      </div>
                      
                      <Table>
                        <TableHeader>
                          <TableHeaderCell>Nom</TableHeaderCell>
                          <TableHeaderCell>Clé</TableHeaderCell>
                          <TableHeaderCell>Créée le</TableHeaderCell>
                          <TableHeaderCell className="text-right">Actions</TableHeaderCell>
                        </TableHeader>
                        <TableBody>
                          {apiKeys.map((key) => (
                            <TableRow key={key.id}>
                              <TableCell>{key.name}</TableCell>
                              <TableCell className="font-mono text-sm">
                                {key.key}
                              </TableCell>
                              <TableCell>{key.created}</TableCell>
                              <TableCell className="text-right">
                                <DropdownMenu
                                  trigger={
                                    <Button variant="ghost" size="sm" iconName="MoreHorizontal" />
                                  }
                                >
                                  <DropdownMenuItem onClick={() => handleRevokeApiKey(key.id)}>
                                    <Icon name="Trash" size={16} className="mr-2" />
                                    Révoquer
                                  </DropdownMenuItem>
                                </DropdownMenu>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabPanel>

          {/* Tab 4: Maintenance */}
          <TabPanel value="maintenance">
            <Card>
              <CardHeader 
                title="Mode Maintenance"
                className={maintenanceMode ? 'bg-error-50 border-l-4 border-error p-4 rounded-r-lg' : ''}
              />
              <CardContent>
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="text-sm font-medium text-text-primary">
                        Activer le mode maintenance pour tous les utilisateurs
                      </span>
                      <Badge variant={maintenanceMode ? 'error' : 'success'}>
                        {maintenanceMode ? 'Actif' : 'Inactif'}
                      </Badge>
                    </div>
                    <Switch
                      checked={maintenanceMode}
                      onChange={handleMaintenanceToggle}
                    />
                  </div>
                  
                  {maintenanceMode && (
                    <div>
                      <Label htmlFor="maintenanceMessage">Message de maintenance personnalisé</Label>
                      <Textarea
                        id="maintenanceMessage"
                        value={maintenanceMessage}
                        onChange={setMaintenanceMessage}
                        placeholder="Entrez le message qui sera affiché aux utilisateurs pendant la maintenance..."
                        rows={4}
                      />
                    </div>
                  )}
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="primary" onClick={handleSaveMaintenance}>
                  Sauvegarder l'état
                </Button>
              </CardFooter>
            </Card>
          </TabPanel>
        </Tabs>
      </div>
    </div>
  );
};

export default SystemConfigurationPage; 