<template>
    <header>
      <h1>Gruppi</h1>
      
    </header>

    <main>      
      <v-container>
        <v-col cols="12" sm="12" md="12">
          <v-card 
          @click="goto('/Group')"
          v-for="group in this.groups" 
          style="margin-bottom:4px ;" 

          >
            <v-row no-gutters class="d-flex align-center">
              <v-col cols="1">
                <v-avatar 
                  class="flex-grow-1" 
                  color="#6096B4"
                  size="80"
                  style="margin-left: 10px;"
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
              <v-col cols="auto" sm="auto" md="auto">
                
                <h2 style="padding-left: 10px;">
                  {{ group.name }}
                </h2>
              </v-col>
              <v-row justify="end" no-gutters class="d-flex flex-wrap-none" >
                <v-col cols="auto">
                  <v-avatar 
                  v-for="n in group.members.length" :key="n"
                  class="flex-grow-1" 
                  color="#6096B4"
                  size="60"
                  style="margin-right: 15px;"
                  >
                    <v-img
                  :src= "urlImg + group.members[n] "
                    ></v-img>
                  </v-avatar>    
                </v-col>
              </v-row>
              <v-card-actions>             
                <v-col 
                cols="12" 
                class="ml-auto"
                height="40px"
                width="40px"
                >
                  <v-btn color="primary">
                    <v-img
                      src="https://img.icons8.com/ios/50/ffffff/plus.png"
                      height="40px"
                      width="40px"
                      class="mr-2"
                    ></v-img>
                  </v-btn>
                </v-col>
              </v-card-actions>
            </v-row>
          </v-card>
        </v-col>
      </v-container>

      <div style="
        float: right;
        position: fixed;
        height: auto;
        width: auto;
        bottom: 40px;
        right: 40px;"
        >
        <v-btn
          @click="goto('/create-group')"
        >
          Crea gruppo
        </v-btn>
      </div>
    </main>       
</template>

<script>
/**
 * TODO: sistemare errori
 *  - se token è null dire che è non null
 *  - se refershi perdi il token
 *  - auth controllo token da riguardare e id da capire e riguardare
 */
  import { useUserStore } from '@/stores/user-store'

  const userStore = useUserStore()

  export default {
    mounted() {
      this.getGroups();
      //this.getGroup();
    },

    name: 'getGroups',
    data() {
      return {
        groups: [],
        urlImg: "https://robohash.org/",
      }
    },
    methods: {
      goto(path){ 
        this.$router.push(path)
      },
      async getGroups() {
        try {
          
          console.log("id: " + userStore.id);
          const response = await fetch('http://localhost:3001/api/v1/users/' + userStore.id + '/groups', { 
            method: 'GET',
            headers: {
              'x-auth-token': userStore.token,
            },
          });

          if (response.ok) {
            const data = await response.json()
            this.groups = data;
            console.log(data);
            console.log(this.groups.members);
            console.log("name: " + this.groups.name);
          } else {
            // Handle error response from the server
            const errorData = await response.json()
            console.error('response failed:', errorData.message)
          }
        } catch (error) {
          console.error('error:', error)
        }
      },
      /*async getGroup() {
        try {
          //console.log("token: " + userStore.token);
          console.log("id: " + this.groups.id);
          const response = await fetch('http://localhost:3001/api/v1/groups/' + this.groups.id, { 
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
      }*/
    },
  }    
</script>