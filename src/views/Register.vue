<template>
  <v-card width="500" class="mx-auto mt-10">
    <v-card-title>SignUp</v-card-title>
    <v-card-text>
      <v-text-field 
        v-model="email" 
        ref="email"
        label="Email" 
        prepend-icon="mdi-account-circle"
        :rules="[rules.required, rules.emailFormat]"
      />
      <v-text-field 
        v-model="password"
        ref="password"
        label="Password" 
        :type="showPassword ? 'text' : 'password'" 
        :rules="[rules.required, rules.min, rules.specialChar, rules.number, rules.uppercase]"
        prepend-icon="mdi-lock"
        :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
        @click:append="showPassword =! showPassword"
      />
      <v-text-field 
        v-model="confirmPassword"
        ref="confirmPassword"
        label="Ripeti password" 
        :type="showPassword ? 'text' : 'password'" 
        :rules="[rules.required]"
        prepend-icon="mdi-lock-check"
        :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
        @click:append="showPassword =! showPassword"
      />
      <v-text-field 
        v-model="firstName" 
        ref="firstName"
        label="Nome" 
        prepend-icon="mdi-alphabet-latin"
        :rules="[rules.lettersOnly]"
      />
      <v-text-field 
        v-model="lastName" 
        ref="lastName"
        label="Cognome" 
        prepend-icon="mdi-alphabet-latin"
        :rules="[rules.lettersOnly]"
      />
      <v-text-field 
        v-model="nickname" 
        ref="nickname"
        label="Nickname" 
        prepend-icon="mdi-account"
        :rules="[rules.required, rules.lettersOnly]" 
      />
    </v-card-text>
    <v-divider></v-divider>
    <v-card-actions>
      <v-btn color="success" @click="handleRegister()"> Register </v-btn>
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
      confirmPassword: '',
      firstName: '',
      lastName: '',
      nickname: '',
      rules:{
        required: v => !!v || 'Required.',
        min: v => v.length >= 8 || 'Min 8 characters',
        specialChar: v => /[!@#$%^&*(),.?":{}|<>]/.test(v) || 'At least one special character (!@#$%^&*(),.?":{}|<>)',
        number: v => /\d/.test(v) || 'At least one number',
        uppercase: v => /[A-Z]/.test(v) || 'At least one uppercase letter',
        lettersOnly: v => {
        if (!v) {
          return true; 
        }
        return /^[a-zA-Z]+$/.test(v) || 'Only letters are allowed.';
      },
        emailFormat: v => {
          const emailRegex = /\S+@\S+\.\S+/;
          return emailRegex.test(v) || 'Invalid email format.';
        }
      }
    }
  },
  methods: {
    async handleRegister() {
      try {
        if (this.password !== this.confirmPassword) {
          console.error('Le password non coincidono')
          return;
        }
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