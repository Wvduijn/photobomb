import Vue from 'vue';
import Router from 'vue-router';
import Home from './components/Home.vue';

import AddPost from './components/Posts/AddPost.vue';
import Posts from './components/Posts/Posts.vue';

import Profile from './components/Auth/Profile.vue';
import Signin from './components/Auth/Signin.vue';
import Signup from './components/Auth/Signup.vue';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/posts',
      name: 'Posts',
      component: Posts
    },
    {
      path: '/post/toevoegen',
      name: 'AddPost',
      component: AddPost
    },
    {
      path: '/profiel',
      name: 'Profile',
      component: Profile
    },
    {
      path: '/registreren',
      name: 'Signup',
      component: Signup
    },
    {
      path: '/inloggen',
      name: 'Signin',
      component: Signin
    }
  ]
});
