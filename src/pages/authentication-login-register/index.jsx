import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PublicHeader from '../../components/ui/PublicHeader';
import AuthTabs from './components/AuthTabs';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import SocialAuth from './components/SocialAuth';
import Icon from '../../components/AppIcon';

const AuthenticationPage = () => {
  const [activeTab, setActiveTab] = useState('login');
  const [isLoading, setIsLoading] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState('fr');
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') || 'fr';
    setCurrentLanguage(savedLanguage);
  }, []);

  const translations = {
    fr: {
      welcomeBack: 'Bon retour !',
      loginSubtitle: 'Connectez-vous à votre compte AnomalyTracker',
      createAccount: 'Créer un compte',
      registerSubtitle: 'Rejoignez la communauté ENSA Béni Mellal',
      loginSuccess: 'Connexion réussie ! Redirection...',
      registerSuccess: 'Inscription réussie ! Vous pouvez maintenant vous connecter.',
      loginError: 'Erreur de connexion. Veuillez réessayer.',
      registerError: 'Erreur d\'inscription. Veuillez réessayer.',
      mockCredentials: 'Identifiants de test disponibles:'
    },
    ar: {
      welcomeBack: 'مرحباً بعودتك!',
      loginSubtitle: 'قم بتسجيل الدخول إلى حساب AnomalyTracker الخاص بك',
      createAccount: 'إنشاء حساب',
      registerSubtitle: 'انضم إلى مجتمع ENSA Béni Mellal',
      loginSuccess: 'تم تسجيل الدخول بنجاح! جاري التوجيه...',
      registerSuccess: 'تم التسجيل بنجاح! يمكنك الآن تسجيل الدخول.',
      loginError: 'خطأ في تسجيل الدخول. يرجى المحاولة مرة أخرى.',
      registerError: 'خطأ في التسجيل. يرجى المحاولة مرة أخرى.',
      mockCredentials: 'بيانات الاعتماد التجريبية المتاحة:'
    }
  };

  const t = translations[currentLanguage];

  const handleLogin = async (formData, user) => {
    setIsLoading(true);
    try {
      // Mock authentication delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Store user data in localStorage
      localStorage.setItem('user', JSON.stringify({
        id: user.email === 'admin@ensa.ac.ma' ? 1 : 2,
        name: user.email === 'admin@ensa.ac.ma' ? 'Admin User' : 'Student User',
        email: user.email,
        role: user.role,
        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.email}`,
        isAuthenticated: true
      }));
      
      setShowSuccessMessage(true);
      
      // Redirect based on user role
      setTimeout(() => {
        if (user.role === 'admin') {
          navigate('/admin-panel-dashboard');
        } else {
          navigate('/anomaly-tracking-dashboard');
        }
      }, 2000);
      
    } catch (error) {
      console.error('Login error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegister = async (formData) => {
    setIsLoading(true);
    try {
      // Mock registration delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setShowSuccessMessage(true);
      
      // Switch to login tab after successful registration
      setTimeout(() => {
        setActiveTab('login');
        setShowSuccessMessage(false);
      }, 3000);
      
    } catch (error) {
      console.error('Registration error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <PublicHeader />
      
      <div className="pt-16 min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          {/* Header */}
          <div className="text-center">
            <div className="mx-auto w-16 h-16 bg-primary rounded-full flex items-center justify-center mb-6">
              <Icon name="Shield" size={32} className="text-primary-foreground" />
            </div>
            <h1 className="text-3xl font-bold text-text-primary mb-2">
              {activeTab === 'login' ? t.welcomeBack : t.createAccount}
            </h1>
            <p className="text-text-secondary">
              {activeTab === 'login' ? t.loginSubtitle : t.registerSubtitle}
            </p>
          </div>

          {/* Success Message */}
          {showSuccessMessage && (
            <div className="p-4 bg-success-50 border border-success-200 rounded-lg">
              <div className="flex items-center space-x-2">
                <Icon name="CheckCircle" size={20} className="text-success flex-shrink-0" />
                <p className="text-sm text-success font-medium">
                  {activeTab === 'login' ? t.loginSuccess : t.registerSuccess}
                </p>
              </div>
            </div>
          )}

          {/* Auth Form Container */}
          <div className="bg-background border border-border rounded-xl shadow-card p-8">
            <AuthTabs 
              activeTab={activeTab} 
              onTabChange={setActiveTab}
              currentLanguage={currentLanguage}
            />

            {activeTab === 'login' ? (
              <LoginForm
                onSubmit={handleLogin}
                isLoading={isLoading}
                currentLanguage={currentLanguage}
              />
            ) : (
              <RegisterForm
                onSubmit={handleRegister}
                isLoading={isLoading}
                currentLanguage={currentLanguage}
              />
            )}

            {/* Social Authentication */}
            <div className="mt-8">
              <SocialAuth currentLanguage={currentLanguage} />
            </div>
          </div>

          {/* Mock Credentials Info */}
          <div className="bg-primary-50 border border-primary-200 rounded-lg p-4">
            <div className="flex items-start space-x-2">
              <Icon name="Info" size={16} className="text-primary flex-shrink-0 mt-0.5" />
              <div className="text-sm">
                <p className="font-medium text-primary mb-2">{t.mockCredentials}</p>
                <div className="space-y-1 text-primary-700">
                  <p>• Admin: admin@ensa.ac.ma / admin123</p>
                  <p>• Student: student@ensa.ac.ma / student123</p>
                  <p>• Staff: staff@ensa.ac.ma / staff123</p>
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="text-center text-sm text-text-secondary">
            <p>© {new Date().getFullYear()} AnomalyTracker - ENSA Béni Mellal</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthenticationPage;