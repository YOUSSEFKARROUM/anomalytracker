// Application constants

// API endpoints
export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    LOGOUT: '/auth/logout',
    REFRESH: '/auth/refresh',
    FORGOT_PASSWORD: '/auth/forgot-password',
    RESET_PASSWORD: '/auth/reset-password',
  },
  ANOMALIES: {
    BASE: '/anomalies',
    COMMENTS: (id) => `/anomalies/${id}/comments`,
    FILES: (id) => `/anomalies/${id}/files`,
  },
  USERS: {
    PROFILE: '/users/profile',
    NOTIFICATIONS: '/users/notifications',
  },
  NEWS: '/news',
  ADMIN: {
    STATS: '/admin/stats',
    USERS: '/admin/users',
    SYSTEM: '/admin/system',
    ACTIVITY: '/admin/activity',
  },
};

// Local storage keys
export const STORAGE_KEYS = {
  AUTH_TOKEN: 'authToken',
  USER: 'user',
  LANGUAGE: 'language',
  THEME: 'theme',
  FORM_DRAFT: 'anomaly-form-draft',
  PREFERENCES: 'userPreferences',
};

// Status options for anomalies
export const ANOMALY_STATUS = {
  PENDING: 'pending',
  ACKNOWLEDGED: 'acknowledged',
  IN_PROGRESS: 'in-progress',
  RESOLVED: 'resolved',
  CLOSED: 'closed',
  REJECTED: 'rejected',
};

export const ANOMALY_STATUS_LABELS = {
  fr: {
    [ANOMALY_STATUS.PENDING]: 'En attente',
    [ANOMALY_STATUS.ACKNOWLEDGED]: 'Accusé de réception',
    [ANOMALY_STATUS.IN_PROGRESS]: 'En cours',
    [ANOMALY_STATUS.RESOLVED]: 'Résolu',
    [ANOMALY_STATUS.CLOSED]: 'Fermé',
    [ANOMALY_STATUS.REJECTED]: 'Rejeté',
  },
  ar: {
    [ANOMALY_STATUS.PENDING]: 'في الانتظار',
    [ANOMALY_STATUS.ACKNOWLEDGED]: 'تم الاستلام',
    [ANOMALY_STATUS.IN_PROGRESS]: 'قيد المعالجة',
    [ANOMALY_STATUS.RESOLVED]: 'تم الحل',
    [ANOMALY_STATUS.CLOSED]: 'مغلق',
    [ANOMALY_STATUS.REJECTED]: 'مرفوض',
  },
};

// Priority levels
export const PRIORITY_LEVELS = {
  LOW: 'low',
  MEDIUM: 'medium',
  HIGH: 'high',
  URGENT: 'urgent',
};

export const PRIORITY_LABELS = {
  fr: {
    [PRIORITY_LEVELS.LOW]: 'Faible',
    [PRIORITY_LEVELS.MEDIUM]: 'Moyenne',
    [PRIORITY_LEVELS.HIGH]: 'Élevée',
    [PRIORITY_LEVELS.URGENT]: 'Urgente',
  },
  ar: {
    [PRIORITY_LEVELS.LOW]: 'منخفضة',
    [PRIORITY_LEVELS.MEDIUM]: 'متوسطة',
    [PRIORITY_LEVELS.HIGH]: 'عالية',
    [PRIORITY_LEVELS.URGENT]: 'عاجلة',
  },
};

// Category types
export const ANOMALY_CATEGORIES = {
  INFRASTRUCTURE: 'infrastructure',
  EQUIPMENT: 'equipment',
  CLEANLINESS: 'cleanliness',
  SECURITY: 'security',
  IT: 'it',
  OTHER: 'other',
};

export const CATEGORY_LABELS = {
  fr: {
    [ANOMALY_CATEGORIES.INFRASTRUCTURE]: 'Infrastructure',
    [ANOMALY_CATEGORIES.EQUIPMENT]: 'Équipement',
    [ANOMALY_CATEGORIES.CLEANLINESS]: 'Propreté',
    [ANOMALY_CATEGORIES.SECURITY]: 'Sécurité',
    [ANOMALY_CATEGORIES.IT]: 'Informatique',
    [ANOMALY_CATEGORIES.OTHER]: 'Autre',
  },
  ar: {
    [ANOMALY_CATEGORIES.INFRASTRUCTURE]: 'البنية التحتية',
    [ANOMALY_CATEGORIES.EQUIPMENT]: 'المعدات',
    [ANOMALY_CATEGORIES.CLEANLINESS]: 'النظافة',
    [ANOMALY_CATEGORIES.SECURITY]: 'الأمن',
    [ANOMALY_CATEGORIES.IT]: 'تكنولوجيا المعلومات',
    [ANOMALY_CATEGORIES.OTHER]: 'أخرى',
  },
};

