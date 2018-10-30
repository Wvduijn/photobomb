import '@babel/polyfill'
import Vue from 'vue';
import './plugins/vuetify'
import App from './App.vue';
import router from "./router";
import store from "./store";
import 'roboto-fontface/css/roboto/roboto-fontface.css'
import 'material-design-icons-iconfont/dist/material-design-icons.css'

import ApolloClient from 'apollo-boost';
import VueApollo from 'vue-apollo';

// SET UP VUE APOLLO
Vue.use(VueApollo);

// Set client
export const defaultClient = new ApolloClient({
  uri: 'http://localhost:4000/graphql'
});

// set provider
const apolloProvider = new VueApollo({ defaultClient });

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  apolloProvider,
  render: h => h(App)
}).$mount('#app');
