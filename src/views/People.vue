<template>
    <p class="text-h2 text-left mt-5">
        Persone
    </p>
    
    <v-card width="1000" class="mx-auto mt-10" elevation="0">
        <v-expansion-panels multiple variant="inset">
            <v-expansion-panel v-for="item in creditors.creditors" :key="item.creditor">
                <v-expansion-panel-title expand-icon="mdi-plus" collapse-icon="mdi-minus">
                    <v-row>
                        <v-col>
                            {{ getUserName(item.creditor) }}
                        </v-col>
                        <v-col class="text-right">
                            {{ item.totalValue }}€
                        </v-col>
                    </v-row>
                </v-expansion-panel-title>
                <v-expansion-panel-text v-for="i in item.value" :key="i.group">
                    <v-row>
                        <v-col>
                            {{ getGroupName(i.group) }}
                        </v-col>
                        <v-col class="text-right">
                            {{ i.money}}€
                        </v-col>
                    </v-row>
                </v-expansion-panel-text>
            </v-expansion-panel>

            <v-divider :thickness="20" class="border-opacity-0"></v-divider>

            <v-expansion-panel v-for="item in debtors.debtors" :key="item.debtor">
                <v-expansion-panel-title expand-icon="mdi-plus" collapse-icon="mdi-minus">
                    <v-row>
                        <v-col>
                            {{ getUserName(item.debtors) }}
                        </v-col>
                        <v-col class="text-right">
                            {{ item.totalValue }}€
                        </v-col>
                    </v-row>
                </v-expansion-panel-title>
                <v-expansion-panel-text v-for="i in item.value" :key="i.group">
                    <v-row>
                        <v-col>
                            {{ getGroupName(i.group) }}
                        </v-col>
                        <v-col class="text-right">
                            {{ i.money}}€
                        </v-col>
                    </v-row>
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
    const GROUP_URL = API_URL + '/groups'
    const USER_URL = API_URL + '/users'

    export default {
        name: 'People',
        mounted () {
            this.getCreditorsDebtors()
        },
        data () {
            return {
                debtors: {},
                creditors: {},
                userNames: {
                    id: [],
                    name: []
                },
                groupNames: {
                    id: [],
                    name: []
                }
            }
        },
        methods: {
            orderDescending () {
                
            },
            orderAscending () {

            },
            orderAlphabetical () {

            },
            getUserName (userId) {
                for (let i = 0; i < this.userNames.id.length; i++) {
                    if (this.userNames.id[i] == userId) {
                        //console.log(this.userNames.name[i])
                        return this.userNames.name[i]
                    }
                }
            },
            getGroupName (groupId) {
                for (let i = 0; i < this.groupNames.id.length; i++) {
                    if (this.groupNames.id[i] == groupId) {
                        return this.groupNames.name[i]
                    }
                }
            },
            async fetchUserName (userId) {
                try {
                    const response = await fetch(USER_URL + "/" + userId , {
                        method: 'GET',
                        headers: {
                            "x-auth-token": userStore.token,
                        }
                    });
                    if (response.ok) {
                        const data = await response.json()
                        return data.nickname 
                    } else {
                        const errorData = await response.json();
                        console.error("response failed:", errorData.message);
                    }
                } catch (error) {
                    console.error("error: ", error);
                }
            },
            async fetchGroupName (groupId) {
                try {
                    const response = await fetch(GROUP_URL + "/" + groupId , {
                        method: 'GET',
                        headers: {
                            "x-auth-token": userStore.token,
                        }
                    });
                    if (response.ok) {
                        const data = await response.json()
                        return data.name 
                    } else {
                        const errorData = await response.json();
                        console.error("response failed:", errorData.message);
                    }
                } catch (error) {
                    console.error("error: ", error);
                }
            },
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
                        // get all the usernames of the debtors
                        for (let i = 0; i < this.debtors.debtors.length; i++) {
                            if(this.userNames.id.includes(this.debtors.debtors[i].debtors)) 
                                continue
                            this.userNames.id.push(this.debtors.debtors[i].debtors)
                            let nameuser = await this.fetchUserName(this.debtors.debtors[i].debtors)
                            this.userNames.name.push(nameuser)
                        }
                        // get all the usernames of the creditors
                        for (let i = 0; i < this.creditors.creditors.length; i++) {
                            if(this.userNames.id.includes(this.creditors.creditors[i].creditor)) 
                                continue
                            this.userNames.id.push(this.creditors.creditors[i].creditor)
                            let nameuser = await this.fetchUserName(this.creditors.creditors[i].creditor)
                            this.userNames.name.push(nameuser)
                            console.log(this.userNames.id + " - " + this.userNames.name)
                        }
                        // get all the groupnames of the debtors
                        for (let i = 0; i < this.debtors.debtors.length; i++) {
                            for (let j = 0; j < this.debtors.debtors[i].value.length; j++) {
                                if(this.groupNames.id.includes(this.debtors.debtors[i].value[j].group)) 
                                    continue
                                this.groupNames.id.push(this.debtors.debtors[i].value[j].group)
                                let namegroup = await this.fetchGroupName(this.debtors.debtors[i].value[j].group)
                                this.groupNames.name.push(namegroup)
                            }
                        }
                        // get all the groupnames of the creditors
                        for (let i = 0; i < this.creditors.creditors.length; i++) {
                            for (let j = 0; j < this.creditors.creditors[i].value.length; j++) {
                                if(this.groupNames.id.includes(this.creditors.creditors[i].value[j].group)) 
                                    continue
                                this.groupNames.id.push(this.creditors.creditors[i].value[j].group)
                                let namegroup = await this.fetchGroupName(this.creditors.creditors[i].value[j].group)
                                this.groupNames.name.push(namegroup)
                            }
                        }
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