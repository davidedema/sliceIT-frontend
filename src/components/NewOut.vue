<!-- todo SISTEMARE VARIABILI PER LEGGERE CAMPI -->
<!-- todo COLLEGARE CON BACKEND -->
<!-- todo CHECK FRONTEND SUI CAMPI -->



<template>
    <v-row justify="center">
        <v-dialog v-model="dialog" persistent width="1024">
            <template v-slot:activator="{ props }">
                <v-btn color="primary" auto @click="fetchUsers" v-bind="props">
                    Nuova Spesa
                </v-btn>
            </template>
            <v-card>
                <v-card-title>
                    <span class="text-h5">Nuova Spesa</span>
                </v-card-title>
                <v-card-text>
                    <v-container>
                        <v-row>
                            <v-col cols="12" sm="6" md="4">
                                <v-text-field label="Nome spesa*" v-model="nome" required></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="6" md="4">
                                <v-autocomplete label="Pagata da*" v-model="pagataDa"
                                    :items="partecipanti.map(item => item.nickname)" required></v-autocomplete>
                            </v-col>
                            <v-col cols="12" sm="6" md="4">
                                <v-text-field label="Importo*" v-model="importo" hint="Inserire importo in euro"
                                    required></v-text-field>
                            </v-col>
                            <v-col cols="12">
                                <v-text-field label="Descrizione" v-model="descrizione" hint="Massimo 100 caratteri"
                                    required></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="6" md="6">
                                <!-- <v-autocomplete label="Partecipanti*" v-model="selected" :items="partecipanti.map(item => item.nickname)" multiple required></v-autocomplete> -->
                                <v-autocomplete label="Partecipanti*" :items="partecipanti.map(item => item.nickname)" v-model="aux" @update:model-value="updateSelected"
                                    multiple required></v-autocomplete>

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
                                <v-text-field v-model="periodo" label="Periodicità*" hint="Inserire ogni quanto si ripete"
                                    :disabled="!isPeriodic" required></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="6" md="6">
                                <v-switch v-model="isPeriodic" label="È periodica" @click="setPeriodic">
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
                    <v-btn color="blue-darken-1" variant="text" @click="submitForm">
                        Crea
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-row>
</template>

<script>

import { useUserStore } from '@/stores/user-store'
const userStore = useUserStore()

export default {
    data: () => ({
        dialog: false,
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
    }),
    methods: {
        setPeriodic() {
            this.isPeriodic = !this.isPeriodic;
            console.log(this.isPeriodic);
        },
        async fetchUsers() {
            userStore.currentGroup = "645a61e383d06be08c4252b7"
            try {
                const response = await fetch('http://localhost:3001/api/v1/groups/' + userStore.currentGroup + '/', {
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

                        let response = await fetch('http://localhost:3001/api/v1/users/' + this.partecipanti[i].id + '/', {
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
        submitForm(){
            // trasformo i nickname in id
            for(let i = 0; i < this.selected.length; i++){
                if(this.partecipanti[i].nickname == this.selected[i].user){
                    this.selected[i].user = this.partecipanti[i].id
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
                periodic: {
                    isPeriodic: this.isPeriodic,
                    days: this.periodo,
                },
                tag: null,
            }
            try {                
                const response = fetch('http://localhost:3001/api/v1/outgoings/', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'x-auth-token': userStore.token,
                    },
                    body: JSON.stringify(data),
                })
                if(response.ok){
                    this.dialog = false
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
        }
    }
}

</script>