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
import { onError } from 'apollo-link-error';

import FormAlert from './components/Shared/FormAlert';

// Register Global Component
Vue.component('form-alert', FormAlert);

// SET UP VUE APOLLO
Vue.use(VueApollo);

// Set client
export const defaultClient = new ApolloClient({
  uri: 'http://localhost:4000/graphql',
  // include auth token with requests made to backend
  fetchOptions: {
    credentials: 'include'
  },
  request: operation => {
    // if no token in localStorage, add it
    if(!localStorage.token){
      localStorage.setItem('token', '')
    }
    // operation adds token to an authorization header, which is sent to backend
    operation.setContext({
      headers: {
        authorization: localStorage.getItem('token')
      }
    })
  },
    onError: ({ graphQLErrors, networkError }) => {
      if(networkError) {
        console.log('[networkError]', networkError)
      }

      if(graphQLErrors) {
        for(let err of graphQLErrors){
          console.dir(err);
          if (err.name === 'AuthenticationError'){
            // set auth error in state ( to show in snackbar )
            store.commit('setAuthError', err)
            // signout user (to clear token)
            store.dispatch('signoutUser')
          }
        }
      }
    }
});

// set provider
const apolloProvider = new VueApollo({ defaultClient });
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  apolloProvider,
  render: h => h(App),
  created(){
    // execute get currentUser
    this.$store.dispatch('getCurrentUser');
  }
}).$mount('#app');
