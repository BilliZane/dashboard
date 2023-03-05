<template>
  <form @submit.prevent="signUpStore.addUser">
    <div class="container">
      <div class="form-title">Sign Up</div>

      <label for="uname"><b>Username</b></label>
      <input
        type="text"
        placeholder="Your Username"
        :class="{ 'input-error': signUpStore.formErrors.username.error }"
        required
        autocomplete="on"
        v-model="signUpStore.formData.username"
      />
      <div class="input-message" v-if="signUpStore.formErrors.username.error">
        {{ signUpStore.formErrors.username.message }}
      </div>

      <label for="uname"><b>Login</b></label>
      <input
        type="text"
        placeholder="Your Login"
        :class="{
          'input-error':
            signUpStore.formErrors.login.error ||
            signUpStore.formErrors.login.isExists,
        }"
        required
        autocomplete="on"
        v-model="signUpStore.formData.login"
      />
      <div class="input-message" v-if="signUpStore.formErrors.login.error">
        {{ signUpStore.formErrors.login.message }}
      </div>
      <div class="input-message" v-if="signUpStore.formErrors.login.isExists">
        {{ signUpStore.formErrors.login.existsMessage }}
      </div>

      <label for="psw"><b>Email</b></label>
      <input
        type="email"
        placeholder="Your Email"
        :class="{
          'input-error':
            signUpStore.formErrors.email.error ||
            signUpStore.formErrors.email.isExists,
        }"
        required
        autocomplete="on"
        v-model="signUpStore.formData.email"
      />
      <div class="input-message" v-if="signUpStore.formErrors.email.error">
        {{ signUpStore.formErrors.email.message }}
      </div>
      <div class="input-message" v-if="signUpStore.formErrors.email.isExists">
        {{ signUpStore.formErrors.email.existsMessage }}
      </div>

      <label for="psw"><b>Password</b></label>
      <input
        type="password"
        placeholder="Your Password"
        :class="{ 'input-error': signUpStore.formErrors.password.error }"
        required
        autocomplete="on"
        v-model="signUpStore.formData.password"
      />

      <label for="psw"><b>Confirm password</b></label>
      <input
        type="password"
        placeholder="Your Password"
        :class="{ 'input-error': signUpStore.formErrors.confirmPassword.error }"
        required
        v-model="signUpStore.formData.confirmPassword"
      />
      <div
        class="input-message"
        v-if="signUpStore.formErrors.confirmPassword.error"
      >
        {{ signUpStore.formErrors.confirmPassword.message }}
      </div>

      <div class="input-message" v-if="signUpStore.formErrors.password.error">
        {{ signUpStore.formErrors.password.message }}
      </div>

      <button type="submit">Sign up</button>
      <div class="psw" @click="signUpStore.toggleAuth">Sign In</div>
    </div>
  </form>
</template>

<script setup>
import { useSignUpStore } from '../stores/signUp.js'
import { useSignInStore } from '../stores/signIn.js'
import { onMounted, onUnmounted } from 'vue'

const signUpStore = useSignUpStore()
const signInStore = useSignInStore()

onMounted(() => signUpStore.loadUsers())
onUnmounted(() => {
  signUpStore.users = []
  signInStore.loadUsers()
})
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
