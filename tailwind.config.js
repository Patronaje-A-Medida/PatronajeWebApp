const defaultTheme = require('tailwindcss/defaultTheme')
const colors = require('tailwindcss/colors')

const app_colors = {
  'primary-base': 'var(--color-primary-700)',
  'secondary-base': 'var(--color-secondary-400)',
  'primary-50': 'var(--color-primary-50)',
  'primary-100': 'var(--color-primary-100)',
  'primary-200': 'var(--color-primary-200)',
  'primary-300': 'var(--color-primary-300)',
  'primary-400': 'var(--color-primary-400)',
  'primary-500': 'var(--color-primary-500)',
  'primary-600': 'var(--color-primary-600)',
  'primary-700': 'var(--color-primary-700)',
  'primary-800': 'var(--color-primary-800)',
  'primary-900': 'var(--color-primary-900)',
  'secondary-50': 'var(--color-secondary-50)',
  'secondary-100': 'var(--color-secondary-100)',
  'secondary-200': 'var(--color-secondary-200)',
  'secondary-300': 'var(--color-secondary-300)',
  'secondary-400': 'var(--color-secondary-400)',
  'secondary-500': 'var(--color-secondary-500)',
  'secondary-600': 'var(--color-secondary-600)',
  'secondary-700': 'var(--color-secondary-700)',
  'secondary-800': 'var(--color-secondary-800)',
  'secondary-900': 'var(--color-secondary-900)',
  'accent-50': 'var(--color-accent-50)',
  'accent-100': 'var(--color-accent-100)',
  'accent-200': 'var(--color-accent-200)',
  'accent-300': 'var(--color-accent-300)',
  'accent-400': 'var(--color-accent-400)',
  'accent-500': 'var(--color-accent-500)',
  'accent-600': 'var(--color-accent-600)',
  'accent-700': 'var(--color-accent-700)',
  'accent-800': 'var(--color-accent-800)',
  'accent-900': 'var(--color-accent-900)',
  'analogous-A-50': 'var(--color-analogous-A-50)',
  'analogous-A-100': 'var(--color-analogous-A-100)',
  'analogous-A-200': 'var(--color-analogous-A-200)',
  'analogous-A-300': 'var(--color-analogous-A-300)',
  'analogous-A-400': 'var(--color-analogous-A-400)',
  'analogous-A-500': 'var(--color-analogous-A-500)',
  'analogous-A-600': 'var(--color-analogous-A-600)',
  'analogous-A-700': 'var(--color-analogous-A-700)',
  'analogous-A-800': 'var(--color-analogous-A-800)',
  'analogous-A-900': 'var(--color-analogous-A-900)',
  'analogous-B-50': 'var(--color-analogous-B-50)',
  'analogous-B-100': 'var(--color-analogous-B-100)',
  'analogous-B-200': 'var(--color-analogous-B-200)',
  'analogous-B-300': 'var(--color-analogous-B-300)',
  'analogous-B-400': 'var(--color-analogous-B-400)',
  'analogous-B-500': 'var(--color-analogous-B-500)',
  'analogous-B-600': 'var(--color-analogous-B-600)',
  'analogous-B-700': 'var(--color-analogous-B-700)',
  'analogous-B-800': 'var(--color-analogous-B-800)',
  'analogous-B-900': 'var(--color-analogous-B-900)',
  'triadic-A-50': 'var(--color-triadic-A-50)',
  'triadic-A-100': 'var(--color-triadic-A-100)',
  'triadic-A-200': 'var(--color-triadic-A-200)',
  'triadic-A-300': 'var(--color-triadic-A-300)',
  'triadic-A-400': 'var(--color-triadic-A-400)',
  'triadic-A-500': 'var(--color-triadic-A-500)',
  'triadic-A-600': 'var(--color-triadic-A-600)',
  'triadic-A-700': 'var(--color-triadic-A-700)',
  'triadic-A-800': 'var(--color-triadic-A-800)',
  'triadic-A-900': 'var(--color-triadic-A-900)',
  'triadic-B-50': 'var(--color-triadic-B-50)',
  'triadic-B-100': 'var(--color-triadic-B-100)',
  'triadic-B-200': 'var(--color-triadic-B-200)',
  'triadic-B-300': 'var(--color-triadic-B-300)',
  'triadic-B-400': 'var(--color-triadic-B-400)',
  'triadic-B-500': 'var(--color-triadic-B-500)',
  'triadic-B-600': 'var(--color-triadic-B-600)',
  'triadic-B-700': 'var(--color-triadic-B-700)',
  'triadic-B-800': 'var(--color-triadic-B-800)',
  'triadic-B-900': 'var(--color-triadic-B-900)',
};

module.exports = {
  purge: ["./src/**/*.{html,ts}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    /*colors: {
      black: colors.black,
      blue: colors.blue,
      current: colors.current,
      gray: colors.gray,
      lime: colors.lime,
      red: colors.red,
      transparent: colors.transparent,
      white: colors.white,
      yellow: colors.yellow,
    },*/
    screens: {
      'lg-device': '968px',
      'sm-device': {'max': '320px'},
      ...defaultTheme.screens
    },
    extend: {
      colors: {
        lime: colors.lime,
        sky: colors.sky,
        cyan: colors.cyan,
      },
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
          'brown': 'var(--color-brown)',
          'green-2':'var(--color-green-2)',
          'very-light-green': 'var(--color-very-light-green)',
          ...app_colors,
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
          'brown': 'var(--color-brown)',
          'green-2':'var(--color-green-2)',
          'very-light-green': 'var(--color-very-light-green)',
          ...app_colors,
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
          'brown': 'var(--color-brown)',
          'green-2':'var(--color-green-2)',
          'very-light-green': 'var(--color-very-light-green)',
          ...app_colors,
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
