
import colors from 'vuetify/es5/util/colors'


export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    titleTemplate: '%s - auz-connect-system',
    title: 'auz-connect-system',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/vuetify
    '@nuxtjs/vuetify',
    '@nuxtjs/pwa',
    '@nuxtjs/auth-next',
    '@nuxtjs/dotenv',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
  ],

  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    theme: {
      options: {
        customProperties: true,
      },
      dark:false,
      themes: {
        dark: {
          background: 'white',
          primary: colors.blue.darken2,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3
        }
      }
    }
  },

  router: {
      middleware: ['auth'],
    },
    // Build Configuration: https://go.nuxtjs.dev/config-build
    build: {},
    server: {
      port: process.env.PORT || 8084,
    },
    // Axios module configuration: https://go.nuxtjs.dev/config-axios
    axios: {
      baseURL: '' + process.env.BASE_URL + 'authentication/',
    },
    env: {
      apiBaseURL: process.env.BASE_URL || 'http://localhost:3000/',
      jobAddvertSites:
        process.env.JOB_SITES ||
        '{"0": "Indeed","1": "Jora","2": "Workforce","3": "Seek", "4": "Adzuna"}',
    },
    auth: {
      strategies: {
        local: {
          token: {
            property: 'token',
            required: true,
            type: 'Bearer',
            maxAge: 10800
          },
          user: {
            property: '',
            autoFetch: true,
          },
          endpoints: {
            login: {
              url: 'login',
              method: 'post',
              property: 'token',
            },
            user: {
              url: 'profile',
              method: 'get',
              property: '',
            },
            logout: true,
          },
        },
      },
    },
}
