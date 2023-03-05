import { defineStore } from 'pinia'
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import sha256 from 'crypto-js/sha256'

export const useSignInStore = defineStore('signInStore', () => {
  const router = useRouter()

  const formData = reactive({
    email: '',
    password: '',
  })

  const users = ref([])
  const targetUser = ref({})

  const url =
    'https://my-social-links-ab2ab-default-rtdb.europe-west1.firebasedatabase.app'

  const loadUsers = async () => {
    const res = await fetch(`${url}/users.json`)
    const data = await res.json()

    users.value = [...Object.values(data)]
    users.value.map((el, i) => (el.id = Object.keys(data)[i]))
  }

  const formErrors = reactive({
    email: {
      error: false,
      message: 'Enter the correct email. Min 3 characters.',
      isExists: true,
      existsMessage: 'This email does not registered. Please, sign up.',
    },
    password: {
      error: false,
      isExists: true,
      message: 'Enter the correct password. Min 6 characters.',
      messageError: 'Wrong password! Please, try again.',
    },
  })

  const isUserExists = () => {
    const findEmail = users.value.find((el) => el.email === formData.email)
    const findPassword = users.value.find(
      (el) => el.password === sha256(formData.password).toString()
    )

    targetUser.value = findEmail

    if (findEmail) {
      formErrors.email.isExists = true
    } else {
      formErrors.email.isExists = false
    }
    if (findPassword) {
      formErrors.password.isExists = true
    } else {
      formErrors.password.isExists = false
    }
  }

  // form validation
  const checkFormData = () => {
    if (formData.email.length >= 3) {
      formErrors.email.error = false
    } else {
      formErrors.email.error = true
    }
    if (formData.password.length >= 6) {
      formErrors.password.error = false
    } else {
      formErrors.password.error = true
    }

    return Object.values(formErrors).every(
      (el) => !el.error && el.isExists === true
    )
  }

  const checkPassword = () => {}

  const signIn = () => {
    isUserExists()
    checkFormData()

    if (checkFormData()) {
      router.push({ name: 'Home' })

      formData.email = ''
      formData.password = ''

      formErrors.email.error = false
      formErrors.isExists = true
      formErrors.password.error = false
      formErrors.password.isExists = true

      console.log('User signed in.')
    }
  }

  return {
    formData,
    users,
    targetUser,
    loadUsers,
    formErrors,
    isUserExists,
    checkFormData,
    checkPassword,
    signIn,
  }
})
