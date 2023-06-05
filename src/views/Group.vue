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
                  <v-btn icon @click="editSpesa(spesa)" style="margin-left: 10px">
                    <v-icon>mdi-pencil</v-icon>
                  </v-btn>
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
      <v-dialog v-model="dialog" width="1024">
        <template v-slot:activator="{ props }">
          <v-card-actions>
            <v-btn color="primary" auto @click="fetchUsers" v-bind="props">
              Nuova Spesa
            </v-btn>
          </v-card-actions>
        </template>
        <v-card>
          <v-card-title>
            <span class="text-h5">Nuova Spesa</span>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-row>
                <v-col cols="12" sm="6" md="4">
                  <v-text-field label="Nome spesa*" v-model="nome" :rules="[rules.required]"
                    @update:model-value="checkFormValidity" required>
                  </v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="4">
                  <v-autocomplete label="Pagata da*" v-model="pagataDa" @update:model-value="checkFormValidity"
                    :items="partecipanti.map(item => item.nickname)" required>
                  </v-autocomplete>
                </v-col>
                <v-col cols="12" sm="6" md="4">
                  <v-text-field label="Importo*" v-model="importo" :rules="[rules.number]" hint="Inserire importo in euro"
                    @update:model-value="checkFormValidity" required>
                  </v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-text-field label="Descrizione" v-model="descrizione" hint="Massimo 100 caratteri" required>
                  </v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="6">
                  <v-autocomplete label="Partecipanti*" :items="partecipanti.map(item => item.nickname)" v-model="aux"
                    @update:model-value="updateSelected(); checkFormValidity();" multiple required>
                  </v-autocomplete>
                </v-col>
                <v-col cols="12" sm="6" md="6">
                  <component v-for="(select, index) in selected" :key="index">
                    <v-row>
                      <v-col cols="12" sm="6" md="6">
                        <!-- NOME PARTECIPANE -->
                        <v-card auto :title="select.user"></v-card>
                      </v-col>
                      <v-col cols="12" sm="6" md="6">
                        <!-- IMPORTO DA PAGARE -->
                        <v-text-field v-model="select.value" label="Importo*" hint="Importo dovuto"
                          required></v-text-field>
                      </v-col>
                    </v-row>
                  </component>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12" sm="6" md="6">
                  <v-autocomplete v-model="periodo" label="Periodicità*"
                    :items="['Giornaliera', 'Settimanale', 'Mensile']" @update:model-value="checkFormValidity"
                    :disabled="!isPeriodic" required></v-autocomplete>
                </v-col>
                <v-col cols="12" sm="6" md="6">
                  <v-switch v-model="isPeriodic" label="È periodica" @click="setPeriodic"
                    @update:model-value="checkFormValidity">
                  </v-switch>
                </v-col>
              </v-row>
            </v-container>
            <small>*Campi obbligatori</small>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue-darken-1" variant="text" @click="dialog = false">
              Chiudi
            </v-btn>
            <v-btn color="blue-darken-1" variant="text" @click="submitForm" :disabled="isSubmitDisabled">
              Crea
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </div>
  </main>
</template>

<script>
import NewOut from "@/components/NewOut.vue";
import { useUserStore } from "@/stores/user-store";
const userStore = useUserStore();
//userStore.fetchUser()
const HOST = import.meta.env.VITE_APP_API_HOST || 'http://localhost:3001'
const API_URL = HOST + '/api/v1'
const GROUPS_URL = API_URL + '/groups/'
const NEW_OUT_URL = API_URL + '/outgoings'
const GET_USER_URL = API_URL + '/users/'
const GET_GROUP_URL = API_URL + '/groups/'

