<template>
  <header>
    <v-row no-gutters class="d-flex align-center" style="padding: 6px">
      <v-col cols="1">
        <v-avatar class="flex-grow-1" color="secondary" size="80" style="margin-right: 10px">
          <v-img :src="urlImg + group.name" height="80px" :aspect-ratio="1" cover position="left" class="text-white">
          </v-img>
        </v-avatar>
      </v-col>
      <v-col cols="auto" sm="2" md="auto">
        <h1 style="margin-left: 10px">
          {{ group.name }}
        </h1>
      </v-col>
    </v-row>
  </header>

  <main>
    <v-row>
      <!--SPESE DEL GRUPPO-->
      <v-col cols="7">
        <v-row no-gutters class="d-flex align-center" style="padding: 6px">
          <h2>Spese</h2>
        </v-row>
        <!--CONTENITORE DELLE SPESE-->
        <v-col cols="12" sm="12" md="12">
          <div v-for="spesa in this.outgoing.slice().reverse()" :key="spesa">
            <v-card style="margin-top: 6px; padding: 4px">
              <v-row no-gutters class="d-flex align-center">
                <!--DATA SPESE-->
                <v-col cols="1">
                  <h4 style="text-align: center">
                    {{ convData(spesa.createdAt) }}
                    <br />
                    {{ spesa.createdAt.substring(8, 10) }}
                  </h4>
                </v-col>

                <!--NOME SPESE-->
                <v-col cols="3">
                  <h2>
                    {{ spesa.name }}
                  </h2>
                </v-col>

                <!--PAGANTE SPESA-->
                <v-col cols="3">
                  <h4 style="text-align: left">
                    Pagata da:
                    <br />
                    {{ getPaidBy(spesa.paidBy) }}
                  </h4>
                </v-col>

                <!--IMPORTO SPESA-->
                <v-col cols="2">
                  <h4 style="text-align: left">
                    Importo:
                    <br />
                    {{ spesa.value }}€
                  </h4>
                </v-col>
                <!--DEBITO SPESA-->
                <v-col cols="2">
                  <div v-if="spesa.paidBy != currentUser">
                    <!--se l'utente non è il pagante-->
                    <h4 style="text-align: left">
                      Devi:
                      <br />
                      {{ getDebits(spesa) }}€
                    </h4>
                  </div>
                  <div v-else>
                    <!--se l'utente è il pagante-->
                    <h4 style="text-align: left">
                      Devi ricevere:
                      <br />
                      {{ spesa.value - getCredits(spesa) }}€
                    </h4>
                  </div>
                </v-col>
                <!--BOTTONE PER MODIFICARE LA SPESA-->
                <v-col cols="1">
                  <EditOutgoing />
                </v-col>
              </v-row>
            </v-card>
          </div>
        </v-col>
      </v-col>
      <!--MEMBRI DEL GRUPPO-->
      <v-col cols="5">
        <v-row no-gutters class="d-flex align-center" style="padding: 6px">
          <h2>Membri</h2>
        </v-row>

        <v-col cols="12" sm="12" md="12">
          <div v-for="member in this.group.members" :key="n">
            <v-card style="margin-top: 6px; padding: 4px; margin-right: 6px">
              {{ getPaidBy(member) }}
            </v-card>
          </div>
        </v-col>
      </v-col>
    </v-row>
    <!--BOTTONE PER CREARE UNA NUOVA SPESA-->
    <div style="float: right;  position: fixed;  height: auto; width: auto;  bottom: 40px; right: 40px;">
      <NewOut />
    </div>
  </main>
</template>

<script>
import { useUserStore } from "@/stores/user-store";
import NewOut from "@/components/NewOut.vue";
import EditOutgoing from "@/components/EditOutgoing.vue";
const userStore = useUserStore();
//userStore.fetchUser()
const HOST = import.meta.env.VITE_APP_API_HOST || 'http://localhost:3001'
const API_URL = HOST + '/api/v1'
const GROUPS_URL = API_URL + '/groups/'

export default {
  mounted() {
    this.getGroup();
    this.getGroupOutgoings();
    this.getGroupUsers();
  },
  components: {
    NewOut,
    EditOutgoing,
  },
  name: "getGroups",
  data() {
    return {
      group: "",
      outgoing: [],
      members: "",
      urlImg: "https://robohash.org/",
      currentUser: userStore.id,
    };
  },
  methods: {
    goto(path) {
      this.$router.push(path);
    },
    currentGroup() {
      this.group = userStore.getCurrentGroup;
    },
    getPaidBy(userId) {
      for (let i = 0; i < this.members.length; i++) {
        console.log(this.members[i]._id);
        if (this.members[i]._id == userId) {
          return this.members[i].nickname;
        }
      }
    },
    convData(d) {
      let _data = d.substring(5, 7);
      switch (_data) {
        case "01":
          _data = "GEN";
          break;
        case "02":
          _data = "FEB";
          break;
        case "03":
          _data = "MAR";
          break;
        case "04":
          _data = "APR";
          break;
        case "05":
          _data = "MAG";
          break;
        case "06":
          _data = "GIU";
          break;
        case "07":
          _data = "LUG";
          break;
        case "08":
          _data = "AGO";
          break;
        case "09":
          _data = "SET";
          break;
        case "10":
          _data = "OTT";
          break;
        case "11":
          _data = "NOV";
          break;
        case "12":
          _data = "DIC";
          break;
        default:
          _data = "!valid Format";
      }
      return _data;
    },
    getCredits(spesa) {
      let credits = 0;
      for (let i = 0; i < spesa.length; i++) {
        if (spesa.paidBy != userStore.id) {
          credits += this.spesa.users[i].value;
        }
      }
      return credits;
    },
    getDebits(spesa) {
      for (let i = 0; i < spesa.users.length; i++) {
        console.log(spesa.users[i].value);
        if (spesa.users[i].user == userStore.id) {
          return spesa.users[i].value;
        }
      }
    },
    reversedOutgoings() {
      return this.outgoings.slice().reverse();
    },
    async getGroup() {
      try {
        //console.log("currentGroup: " + userStore.currentGroup);
        const response = await fetch(GROUPS_URL
          + userStore.currentGroup, {
          method: "GET",
          headers: {
            "x-auth-token": userStore.token,
          },
        });
        if (response.ok) {
          const data = await response.json();
          this.group = data;
        }
        else {
          // Handle error response from the server
          const errorData = await response.json();
          console.error("response failed:", errorData.message);
        }
      }
      catch (error) {
        console.error("error:", error);
      }
    },
    async getGroupOutgoings() {
      try {
        const response = await fetch(GROUPS_URL
          + userStore.currentGroup
          + "/outgoings", {
          method: "GET",
          headers: {
            "x-auth-token": userStore.token,
          },
        });
        if (response.ok) {
          const data = await response.json();
          this.outgoing = data;
        }
        else {
          // Handle error response from the server
          const errorData = await response.json();
          console.error("response failed:", errorData.message);
        }
      }
      catch (error) {
        console.error("error:", error);
      }
    },
    async getGroupUsers() {
      try {
        const response = await fetch(GROUPS_URL
          + userStore.currentGroup
          + "/users", {
          method: "GET",
          headers: {
            "x-auth-token": userStore.token,
          },
        });
        if (response.ok) {
          const data = await response.json();
          this.members = data;
          console.log(data);
        }
        else {
          // Handle error response from the serv
          const errorData = await response.json();
          console.error("response failed:", errorData.message);
        }
      }
      catch (error) {
        console.error("error:", error);
      }
    },
  },
};
</script>
