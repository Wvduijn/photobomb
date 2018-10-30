import Vue from 'vue';
import Vuex from 'vuex';


import { defaultClient as apolloClient} from './main';
import { gql } from 'apollo-boost';

Vue.use(Vuex);

export default new Vuex.Store({
  // STATE
  state: {
    posts: []
  },
  // MUTATIONS
  mutations: {

    setPosts: (state, payload) => {
      state.posts = payload;
    }

  },
  // ACTIONS
  actions: {

    getPosts: ({commit}) => {
      // use apollo client to fire getPosts query - using gql (with back ticks)
      apolloClient
      .query({
        query: gql `
          query {
            getPosts{
              _id
              title
              imageUrl
            }
          }
        `
      }).then(({ data }) => {
        // get data from actions to state via mutations
        // commit will pass data from actions along to mutations
        commit('setPosts', data.getPosts);
        console.log(data.getPosts);
      })
      .catch(err => {
        console.error(err);
      })

    }

  },
  getters: {
    posts: state => state.posts
  }
});
