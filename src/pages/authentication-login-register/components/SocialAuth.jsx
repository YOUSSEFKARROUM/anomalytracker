import React from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const SocialAuth = ({ currentLanguage }) => {
  const translations = {
    fr: {
      orContinueWith: 'Ou continuer avec',
      googleAuth: 'Continuer avec Google',
      microsoftAuth: 'Continuer avec Microsoft',
      institutionalSSO: 'SSO Institutionnel'
    },
    ar: {
      orContinueWith: 'أو المتابعة مع',
      googleAuth: 'المتابعة مع Google',
      microsoftAuth: 'المتابعة مع Microsoft',
      institutionalSSO: 'تسجيل الدخول المؤسسي'
    }
  };

  const t = translations[currentLanguage];

  const handleSocialAuth = (provider) => {
    // Mock social authentication
    console.log(`Authenticating with ${provider}`);
  };

  return (
    <div className="space-y-4">
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-border" />
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-4 bg-background text-text-secondary">
            {t.orContinueWith}
          </span>
        </div>
      </div>

      <div className="space-y-3">
        <Button
          variant="outline"
          fullWidth
          onClick={() => handleSocialAuth('google')}
          className="h-12 border-gray-300 hover:border-gray-400"
        >
          <div className="flex items-center justify-center space-x-3">
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
            <span className="text-text-primary font-medium">{t.googleAuth}</span>
          </div>
        </Button>

        <Button
          variant="outline"
          fullWidth
          onClick={() => handleSocialAuth('microsoft')}
          className="h-12 border-gray-300 hover:border-gray-400"
        >
          <div className="flex items-center justify-center space-x-3">
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path fill="#F25022" d="M1 1h10v10H1z" />
              <path fill="#00A4EF" d="M13 1h10v10H13z" />
              <path fill="#7FBA00" d="M1 13h10v10H1z" />
              <path fill="#FFB900" d="M13 13h10v10H13z" />
            </svg>
            <span className="text-text-primary font-medium">{t.microsoftAuth}</span>
          </div>
        </Button>

        <Button
          variant="outline"
          fullWidth
          onClick={() => handleSocialAuth('institutional')}
          className="h-12 border-primary-300 hover:border-primary-400 text-primary hover:bg-primary-50"
        >
          <div className="flex items-center justify-center space-x-3">
            <Icon name="Building2" size={20} className="text-primary" />
            <span className="font-medium">{t.institutionalSSO}</span>
          </div>
        </Button>
      </div>
    </div>
  );
};

export default SocialAuth;