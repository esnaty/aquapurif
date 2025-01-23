import { createVuetify } from 'vuetify'
import 'vuetify/styles'
import { aliases, mdi } from 'vuetify/iconsets/mdi'
import '@mdi/font/css/materialdesignicons.css'
import { es } from 'vuetify/locale';
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";

const myCustomLightTheme = {
  dark: false,
  colors: {
    background: '#FFFFFF',
    onback: '#000000',
    surface: '#70858d',
    secondary: '#f7f7f7',
    primary: '#70858d',
    error: '#ef4100',
    info: '#468bd1',
    success: '#46d147',
    warning: '#d16c46',
    principal: '#00aeef',
    green: '#1e8060',
    'principal-variant': '#bfebfb',
    'on-error': '#FFFFFF',
    'on-success': '#FFFFFF',
    'on-info': '#FFFFFF',
    'on-warning': '#FFFFFF',
    'on-green': '#FFFFFF',
    'on-principal': '#FFFFFF',
  },
}

const myCustomDarkTheme = {
  dark: true,
  colors: {
    background: '#000000',
    onback: '#FFFFFF',
    surface: '#70858d',
    primary: '#2b2b2b',
    secondary: '#70858d',
    error: '#ef4100',
    info: '#468bd1',
    success: '#46d147',
    warning: '#d16c46',
    principal: '#00aeef',
    green: '#1e8060',
    'principal-variant': '#bfebfb',
    // Colores de texto
    'on-background': '#FFFFFF',
    'on-surface': '#FFFFFF',
    'on-primary': '#FFFFFF',
    'on-secondary': '#FFFFFF',
    'on-error': '#FFFFFF',
    'on-success': '#FFFFFF',
    'on-info': '#FFFFFF',
    'on-warning': '#FFFFFF',
    'on-green': '#000000', 
    'on-principal': '#FFFFFF',
  },
}

const Vuetify = createVuetify({
  directives,
  components: {
    ...components
  },
  locale: {
    defaultLocale: 'es', // Configura el idioma predeterminado como español
    messages: { es }, // Agrega las traducciones de Vuetify
    locale: 'es',
    fallback: 'es',
  },
  icons: {
    defaultSet: 'mdi',
    aliases,
    sets: {
      mdi,
    },
  },
  theme: {
    themes:{
      light: myCustomLightTheme,
      dark: myCustomDarkTheme
    }
  },
})

export default Vuetify
