<template>
  <v-card width="500" class="mx-auto mt-10">
    <v-card-title>SignUp</v-card-title>
    <v-card-text>
      <v-text-field v-model="email" label="Email" prepend-icon="mdi-account-circle"/>
      <v-text-field 
        v-model="password"
        label="Password" 
        :type="showPassword ? 'text' : 'password'" 
        prepend-icon="mdi-lock"
        :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
        @click:append="showPassword =! showPassword"
      />
      <v-text-field 
        label="Ripeti password" 
        :type="showPassword ? 'text' : 'password'" 
        prepend-icon="mdi-lock-check"
        :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
        @click:append="showPassword =! showPassword"
      />
      <v-text-field v-model="firstName" label="Nome" prepend-icon="mdi-alphabet-latin"/>
      <v-text-field v-model="lastName" label="Cognome" prepend-icon="mdi-alphabet-latin"/>
      <v-text-field v-model="nickname" label="Nickname" prepend-icon="mdi-account"/>
    </v-card-text>
    <v-divider></v-divider>
    <v-card-actions>
      <v-btn color="success" @click="handleRegister()">Register</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: 'RegisterView',
  data() {
    return {
      showPassword: false,
      email: '',
      password: '',
      firstName: '',
      lastName: '',
      nickname: ''
    }
  },
  methods: {
    async handleRegister() {
      try {
        const response = await fetch('http://localhost:3001/api/v1/auth/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            email: this.email,
            password: this.password,
            firstName: this.firstName,
            lastName: this.lastName,
            nickname: this.nickname
          })
        })

        if (response.ok) {
          this.$router.push('/login')
        } else {
          const errorData = await response.json()
          console.error('Registration failed:', errorData.message)
        }
      } catch (error) {
        console.error('An error occurred during registration:', error)
      }
    }
  }
}
</script>