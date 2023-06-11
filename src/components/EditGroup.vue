<template>
    <v-dialog v-model="dialog" width="800">
        <template v-slot:activator="{ props }">
            <v-card-actions>
                <v-btn color="primary" v-bind="props" fab dark small>
                    <v-icon>mdi-pencil</v-icon>
                </v-btn>
            </v-card-actions>
        </template>
        <v-card>
            <v-card-title>
                <span class="text-h5">Modifica gruppo</span>
            </v-card-title>
            <v-card-text>
                <v-container>
                    <v-row>
                        <v-col cols="12" sm="12" md="12">
                            <v-text-field label="Nome gruppo" v-model="nome" required></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="12" md="12">
                            <v-text-field label="Descrizione gruppo" v-model="descrizione" required></v-text-field>
                        </v-col>
                    </v-row>
                </v-container>
            </v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="dialog = false">Annulla</v-btn>
                <v-btn color="blue darken-1" text @click="editGroup">Modifica</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
import { useUserStore } from '@/stores/user-store'
const userStore = useUserStore()
const HOST = import.meta.env.VITE_APP_API_HOST || 'http://localhost:3001'
const API_URL = HOST + '/api/v1'
const EDIT_GROUP_URL = API_URL + '/groups/'
export default {
    name: "EditGroup",
    data: () => ({
        dialog: false,
        nome: "",
        descrizione: "",
        urlImg: "test.jpeg",
    }),
    methods: {
        async editGroup() {
            try{
                const response = await fetch(EDIT_GROUP_URL + userStore.currentGroup, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        'x-auth-token': userStore.token
                    },
                    body: JSON.stringify({
                        name: this.nome,
                        description: this.descrizione,
                        groupPicture: this.urlImg
                    })
                })
                if(response.status === 200){
                    this.dialog = false
                }
                else{
                    const data = await response.json()
                    alert(data.message)
                }

            }catch(err){
                console.log(err)
            }
        },
    },
};
</script>