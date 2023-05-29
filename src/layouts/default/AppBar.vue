<template>
  <v-app-bar flat color="blue">
    <v-app-bar-title>
      <!-- Click 'SliceIt' go home -->
      <!-- <v-icon icon="mdi-circle-slice-4" />  -->
      SliceIT
    </v-app-bar-title>
    
    <v-btn text rounded @click="goto('/login')">Sign In</v-btn>
    <v-btn text rounded @click="goto('/register')">Sign Up</v-btn>
    <v-btn text rounded @click="goto('/help')">Help</v-btn>
  </v-app-bar>
</template>

<script>
  export default {
    name: 'DefaultBar',
    methods: {
      goto(path){
        this.$router.push(path)
      }
    }
  }
</script>
