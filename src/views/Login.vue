<template>
  <v-card width="500" class="mx-auto mt-10">
    <v-card-title>Login</v-card-title>
    <v-card-text>
      <v-text-field 
        v-model="email"
        label="Email" 
        prepend-icon="mdi-account-circle"
      />
      <v-text-field 
        v-model="password"
        label="Password" 
        :type="showPassword ? 'text' : 'password'" 
        prepend-icon="mdi-lock"
        :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
        @click:append="showPassword =! showPassword"
      />
    </v-card-text>
    <v-divider></v-divider>
    <v-card-actions>
      <v-btn color="info" @click="handleSubmit()">Login</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import { useUserStore } from '@/stores/user-store'

const userStore = useUserStore()
const HOST = import.meta.env.VITE_APP_API_HOST || 'http://localhost:3001'
const API_URL = HOST + '/api/v1'
const LOGIN_URL = API_URL + '/auth/login'

export default {
  name: 'LoginView',
  data() {
    return {
      showPassword: false,
      email: '',
      password: ''
    }
  },
  methods: {
    async handleSubmit() {
      try {
        const response = await fetch(LOGIN_URL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            email: this.email,
            password: this.password
          })
        })

        if (response.status === 200) {
          const data = await response.json()
          userStore.setUserDetails(data)
          this.$router.push('/home')
        } else {
          // Handle error response from the server
          const errorData = await response.json()
          alert('Login failed: ' +  errorData.message)
        }
      } catch (error) {
        console.error('An error occurred during login:', error)
      }
    }
  },
}
</script>