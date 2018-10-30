<template>
  <v-container text-xs-center>
    <v-flex xs12>
      <v-carousel v-bind="{ 'cycle': true}" interval="3000">
        <v-carousel-item v-for="post in posts" :key="post._id" :src="post.imageUrl">
          <h1 class="carousel__title">{{ post.title }}</h1>

        </v-carousel-item>
      </v-carousel>
    </v-flex>
   <h1>Home</h1>
  </v-container>
</template>

<script>
import { gql } from 'apollo-boost';
import { mapGetters} from 'vuex';

export default {
  name: "home",
  created(){
    this.handleGetCarouselPosts();
  },
  computed: {
    // Using mapGetters = shorthand for >> return this.$store.getters.posts
    ...mapGetters([
      'posts',
    ])
    // posts(){
    //   return this.$store.getters.posts;
    // }
  },
  methods: {
    handleGetCarouselPosts(){
      // reach out to vuex store and fire action that gets the posts for the Carousel
      this.$store.dispatch('getPosts');
    }
  }
};
</script>
<style lang="scss">
  .carousel__title {
    position: absolute;
    background-color:rgba(0, 0, 0, 0.5);
    color: white;
    border-radius: 5px 5px 0 0;
    padding: 0.5em;
    margin: 0 auto;
    bottom: 50px;
    left: 0;
    right: 0;

  }
</style>

