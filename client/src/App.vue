<template>
  <v-app id="app" style="background: #E3E3EE">
    <h1>APP</h1>
    
     <!-- Side Navbar -->
    <v-navigation-drawer app temporary fixed v-model="sideNav">
      <v-toolbar color="accent" dark flat>
        <v-toolbar-side-icon @click="toggleSideNav"></v-toolbar-side-icon>
        <router-link to="/" tag="span" style="cursor: pointer">
          <h1 class="title pl-3">PhotoBombr</h1>
        </router-link>
      </v-toolbar>

      <v-divider></v-divider>

      <!-- Side Navbar Links -->
      <v-list>
        <v-list-tile v-for="item in sideNavItems" :key="item.title" :to="item.link" ripple>
          <v-list-tile-action>
            <v-icon>{{item.icon}}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            {{item.title}}
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>

    <!-- HORIZONTAL NAVBAR -->
    <v-toolbar fixed color="accent">

      <!-- APP TITLE -->
      <v-toolbar-side-icon class="white--text" @click="toggleSideNav"></v-toolbar-side-icon>
      <v-toolbar-title class="hidden-xs-only white--text" >
        <router-link to="/" tag="span" style="cursor:pointer" >
          PhotoBombr
        </router-link>
      </v-toolbar-title>
      <v-spacer></v-spacer>

      <!--search Input -->
      <v-text-field flex prepend-icon="search" placeholder="Zoek naar posts..." color="secondary" single-line></v-text-field>
      <v-spacer></v-spacer>

      <!-- Horizontal Navbar Links -->
      <v-toolbar-items class="hidden-xs-only">
        <v-btn flat v-for="item in horizontalNavItems" :key="item.title" :to="item.link" class="white--text">
          <v-icon class="hidden-sm-only white--text" left>{{ item.icon }}</v-icon>
          {{ item.title}}
        </v-btn>

        <!-- Profile Button -->
        <v-btn flat to="/profile" v-if="user">
          <v-icon class="hidden-sm-only" left>account_box</v-icon>
          <v-badge right color="blue darken-2">
            <!-- <span slot="badge"></span> -->
            Profiel
          </v-badge>
        </v-btn>

        <!-- Signout Button -->
        <v-btn flat v-if="user" @click="handleSignoutUser">
          <v-icon class="hidden-sm-only" left>exit_to_app</v-icon>
          Uitloggen
        </v-btn>

      </v-toolbar-items>
    </v-toolbar>

    <!-- APP CONTENT -->   
    <main>
      <v-container class="mt-4">
        <transition fade>
          <router-view/>
        </transition>

        <!-- Auth Snackbar -->
        <v-snackbar v-model="authSnackbar" color="success" bottom left :timeout="5000"> 
          <v-icon class="mr-3">check_circle</v-icon>
          <h3>Je bent nu ingelogd!</h3>
          <v-btn dark flat @click="authSnackbar = false">Sluiten</v-btn>
        </v-snackbar>

        <!-- Auth Error Snackbar -->
        <v-snackbar v-if="authError" v-model="authErrorSnackbar" color="info" bottom left :timeout="5000"> 
          <v-icon class="mr-3">cancel</v-icon>
          <h3>{{ authError.message }}</h3>
          <v-btn dark flat to="/signin">Inloggen</v-btn>
        </v-snackbar>

      </v-container>
    </main>
  </v-app>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: "App",
  data() {
    return {
      sideNav: false,
      authSnackbar: false,
      authErrorSnackbar: false
    }
  },
  watch: {
    user(newValue ,oldValue) {
      // if we had no value for user before show the snackbar
      if( oldValue === null){
        this.authSnackbar = true;
      }
    },
    authError(value) {
      // if auth error is not null show authError snackbar
      if (value !== null) {
        this.authErrorSnackbar = true;
      }
    }
  },
  computed: {
    ...mapGetters(['user', 'authError']),
    horizontalNavItems() {
      let items = [
        { icon: "chat", title: "Posts", link: "/posts" },
        { icon: "lock_open", title: "Inloggen", link: "/inloggen" },
        { icon: "create", title: "Registreren", link: "/registreren" }
      ];
      if (this.user){
        items = [
          { icon: "chat", title: "Posts", link: "/posts" },
        ]
      }
      return items;
    },
    sideNavItems() {
      let items = [
        { icon: "chat", title: "Posts", link: "/posts" },
        { icon: "lock_open", title: "Inloggen", link: "/inloggen" },
        { icon: "create", title: "Registreren", link: "/registreren" }
      ];

      if (this.user) {
        items = [
          { icon: "chat", title: "Posts", link: "/posts" },
          { icon: "stars", title: "Create Post", link: "/post/toevoegen" },
          { icon: "create", title: "Profile", link: "/profiel" }
        ];
      }
      return items;
    }
  },
  methods: {
    toggleSideNav(){
      this.sideNav = !this.sideNav
    },
    handleSignoutUser() {
      this.$store.dispatch("signoutUser");
    },
  }
};
</script>


<style lang="scss">
.fade-enter-active,
.fade-leave-active {
  transition-property: opacity;
  transition-duration: 0.25s;
}

.fade-enter-active {
  transition-delay: 0.25s;
}

.fade-enter,
.fade-leave-active {
  opacity: 0;
}
</style>
