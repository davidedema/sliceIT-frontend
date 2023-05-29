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
                    <v-card-actions>
                        <v-btn>
                            Modifica
                        </v-btn>
                    </v-card-actions>
                </v-row>
            </v-card-text>
        </v-card>
    </v-row>
</template>

<script>

import { useUserStore } from '@/stores/user-store'

const userStore = useUserStore()
const HOST = import.meta.env.VITE_APP_API_HOST || 'http://localhost:3001'
const API_URL = HOST + '/api/v1'
const EDIT_URL = API_URL + '/user/' + userStore.id

export default{
    data() {
        return{
            name: userStore.firstName,
            surname: userStore.lastName,
            nickname: userStore.nickname,
            email: userStore.email,
        }
    }
}
</script>