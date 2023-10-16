import { createVuetify } from 'vuetify'
import { aliases, mdi } from 'vuetify/iconsets/mdi'
// Vuetify comes with vite-plugin-vuetify that enable automatic treeshaking.
// Vuetify components and directives will be automatically imported

export default defineNuxtPlugin((nuxtApp) => {
  const vuetify = createVuetify({
    icons: {
      defaultSet: 'mdi',
      aliases,
      sets: {
        mdi
      }
    },
    defaults: {
      VTextField: {
        hideDetails: 'auto',
        color: 'primary',
        density: 'compact',
        variant: 'outlined'
      }
    },
    theme: {
      defaultTheme: 'defaultTheme',
      themes: {
        defaultTheme: {
          dark: false,
          colors: {
            primary: '#174E69',
            background: '#f9f9f7',
            'success-darken': '#007F5F',
            error: '#CD2B21',
            'on-primary': '#FFFFFF',
            'on-background': '#212321'
          }
        }
      }
    }
  })

  nuxtApp.vueApp.use(vuetify)
})
