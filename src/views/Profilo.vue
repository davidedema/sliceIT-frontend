<template>
    <v-row>
        <v-col></v-col>
        <v-col></v-col>
        <v-col></v-col>
    </v-row>
    <v-row justify="center">
        <v-card>
            <v-card-text>
                <v-container>
                    <v-col cols="12" sm="12" md="12">
                        <v-card-title>Profilo</v-card-title>

                        <v-img :width="300" aspect-ratio="1/1" cover
                            src="https://cdn.vuetifyjs.com/images/parallax/material.jpg">
                            <template v-slot:placeholder>
                                <div class="d-flex align-center justify-center fill-height">
                                    <v-progress-circular color="grey-lighten-4" indeterminate></v-progress-circular>
                                </div>
                            </template>
                        </v-img>
                        <v-card-item>
                            <v-divider></v-divider>
                        </v-card-item>

                        <v-card-item>
                            <v-card-subtitle> Email </v-card-subtitle>
                            <v-card-text> {{ email }} </v-card-text>
                        </v-card-item>
                        <v-card-item>
                            <v-card-subtitle> Nickname </v-card-subtitle>
                            <v-card-text> {{ nickname }} </v-card-text>
                        </v-card-item>
                        <v-card-item>
                            <v-card-subtitle> Password </v-card-subtitle>
                            <v-card-text> *********** </v-card-text>
                        </v-card-item>
                        <v-card-item></v-card-item>
                        <v-card-item>
                            <v-card-subtitle> Nome </v-card-subtitle>
                            <v-card-text> {{ name }} </v-card-text>
                        </v-card-item>
                        <v-card-item>
                            <v-card-subtitle> Cognome </v-card-subtitle>
                            <v-card-text> {{ surname }} </v-card-text>
                        </v-card-item>
                        <v-spacer></v-spacer>
                    </v-col>
                </v-container>
                <v-row justify="center">
                    <v-dialog v-model="dialog" persistent width="400">
                        <template v-slot:activator="{ props }">
                            <v-card-actions>
                                <v-btn color="primary" auto v-bind="props">
                                    Modifica
                                </v-btn>
                            </v-card-actions>
                        </template>
                        <v-card>
                            <v-card-title>
                                <span class="text-h5">Modifica Profilo</span>
                            </v-card-title>
                            <v-card-text>
                                <v-container>
                                    <v-row>
                                        <v-col cols="12" sm="12" md="12">
                                            <v-text-field label="Email" v-model="newEmail"
                                                :rules="[rules.emailFormat]"></v-text-field>
                                        </v-col>
                                        <v-col cols="12" sm="12" md="12">
                                            <v-text-field label="Nickname" v-model="newNickname"></v-text-field>
                                        </v-col>
                                        <v-col cols="12" sm="12" md="12">
                                            <v-text-field label="Password"
                                                :rules="[rules.min, rules.specialChar, rules.number, rules.uppercase]"
                                                v-model="newPassword" :type="showPassword1 ? 'text' : 'password'"
                                                :append-icon="showPassword1 ? 'mdi-eye' : 'mdi-eye-off'"
                                                @click:append="showPassword1 = !showPassword1" />
                                        </v-col>
                                        <v-col cols="12">
                                            <v-text-field label="Nome" :rules="[rules.lettersOnly]"
                                                v-model="newName"></v-text-field>
                                        </v-col>
                                        <v-col cols="12" sm="12" md="12">
                                            <v-text-field label="Cognome" :rules="[rules.lettersOnly]"
                                                v-model="newSurname"></v-text-field>
                                        </v-col>
                                    </v-row>
                                </v-container>
                            </v-card-text>
                            <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn color="blue-darken-1" variant="text" @click="dialog = false">
                                    Chiudi
                                </v-btn>
                                <v-btn color="blue-darken-1" variant="text" @click="dialogConfirm = true">
                                    Salva
                                </v-btn>
                            </v-card-actions>
                        </v-card>
                    </v-dialog>

                    <v-dialog v-model="dialogConfirm" width="auto">
                        <v-card>
                            <v-container>
                                <v-card-title>
                                    Inserire la password corrente per confermare le modifiche
                                </v-card-title>
                                <v-card-text>
                                    <v-text-field label="Password Corrente" v-model="password"
                                        :type="showPassword1 ? 'text' : 'password'"
                                        :append-icon="showPassword1 ? 'mdi-eye' : 'mdi-eye-off'"
                                        @click:append="showPassword1 = !showPassword1" />
                                </v-card-text>
                            </v-container>
                            <v-spacer></v-spacer>
                            <v-card-actions>
                                <v-btn @click="dialogConfirm = false" color="secondary">
                                    Esci
                                </v-btn>
                                <v-btn @click="editUser" color="primary">
                                    Salva
                                </v-btn>
                            </v-card-actions>
                        </v-card>
                    </v-dialog>
                </v-row>
            </v-card-text>
        </v-card>
    </v-row>
