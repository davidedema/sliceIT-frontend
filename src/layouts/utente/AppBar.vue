<template>
  <v-app-bar flat color="blue">
    <v-app-bar-title>
      <!-- <v-icon icon="mdi-circle-slice-4" />  -->
      SliceIT
    </v-app-bar-title>
    
    <v-btn rounded="">
      Mario Rossi
      <v-icon>mdi-account</v-icon>
    </v-btn>

  </v-app-bar>
</template>

<script>
  export default {
    methods: {
      goto(path){
        this.$router.push(path)
      }
    }
  }
</script>
