/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Primary Colors
        'primary': '#FF8C00', // orange-500
        'primary-foreground': '#FFFFFF', // white
        'primary-50': '#FFF7ED', // orange-50
        'primary-100': '#FFEDD5', // orange-100
        'primary-200': '#FED7AA', // orange-200
        'primary-300': '#FDBA74', // orange-300
        'primary-400': '#FB923C', // orange-400
        'primary-500': '#FF8C00', // orange-500
        'primary-600': '#EA580C', // orange-600
        'primary-700': '#C2410C', // orange-700
        'primary-800': '#9A3412', // orange-800
        'primary-900': '#7C2D12', // orange-900

        // Secondary Colors
        'secondary': '#FF7F50', // coral
        'secondary-foreground': '#FFFFFF', // white
        'secondary-50': '#FFF5F5', // red-50
        'secondary-100': '#FED7D7', // red-100
        'secondary-200': '#FEB2B2', // red-200
        'secondary-300': '#FC8181', // red-300
        'secondary-400': '#FF7F50', // coral
        'secondary-500': '#E53E3E', // red-500
        'secondary-600': '#C53030', // red-600
        'secondary-700': '#9B2C2C', // red-700
        'secondary-800': '#822727', // red-800
        'secondary-900': '#63171B', // red-900

        // Accent Colors
        'accent': '#3A3064', // purple-800
        'accent-foreground': '#FFFFFF', // white
        'accent-50': '#FAF5FF', // purple-50
        'accent-100': '#E9D5FF', // purple-100
        'accent-200': '#D8B4FE', // purple-200
        'accent-300': '#C084FC', // purple-300
        'accent-400': '#A855F7', // purple-400
        'accent-500': '#8B5CF6', // purple-500
        'accent-600': '#7C3AED', // purple-600
        'accent-700': '#6D28D9', // purple-700
        'accent-800': '#3A3064', // purple-800
        'accent-900': '#4C1D95', // purple-900

        // Background Colors
        'background': '#FFFFFF', // white
        'surface': '#F5F3F9', // gray-50
        'surface-foreground': '#333333', // gray-800

        // Text Colors
        'text-primary': '#333333', // gray-800
        'text-secondary': '#757575', // gray-500
        'text-muted': '#9CA3AF', // gray-400

        // Status Colors
        'success': '#28A745', // green-600
        'success-foreground': '#FFFFFF', // white
        'success-50': '#F0FDF4', // green-50
        'success-100': '#DCFCE7', // green-100
        'success-500': '#22C55E', // green-500

        'warning': '#FFC107', // yellow-400
        'warning-foreground': '#1F2937', // gray-800
        'warning-50': '#FFFBEB', // yellow-50
        'warning-100': '#FEF3C7', // yellow-100
        'warning-500': '#EAB308', // yellow-500

        'error': '#DC3545', // red-600
        'error-foreground': '#FFFFFF', // white
        'error-50': '#FEF2F2', // red-50
        'error-100': '#FEE2E2', // red-100
        'error-500': '#EF4444', // red-500

        // Border Colors
        'border': 'rgba(0, 0, 0, 0.1)', // black with opacity
        'border-light': 'rgba(0, 0, 0, 0.05)', // black with opacity
      },
      fontFamily: {
        'heading': ['Inter', 'sans-serif'],
        'body': ['Open Sans', 'sans-serif'],
        'caption': ['Source Sans Pro', 'sans-serif'],
        'mono': ['JetBrains Mono', 'monospace'],
      },
      fontSize: {
        'xs': ['0.75rem', { lineHeight: '1rem' }],
        'sm': ['0.875rem', { lineHeight: '1.25rem' }],
        'base': ['1rem', { lineHeight: '1.5rem' }],
        'lg': ['1.125rem', { lineHeight: '1.75rem' }],
        'xl': ['1.25rem', { lineHeight: '1.75rem' }],
        '2xl': ['1.5rem', { lineHeight: '2rem' }],
        '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
        '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
        '5xl': ['3rem', { lineHeight: '1' }],
        '6xl': ['3.75rem', { lineHeight: '1' }],
      },
      boxShadow: {
        'card': '0px 1px 3px rgba(0, 0, 0, 0.1)',
        'card-hover': '0px 4px 6px rgba(0, 0, 0, 0.1)',
        'modal': '0px 4px 12px rgba(0, 0, 0, 0.15)',
        'dropdown': '0px 8px 25px rgba(0, 0, 0, 0.15)',
      },
      borderRadius: {
        'DEFAULT': '8px',
        'sm': '4px',
        'md': '8px',
        'lg': '12px',
        'xl': '16px',
        '2xl': '24px',
      },
      transitionTimingFunction: {
        'smooth': 'cubic-bezier(0.4, 0.0, 0.2, 1)',
      },
      transitionDuration: {
        'fast': '200ms',
        'normal': '300ms',
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
      },
      zIndex: {
        'header': '1000',
        'dropdown': '1010',
        'overlay': '1020',
        'modal': '1030',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('tailwindcss-animate'),
  ],
}