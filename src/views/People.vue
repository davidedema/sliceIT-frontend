<template>
    <p class="text-h2 text-left mt-5">
        Persone
    </p>
    <div>

        
    </div>
    <v-card width="1400" class="mx-auto mt-10" elevation="0">
        <v-expansion-panels multiple variant="inset">
            <v-expansion-panel v-for="item in creditors.creditors" :key="item.creditor">
                <v-expansion-panel-title expand-icon="mdi-plus" collapse-icon="mdi-minus">
                    {{ item.creditor }}
                </v-expansion-panel-title>
                <v-expansion-panel-text v-for="i in item.value" :key="i.group">
                    dal gruppo {{ i.group }} $ {{ i.money}} 
                </v-expansion-panel-text>
            </v-expansion-panel>

            <v-divider :thickness="20" class="border-opacity-0"></v-divider>

            <v-expansion-panel v-for="item in debtors.debtors" :key="item.debtor">
                <v-expansion-panel-title expand-icon="mdi-plus" collapse-icon="mdi-minus">
                    {{ item.debtors }}
                </v-expansion-panel-title>
                <v-expansion-panel-text v-for="i in item.value" :key="i.group">
                    dal gruppo {{ i.group }} $ {{ i.money}} 
                </v-expansion-panel-text>
            </v-expansion-panel>
        </v-expansion-panels>
        

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
        name: 'People',
        mounted () {
            this.getCreditorsDebtors()
        },
        data () {
            return {
                debtors: {},
                creditors: {},
            }
        },
        methods: {
            async getCreditorsDebtors () {
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