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
                                <v-text-field label="Nome spesa*" required></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="6" md="4">
                                <v-autocomplete label="Pagata da*" :items="['Mario', 'Bepi', 'Pino', 'Gigi']"
                                    required></v-autocomplete>
                            </v-col>
                            <v-col cols="12" sm="6" md="4">
                                <v-text-field label="Importo*" hint="Inserire importo in euro" required></v-text-field>
                            </v-col>
                            <v-col cols="12">
                                <v-text-field label="Descrizione" hint="Massimo 100 caratteri" required></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="6" md="6">
                                <v-autocomplete label="Partecipanti*" v-model="fields.selected" :items="fields.participants" multiple required></v-autocomplete>
                            </v-col>
                            <v-col cols="12" sm="6" md="6">
                                <component v-for="select in fields.selected" :key="select" :is="select">
                                    <v-row>
                                        <v-col cols="12" sm="6" md="6">
                                            <!-- NOME PARTECIPANE -->
                                            <v-card auto :title="select"></v-card>
                                        </v-col>
                                        <v-col cols="12" sm="6" md="6">
                                            <!-- IMPORTO DA PAGARE -->
                                            <v-text-field v-model="fields" label="Importo*" :is="select" hint="Importo dovuto" required></v-text-field>
                                        </v-col>
                                    </v-row>
                                </component>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col cols="12" sm="6" md="6">
                                <v-text-field label="Periodicità*" hint="Inserire ogni quanto si ripete"
                                    :disabled="!isPeriodic" required></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="6" md="6">
                                <v-switch label="È periodica" @click="setPeriodic">
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
                    <v-btn color="blue-darken-1" variant="text" @click="logSelected">
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
        isPeriodic: false,
        users: ["Luca", "Franco", "Giacomo", "Mirco"],
        selected: [],
        debts: [],
        fields: {
            name: {
                label: 'Nome spesa',
                sortable: true,
                fù
            },
            paidBy: {
                label: 'Pagata da',
                sortable: true
            },
            amount: {
                label: 'Importo',
                sortable: true
            },
            description: {
                label: 'Descrizione',
                sortable: true
            },
            participants: [{
                user: {
                    label: 'Partecipanti',
                    sortable: true
                },
            }],
            selected: [{
                select: {
                    label: 'Partecipanti',
                    sortable: true
                },
                debt:{
                    label: 'Importo',
                    sortable: true
                }
            }],
            periodicity: {
                label: 'Periodicità',
                sortable: true
            }
        }
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
                    this.users = data.members
                    for(let i=0; i<this.users.length; i++){
                        let response = await fetch('http://localhost:3001/api/v1/users/' + this.users[i] + '/', {
                            method: 'GET',
                            headers: {
                                'x-auth-token': userStore.token,
                            }
                        })
                        if (response.ok) {
                            const data = await response.json()
                            this.fields.participants[i] = data.nickname
                        }
                    }
                }
            } catch (error) {
                console.log(error)
            }
        },
        logSelected() {
            for (let i = 0; i < this.fields.selected.length; i++) {
                console.log(this.fields.selected[i].select + " " + this.fields.selected[i].debt)
            }
        },
    }
}

</script>