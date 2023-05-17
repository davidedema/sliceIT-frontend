<template>
  <v-card width="500" class="mx-auto mt-10">
    <v-card-title>SignUp</v-card-title>
    <v-card-text>
      <v-text-field label="Username" prepend-icon="mdi-account-circle"/>
      <v-text-field 
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
      <v-text-field label="Nome" prepend-icon="mdi-alphabet-latin"/>
      <v-text-field label="Cognome" prepend-icon="mdi-alphabet-latin"/>
      <v-text-field label="Nickname" prepend-icon="mdi-account"/>
    </v-card-text>
    <v-divider></v-divider>
    <v-card-actions>
      <v-btn color="success">Register</v-btn>
    </v-card-actions>
  </v-card>
</template>
<script>
  export default {
    name: 'RegisterView',

    data() {
      return {
        showPassword: false
      }
    }
  }
</script>