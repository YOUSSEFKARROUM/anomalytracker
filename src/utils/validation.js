// Form validation utilities
export const validators = {
  required: (value) => {
    if (!value || (typeof value === 'string' && !value.trim())) {
      return 'Ce champ est requis';
    }
    return null;
  },

  email: (value) => {
    if (!value) return null;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) {
      return 'Adresse e-mail non valide';
    }
    return null;
  },

  minLength: (min) => (value) => {
    if (!value) return null;
    if (value.length < min) {
      return `Minimum ${min} caractères requis`;
    }
    return null;
  },

  maxLength: (max) => (value) => {
    if (!value) return null;
    if (value.length > max) {
      return `Maximum ${max} caractères autorisés`;
    }
    return null;
  },

  password: (value) => {
    if (!value) return null;
    if (value.length < 8) {
      return 'Le mot de passe doit contenir au moins 8 caractères';
    }
    if (!/(?=.*[a-z])/.test(value)) {
      return 'Le mot de passe doit contenir au moins une lettre minuscule';
    }
    if (!/(?=.*[A-Z])/.test(value)) {
      return 'Le mot de passe doit contenir au moins une lettre majuscule';
    }
    if (!/(?=.*\d)/.test(value)) {
      return 'Le mot de passe doit contenir au moins un chiffre';
    }
    return null;
  },

  phone: (value) => {
    if (!value) return null;
    const phoneRegex = /^(\+\d{1,3}[- ]?)?\d{10}$/;
    if (!phoneRegex.test(value.replace(/\s/g, ''))) {
      return 'Numéro de téléphone non valide';
    }
    return null;
  },

  url: (value) => {
    if (!value) return null;
    try {
      new URL(value);
      return null;
    } catch {
      return 'URL non valide';
    }
  },

  numeric: (value) => {
    if (!value) return null;
    if (isNaN(value)) {
      return 'Valeur numérique requise';
    }
    return null;
  },

  fileSize: (maxSize) => (file) => {
    if (!file) return null;
    if (file.size > maxSize) {
      return `La taille du fichier ne doit pas dépasser ${formatBytes(maxSize)}`;
    }
    return null;
  },

  fileType: (allowedTypes) => (file) => {
    if (!file) return null;
    if (!allowedTypes.includes(file.type)) {
      return `Type de fichier non autorisé. Types acceptés: ${allowedTypes.join(', ')}`;
    }
    return null;
  },
};

// Validate a single field with multiple validators
export const validateField = (value, validatorList) => {
  for (const validator of validatorList) {
    const error = validator(value);
    if (error) {
      return error;
    }
  }
  return null;
};

// Validate an entire form object
export const validateForm = (values, rules) => {
  const errors = {};
  
  for (const [field, validatorList] of Object.entries(rules)) {
    const error = validateField(values[field], validatorList);
    if (error) {
      errors[field] = error;
    }
  }
  
  return {
    errors,
    isValid: Object.keys(errors).length === 0,
  };
};

// Format bytes helper
export const formatBytes = (bytes, decimals = 2) => {
  if (bytes === 0) return '0 Bytes';
  
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
};

export default validators;