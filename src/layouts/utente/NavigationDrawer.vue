<template>
  <v-navigation-drawer
    app
    floating
    permanent
    style="position:fixed"
  >
    <v-list
      density="compact"
      nav
    >
      <v-list-item prepend-icon="mdi-view-dashboard" title="Home" value="home" @click="goto('/home')"></v-list-item>
      <v-list-item prepend-icon="mdi-forum" title="Gruppi" value="about" @click="goto('/groups')"></v-list-item>
      <v-list-item prepend-icon="mdi-account-group" title="Persone" value="group"></v-list-item>
      <v-list-item prepend-icon="mdi-account-details" title="Statistiche" value="stat" @click="goto('/stats')"></v-list-item>
    </v-list>
    <template v-slot:append>
      <div class="pa-2">
        <v-btn block @click="goto('/login')"> Logout </v-btn>
        <v-btn block> Help </v-btn>
      </div>
    </template>
      
  </v-navigation-drawer>
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
