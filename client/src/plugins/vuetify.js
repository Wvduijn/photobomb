import Vue from 'vue'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import nl from 'vuetify/es5/locale/nl'

Vue.use(Vuetify, {
  customProperties: true,
  iconfont: 'md',
  lang: {
    locales: { nl },
    current: 'nl'
  },
  theme: {
    primary: '#E63020',
    secondary: '#006E90',
    accent: '#EE751C',
    error: '#f44336',
    warning: '#ffeb3b',
    info: '#2196f3',
    success: '#4caf50'
  }
})