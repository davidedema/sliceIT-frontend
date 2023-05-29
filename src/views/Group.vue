<template>
    <header>
        <h1>nome del gruppo</h1>
    </header>

    <aside>

    </aside>
    
    <main>
        
    </main>

</template>

<script>    

import { useUserStore } from '@/stores/user-store'
const userStore = useUserStore()

export default {
  mounted() {
    this.getGroup();
  },

  name: 'getGroups',
  data() {
    return {
      group: [],
    }
  },
  methods: {
    goto(path){ 
      this.$router.push(path)
    },
    async getGroup() {
      try {
        //console.log("token: " + userStore.token);
        //console.log("id: " + this.groups.id);
        const response = await fetch('http://localhost:3001/api/v1/' + this.groups.id, { 
          method: 'GET',
          headers: {
            'x-auth-token': userStore.token,
          },
        });
        if (response.ok) {
          const data = await response.json()
          this.group = data;
          console.log(data);
        } else {
          // Handle error response from the server
          const errorData = await response.json()
          console.error('response failed:', errorData.message)
        }
      } catch (error) {
        console.error('error:', error)
      }
    }
  },
} 
</script>