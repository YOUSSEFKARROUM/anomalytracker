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

// Avatar Component
const Avatar = ({ src, alt, size = 'md', className = '' }) => {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16',
    xl: 'w-24 h-24'
  };

  return (
    <div className={`relative ${sizeClasses[size]} ${className}`}>
      <img
        src={src}
        alt={alt}
        className="w-full h-full rounded-full object-cover border-2 border-border"
        onError={(e) => {
          e.target.src = '/assets/images/no_image.png';
        }}
      />
    </div>
  );
};

// Label Component
const Label = ({ children, htmlFor, className = '' }) => (
  <label htmlFor={htmlFor} className={`block text-sm font-medium text-text-primary mb-2 ${className}`}>
    {children}
  </label>
);

// Switch Component
const Switch = ({ checked, onChange, id, label, className = '' }) => (
  <div className={`flex items-center justify-between ${className}`}>
    <label htmlFor={id} className="text-sm text-text-primary cursor-pointer">
      {label}
    </label>
    <button
      id={id}
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
        <div className="flex items-center space-x-2">
          {option.icon && <Icon name={option.icon} size={16} className="text-text-secondary" />}
          <span className="text-sm text-text-primary">{option.label}</span>
        </div>
      </label>
    ))}
  </div>
);

// Mock data
const MOCK_LOGIN_ACTIVITY = [
  {
    id: 1,
    device: 'Chrome sur Windows 10',
    ip: '192.168.1.100',
    date: '2024-01-15 14:30:00'
  },
  {
    id: 2,
    device: 'Safari sur iPhone',
    ip: '192.168.1.101',
    date: '2024-01-14 09:15:00'
  },
  {
    id: 3,
    device: 'Firefox sur macOS',
    ip: '192.168.1.102',
    date: '2024-01-13 16:45:00'
  },
  {
    id: 4,
    device: 'Chrome sur Android',
    ip: '192.168.1.103',
    date: '2024-01-12 11:20:00'
  },
  {
    id: 5,
    device: 'Edge sur Windows 11',
    ip: '192.168.1.104',
    date: '2024-01-11 13:10:00'
  }
];