</template>

<script>

import { useUserStore } from '@/stores/user-store'

const userStore = useUserStore()
userStore.fetchUser()
const HOST = import.meta.env.VITE_APP_API_HOST || 'http://localhost:3001'
const API_URL = HOST + '/api/v1'
const id = userStore.id
const EDIT_URL = API_URL + '/users/' + userStore.id
const LOGIN_URL = API_URL + '/auth/login'

export default {
    data() {
        return {
            dialog: false,
            dialogConfirm: false,
            name: userStore.firstName,
            surname: userStore.lastName,
            nickname: userStore.nickname,
            showPassword: false,
            showPassword1: false,
            email: userStore.email,
            auth: '',
            newName: '',
            newSurname: '',
            newNickname: '',
            newEmail: '',
            newPassword: '',
            password: '',
            rules: {
                required: v => !!v || 'Required',
                min: v => v.length >= 8 || 'Min 8 characters',
                specialChar: v => /[!@#$%^&*(),.?":{}|<>]/.test(v) || 'At least one special character (!@#$%^&*(),.?":{}|<>)',
                number: v => /\d/.test(v) || 'At least one number',
                uppercase: v => /[A-Z]/.test(v) || 'At least one uppercase letter',
                lettersOnly: v => {
                    if (!v) {
                        return true;
                    }
                    return /^[a-zA-Z]+$/.test(v) || 'Only letters are allowed';
                },
                emailFormat: v => {
                    const emailRegex = /\S+@\S+\.\S+/;
                    return emailRegex.test(v) || 'Invalid email format';
                }
            }
        }
    },
    methods: {
        async editUser() {
            try {
                const response = await fetch(LOGIN_URL, {
                    method: 'POST',
                    headers: {
                        'x-auth-token': userStore.token,
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        email: userStore.email,
                        password: this.password,
                    })
                })
                if (response.status === 200) {
                    this.dialogConfirm = false,
                    this.auth = 200
                }else{
                    const error = await response.json()
                    alert("response failed: " + error.message);
                }
            } catch {
                console.log("Errore:" + error)
            }
            if (this.auth == 200)
                try {
                    const response = await fetch(EDIT_URL, {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json',
                            'x-auth-token': userStore.token,
                        },
                        body: JSON.stringify({
                            firstName: this.newName !== '' ? this.newName : undefined,
                            lastName: this.newSurname !== '' ? this.newSurname : undefined,
                            nickname: this.newNickname !== '' ? this.newNickname : undefined,
                            email: this.newEmail !== '' ? this.newEmail : undefined,
                            password: this.newPassword !== '' ? this.newPassword : undefined,
                        })
                    })
                    if (response.status === 200) {
                        this.dialog = false
                        userStore.fetchUser()
                    }else{
                        const error = await response.json()
                        alert("response failed: " + error.message);
                    }
                } catch (error) {
                    console.log("Errore:" + error)
                }
        }
    }
}
</script>