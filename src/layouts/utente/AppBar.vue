<template>
  <v-app-bar flat color="blue" style="position:fixed">
    <v-app-bar-title>
      SliceIT
    </v-app-bar-title>

    <v-btn rounded="" @click="goto('/profile')">
      {{ nomeVisualizzato }}
      <v-icon>mdi-account</v-icon>
    </v-btn>

  </v-app-bar>
</template>

<script>

import { useUserStore } from '@/stores/user-store'
const userStore = useUserStore()

export default {

  data() {
    return {
      nomeVisualizzato: userStore.nickname
      }
  },
  methods: {
    goto(path) {
      this.$router.push(path)
    }
  }
}
</script>
