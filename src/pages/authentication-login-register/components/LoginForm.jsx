import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Icon from '../../../components/AppIcon';

const LoginForm = ({ onSubmit, isLoading, currentLanguage }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  const translations = {
    fr: {
      email: 'Adresse e-mail',
      password: 'Mot de passe',
      rememberMe: 'Se souvenir de moi',
      forgotPassword: 'Mot de passe oublié ?',
      login: 'Se connecter',
      emailPlaceholder: 'votre.email@ensa.ac.ma',
      passwordPlaceholder: 'Entrez votre mot de passe',
      emailRequired: 'L\'adresse e-mail est requise',
      emailInvalid: 'Adresse e-mail invalide',
      passwordRequired: 'Le mot de passe est requis',
      loginError: 'Email ou mot de passe incorrect. Utilisez: admin@ensa.ac.ma / admin123 ou student@ensa.ac.ma / student123'
    },
    ar: {
      email: 'عنوان البريد الإلكتروني',
      password: 'كلمة المرور',
      rememberMe: 'تذكرني',
      forgotPassword: 'نسيت كلمة المرور؟',
      login: 'تسجيل الدخول',
      emailPlaceholder: 'your.email@ensa.ac.ma',
      passwordPlaceholder: 'أدخل كلمة المرور',
      emailRequired: 'عنوان البريد الإلكتروني مطلوب',
      emailInvalid: 'عنوان بريد إلكتروني غير صالح',
      passwordRequired: 'كلمة المرور مطلوبة',
      loginError: 'البريد الإلكتروني أو كلمة المرور غير صحيحة. استخدم: admin@ensa.ac.ma / admin123 أو student@ensa.ac.ma / student123'
    }
  };

  const t = translations[currentLanguage];

  const validateForm = () => {
    const newErrors = {};

    if (!formData.email.trim()) {
      newErrors.email = t.emailRequired;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.emailInvalid = t.emailInvalid;
    }

    if (!formData.password.trim()) {
      newErrors.password = t.passwordRequired;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      // Mock authentication validation
      const validCredentials = [
        { email: 'admin@ensa.ac.ma', password: 'admin123', role: 'admin' },
        { email: 'student@ensa.ac.ma', password: 'student123', role: 'student' },
        { email: 'staff@ensa.ac.ma', password: 'staff123', role: 'staff' }
      ];

      const user = validCredentials.find(
        cred => cred.email === formData.email && cred.password === formData.password
      );

      if (user) {
        onSubmit(formData, user);
      } else {
        setErrors({ login: t.loginError });
      }
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    // Clear errors when user starts typing
    if (errors[name] || errors.login) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        delete newErrors.login;
        return newErrors;
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {errors.login && (
        <div className="p-4 bg-error-50 border border-error-200 rounded-lg">
          <div className="flex items-center space-x-2">
            <Icon name="AlertCircle" size={16} className="text-error flex-shrink-0" />
            <p className="text-sm text-error">{errors.login}</p>
          </div>
        </div>
      )}

      <div className="space-y-4">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-text-primary mb-2">
            {t.email}
          </label>
          <Input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder={t.emailPlaceholder}
            className={`w-full ${errors.email || errors.emailInvalid ? 'border-error focus:ring-error' : ''}`}
            required
          />
          {(errors.email || errors.emailInvalid) && (
            <p className="mt-1 text-sm text-error">{errors.email || errors.emailInvalid}</p>
          )}
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-medium text-text-primary mb-2">
            {t.password}
          </label>
          <div className="relative">
            <Input
              id="password"
              name="password"
              type={showPassword ? 'text' : 'password'}
              value={formData.password}
              onChange={handleInputChange}
              placeholder={t.passwordPlaceholder}
              className={`w-full pr-10 ${errors.password ? 'border-error focus:ring-error' : ''}`}
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-text-secondary hover:text-text-primary"
            >
              <Icon name={showPassword ? 'EyeOff' : 'Eye'} size={16} />
            </button>
          </div>
          {errors.password && (
            <p className="mt-1 text-sm text-error">{errors.password}</p>
          )}
        </div>
      </div>

      <div className="flex items-center justify-between">
        <label className="flex items-center space-x-2 cursor-pointer">
          <Input
            type="checkbox"
            name="rememberMe"
            checked={formData.rememberMe}
            onChange={handleInputChange}
            className="w-4 h-4"
          />
          <span className="text-sm text-text-secondary">{t.rememberMe}</span>
        </label>
        <Link
          to="#"
          className="text-sm text-primary hover:text-primary-600 transition-colors"
        >
          {t.forgotPassword}
        </Link>
      </div>

      <Button
        type="submit"
        variant="primary"
        fullWidth
        loading={isLoading}
        disabled={isLoading}
        className="h-12"
      >
        {t.login}
      </Button>
    </form>
  );
};

export default LoginForm;