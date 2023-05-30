<template>
<<<<<<< HEAD
    <h1>Sommario</h1>
    <v-card width="1200" class="mx-auto mt-10">
        <v-table class="text-center">
            <thead class="text-center">
                <tr>
                    <th>Credits</th>
                    <th>Total</th>
                    <th>Debits</th>
                </tr>
                <tr>
                    <td v-for="item in credits" :key="item.sum">{{ item.sum }}</td>
                    <td v-for="item in total" :key="item.sum">{{ item.sum }}</td>
                    <td v-for="item in debits" :key="item.sum">{{ item.sum }}</td>
                </tr>
                <v-divider></v-divider>
            </thead>
            <tbody class="text-center">
                <tr> 
                    <td>
                        CARLO VERDI: 5
                        <ul>Mikonos: 2.16</ul>
                        <ul>Cenone: 1.84</ul>
                        <ul>Squadra: 1</ul>
                        <v-divider></v-divider>
                        GIANNI: 9
                        <ul>Appartamento: 9</ul>
                    </td>
                    <td></td>
                    <td>
                        GIUSEPPE: 29
                        <ul>Mikonos: 29</ul>
                        <v-divider></v-divider>
                        Cristiano: 7
                        <ul>Appartamento: 7</ul>
                    </td>
                </tr>
                <tr>
                    <td>
                        <template v-for="credit in credits">
                            <div v-for="spesa in credit.spese" :key="spesa.nome">
                                {{ spesa.nome }}: {{ spesa.importo }}
                                <ul>
                                    <li v-for="gruppo in spesa.gruppi" :key="gruppo.nome">
                                        {{ gruppo.nome }}: {{ gruppo.importo }}
                                    </li>
                                </ul>
                                <v-divider></v-divider>
                            </div>
                        </template>
                    </td>
                    <td>
                        <template v-for="t in total">
                            {{ t.empty }}
                        </template>
                    </td>
                    <td>
                        <template v-for="debit in debits">
                            <div v-for="spesa in debit.spese" :key="spesa.nome">
                                {{ spesa.nome }}: {{ spesa.importo }}
                                <ul>
                                    <li v-for="gruppo in spesa.gruppi" :key="gruppo.nome">
                                        {{ gruppo.nome }}: {{ gruppo.importo }}
                                    </li>
                                </ul>
                                <v-divider></v-divider>
                            </div>
                        </template>
                    </td>
                </tr>  
            </tbody>
        </v-table>
    </v-card>
=======
    Benvenuto nella home
>>>>>>> main
</template>

<script>
    export default {
        data () {
            return {
                credits:[
                    {
                        sum: 14,
                        spese:[
                            {
                                nome: 'Carlo Verdi',
                                importo: 5,
                                gruppi:[
                                    {
                                        nome: 'Mikonos',
                                        importo: 2.16
                                    },
                                    {
                                        nome: 'Cenone',
                                        importo: 1.84
                                    },
                                    {
                                        nome: 'Squadra',
                                        importo: 1
                                    }
                                ]
                            },
                            {
                                nome: 'Gianni',
                                importo: 9,
                                gruppi:[
                                    {
                                        nome: 'Appartamento',
                                        importo: 9
                                    }
                                ]
                            }
                        ]
                    }
                ],
                total:[
                    {
                        sum: 22,
                        empty: ''
                    }
                ],
                debits:[
                    {
                        sum: 36,
                        spese:[
                            {
                                nome: 'giuseppe',
                                importo: 29,
                                gruppi:[
                                    {
                                        nome: 'Mikonos',
                                        importo: 29
                                    }
                                ]
                            },
                            {
                                nome: 'Cristiano',
                                importo: 7,
                                gruppi:[
                                    {
                                        nome: 'Appartamento',
                                        importo: 7
                                    }
                                ]
                            }
                        ]
                    }
                ],
            }
        },
    }
</script>