<template>
  <v-card width="500" class="mx-auto mt-10">
    <v-card-title>Login</v-card-title>
    <v-card-text>
      <v-text-field 
        v-model="username"
        label="Username" 
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

export default {
  name: 'LoginView',
  data() {
    return {
      showPassword: false,
      username: '',
      password: ''
    }
  },
  methods: {
    goto(path){
      this.$router.push(path)
    },
    async handleSubmit() {
      try {
        const response = await fetch('http://localhost:3001/api/v1/auth/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            email: this.username,
            password: this.password
          })
        })

        if (response.ok) {
          const data = await response.json()
          userStore.setUserDetails(data)
          //await userStore.fetchUser()
          this.$router.push('/home')
        } else {
          // Handle error response from the server
          const errorData = await response.json()
          console.error('Login failed:', errorData.message)
        }
      } catch (error) {
        console.error('An error occurred during login:', error)
      }
    }
  },
}
</script>