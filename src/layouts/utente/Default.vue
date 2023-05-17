<template>
  <v-app>
    <v-layout>
      <default-bar />
      <navigation-drawer />
      <default-view />
    </v-layout>
  </v-app>
</template>

<script setup>
  import DefaultBar from './AppBar.vue'
  import DefaultView from './View.vue'
  import NavigationDrawer from './NavigationDrawer.vue';
</script>
