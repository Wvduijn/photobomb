import Vue from 'vue';
import Vuex from 'vuex';


import { defaultClient as apolloClient} from './main';

import { GET_POSTS } from './queries';

Vue.use(Vuex);

export default new Vuex.Store({
  // STATE
  state: {
    posts: [],
    loading: false
  },
  // MUTATIONS
  mutations: {

    setPosts: (state, payload) => {
      state.posts = payload;
    },
    setLoading: (state, payload) => {
      state.loading = payload
    }

  },
  // ACTIONS
  actions: {

    getPosts: ({commit}) => {
      commit('setLoading', true);
      // use apollo client to fire getPosts query - using gql (with back ticks)
      apolloClient
      .query({
        query: GET_POSTS
      }).then(({ data }) => {
        // get data from actions to state via mutations
        // commit will pass data from actions along to mutations
        commit('setPosts', data.getPosts);
        commit('setLoading', false);
        console.log(data.getPosts);
      })
      .catch(err => {
        console.error(err);
        commit('setLoading', false);
      })

    }

  },
  getters: {
    posts: state => state.posts,
    loading: state => state.loading
  }
});
