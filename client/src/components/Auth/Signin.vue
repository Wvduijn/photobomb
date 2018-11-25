<template>
    <v-container text-xs-center mt-5 pt-5>
        
        <v-layout row wrap>
            <v-flex xs12 sm6 offset sm-3>
                <h1>Welkom terug!</h1>

            </v-flex>
        </v-layout>
        <!-- Error Alert -->
        <v-layout v-if="error" row wrap>
            <v-flex xs12 sm6 offset-sm3>
                <form-alert :message="error.message"></form-alert>
            </v-flex>
        </v-layout>

        <!-- SIGN IN FORM -->
        <v-layout row wrap>
            <v-flex xs12 sm6 sm-3>
                <v-card color="secondary" dark>
                    <v-container>
                        <v-form @submit.prevent="handleSignInUser" v-model="isFormValid" lazy-validation ref="form">

                            <v-layout row>
                                <v-flex xs12>
                                    <v-text-field :rules="usernameRules" v-model="username" prepend-icon="face" label="Username" type="text" required></v-text-field>
                                </v-flex>
                            </v-layout>
                            <v-layout row>
                                <v-flex xs12>
                                    <v-text-field :rules="passwordRules" v-model="password" prepend-icon="extension" label="Password" type="password" required></v-text-field>
                                </v-flex>
                            </v-layout>
                            <v-layout row>
                                <v-flex xs12>
                                    <v-btn :loading="loading" :disabled="!isFormValid || loading" color="accent" type="submit">
                                        <span slot="loader" class="custom-loader">
                                            <v-icon light>cached</v-icon>
                                        </span>
                                        Inloggen
                                    </v-btn>
                                    <h3>
                                        Nog geen account?
                                        <router-link to="/signup"></router-link>
                                    </h3>
                                </v-flex>
                            </v-layout>

                        </v-form>
                    </v-container>
                </v-card>
            </v-flex>
        </v-layout>

    </v-container>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
    name: 'Signin',
    data() {
        return {
            isFormValid: true,
            username: "",
            password: "",
            usernameRules: [
                // check if username in input
                username => !!username || 'Username is required',
                // Make sure username is less than 10 characters
                username => username.length < 10 || 'Username must be less than 10 characters'
            ],
            passwordRules: [
                // check if password in input
                password => !!password || 'Password is required',
                // Make sure password is at least characters
                password => password.length >= 7 || 'Password must be at least 7 characters',
            ]
        }
    },
    computed: {
        ...mapGetters(['user', 'error', 'loading'])
    },
    watch: {
        user(value){
            // if user value changes, redirect to home
            if(value){
                this.$router.push('/');
            }
        }
    },
    methods: {
        handleSignInUser(){
            if (this.$refs.form.validate()){
                this.$store.dispatch('signInUser', {
                    username: this.username,
                    password: this.password
                })
            }
        }
    }
}
</script>
<style lang="scss">
.custom-loader {
    animation: loader 1s infinite;
    display: flex;
  }
  @-moz-keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
  @-webkit-keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
  @-o-keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
  @keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
</style>