const SettingsPage = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('profile');

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
      title: 'Paramètres mis à jour',
      message: 'Vos préférences ont été sauvegardées',
      read: false,
      timestamp: new Date(Date.now() - 900000)
    }
  ];

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('authToken');
    navigate('/authentication-login-register');
  };

  // Profile tab state
  const [profileForm, setProfileForm] = useState({
    fullName: mockUser.name,
    email: mockUser.email,
    avatar: mockUser.avatar
  });

  // Security tab state
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  // Notifications tab state
  const [notificationPreferences, setNotificationPreferences] = useState({
    emailHighPriority: true,
    emailDailySummary: false,
    inAppAssignedTasks: true
  });

  // Appearance tab state
  const [theme, setTheme] = useState('light');

  const themeOptions = [
    { value: 'light', label: 'Clair', icon: 'Sun' },
    { value: 'dark', label: 'Sombre', icon: 'Moon' },
    { value: 'system', label: 'Système', icon: 'Laptop' }
  ];

  const handleSaveProfile = () => {
    // Mock save functionality
    console.log('Saving profile:', profileForm);
  };

  const handleUpdatePassword = () => {
    // Mock password update functionality
    console.log('Updating password:', passwordForm);
    setPasswordForm({
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    });
  };

  const handleSaveNotificationPreferences = () => {
    // Mock save functionality
    console.log('Saving notification preferences:', notificationPreferences);
  };

  const handleThemeChange = (newTheme) => {
    setTheme(newTheme);
    // Mock theme change functionality
    console.log('Changing theme to:', newTheme);
    // In a real app, you would integrate with a theme provider here
  };

  const handleAvatarChange = () => {
    // Mock avatar change functionality
    console.log('Changing avatar...');
  };

  const maskIP = (ip) => {
    const parts = ip.split('.');
    return `${parts[0]}.${parts[1]}.*.${parts[3]}`;
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
          <h1 className="text-3xl font-bold text-foreground">Paramètres du compte</h1>
          <p className="text-text-secondary mt-2">
            Gérez vos informations de profil, vos préférences de notification et votre sécurité.
          </p>
        </div>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <Tab value="profile">Mon Profil</Tab>
        <Tab value="security">Sécurité du Compte</Tab>
        <Tab value="notifications">Préférences de Notification</Tab>
        <Tab value="appearance">Apparence</Tab>
      </Tabs>

      {/* Tab Panels */}
      <TabPanel value="profile">
        <Card>
          <CardHeader>
            <h2 className="text-xl font-semibold text-text-primary">Informations du profil</h2>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {/* Avatar Section */}
              <div className="flex items-center space-x-6">
                <div className="relative">
                  <Avatar 
                    src={profileForm.avatar} 
                    alt={profileForm.fullName} 
                    size="xl"
                  />
                  <button
                    onClick={handleAvatarChange}
                    className="absolute -bottom-2 -right-2 w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white hover:bg-primary/90 transition-colors"
                  >
                    <Icon name="Camera" size={16} />
                  </button>
                </div>
                <div>
                  <p className="text-sm text-text-secondary mb-1">Photo de profil</p>
                  <p className="text-xs text-text-muted">Cliquez sur l'icône pour changer votre photo</p>
                </div>
              </div>

              {/* Form Fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="fullName">Nom complet</Label>
                  <Input
                    id="fullName"
                    type="text"
                    value={profileForm.fullName}
                    onChange={(e) => setProfileForm(prev => ({ ...prev, fullName: e.target.value }))}
                    placeholder="Votre nom complet"
                  />
                </div>
                <div>
                  <Label htmlFor="email">Adresse Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={profileForm.email}
                    readOnly
                    className="bg-gray-50 cursor-not-allowed"
                    placeholder="Votre adresse email"
                  />
                  <p className="text-xs text-text-muted mt-1">
                    L'email ne peut pas être modifié pour des raisons de sécurité
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button 
              variant="primary" 
              onClick={handleSaveProfile}
            >
              Sauvegarder le profil
            </Button>
          </CardFooter>
        </Card>
      </TabPanel>

      <TabPanel value="security">
        <div className="space-y-6">
          {/* Password Change Card */}
          <Card>
            <CardHeader>
              <h2 className="text-xl font-semibold text-text-primary">Changer de mot de passe</h2>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="currentPassword">Mot de passe actuel</Label>
                  <Input
                    id="currentPassword"
                    type="password"
                    value={passwordForm.currentPassword}
                    onChange={(e) => setPasswordForm(prev => ({ ...prev, currentPassword: e.target.value }))}
                    placeholder="Entrez votre mot de passe actuel"
                  />
                </div>
                <div>
                  <Label htmlFor="newPassword">Nouveau mot de passe</Label>
                  <Input
                    id="newPassword"
                    type="password"
                    value={passwordForm.newPassword}
                    onChange={(e) => setPasswordForm(prev => ({ ...prev, newPassword: e.target.value }))}
                    placeholder="Entrez votre nouveau mot de passe"
                  />
                </div>
                <div>
                  <Label htmlFor="confirmPassword">Confirmer le nouveau mot de passe</Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    value={passwordForm.confirmPassword}
                    onChange={(e) => setPasswordForm(prev => ({ ...prev, confirmPassword: e.target.value }))}
                    placeholder="Confirmez votre nouveau mot de passe"
                  />
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button 
                variant="primary" 
                onClick={handleUpdatePassword}
                disabled={!passwordForm.currentPassword || !passwordForm.newPassword || !passwordForm.confirmPassword}
              >
                Mettre à jour le mot de passe
              </Button>
            </CardFooter>
          </Card>

          {/* Login Activity Card */}
          <Card>
            <CardHeader>
              <h2 className="text-xl font-semibold text-text-primary">Activité de connexion récente</h2>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableHeaderCell>Appareil/Navigateur</TableHeaderCell>
                  <TableHeaderCell>Adresse IP</TableHeaderCell>
                  <TableHeaderCell>Date</TableHeaderCell>
                </TableHeader>
                <TableBody>
                  {MOCK_LOGIN_ACTIVITY.map((activity) => (
                    <TableRow key={activity.id}>
                      <TableCell>{activity.device}</TableCell>
                      <TableCell>{maskIP(activity.ip)}</TableCell>
                      <TableCell>{new Date(activity.date).toLocaleString('fr-FR')}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </TabPanel>

      <TabPanel value="notifications">
        <Card>
          <CardHeader>
            <h2 className="text-xl font-semibold text-text-primary">Préférences de Notification</h2>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {/* Email Notifications */}
              <div>
                <h3 className="text-lg font-semibold text-text-primary mb-4">Notifications par Email</h3>
                <div className="space-y-4">
                  <Switch
                    id="emailHighPriority"
                    checked={notificationPreferences.emailHighPriority}
                    onChange={(checked) => setNotificationPreferences(prev => ({ ...prev, emailHighPriority: checked }))}
                    label="M'envoyer un email pour chaque nouvelle anomalie à priorité 'Haute'"
                  />
                  <Switch
                    id="emailDailySummary"
                    checked={notificationPreferences.emailDailySummary}
                    onChange={(checked) => setNotificationPreferences(prev => ({ ...prev, emailDailySummary: checked }))}
                    label="M'envoyer un résumé quotidien de l'activité"
                  />
                </div>
              </div>

              {/* In-App Notifications */}
              <div>
                <h3 className="text-lg font-semibold text-text-primary mb-4">Notifications In-App</h3>
                <div className="space-y-4">
                  <Switch
                    id="inAppAssignedTasks"
                    checked={notificationPreferences.inAppAssignedTasks}
                    onChange={(checked) => setNotificationPreferences(prev => ({ ...prev, inAppAssignedTasks: checked }))}
                    label="Afficher une notification pour les nouvelles tâches qui me sont assignées"
                  />
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button 
              variant="primary" 
              onClick={handleSaveNotificationPreferences}
            >
              Sauvegarder les préférences
            </Button>
          </CardFooter>
        </Card>
      </TabPanel>

      <TabPanel value="appearance">
        <Card>
          <CardHeader>
            <h2 className="text-xl font-semibold text-text-primary">Apparence de l'interface</h2>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <Label>Thème</Label>
              <RadioGroup
                value={theme}
                onChange={handleThemeChange}
                options={themeOptions}
                className="mt-2"
              />
              <p className="text-sm text-text-secondary mt-4">
                Le thème choisi sera appliqué à toute l'interface de l'application.
              </p>
            </div>
          </CardContent>
        </Card>
      </TabPanel>
    </div>
  );
};

export default SettingsPage; 