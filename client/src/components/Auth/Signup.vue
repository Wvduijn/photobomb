<template>
    <v-container text-xs-center mt-5 pt-5>
        <!-- Signup Title -->
        <v-layout row wrap>
            <v-flex xs12 sm6 offset sm-3>
                <h1>Account aanmaken</h1>

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
                <v-card color="accent" dark>
                    <v-container>
                        <v-form @submit.prevent="handleSignupUser" v-model="isFormValid" lazy-validation ref="form">
                            
                            <!-- USERNAME FIELD -->
                            <v-layout row>
                                <v-flex xs12>
                                    <v-text-field :rules="usernameRules" v-model="username" prepend-icon="face" label="Username" type="text" required></v-text-field>
                                </v-flex>
                            </v-layout>

                             <!-- EMAIL FIELD -->
                            <v-layout row>
                                <v-flex xs12>
                                    <v-text-field :rules="emailRules" v-model="email" prepend-icon="face" label="Email" type="text" required></v-text-field>
                                </v-flex>
                            </v-layout>
                             <!-- PASSWORD FIELD -->
                            <v-layout row>
                                <v-flex xs12>
                                    <v-text-field :rules="passwordRules" v-model="password" prepend-icon="extension" label="Password" type="password" required></v-text-field>
                                </v-flex>
                            </v-layout>
                             <!-- PASSWORD CONFIRMATION FIELD -->
                            <v-layout row>
                                <v-flex xs12>
                                    <v-text-field :rules="passwordRules" v-model="passwordConfirmation" prepend-icon="gavel" label="Confirm Password" type="password" required></v-text-field>
                                </v-flex>
                            </v-layout>

                            <v-layout row>
                                <v-flex xs12>
                                    <v-btn :disabled="!isFormValid" color="info" type="submit">
                                        <span slot="loader" class="custom-loader">
                                            <v-icon light>cached</v-icon>
                                        </span>
                                        Inschrijven
                                    </v-btn>
                                    <h3>
                                        Heeft u al een account?
                                        <router-link to="/signin"></router-link>
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
    name: 'Signup',
    data() {
        return {
            isFormValid: true,
            username: '',
            email: '',
            password: '',
            passwordConfirmation: '',
            usernameRules: [
                username => !!username || 'Gebruikersnaam is verplicht',
                username => username.length < 20 || 'Gebruikersnaam mag niet meer dan 20 Karakters bevatten'
            ],
            emailRules: [
                email => !!email || 'E-mail is verplicht',
                email => /.@+./.test(email) || 'E-mail adres moet geldig zijn'
            ],
            passwordRules: [
                password => !!password || 'Wachtwoord is verplicht',
                password => password.length >= 5 || 'Wachtwoord moet minimaal 5 tekens bevatten',
                confirmation => confirmation === this.password || 'Wachtwoorden moeten gelijk zijn'
            ]
        }
    },
    watch: {
        user(value){
            // if user value changes, redirect to home
            if(value){
                this.$router.push('/');
            }
        }
    },
    computed: {
        ...mapGetters(['user', 'error', 'loading'])
    },
    methods: {
        handleSignupUser(){
            if (this.$refs.form.validate()) {
                //signup user action
                this.$store.dispatch('signupUser', {
                    username: this.username,
                    email: this.email,
                    password: this.password
                })
            }
        }
    }
}
</script>
<style lang="scss">

</style>


