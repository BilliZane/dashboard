<template>
  <form @submit.prevent="signInStore.signIn">
    <div class="container">
      <div class="form-title">Sign In</div>

      <label for="email"><b>Email</b></label>
      <input
        type="text"
        placeholder="Your Email"
        name="email"
        :class="{ 'input-error': signInStore.formErrors.email.error }"
        required
        autocomplete="on"
        v-model="signInStore.formData.email"
      />
      <div class="input-message" v-if="signInStore.formErrors.email.error">
        {{ signInStore.formErrors.email.message }}
      </div>
      <div class="input-message" v-if="!signInStore.formErrors.email.isExists">
        {{ signInStore.formErrors.email.existsMessage }}
      </div>

      <label for="psw"><b>Password</b></label>
      <input
        type="password"
        placeholder="Your Password"
        name="psw"
        :class="{ 'input-error': signInStore.formErrors.password.error }"
        required
        autocomplete="on"
        v-model="signInStore.formData.password"
      />
      <div class="input-message" v-if="signInStore.formErrors.password.error">
        {{ signInStore.formErrors.password.message }}
      </div>
      <div
        class="input-message"
        v-if="!signInStore.formErrors.password.isExists"
      >
        {{ signInStore.formErrors.password.messageError }}
      </div>

      <button type="submit">Login</button>
      <div class="psw" @click="signUpStore.toggleAuth">Sign Up</div>
    </div>
  </form>
</template>

<script setup>
import { useSignUpStore } from '../stores/signUp.js'
import { useSignInStore } from '../stores/signIn.js'
import { onMounted, onUnmounted } from 'vue'

const signUpStore = useSignUpStore()
const signInStore = useSignInStore()

onUnmounted(() => (signInStore.users = []))
onMounted(() => signInStore.loadUsers())
</script>

<style lang="css" scoped>
form {
  border: 3px solid #f1f1f1;
  background: #f3f3f3;
  box-shadow: 0px 0px 14px 0px rgba(179, 179, 179, 1);
  color: #4c4c4c;
  min-width: 300px;
  max-width: 400px;
  font-family: 'Golos Text', sans-serif;
  border-radius: 5px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

@media (min-width: 450px) {
  form {
    min-width: 400px;
  }
}

.form-title {
  padding: 10px 0 15px;
  text-align: center;
  font-size: 24px;
  font-weight: 500;
}

input {
  width: 100%;
  padding: 12px 20px;
  margin: 8px 0;
  display: inline-block;
  border: 1px solid #ccc;
  box-sizing: border-box;
  font-family: 'Golos Text', sans-serif;
  border-radius: 3px;
}

.input-error {
  border: 1px solid rgba(255, 0, 0, 0.5);
}

input::placeholder {
  color: #6c6c6c;
}

.input-message {
  font-size: 12px;
  margin-top: -5px;
  padding-bottom: 8px;
  color: red;
}

button {
  background-color: #04aa6d;
  color: white;
  padding: 14px 20px;
  margin-top: 8px;
  border: none;
  cursor: pointer;
  width: 100%;
  font-size: 16px;
  font-family: 'Golos Text', sans-serif;
  border-radius: 3px;
  transition: opacity 500ms;
}

button:hover {
  opacity: 0.8;
}

.container {
  padding: 16px;
}

div.psw {
  display: inline-block;
  min-width: 100%;
  text-align: right;
  font-size: 14px;
  padding-top: 15px;
  cursor: pointer;
  transition: color 500ms;
}

div.psw:hover {
  color: #04aa6d;
}
</style>

