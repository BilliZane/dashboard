<template>
  <div v-for="user in users" :key="user.age">{{ user }}</div>
  <div class="auth">
    <SignIn v-if="signUpStore.showSignIn" />
    <SignUp v-else />
  </div>
</template>

<script setup>
import SignIn from '../components/SignIn.vue'
import SignUp from '../components/SignUp.vue'
import { useSignUpStore } from '../stores/signUp.js'

const signUpStore = useSignUpStore()

</script>

<style lang="css">
.auth {
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
  min-width: max-content;
  background: url('../assets/img/auth/auth-bg.jpg');
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
}
</style>
