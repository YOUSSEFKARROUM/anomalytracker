import React, { useState } from 'react';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Icon from '../../../components/AppIcon';

const RegisterForm = ({ onSubmit, isLoading, currentLanguage }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    studentId: '',
    password: '',
    confirmPassword: '',
    userType: 'student',
    agreeToTerms: false
  });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const translations = {
    fr: {
      fullName: 'Nom complet',
      email: 'Adresse e-mail',
      studentId: 'ID Étudiant/Personnel',
      password: 'Mot de passe',
      confirmPassword: 'Confirmer le mot de passe',
      userType: 'Type d\'utilisateur',
      student: 'Étudiant',
      staff: 'Personnel',
      agreeToTerms: 'J\'accepte les conditions d\'utilisation',
      register: 'S\'inscrire',
      namePlaceholder: 'Entrez votre nom complet',
      emailPlaceholder: 'votre.email@ensa.ac.ma',
      studentIdPlaceholder: 'Ex: ENS123456 ou STAFF001',
      passwordPlaceholder: 'Minimum 8 caractères',
      confirmPasswordPlaceholder: 'Confirmez votre mot de passe',
      nameRequired: 'Le nom complet est requis',
      emailRequired: 'L\'adresse e-mail est requise',
      emailInvalid: 'Adresse e-mail invalide',
      studentIdRequired: 'L\'ID est requis',
      passwordRequired: 'Le mot de passe est requis',
      passwordTooShort: 'Le mot de passe doit contenir au moins 8 caractères',
      confirmPasswordRequired: 'La confirmation du mot de passe est requise',
      passwordMismatch: 'Les mots de passe ne correspondent pas',
      termsRequired: 'Vous devez accepter les conditions d\'utilisation',
      passwordStrength: 'Force du mot de passe:'
    },
    ar: {
      fullName: 'الاسم الكامل',
      email: 'عنوان البريد الإلكتروني',
      studentId: 'معرف الطالب/الموظف',
      password: 'كلمة المرور',
      confirmPassword: 'تأكيد كلمة المرور',
      userType: 'نوع المستخدم',
      student: 'طالب',
      staff: 'موظف',
      agreeToTerms: 'أوافق على شروط الاستخدام',
      register: 'التسجيل',
      namePlaceholder: 'أدخل اسمك الكامل',
      emailPlaceholder: 'your.email@ensa.ac.ma',
      studentIdPlaceholder: 'مثال: ENS123456 أو STAFF001',
      passwordPlaceholder: 'الحد الأدنى 8 أحرف',
      confirmPasswordPlaceholder: 'أكد كلمة المرور',
      nameRequired: 'الاسم الكامل مطلوب',
      emailRequired: 'عنوان البريد الإلكتروني مطلوب',
      emailInvalid: 'عنوان بريد إلكتروني غير صالح',
      studentIdRequired: 'المعرف مطلوب',
      passwordRequired: 'كلمة المرور مطلوبة',
      passwordTooShort: 'يجب أن تحتوي كلمة المرور على 8 أحرف على الأقل',
      confirmPasswordRequired: 'تأكيد كلمة المرور مطلوب',
      passwordMismatch: 'كلمات المرور غير متطابقة',
      termsRequired: 'يجب أن توافق على شروط الاستخدام',
      passwordStrength: 'قوة كلمة المرور:'
    }
  };

  const t = translations[currentLanguage];

  const getPasswordStrength = (password) => {
    if (password.length === 0) return { strength: 0, label: '', color: '' };
    if (password.length < 6) return { strength: 1, label: 'Faible', color: 'bg-error' };
    if (password.length < 8) return { strength: 2, label: 'Moyen', color: 'bg-warning' };
    if (password.length >= 8 && /(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(password)) {
      return { strength: 4, label: 'Fort', color: 'bg-success' };
    }
    return { strength: 3, label: 'Bon', color: 'bg-primary' };
  };

  const passwordStrength = getPasswordStrength(formData.password);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = t.nameRequired;
    }

    if (!formData.email.trim()) {
      newErrors.email = t.emailRequired;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = t.emailInvalid;
    }

    if (!formData.studentId.trim()) {
      newErrors.studentId = t.studentIdRequired;
    }

    if (!formData.password.trim()) {
      newErrors.password = t.passwordRequired;
    } else if (formData.password.length < 8) {
      newErrors.password = t.passwordTooShort;
    }

    if (!formData.confirmPassword.trim()) {
      newErrors.confirmPassword = t.confirmPasswordRequired;
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = t.passwordMismatch;
    }

    if (!formData.agreeToTerms) {
      newErrors.agreeToTerms = t.termsRequired;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    // Clear errors when user starts typing
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-text-primary mb-2">
            {t.fullName}
          </label>
          <Input
            id="name"
            name="name"
            type="text"
            value={formData.name}
            onChange={handleInputChange}
            placeholder={t.namePlaceholder}
            className={`w-full ${errors.name ? 'border-error focus:ring-error' : ''}`}
            required
          />
          {errors.name && (
            <p className="mt-1 text-sm text-error">{errors.name}</p>
          )}
        </div>

        <div>
          <label htmlFor="userType" className="block text-sm font-medium text-text-primary mb-2">
            {t.userType}
          </label>
          <select
            id="userType"
            name="userType"
            value={formData.userType}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          >
            <option value="student">{t.student}</option>
            <option value="staff">{t.staff}</option>
          </select>
        </div>
      </div>

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
          className={`w-full ${errors.email ? 'border-error focus:ring-error' : ''}`}
          required
        />
        {errors.email && (
          <p className="mt-1 text-sm text-error">{errors.email}</p>
        )}
      </div>

      <div>
        <label htmlFor="studentId" className="block text-sm font-medium text-text-primary mb-2">
          {t.studentId}
        </label>
        <Input
          id="studentId"
          name="studentId"
          type="text"
          value={formData.studentId}
          onChange={handleInputChange}
          placeholder={t.studentIdPlaceholder}
          className={`w-full ${errors.studentId ? 'border-error focus:ring-error' : ''}`}
          required
        />
        {errors.studentId && (
          <p className="mt-1 text-sm text-error">{errors.studentId}</p>
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
        {formData.password && (
          <div className="mt-2">
            <div className="flex items-center space-x-2 mb-1">
              <span className="text-xs text-text-secondary">{t.passwordStrength}</span>
              <span className={`text-xs font-medium ${
                passwordStrength.strength === 1 ? 'text-error' :
                passwordStrength.strength === 2 ? 'text-warning' :
                passwordStrength.strength === 3 ? 'text-primary' : 'text-success'
              }`}>
                {passwordStrength.label}
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-1">
              <div
                className={`h-1 rounded-full transition-all duration-300 ${passwordStrength.color}`}
                style={{ width: `${(passwordStrength.strength / 4) * 100}%` }}
              />
            </div>
          </div>
        )}
        {errors.password && (
          <p className="mt-1 text-sm text-error">{errors.password}</p>
        )}
      </div>

      <div>
        <label htmlFor="confirmPassword" className="block text-sm font-medium text-text-primary mb-2">
          {t.confirmPassword}
        </label>
        <div className="relative">
          <Input
            id="confirmPassword"
            name="confirmPassword"
            type={showConfirmPassword ? 'text' : 'password'}
            value={formData.confirmPassword}
            onChange={handleInputChange}
            placeholder={t.confirmPasswordPlaceholder}
            className={`w-full pr-10 ${errors.confirmPassword ? 'border-error focus:ring-error' : ''}`}
            required
          />
          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="absolute inset-y-0 right-0 pr-3 flex items-center text-text-secondary hover:text-text-primary"
          >
            <Icon name={showConfirmPassword ? 'EyeOff' : 'Eye'} size={16} />
          </button>
        </div>
        {errors.confirmPassword && (
          <p className="mt-1 text-sm text-error">{errors.confirmPassword}</p>
        )}
      </div>

      <div>
        <label className="flex items-start space-x-2 cursor-pointer">
          <Input
            type="checkbox"
            name="agreeToTerms"
            checked={formData.agreeToTerms}
            onChange={handleInputChange}
            className={`w-4 h-4 mt-1 ${errors.agreeToTerms ? 'border-error' : ''}`}
          />
          <span className="text-sm text-text-secondary leading-relaxed">
            {t.agreeToTerms}
          </span>
        </label>
        {errors.agreeToTerms && (
          <p className="mt-1 text-sm text-error">{errors.agreeToTerms}</p>
        )}
      </div>

      <Button
        type="submit"
        variant="primary"
        fullWidth
        loading={isLoading}
        disabled={isLoading}
        className="h-12"
      >
        {t.register}
      </Button>
    </form>
  );
};

export default RegisterForm;