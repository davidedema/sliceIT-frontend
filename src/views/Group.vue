<template>
    <header>
      <v-row no-gutters class="d-flex align-center">
        <v-col cols="1">
        <v-avatar 
          class="flex-grow-1" 
          color=primary
          size="80"
          style="margin-right: 10px;"
        >
          <v-img
            :src= "urlImg + group.name"
            height="80px"
            :aspect-ratio="1"
            cover
            position="left"                    
            class="text-white"
          > </v-img>
        </v-avatar>
        </v-col>
        <v-col cols="auto" sm="2" md="auto">
          <h1 style="margin-left: 10px;  ">
            {{ group.name }}
          </h1>
        </v-col>
      </v-row>
    </header>

    <!--MEMBRI DEL GRUPPO-->
    <!--<aside style="position: fixed; top: 0; right: 0; width: 300px; height: 100%; background-color: #f0f0f0;">

        <v-card 
            v-for="members in this.group.members" :key="n"
            position="right"
            style="margin-bottom:10px;"
          >
          {{this.group.members}}
        </v-card>
      </aside>-->
    
    <!--SPESE DEL GRUPPO-->
    <main>
      <v-card 
          v-for="outgoing in this.outgoing" :key="outgoing"
          style="margin-top:10px;"
        >
        spesa: {{ outgoing.name }}
        </v-card>
    </main>

</template>

<script>    

import { useUserStore } from '@/stores/user-store'
const userStore = useUserStore()

export default {
  mounted() {
    this.getGroup();
    this.getGroupOutgoings();
  },

  name: 'getGroups',
  data() {
    return {
      group:"",
      outgoing:"",
      users:"",
      urlImg: "https://robohash.org/",
    }
  },
  methods: {
    currentGroup() {
      this.group=userStore.getCurrentGroup;
    },
    
    goto(path){ 
      this.$router.push(path)
    },
    async getGroup() {
      try {
        //console.log("token: " + userStore.token);
        //console.log("id: " + this.groups.id);
        console.log("currentGroup: " + userStore.currentGroup);
        const response = await fetch("http://localhost:3001/api/v1/groups/" + userStore.currentGroup, { 
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
    },
    async getGroupOutgoings() {
      try {
        //console.log("token: " + userStore.token);
        //console.log("id: " + this.groups.id);
        //console.log("currentGroup: " + userStore.currentGroup);
        const response = await fetch("http://localhost:3001/api/v1/groups/" + userStore.currentGroup +"/outgoings", { 
          method: 'GET',
          headers: {
            'x-auth-token': userStore.token,
          },
        });
        if (response.ok) {
          const data = await response.json()
          this.outgoing = data;
          console.log(data);
        } else {
          // Handle error response from the server
          const errorData = await response.json()
          console.error('response failed:', errorData.message)
        }
      } catch (error) {
        console.error('error:', error)
      }
  },
  }
} 
</script>