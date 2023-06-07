<template>
    <h1>Sommario</h1>
    <v-card width="1100" class="mx-auto mt-10">
        <v-row>
            <v-col cols="4">
                <v-card elevation="0">
                    <v-card-title>
                        <p class="text-h5 text-center">
                            Crediti
                        </p>
                    </v-card-title>
                    <v-card-text>
                        <p class="text-h2 text-center text-success">
                            $ +{{this.creditors.total}}
                        </p>
                    </v-card-text>
                </v-card>
            </v-col>
            <v-col cols="4">
                <v-card elevation="0">
                    <v-card-title>
                        <p class="text-h5 text-center">
                            Bilancio totale
                        </p>
                    </v-card-title>
                    <v-card-text>
                        <p v-bind:class="{
                            'text-h2 text-center text-success': (this.creditors.total - this.debtors.total) > 0,
                            'text-h2 text-center text-error': (this.creditors.total - this.debtors.total) < 0
                        }">
                            $ {{ this.creditors.total - this.debtors.total }}
                        </p>
                    </v-card-text>
                </v-card>
            </v-col>
            <v-col  cols="4">
                <v-card elevation="0">
                    <v-card-title>
                        <p class="text-h5 text-center">
                            Debiti
                        </p>
                    </v-card-title>
                    <v-card-text>
                        <p class="text-h2 text-center text-error">
                            $ -{{this.debtors.total}}
                        </p>
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>

        <v-divider :thickness="20" class="border-opacity-2"></v-divider>

        <v-row>
            <v-col cols="4">
                <v-card elevation="0" v-for="item in creditors.creditors" :key="item.creditor">
                    <v-card-title>
                        <p class="text-h5 text-right">
                            {{ item.creditor }}
                        </p>
                    </v-card-title>
                    <v-card-text v-for="i in item.value" :key="i.group">
                        <p class="text-body-1 text-right">
                            dal gruppo {{ i.group }} $ {{ i.money}} 
                        </p>
                    </v-card-text>
                </v-card>
            </v-col>
            <v-col cols="4" class="text-center">
                <!-- colonna totale vuota -->
            </v-col>
            <v-col  cols="4">
                <v-card elevation="0" v-for="item in debtors.debtors" :key="item.debtor">
                    <v-card-title>
                        <p class="text-h5 text-left">
                            {{ item.debtors }}
                        </p>
                    </v-card-title>
                    <v-card-text v-for="i in item.value" :key="i.group">
                        <p class="text-body-1 text-left">
                            dal gruppo {{ i.group }} $ {{ i.money}} 
                        </p>
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
    </v-card>
</template>

<script>
    import { useUserStore } from '@/stores/user-store'

    const userStore = useUserStore()
    userStore.fetchUser()
    const HOST = import.meta.env.VITE_APP_API_HOST || 'http://localhost:3001'
    const API_URL = HOST + '/api/v1'
    const EDIT_URL = API_URL + '/users/' + userStore.id
    const HOME_URL = EDIT_URL + '/report'

    export default {
        name: 'Report',
        mounted () {
            this.getReport()
        },
        data () {
            return {
                debtors: {},
                creditors: {},
            }
        },
        methods: {
            getNameGroup (idGroup) {
                for ( let i = 0; i < userStore.groups.length; i++ ) {
                    if ( userStore.groups[i].id === idGroup ) {
                        return userStore.groups[i].name
                    }
                }
            },
            async getReport () {
                try {
                    const response = await fetch(HOME_URL, {
                        method: 'GET',
                        headers: {
                            "x-auth-token": userStore.token,
                        }
                    });
                    if (response.ok) {
                        const data = await response.json()
                        this.debtors = data.debtors
                        this.creditors = data.creditors
                    } else {
                        const errorData = await response.json();
                        console.error("response failed:", errorData.message);
                    }
                } catch (error) {
                    console.error("error: ", error);
                }
            } 
        }
    }
</script>