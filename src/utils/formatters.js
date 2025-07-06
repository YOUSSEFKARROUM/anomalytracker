import { format, formatDistanceToNow, isToday, isYesterday, parseISO } from 'date-fns';
import { fr, arDZ } from 'date-fns/locale';

// Get locale based on language
const getLocale = (language) => {
  return language === 'ar' ? arDZ : fr;
};

// Format date relative to now (e.g., "2 hours ago", "yesterday")
export const formatRelativeTime = (date, language = 'fr') => {
  const dateObj = typeof date === 'string' ? parseISO(date) : date;
  const locale = getLocale(language);
  
  if (isToday(dateObj)) {
    return formatDistanceToNow(dateObj, { addSuffix: true, locale });
  }
  
  if (isYesterday(dateObj)) {
    return language === 'ar' ? 'أمس' : 'Hier';
  }
  
  return format(dateObj, 'dd MMM yyyy', { locale });
};

// Format full date and time
export const formatDateTime = (date, language = 'fr') => {
  const dateObj = typeof date === 'string' ? parseISO(date) : date;
  const locale = getLocale(language);
  
  return format(dateObj, 'dd/MM/yyyy à HH:mm', { locale });
};

// Format date only
export const formatDate = (date, language = 'fr') => {
  const dateObj = typeof date === 'string' ? parseISO(date) : date;
  const locale = getLocale(language);
  
  return format(dateObj, 'dd/MM/yyyy', { locale });
};

// Format time only
export const formatTime = (date, language = 'fr') => {
  const dateObj = typeof date === 'string' ? parseISO(date) : date;
  
  return format(dateObj, 'HH:mm');
};

// Format numbers with proper locale
export const formatNumber = (number, language = 'fr') => {
  const locale = language === 'ar' ? 'ar-DZ' : 'fr-FR';
  return new Intl.NumberFormat(locale).format(number);
};

// Format currency
export const formatCurrency = (amount, currency = 'MAD', language = 'fr') => {
  const locale = language === 'ar' ? 'ar-MA' : 'fr-MA';
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currency,
  }).format(amount);
};

// Format file size
export const formatFileSize = (bytes) => {
  if (bytes === 0) return '0 Bytes';
  
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

// Format phone number
export const formatPhoneNumber = (phone) => {
  if (!phone) return '';
  
  // Remove all non-digits
  const cleaned = phone.replace(/\D/g, '');
  
  // Format Moroccan phone numbers
  if (cleaned.startsWith('212')) {
    // International format
    return `+${cleaned.slice(0, 3)} ${cleaned.slice(3, 4)} ${cleaned.slice(4, 6)} ${cleaned.slice(6, 8)} ${cleaned.slice(8, 10)} ${cleaned.slice(10)}`;
  } else if (cleaned.startsWith('0')) {
    // National format
    return `${cleaned.slice(0, 2)} ${cleaned.slice(2, 4)} ${cleaned.slice(4, 6)} ${cleaned.slice(6, 8)} ${cleaned.slice(8)}`;
  }
  
  return phone;
};

// Truncate text with ellipsis
export const truncateText = (text, maxLength = 100) => {
  if (!text || text.length <= maxLength) {
    return text;
  }
  
  return text.slice(0, maxLength).trim() + '...';
};

// Generate initials from name
export const getInitials = (name) => {
  if (!name) return '';
  
  return name
    .split(' ')
    .map(word => word.charAt(0).toUpperCase())
    .slice(0, 2)
    .join('');
};

// Capitalize first letter
export const capitalize = (str) => {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};

// Generate a random color based on string (for avatars, etc.)
export const stringToColor = (str) => {
  if (!str) return '#FF8C00';
  
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  
  const colors = [
    '#FF8C00', '#FF7F50', '#3A3064', '#28A745', 
    '#FFC107', '#DC3545', '#17A2B8', '#6F42C1'
  ];
  
  return colors[Math.abs(hash) % colors.length];
};

export default {
  formatRelativeTime,
  formatDateTime,
  formatDate,
  formatTime,
  formatNumber,
  formatCurrency,
  formatFileSize,
  formatPhoneNumber,
  truncateText,
  getInitials,
  capitalize,
  stringToColor,
};