export default {
  mounted() {
    this.getGroup();
    this.getGroupOutgoings();
    this.getGroupUsers();
  },

  name: "getGroups",
  data() {
    return {
      group: "",
      outgoing: [],
      members: "",
      urlImg: "https://robohash.org/",
      currentUser: userStore.id, dialog: false,
      isSubmitDisabled: true,
      nome: '',
      pagataDa: '',
      importo: '',
      descrizione: '',
      partecipanti: [{
        id: '',
        nickname: '',
      }],
      selected: [],
      aux: [],
      isPeriodic: false,
      periodo: '',
      rules: {
        required: v => !!v || 'Required.',
        min: v => v.length >= 8 || 'Min 8 characters',
        specialChar: v => /[!@#$%^&*(),.?":{}|<>]/.test(v) || 'At least one special character (!@#$%^&*(),.?":{}|<>)',
        number: v => /^\d+$/.test(v) || 'Inserire solo cifre',
        uppercase: v => /[A-Z]/.test(v) || 'At least one uppercase letter',
        lettersOnly: v => {
          if (!v) {
            return true;
          }
          return /^[a-zA-Z]+$/.test(v) || 'Only letters are allowed.';
        },
        emailFormat: v => {
          const emailRegex = /\S+@\S+\.\S+/;
          return emailRegex.test(v) || 'Invalid email format.';
        }
      }

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
        const response = await fetch(
          GROUPS_URL
          + userStore.currentGroup, {
          method: "GET",
          headers: {
            "x-auth-token": userStore.token,
          },
        });
        if (response.ok) {
          const data = await response.json();
          this.group = data;
        } else {
          // Handle error response from the server
          const errorData = await response.json();
          console.error("response failed:", errorData.message);
        }
      } catch (error) {
        console.error("error:", error);
      }
    },
    async getGroupOutgoings() {
      try {
        const response = await fetch(
          GROUPS_URL
          + userStore.currentGroup
          + "/outgoings",
          {
            method: "GET",
            headers: {
              "x-auth-token": userStore.token,
            },
          }
        );
        if (response.ok) {
          const data = await response.json();
          this.outgoing = data;
        } else {
          // Handle error response from the server
          const errorData = await response.json();
          console.error("response failed:", errorData.message);
        }
      } catch (error) {
        console.error("error:", error);
      }
    },
    async getGroupUsers() {
      try {
        const response = await fetch(
          GROUPS_URL
          + userStore.currentGroup
          + "/users",
          {
            method: "GET",
            headers: {
              "x-auth-token": userStore.token,
            },
          }
        );
        if (response.ok) {
          const data = await response.json();
          this.members = data;
          console.log(data);
        } else {
          // Handle error response from the serv
          const errorData = await response.json();
          console.error("response failed:", errorData.message);
        }
      } catch (error) {
        console.error("error:", error);
      }
    },
    setPeriodic() {
      this.isPeriodic = !this.isPeriodic;
    },
    async fetchUsers() {
      try {
        const response = await fetch(GET_GROUP_URL + userStore.currentGroup + '/', {
          method: 'GET',
          headers: {
            'x-auth-token': userStore.token,
          }
        })
        if (response.ok) {
          const data = await response.json()
          this.partecipanti = data.members.map(member => {
            return {
              id: member,
              nickname: '',
            }
          })
          for (let i = 0; i < data.members.length; i++) {

            let response = await fetch(GET_USER_URL + this.partecipanti[i].id + '/', {
              method: 'GET',
              headers: {
                'x-auth-token': userStore.token,
              }
            })
            if (response.ok) {
              const data = await response.json()
              this.partecipanti[i].nickname = data.nickname
            }
          }
        }
      } catch (error) {
        console.log(error)
      }
    },
    submitForm() {
      // trasformo i nickname in id
      if (this.selected.length > 0) {
        for (let i = 0; i < this.selected.length; i++) {
          for (let j = 0; j < this.partecipanti.length; j++) {
            if (this.selected[i].user == this.partecipanti[j].nickname) {
              this.selected[i].user = this.partecipanti[j].id
            }
          }
        }
      }

      // paidby to id
      for (let i = 0; i < this.partecipanti.length; i++) {
        if (this.pagataDa == this.partecipanti[i].nickname) {
          this.pagataDa = this.partecipanti[i].id
        }
      }

      // trasformo i giorni in numeri
      if (this.isPeriodic) {
        if (this.periodo == 'giornaliera') {
          this.periodo = 1
        } else if (this.periodo == 'settimanale') {
          this.periodo = 7
        } else if (this.periodo == 'mensile') {
          this.periodo = 30
        }
      }

      // dati da inviare
      const data = {
        name: this.nome,
        description: this.descrizione,
        value: this.importo,
        paidBy: this.pagataDa,
        users: this.selected,
        group: userStore.currentGroup,
        periodicity: {
          isPeriodic: this.isPeriodic,
          days: this.periodo,
        },
        tag: null,
      }
      try {
        const response = fetch(NEW_OUT_URL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'x-auth-token': userStore.token,
          },
          body: JSON.stringify(data),
        })
        if (response.status == 201) {
          this.dialog = false
          console.log(this.dialog)
        }
      } catch (error) {
        console.log(error)
      }
    },
    updateSelected() {
      this.selected = this.aux.map(item => {
        return {
          user: item,
          value: '',
        }
      })
    },
    checkFormValidity() {
      if (this.nome && this.pagataDa && this.importo && this.selected.length > 0) {
        if (this.isPeriodic)
          this.isSubmitDisabled = this.periodo ? false : true
        else
          this.isSubmitDisabled = false
      } else {
        this.isSubmitDisabled = true
      }
    }
  },
};
</script>
