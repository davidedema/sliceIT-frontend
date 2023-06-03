<template>
  <header>
    <h1>
      <v-row no-gutters class="d-flex align-center" style="padding: 6px">
        Gruppi
      </v-row>
    </h1>
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
      <v-btn @click="goto('/create-group')"> Crea gruppo </v-btn>
    </div>
  </main>
</template>

<script>
import { useUserStore } from "@/stores/user-store";

const userStore = useUserStore();
const HOST = import.meta.env.VITE_APP_API_HOST || "http://localhost:3001";
const API_URL = HOST + "/api/v1";
const USERS_URL = API_URL + "/users/" + userStore.id;

export default {
  mounted() {
    this.getGroups();
    //this.getGroup();
  },

  name: "getGroups",
  data() {
    return {
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
    async getGroups() {
      try {
        console.log("id: " + userStore.id);
        const response = await fetch(USERS_URL + "/groups", {
          method: "GET",
          headers: {
            "x-auth-token": userStore.token,
          },
        });

        if (response.ok) {
          const data = await response.json();
          this.groups = data;
          console.log(data);
        } else {
          // Handle error response from the server
          const errorData = await response.json();
          console.error("response failed:", errorData.message);
        }
      } catch (error) {
        console.error("error:", error);
      }
    },
  },
};
</script>
