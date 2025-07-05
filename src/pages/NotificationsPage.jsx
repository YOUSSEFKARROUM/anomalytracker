import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthenticatedHeader from '../components/ui/AuthenticatedHeader';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import Icon from '../components/AppIcon';

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

const Textarea = ({ value, onChange, rows = 4, placeholder, className = '' }) => (
  <textarea
    value={value}
    onChange={(e) => onChange(e.target.value)}
    rows={rows}
    placeholder={placeholder}
    className={`w-full border border-border rounded-md px-3 py-2 text-sm bg-background text-text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary resize-vertical ${className}`}
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

// Radio Group Component
const RadioGroup = ({ value, onChange, options, className = '' }) => (
  <div className={`space-y-3 ${className}`}>
    {options.map(option => (
      <label key={option.value} className="flex items-center space-x-3 cursor-pointer">
        <input
          type="radio"
          value={option.value}
          checked={value === option.value}
          onChange={(e) => onChange(e.target.value)}
          className="h-4 w-4 text-primary border-border focus:ring-primary"
        />
        <span className="text-sm text-text-primary">{option.label}</span>
      </label>
    ))}
  </div>
);

// Checkbox Component
const Checkbox = ({ checked, onChange, label, className = '' }) => (
  <label className={`flex items-center space-x-3 cursor-pointer ${className}`}>
    <input
      type="checkbox"
      checked={checked}
      onChange={(e) => onChange(e.target.checked)}
      className="h-4 w-4 text-primary border-border rounded focus:ring-primary"
    />
    <span className="text-sm text-text-primary">{label}</span>
  </label>
);

// ComboBox Component (Simple version)
const ComboBox = ({ value, onChange, options, placeholder, className = '' }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredOptions = options.filter(option =>
    option.label.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className={`relative ${className}`}>
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onFocus={() => setIsOpen(true)}
        placeholder={placeholder}
        className="w-full border border-border rounded-md px-3 py-2 text-sm bg-background text-text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
      />
      {isOpen && (
        <>
          <div className="fixed inset-0 z-10" onClick={() => setIsOpen(false)} />
          <div className="absolute z-20 w-full mt-1 bg-background border border-border rounded-md shadow-dropdown max-h-60 overflow-auto">
            {filteredOptions.map(option => (
              <button
                key={option.value}
                onClick={() => {
                  onChange(option.value);
                  setSearchTerm(option.label);
                  setIsOpen(false);
                }}
                className="w-full text-left px-3 py-2 text-sm text-text-primary hover:bg-surface transition-colors"
              >
                {option.label}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

// Rich Text Editor Component (Simple version)
const RichTextEditor = ({ value, onChange, placeholder, className = '' }) => {
  const [isBold, setIsBold] = useState(false);
  const [isItalic, setIsItalic] = useState(false);

  const toggleBold = () => {
    setIsBold(!isBold);
    // Simple implementation - in a real app, you'd use TipTap or similar
  };

  const toggleItalic = () => {
    setIsItalic(!isItalic);
    // Simple implementation - in a real app, you'd use TipTap or similar
  };

  return (
    <div className={`border border-border rounded-md ${className}`}>
      {/* Toolbar */}
      <div className="border-b border-border p-2 flex space-x-2">
        <button
          type="button"
          onClick={toggleBold}
          className={`p-1 rounded ${isBold ? 'bg-primary text-white' : 'text-text-secondary hover:text-text-primary'}`}
        >
          <Icon name="Bold" size={16} />
        </button>
        <button
          type="button"
          onClick={toggleItalic}
          className={`p-1 rounded ${isItalic ? 'bg-primary text-white' : 'text-text-secondary hover:text-text-primary'}`}
        >
          <Icon name="Italic" size={16} />
        </button>
      </div>
      
      {/* Editor */}
      <Textarea
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        rows={8}
        className="border-0 focus:ring-0 resize-none"
      />
    </div>
  );
};

// Mock data
const MOCK_NOTIFICATIONS = [
  { 
    id: 1, 
    type: 'Email', 
    recipient: 'Tous les utilisateurs', 
    subject: 'Maintenance système prévue', 
    status: 'Envoyé', 
    sentAt: '2024-01-15 10:30:00' 
  },
  { 
    id: 2, 
    type: 'In-App', 
    recipient: 'Jean Dupont', 
    subject: 'Nouvelle anomalie assignée', 
    status: 'Envoyé', 
    sentAt: '2024-01-14 15:45:00' 
  },
  { 
    id: 3, 
    type: 'Email', 
    recipient: 'Marie Martin', 
    subject: 'Rapport mensuel disponible', 
    status: 'Échec', 
    sentAt: '2024-01-13 09:15:00' 
  },
  { 
    id: 4, 
    type: 'In-App', 
    recipient: 'Tous les administrateurs', 
    subject: 'Nouvelle fonctionnalité disponible', 
    status: 'En attente', 
    sentAt: '2024-01-12 14:20:00' 
  },
  { 
    id: 5, 
    type: 'Email', 
    recipient: 'Pierre Durand', 
    subject: 'Confirmation de résolution', 
    status: 'Envoyé', 
    sentAt: '2024-01-11 11:30:00' 
  },
];

const MOCK_USERS = [
  { value: 'user1', label: 'Jean Dupont (jean.dupont@email.com)' },
  { value: 'user2', label: 'Marie Martin (marie.martin@email.com)' },
  { value: 'user3', label: 'Pierre Durand (pierre.durand@email.com)' },
  { value: 'user4', label: 'Sophie Bernard (sophie.bernard@email.com)' },
  { value: 'user5', label: 'Luc Moreau (luc.moreau@email.com)' },
];

const NotificationsPage = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('history');

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
      title: 'Nouvelle notification',
      message: 'Vous avez reçu une nouvelle notification',
      read: false,
      timestamp: new Date(Date.now() - 900000)
    }
  ];

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('authToken');
    navigate('/authentication-login-register');
  };

  // History tab state
  const [historyFilters, setHistoryFilters] = useState({
    dateRange: { start: '', end: '' },
    type: '',
    search: ''
  });

  // Send notification tab state
  const [notificationForm, setNotificationForm] = useState({
    target: 'all',
    selectedUsers: [],
    channels: { inApp: true, email: false },
    subject: '',
    content: ''
  });

  // Filter options
  const typeOptions = [
    { value: '', label: 'Tous les types' },
    { value: 'Email', label: 'Email' },
    { value: 'In-App', label: 'In-App' }
  ];

  const targetOptions = [
    { value: 'all', label: 'Tous les utilisateurs' },
    { value: 'admins', label: 'Uniquement les administrateurs' },
    { value: 'specific', label: 'Utilisateur(s) spécifique(s)' }
  ];

  // Filter notifications
  const filteredNotifications = useMemo(() => {
    let data = MOCK_NOTIFICATIONS;
    
    if (historyFilters.type) {
      data = data.filter(n => n.type === historyFilters.type);
    }
    
    if (historyFilters.search) {
      data = data.filter(n => 
        n.recipient.toLowerCase().includes(historyFilters.search.toLowerCase()) ||
        n.subject.toLowerCase().includes(historyFilters.search.toLowerCase())
      );
    }
    
    if (historyFilters.dateRange.start && historyFilters.dateRange.end) {
      data = data.filter(n => {
        const sentDate = new Date(n.sentAt);
        const startDate = new Date(historyFilters.dateRange.start);
        const endDate = new Date(historyFilters.dateRange.end);
        return sentDate >= startDate && sentDate <= endDate;
      });
    }
    
    return data;
  }, [historyFilters]);

  const handleSendNotification = () => {
    // Mock send functionality
    console.log('Sending notification:', notificationForm);
    // Reset form
    setNotificationForm({
      target: 'all',
      selectedUsers: [],
      channels: { inApp: true, email: false },
      subject: '',
      content: ''
    });
  };

  const getStatusVariant = (status) => {
    switch (status) {
      case 'Envoyé': return 'success';
      case 'Échec': return 'error';
      case 'En attente': return 'warning';
      default: return 'default';
    }
  };

  const getTypeIcon = (type) => {
    return type === 'Email' ? 'Mail' : 'Bell';
  };

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
          <h1 className="text-3xl font-bold text-foreground">Centre de Notifications</h1>
          <p className="text-text-secondary mt-2">
            Consultez l'historique des communications et envoyez de nouvelles notifications.
          </p>
        </div>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <Tab value="history">Historique</Tab>
        <Tab value="send">Envoyer une notification</Tab>
      </Tabs>

      {/* Tab Panels */}
      <TabPanel value="history">
        <Card>
          <CardHeader>
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
              <h2 className="text-xl font-semibold text-text-primary">Historique des envois</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label>Plage de dates</Label>
                  <div className="grid grid-cols-2 gap-2">
                    <DatePicker
                      value={historyFilters.dateRange.start}
                      onChange={(value) => setHistoryFilters(prev => ({ 
                        ...prev, 
                        dateRange: { ...prev.dateRange, start: value } 
                      }))}
                      placeholder="Date début"
                    />
                    <DatePicker
                      value={historyFilters.dateRange.end}
                      onChange={(value) => setHistoryFilters(prev => ({ 
                        ...prev, 
                        dateRange: { ...prev.dateRange, end: value } 
                      }))}
                      placeholder="Date fin"
                    />
                  </div>
                </div>
                <div>
                  <Label>Type</Label>
                  <Select
                    value={historyFilters.type}
                    onChange={(value) => setHistoryFilters(prev => ({ ...prev, type: value }))}
                    options={typeOptions}
                    placeholder="Sélectionner un type"
                  />
                </div>
                <div>
                  <Label>Rechercher</Label>
                  <Input
                    type="text"
                    value={historyFilters.search}
                    onChange={(e) => setHistoryFilters(prev => ({ ...prev, search: e.target.value }))}
                    placeholder="Destinataire ou contenu..."
                  />
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableHeaderCell>Type</TableHeaderCell>
                <TableHeaderCell>Destinataire</TableHeaderCell>
                <TableHeaderCell>Sujet / Extrait</TableHeaderCell>
                <TableHeaderCell>Statut</TableHeaderCell>
                <TableHeaderCell>Date d'envoi</TableHeaderCell>
              </TableHeader>
              <TableBody>
                {filteredNotifications.map((notification) => (
                  <TableRow key={notification.id}>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <Icon name={getTypeIcon(notification.type)} size={16} className="text-text-secondary" />
                        <span>{notification.type}</span>
                      </div>
                    </TableCell>
                    <TableCell className="font-medium">{notification.recipient}</TableCell>
                    <TableCell>{notification.subject}</TableCell>
                    <TableCell>
                      <Badge variant={getStatusVariant(notification.status)}>
                        {notification.status}
                      </Badge>
                    </TableCell>
                    <TableCell>{new Date(notification.sentAt).toLocaleString('fr-FR')}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            
            {filteredNotifications.length === 0 && (
              <div className="text-center py-8 text-text-secondary">
                <Icon name="Bell" size={48} className="mx-auto mb-4 opacity-50" />
                <p>Aucune notification trouvée avec les filtres actuels</p>
              </div>
            )}
          </CardContent>
        </Card>
      </TabPanel>

      <TabPanel value="send">
        <Card>
          <CardHeader>
            <h2 className="text-xl font-semibold text-text-primary">Composer une notification</h2>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {/* Step 1: Target */}
              <div>
                <Label>Étape 1 : Cible (Destinataires)</Label>
                <RadioGroup
                  value={notificationForm.target}
                  onChange={(value) => setNotificationForm(prev => ({ ...prev, target: value }))}
                  options={targetOptions}
                  className="mt-2"
                />
                
                {notificationForm.target === 'specific' && (
                  <div className="mt-4">
                    <Label>Utilisateur(s) spécifique(s)</Label>
                    <ComboBox
                      value={notificationForm.selectedUsers}
                      onChange={(value) => setNotificationForm(prev => ({ ...prev, selectedUsers: [value] }))}
                      options={MOCK_USERS}
                      placeholder="Rechercher et sélectionner des utilisateurs..."
                      className="mt-2"
                    />
                  </div>
                )}
              </div>

              {/* Step 2: Channels */}
              <div>
                <Label>Étape 2 : Canal de Diffusion</Label>
                <div className="mt-2 space-y-3">
                  <Checkbox
                    checked={notificationForm.channels.inApp}
                    onChange={(checked) => setNotificationForm(prev => ({ 
                      ...prev, 
                      channels: { ...prev.channels, inApp: checked } 
                    }))}
                    label="Notification In-App"
                  />
                  <Checkbox
                    checked={notificationForm.channels.email}
                    onChange={(checked) => setNotificationForm(prev => ({ 
                      ...prev, 
                      channels: { ...prev.channels, email: checked } 
                    }))}
                    label="Email"
                  />
                </div>
              </div>

              {/* Step 3: Content */}
              <div>
                <Label>Étape 3 : Contenu du Message</Label>
                <div className="mt-2 space-y-4">
                  <div>
                    <Label htmlFor="subject">Sujet</Label>
                    <Input
                      id="subject"
                      type="text"
                      value={notificationForm.subject}
                      onChange={(e) => setNotificationForm(prev => ({ ...prev, subject: e.target.value }))}
                      placeholder="Sujet de la notification..."
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label>Corps du message</Label>
                    <RichTextEditor
                      value={notificationForm.content}
                      onChange={(e) => setNotificationForm(prev => ({ ...prev, content: e.target.value }))}
                      placeholder="Composez votre message..."
                      className="mt-1"
                    />
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button 
              variant="primary" 
              iconName="Send"
              onClick={handleSendNotification}
              disabled={!notificationForm.subject || !notificationForm.content}
            >
              Envoyer la notification
            </Button>
          </CardFooter>
        </Card>
      </TabPanel>
    </div>
  );
};

export default NotificationsPage; 