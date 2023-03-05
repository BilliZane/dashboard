import { defineStore } from 'pinia'
import { ref, reactive } from 'vue'
import sha256 from 'crypto-js/sha256'

export const useSignUpStore = defineStore('signUpStore', () => {
  const showSignIn = ref(true)
  const formData = reactive({
    login: '',
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  })

  const users = ref([])

  const url =
    'https://my-social-links-ab2ab-default-rtdb.europe-west1.firebasedatabase.app'

  const loadUsers = async () => {
    const res = await fetch(`${url}/users.json`)
    const data = await res.json()

    users.value = [...Object.values(data)]
    users.value.map((el, i) => (el.id = Object.keys(data)[i]))
  }

  const toggleAuth = () => (showSignIn.value = !showSignIn.value)

  const formErrors = reactive({
    login: {
      error: false,
      message: 'Enter the correct login. Min 3 characters.',
      isExists: false,
      existsMessage: 'This login is already registered',
    },
    username: {
      error: false,
      message: 'Enter the correct username. Min 3 characters.',
    },
    email: {
      error: false,
      message: 'Enter the correct email. Min 3 characters.',
      isExists: false,
      existsMessage: 'This email is already registered',
    },
    password: {
      error: false,
      message: 'Enter the correct password. Min 6 characters.',
    },
    confirmPassword: {
      error: false,
      message: 'The password does not match.',
    },
  })

  const isUserExists = () => {
    const findEmail = users.value.find((el) => el.email === formData.email)
    const findLogin = users.value.find((el) => el.login === formData.login)
    if (findEmail) {
      formErrors.email.isExists = true
    } else {
      formErrors.email.isExists = false
    }
    if (findLogin) {
      formErrors.login.isExists = true
    } else {
      formErrors.login.isExists = false
    }
  }

  // form validation

  const checkFormData = () => {
    if (formData.login.length >= 3) {
      formErrors.login.error = false
    } else {
      formErrors.login.error = true
    }
    if (formData.username.length >= 3) {
      formErrors.username.error = false
    } else {
      formErrors.username.error = true
    }
    if (formData.email.length >= 3) {
      formErrors.email.error = false
    } else {
      formErrors.email.error = true
    }
    if (
      formData.password.length >= 6 &&
      !formData.password === formData.confirmPassword
    ) {
      formErrors.password.error = false
    } else {
      formErrors.password.error = true
    }
    if (
      formData.confirmPassword.length >= 6 &&
      formData.password === formData.confirmPassword
    ) {
      formErrors.password.error = false
      formErrors.confirmPassword.error = false
    } else {
      formErrors.password.error = true
      formErrors.confirmPassword.error = true
    }

    return (
      Object.values(formErrors).every((el) => !el.error) &&
      formData.password === formData.confirmPassword &&
      !formErrors.email.isExists &&
      !formErrors.login.isExists
    )
  }

  const uploadUser = async () => {
    try {
      await fetch(`${url}/users.json`, {
        method: 'POST',
        body: JSON.stringify(formData),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      })
    } catch (err) {
      console.log(err)
    }
  }

  const addUser = () => {
    isUserExists()
    checkFormData()

    if (checkFormData()) {
      formData.password = sha256(formData.password).toString()
      formData.confirmPassword = sha256(formData.confirmPassword).toString()

      delete formData.confirmPassword
      uploadUser()

      formData.login = ''
      formData.username = ''
      formData.email = ''
      formData.password = ''
      formData.confirmPassword = ''

      formErrors.email.isExists = false
      formErrors.login.isExists = false

      users.value = []
      showSignIn.value = true
    }
  }

  return {
    showSignIn,
    formData,
    toggleAuth,
    formErrors,
    checkFormData,
    users,
    loadUsers,
    isUserExists,
    addUser,
    uploadUser,
  }
})
