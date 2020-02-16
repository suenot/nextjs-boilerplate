import { createMuiTheme } from '@material-ui/core/styles'
import { red } from '@material-ui/core/colors'

// Create a theme instance.
const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#556cd6'
    },
    secondary: {
      main: '#19857b'
    },
    error: {
      main: red.A400
    },
    warning: {
      main: '#e2a700'
    },
    info: {
      main: '#3ba4de'
    },
    success: {
      main: '#008f78'
    },
    background: {
      // default: '#fff',
    },
    type: 'dark' // Switching the dark mode on is a single property value change.
  },

  // withWidth component ⚛️
  MuiWithWidth: {
    initialWidth: 'lg',
  },

  typography: {
    fontFamily: 'KapserksySans-Light, Helvetica, Arial, sans-serif',
    h1: {
      fontFamily: 'KapserksySans-Bold, Helvetica, Arial, sans-serif',
    },
    h2: {
      fontFamily: 'KapserksySans-Light, Helvetica, Arial, sans-serif',
    },
    h3: {
      fontFamily: 'KapserksySans-Bold, Helvetica, Arial, sans-serif',
    },
    h4: {
      fontFamily: 'KapserksySans-Bold, Helvetica, Arial, sans-serif',
    },
    h5: {
      fontFamily: 'KapserksySans-Bold, Helvetica, Arial, sans-serif',
    },
    h6: {
      fontFamily: 'KapserksySans-Regular, Helvetica, Arial, sans-serif',
    }
  },
  overrides: {
    MuiCssBaseline: {
      "@global": {
        "@font-face": [
          {
            fontFamily: "KapserksySans-Light",
            fontStyle: "normal",
            fontDisplay: "swap",
            fontWeight: 300,
            src: `
              url('./fonts/EOT/KasperskySans-Light.eot') format('embedded-opentype'),
              url('./fonts/TTF/KasperskySans-Light.ttf') format('truetype'),
              url('./fonts/WOFF/KasperskySans-Light.woff') format('woff'),
              url('./fonts/WOFF2/KasperskySans-Light.woff2') format('woff2')
            `
          },
          {
            fontFamily: "KapserksySans-Regular",
            fontStyle: "normal",
            fontDisplay: "swap",
            fontWeight: 500,
            src: `
              url('./fonts/EOT/KasperskySans-Regular.eot') format('embedded-opentype'),
              url('./fonts/TTF/KasperskySans-Regular.ttf') format('truetype'),
              url('./fonts/WOFF/KasperskySans-Regular.woff') format('woff'),
              url('./fonts/WOFF2/KasperskySans-Regular.woff2') format('woff2')
            `
          },
          {
            fontFamily: "KapserksySans-Bold",
            fontStyle: "normal",
            fontDisplay: "swap",
            fontWeight: 700,
            src: `
              url('./fonts/EOT/KasperskySans-Bold.eot') format('embedded-opentype'),
              url('./fonts/TTF/KasperskySans-Bold.ttf') format('truetype'),
              url('./fonts/WOFF/KasperskySans-Bold.woff') format('woff'),
              url('./fonts/WOFF2/KasperskySans-Bold.woff2') format('woff2')
            `
          }
        ]
      }
    }
  },

})

export default theme
