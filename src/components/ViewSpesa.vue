<template>
    <v-row justify="center">
        <v-dialog v-model="dialog" width="1024">
            <template v-slot:activator="{ props }">
                <v-card-actions>
                    <v-btn icon color="primary" auto @click="fetchOutgoing" v-bind="props" style="margin-left: 10px">
                        <v-icon>mdi-eye</v-icon>
                    </v-btn>
                </v-card-actions>
            </template>
            <v-card>
                <v-card-title>
                    <span class="text-h5">Visualizza Spesa</span>
                </v-card-title>
                <v-card-text>
                    <v-container>
                        <v-row>
                            <v-col cols="12" sm="6" md="4">
                                <v-text-field label="Nome spesa*" v-model="nome" :rules="[rules.required]"
                                    @update:model-value="checkFormValidity" required disabled="true">
                                </v-text-field>
                            </v-col>
                            <v-col cols="12" sm="6" md="4">
                                <v-autocomplete label="Pagata da*" v-model="pagataDa"
                                    @update:model-value="checkFormValidity" :items="partecipanti.map(item => item.nickname)"
                                    required disabled="true">
                                </v-autocomplete>
                            </v-col>
                            <v-col cols="12" sm="6" md="4">
                                <v-text-field label="Importo*" v-model="importo" :rules="[rules.number]"
                                    hint="Inserire importo in euro" @update:model-value="checkFormValidity" required disabled="true">
                                </v-text-field>
                            </v-col>
                            <v-col cols="12">
                                <v-text-field label="Descrizione" v-model="descrizione" hint="Massimo 100 caratteri"
                                    required disabled="true">
                                </v-text-field>
                            </v-col>
                            <v-col cols="12" sm="6" md="6">
                                <v-autocomplete label="Partecipanti*" :items="partecipanti.map(item => item.nickname)"
                                    v-model="aux" @update:model-value="updateSelected(); checkFormValidity();" multiple
                                    required disabled="true">
                                </v-autocomplete>
                            </v-col>
                            <v-col cols="12" sm="6" md="6">
                                <component v-for="(select, index) in selected" :key="index">
                                    <v-row>
                                        <v-col cols="12" sm="6" md="6">
                                            <!-- NOME PARTECIPANE -->
                                            <v-card auto :title="select.user" disabled="true"></v-card>
                                        </v-col>
                                        <v-col cols="12" sm="6" md="6">
                                            <!-- IMPORTO DA PAGARE -->
                                            <v-text-field v-model="select.value" label="Importo*" hint="Importo dovuto"
                                                required disabled="true"></v-text-field>
                                        </v-col>
                                    </v-row>
                                </component>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col cols="12" sm="6" md="6">
                                <v-autocomplete v-model="periodo" label="Periodicità*"
                                    :items="['Giornaliera', 'Settimanale', 'Mensile']"
                                    @update:model-value="checkFormValidity" :disabled="!isPeriodic"
                                    required disabled="true"></v-autocomplete>
                            </v-col>
                            <v-col cols="12" sm="6" md="6">
                                <v-switch v-model="isPeriodic" label="È periodica" @click="setPeriodic"
                                    @update:model-value="checkFormValidity" disabled="true">
                                </v-switch>
                            </v-col>
                            <v-col cols="12" sm="6" md="6">
                                <v-autocomplete v-model="tag" label="Tag" :items="['Spesa', 'Casa', 'Svago', 'Altro']" disabled="true"></v-autocomplete>
                            </v-col>
                        </v-row>
                        
                    </v-container>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue-darken-1" variant="text" @click="dialog = false">
                        Chiudi
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-row>
</template>


<script>

import { useUserStore } from '@/stores/user-store'
const userStore = useUserStore()
const HOST = import.meta.env.VITE_APP_API_HOST || 'http://localhost:3001'
const API_URL = HOST + '/api/v1'
const EDIT_OUT_URL = API_URL + '/outgoings/'
const GET_USER_URL = API_URL + '/users/'
const GET_GROUP_URL = API_URL + '/groups/'
const GET_OUT_URL = API_URL + '/outgoings/'

export default {
    props: {
        spesaId: {
            type: String,
            default: ''
        }
    },
    data: () => ({
        dialog: false,
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
        tag: '',
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
    }),
    methods: {
        setPeriodic() {
            this.isPeriodic = !this.isPeriodic;
        },
        async fetchOutgoing() {
            console.log(this.spesaId)
            try {
                const response = await fetch(GET_GROUP_URL + userStore.currentGroup + '/', {
                    method: 'GET',
                    headers: {
                        'x-auth-token': userStore.token,
                    }
                })
                if (response.status === 200) {
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
                } else{
                    const error = await response.json()
                    alert("response failed: " + error.message);
                }
            } catch (error) {
                console.log(error)
            }
            try {
                const response = await fetch(GET_OUT_URL + this.spesaId, {
                    method: 'GET',
                    headers: {
                        'x-auth-token': userStore.token,
                    }
                })
                if (response.status == 200) {
                    const data = await response.json()
                    this.nome = data.name
                    this.descrizione = data.description
                    this.importo = data.value
                    this.pagataDa = data.paidBy
                    this.selected = []
                    for (let i = 0; i < data.users.length; i++) {
                        this.selected.push({
                            user: data.users[i].user,
                            value: data.users[i].value,
                        })
                    }
                    // trasformo id a nicknames
                    for (let i = 0; i < this.partecipanti.length; i++) {
                        if (this.partecipanti[i].id == this.pagataDa) {
                            this.pagataDa = this.partecipanti[i].nickname
                        }
                    }
                    for (let i = 0; i < this.selected.length; i++) {
                        for (let j = 0; j < this.partecipanti.length; j++) {
                            if (this.selected[i].user == this.partecipanti[j].id) {
                                this.selected[i].user = this.partecipanti[j].nickname
                            }
                        }
                    }
                    this.isPeriodic = data.periodicity.isPeriodic
                    this.periodo = data.periodicity.days
                } else{
                    const error = await response.json()
                    alert("response failed: " + error.message);
                }
            } catch (error) {

            }
        },
        async submitForm() {
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
                tag: this.tag,
            }
            try {
                const response = fetch(EDIT_OUT_URL + this.spesaId, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        'x-auth-token': userStore.token,
                    },
                    body: JSON.stringify(data),
                })
                if (response.status == 201) {
                    this.dialog = false
                }
                else{
                    const error = await response.json()
                    alert("response failed: " + error.message);
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
    }
}

</script>