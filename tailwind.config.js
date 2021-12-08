const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    screens: {
      'movil': '968px',
      ...defaultTheme.screens
    },
    extend: {
      fontFamily: {
        montserrat: "'Montserrat', sans-serif",
        lato: "'Lato', sans-serif",
        poppins: "'Poppins', sans-serif"
      },
      backgroundColor: {
        skin: {
          'light-orange': 'var(--color-light-orange)',
          'orange': 'var(--color-orange)',
          'light-gray': 'var(--color-light-gray)',
          'gray': 'var(--color-gray)',
          'green': 'var(--color-green)',
          'brown': 'var(--color-brown)'
        }
      },
      textColor: {
        skin: {
          'brown': 'var(--color-brown)',
          'orange': 'var(--color-orange)',
        }
      }
    }
  },
  variants: {
    extend: {
      backgroundColor: ['active'],
    }
  },
  plugins: [],
}
