const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    screens: {
      'lg-device': '968px',
      'sm-device': {'max': '320px'},
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
          'medium-orange': 'var(--color-medium-orange)',
          'orange': 'var(--color-orange)',
          'light-gray': 'var(--color-light-gray)',
          'gray': 'var(--color-gray)',
          'dark-gray': 'var(--color-dark-gray)',
          'light-green': 'var(--color-light-green)',
          'green': 'var(--color-green)',
          'brown': 'var(--color-brown)'
        }
      },
      textColor: {
        skin: {
          'light-orange': 'var(--color-light-orange)',
          'medium-orange': 'var(--color-medium-orange)',
          'orange': 'var(--color-orange)',
          'light-gray': 'var(--color-light-gray)',
          'gray': 'var(--color-gray)',
          'dark-gray': 'var(--color-dark-gray)',
          'light-green': 'var(--color-light-green)',
          'green': 'var(--color-green)',
          'brown': 'var(--color-brown)'
        }
      },
      borderColor: {
        skin: {
          'light-orange': 'var(--color-light-orange)',
          'medium-orange': 'var(--color-medium-orange)',
          'orange': 'var(--color-orange)',
          'light-gray': 'var(--color-light-gray)',
          'gray': 'var(--color-gray)',
          'dark-gray': 'var(--color-dark-gray)',
          'light-green': 'var(--color-light-green)',
          'green': 'var(--color-green)',
          'brown': 'var(--color-brown)'
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
