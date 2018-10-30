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
      </v-toolbar-items>
    </v-toolbar>
    <!-- APP CONTENT -->   
    <main>
      <v-container class="mt-4">
        <transition fade>
          <router-view/>
        </transition>
      </v-container>
    </main>
  </v-app>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      sideNav: false
    }
  },
  computed: {
    horizontalNavItems() {
      return [
        { icon: "chat", title: "Posts", link: "/posts" },
        { icon: "lock_open", title: "Inloggen", link: "/inloggen" },
        { icon: "create", title: "Registreren", link: "/registreren" }
      ];
    },
    sideNavItems() {
      return [
        { icon: "chat", title: "Posts", link: "/posts" },
        { icon: "lock_open", title: "Inloggen", link: "/inloggen" },
        { icon: "create", title: "Registreren", link: "/registreren" }
      ];
    }
  },
  methods: {
    toggleSideNav(){
      this.sideNav = !this.sideNav
    }
  }
};
</script>


<style lang="scss">
.fade-enter-active,
.fade-leave-active {
  transition-property: all;
  transition-duration: .25s;
}

.fade-enter-active {
  transition-delay: .25s;
}

.fade-enter,
.fade-leave-active {
  opacity:0;
  transform: translateY(-25px);
}
</style>