// User roles
export const USER_ROLES = {
  STUDENT: 'student',
  TEACHER: 'teacher',
  STAFF: 'staff',
  ADMIN: 'admin',
  SUPER_ADMIN: 'super_admin',
};

export const ROLE_LABELS = {
  fr: {
    [USER_ROLES.STUDENT]: 'Étudiant',
    [USER_ROLES.TEACHER]: 'Enseignant',
    [USER_ROLES.STAFF]: 'Personnel',
    [USER_ROLES.ADMIN]: 'Administrateur',
    [USER_ROLES.SUPER_ADMIN]: 'Super Administrateur',
  },
  ar: {
    [USER_ROLES.STUDENT]: 'طالب',
    [USER_ROLES.TEACHER]: 'مدرس',
    [USER_ROLES.STAFF]: 'موظف',
    [USER_ROLES.ADMIN]: 'مدير',
    [USER_ROLES.SUPER_ADMIN]: 'مدير عام',
  },
};

// File upload constraints
export const FILE_UPLOAD = {
  MAX_SIZE: 10 * 1024 * 1024, // 10MB
  ALLOWED_TYPES: [
    'image/jpeg',
    'image/jpg',
    'image/png',
    'image/gif',
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  ],
  MAX_FILES: 5,
};

// Pagination
export const PAGINATION = {
  DEFAULT_PAGE_SIZE: 10,
  PAGE_SIZE_OPTIONS: [5, 10, 20, 50],
};

// News categories
export const NEWS_CATEGORIES = {
  GENERAL: 'general',
  SYSTEM: 'system',
  MAINTENANCE: 'maintenance',
  FEATURE: 'feature',
  ANNOUNCEMENT: 'announcement',
};

export const NEWS_CATEGORY_LABELS = {
  fr: {
    [NEWS_CATEGORIES.GENERAL]: 'Général',
    [NEWS_CATEGORIES.SYSTEM]: 'Système',
    [NEWS_CATEGORIES.MAINTENANCE]: 'Maintenance',
    [NEWS_CATEGORIES.FEATURE]: 'Fonctionnalités',
    [NEWS_CATEGORIES.ANNOUNCEMENT]: 'Annonces',
  },
  ar: {
    [NEWS_CATEGORIES.GENERAL]: 'عام',
    [NEWS_CATEGORIES.SYSTEM]: 'النظام',
    [NEWS_CATEGORIES.MAINTENANCE]: 'الصيانة',
    [NEWS_CATEGORIES.FEATURE]: 'الميزات',
    [NEWS_CATEGORIES.ANNOUNCEMENT]: 'الإعلانات',
  },
};

// Application settings
export const APP_CONFIG = {
  NAME: 'AnomalyTracker',
  VERSION: '1.0.0',
  COMPANY: 'ENSA Béni Mellal',
  CONTACT_EMAIL: 'support@ensa-bm.ac.ma',
  WEBSITE: 'https://www.ensa-bm.ac.ma',
  PHONE: '+212 523 48 51 12',
  ADDRESS: 'Béni Mellal, Maroc',
};

// Regex patterns
export const REGEX_PATTERNS = {
  EMAIL: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  PHONE: /^(\+\d{1,3}[- ]?)?\d{10}$/,
  PASSWORD: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@$!%*?&]{8,}$/,
  URL: /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/,
};

// Error messages
export const ERROR_MESSAGES = {
  fr: {
    NETWORK_ERROR: 'Erreur de connexion réseau',
    UNAUTHORIZED: 'Accès non autorisé',
    FORBIDDEN: 'Accès interdit',
    NOT_FOUND: 'Ressource non trouvée',
    SERVER_ERROR: 'Erreur serveur interne',
    VALIDATION_ERROR: 'Erreur de validation',
    UPLOAD_ERROR: 'Erreur lors du téléchargement',
  },
  ar: {
    NETWORK_ERROR: 'خطأ في الاتصال بالشبكة',
    UNAUTHORIZED: 'غير مخول بالوصول',
    FORBIDDEN: 'الوصول محظور',
    NOT_FOUND: 'المورد غير موجود',
    SERVER_ERROR: 'خطأ في الخادم الداخلي',
    VALIDATION_ERROR: 'خطأ في التحقق',
    UPLOAD_ERROR: 'خطأ في التحميل',
  },
};

export default {
  API_ENDPOINTS,
  STORAGE_KEYS,
  ANOMALY_STATUS,
  ANOMALY_STATUS_LABELS,
  PRIORITY_LEVELS,
  PRIORITY_LABELS,
  ANOMALY_CATEGORIES,
  CATEGORY_LABELS,
  USER_ROLES,
  ROLE_LABELS,
  FILE_UPLOAD,
  PAGINATION,
  NEWS_CATEGORIES,
  NEWS_CATEGORY_LABELS,
  APP_CONFIG,
  REGEX_PATTERNS,
  ERROR_MESSAGES,
};