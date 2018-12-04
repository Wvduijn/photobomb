import Vue from 'vue';
import Vuex from 'vuex';
import router from './router';


import { defaultClient as apolloClient} from './main';

import { GET_POSTS, GET_CURRENT_USER, SIGNIN_USER, SIGNUP_USER, ADD_POST, SEARCH_POSTS, GET_USER_POSTS, UPDATE_USER_POST, INFINITE_SCROLL_POSTS } from './queries';

Vue.use(Vuex);

export default new Vuex.Store({
  // STATE
  state: {
    posts: [],
    userPosts: [],
    searchResults: [],
    user: null,
    loading: false,
    error: null,
    authError: null
  },
  // MUTATIONS
  mutations: {

    setPosts: (state, payload) => {
      state.posts = payload;
    },
    setSearchResults: (state, payload) => {
      if (payload !== null) {
        state.searchResults = payload
      }
    },
    setLoading: (state, payload) => {
      state.loading = payload;
    },
    setError: (state, payload) => {
      state.error = payload;
    },
    setUser: (state, payload) => {
      state.user = payload;
    },
    setUserPosts: (state, payload) => {
      state.userPosts = payload;
    },
    setAuthError: ( state, payload ) => {
      state.authError = payload;
    },
    clearUser: state => (state.user = null),
    clearError: state => (state.error = null),
    clearSearchResults: state => (state.searchResults = [])

  },
  // ACTIONS
  actions: {
    // GET THE CURRENT USER
    getCurrentUser: ({commit}) => {
      commit('setLoading', true);
      // apollo client to get current user
      apolloClient
      .query({
        query: GET_CURRENT_USER
      })
      .then(({ data }) => {
        commit('setLoading', true);
        // add user data to state
        commit('setUser', data.getCurrentUser);
      })
      .catch(err => {
        console.error(err);
        commit('setLoading', false);
      })
    },
    // GET POSTS
    getPosts: ({commit}) => {
      commit('setLoading', true);
      // use apollo client to fire getPosts query - using gql
      apolloClient
      .query({
        query: GET_POSTS
      }).then(({ data }) => {
        // get data from actions to state via mutations
        // commit will pass data from actions along to mutations
        commit('setPosts', data.getPosts);
        commit('setLoading', false);
      })
      .catch(err => {
        console.error(err);
        commit('setLoading', false);
      })

    },
    // GET USER POSTS
    getUserPosts: ({ commit }, payload) => {
      apolloClient
        .query({
          query: GET_USER_POSTS,
          variables: payload
        })
        .then(({ data }) => {
          commit('setUserPosts', data.getUserPosts);
          // console.log(data.getUserPosts);
        })
        .catch(err => {
          console.error(err);
        });
    },
    // UPDATE USER POST
    updateUserPost: ({ state, commit }, payload) => {
      apolloClient
        .mutate({
          mutation: UPDATE_USER_POST,
          variables: payload
        })
        .then(({ data }) => {
          const index = state.userPosts.findIndex(
            post => post._id === data.updateUserPost._id
          );
          const userPosts = [
            ...state.userPosts.slice(0, index),
            data.updateUserPost,
            ...state.userPosts.slice(index + 1)
          ];
          commit('setUserPosts', userPosts);
        })
        .catch(err => {
          console.error(err);
        });
    },
    //DELETE USER POST
    deleteUserPost: ({ state, commit }, payload) => {
      apolloClient
        .mutate({
          mutation: DELETE_USER_POST,
          variables: payload
        })
        .then(({ data }) => {
          const index = state.userPosts.findIndex(
            post => post._id === data.deleteUserPost._id
          );
          const userPosts = [
            ...state.userPosts.slice(0, index),
            ...state.userPosts.slice(index + 1)
          ];
          commit('setUserPosts', userPosts);
        })
        .catch(err => {
          console.error(err);
        });
    },
    // SEARCH POST
    searchPosts: ({ commit }, payload) => {
      apolloClient
        .query({
          query: SEARCH_POSTS,
          variables: payload
        })
        .then(({ data }) => {
          console.log(data.searchPosts);
          commit('setSearchResults', data.searchPosts)
        })
        .catch(err => console.error(err));
    },
    // ADD POST
    addPost: ({commit}, payload) => {
      commit('clearError');
      commit('setLoading', true);
      apolloClient
      .mutate({
        mutation: ADD_POST,
        variables: payload,
        update: (cache, { data: { addPost } }) => {
          // First read the query you want to update
          const data = cache.readQuery({ query: GET_POSTS });
          // Create updated data
          data.getPosts.unshift(addPost);
          // Write updated data back to query
          console.log(data);
          cache.writeQuery({
            query: GET_POSTS,
            data
          });
        },
        // optimistic response ensures data is added immediately as we specified for the update function
        optimisticResponse: {
          __typename: 'Mutation',
          addPost: {
            __typename: 'Post',
            _id: -1,
            ...payload
          }
        },
        // Rerun specified queries after performing the mutation in order to get fresh data
        refetchQueries: [
          {
            query: INFINITE_SCROLL_POSTS,
            variables: {
              pageNum: 1,
              pageSize: 2
            }
          }
        ]
      })
      .then(({data}) => {
        commit('setLoading', false);
        console.log(data.addPost);
        // to make sure created method is run in main.js (we run getCurrentUser), reload the page
        router.go();
      })
      .catch(err => {
        commit('setLoading', false);
        commit('setError', err);
        console.error(err);
      })
    },
    // SIGN UP USER
    signupUser: ({commit}, payload) => {
      commit('clearError');
      commit('setLoading', true);
      apolloClient
      .mutate({
        mutation: SIGNUP_USER,
        variables: payload
      })
      .then(({data}) => {
        commit('setLoading', false);
        localStorage.setItem('token', data.signupUser.token);
        // to make sure created method is run in main.js (we run getCurrentUser), reload the page
        router.go();
      })
      .catch(err => {
        commit('setLoading', false);
        commit('setError', err);
        console.error(err);
      })
    },
    // SIGN IN USER
    signInUser: ({commit}, payload) => {
      commit('clearError');
      commit('setLoading', true);
      // clear token first to prevent errors (if malformed)
      localStorage.setItem('token', '');
      apolloClient
      .mutate({
        mutation: SIGNIN_USER,
        variables: payload
      })
      .then(({data}) => {
        commit('setLoading', false);
        localStorage.setItem('token', data.signinUser.token);
        // to make sure created method is run in main.js (we run getCurrentUser), reload the page
        router.go();
      })
      .catch(err => {
        commit('setLoading', false);
        commit('setError', err);
        console.error(err);
      })
    },
    // SIGN OUT USER
    signoutUser: async ({ commit }) => {
      // clear user in state
      commit("clearUser");
      // remove token in localStorage
      localStorage.setItem("token", "");
      // end session
      await apolloClient.resetStore();
      // redirect home - kick users out of private pages (i.e. profile)
      router.push("/");
    }

  },
  getters: {
    posts: state => state.posts,
    userPosts: state => state.userPosts,
    searchResults: state => state.searchResults,
    loading: state => state.loading,
    user: state => state.user,
    userFavorites: state => state.user && state.user.favorites,
    error: state => state.error,
    authError: state => state.authError
  }
});
