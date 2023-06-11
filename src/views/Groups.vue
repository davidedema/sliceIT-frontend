<template>
  <header>
    <v-row no-gutters class="d-flex align-center" style="padding: 6px">
      <p class="text-h2 text-left mt-5">Gruppi</p>
    </v-row>
  </header>

  <main>
    <v-col cols="12" sm="12" md="12">
      <v-card
        @click="goto('/groups/' + group._id), selectGroup(group._id)"
        v-for="group in this.groups"
        style="margin-bottom: 6px; padding: 6px; height: 100%; width: 100%"
      >
        <v-row no-gutters class="d-flex align-center">
          <v-col cols="1">
            <v-avatar
              class="flex-grow-1"
              color="secondary"
              size="80"
              style="margin-right: 10px"
            >
              <v-img
                :src="urlImg + group.name"
                height="80px"
                :aspect-ratio="1"
                cover
                position="left"
                class="text-white"
              >
              </v-img>
            </v-avatar>
          </v-col>
          <v-col cols="auto" sm="2" md="auto">
            <h2 style="margin-left: 10px">
              {{ group.name }}
            </h2>
          </v-col>
          <v-row justify="end" no-gutters class="d-flex flex-wrap-none">
            <v-col cols="auto">
              <div v-if="group.members.length < 9">
                <v-avatar
                  v-for="n in group.members.length"
                  :key="n"
                  class="flex-grow-1"
                  color="#secondary"
                  size="60"
                  style="margin-right: 15px"
                >
                  <v-img :src="urlImg + group.members[n]"></v-img>
                </v-avatar>
              </div>
              <div v-else>
                <v-avatar
                  v-for="n in 8"
                  :key="n"
                  class="flex-grow-1"
                  color="#secondary"
                  size="60"
                  style="margin-right: 15px"
                >
                  <v-img :src="urlImg + group.members[n]"></v-img>
                </v-avatar>
              </div>
            </v-col>
          </v-row>
          <v-card-actions>
            <v-col cols="12" class="ml-auto" height="40px" width="40px">
              <v-btn @click="goto()" color="primary">
                <v-img
                  :src="più"
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

    <div
      style="
        float: right;
        position: fixed;
        height: auto;
        width: auto;
        bottom: 40px;
        right: 40px;
      "
    >
      <v-dialog v-model="dialog" persistent width="400">
        <template v-slot:activator="{ props }">
          <v-card-actions>
            <v-btn color="primary" auto v-bind="props"> Crea Gruppo </v-btn>
          </v-card-actions>
        </template>
        <v-card>
          <v-card-title>
            <span class="text-h5">Crea Gruppo</span>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-row>
                <v-col cols="12" sm="12" md="12">
                  <v-text-field label="Nome" v-model="name"></v-text-field>
                  <v-text-field
                    label="Descrizione"
                    v-model="description"
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue-darken-1" variant="text" @click="dialog = false">
              Chiudi
            </v-btn>
            <v-btn color="blue-darken-1" variant="text" @click="createGroup">
              Crea
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </div>
  </main>
</template>

<script>
import { useUserStore } from "@/stores/user-store";

const userStore = useUserStore();
const HOST = import.meta.env.VITE_APP_API_HOST || "http://localhost:3001";
const API_URL = HOST + "/api/v1";
const USERS_URL = API_URL + "/users/" + userStore.id;
const CREATE_URL = API_URL + "/groups";

export default {
  mounted() {
    this.getGroups();
  },

  name: "getGroups",
  data() {
    return {
      dialog: false,
      name: "",
      description: "",
      groups: [],
      urlImg: "https://robohash.org/",
      piu: "https://img.icons8.com/ios/50/ffffff/plus.png",
    };
  },
  methods: {
    goto(path) {
      this.$router.push(path);
    },
    selectGroup(groupId) {
      userStore.setCurrentGroup(groupId);
    },
    async createGroup() {
      try {
        const response = await fetch(CREATE_URL, {
          method: "POST",
          headers: {
            "x-auth-token": userStore.token,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: this.name,
            description: this.description,
            groupPicture: "nonserve.jpeg",
          }),
        });
        if (response.status === 201) 
          this.dialog = false;
        else{
          const errorData = await response.json();
          alert("response failed: " + errorData.message);
        }
      } catch (error) {
        console.log(error);
      }
    },
    async getGroups() {
      try {
        const response = await fetch(USERS_URL + "/groups", {
          method: "GET",
          headers: {
            "x-auth-token": userStore.token,
          },
        });

        if (response.status === 200) {
          const data = await response.json();
          this.groups = data;
        } else {
          // Handle error response from the server
          const errorData = await response.json();
          alert("response failed: " + errorData.message);
        }
      } catch (error) {
        console.error("error:", error);
      }
    },
  },
};
</script>
