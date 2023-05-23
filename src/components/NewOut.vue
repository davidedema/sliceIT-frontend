<template>
    <v-row justify="center">
        <v-dialog v-model="dialog" persistent width="1024">
            <template v-slot:activator="{ props }">
                <v-btn color="primary" auto v-bind="props">
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
                                <v-autocomplete label="Partecipanti*" :items="['Mario', 'Bepi', 'Pino', 'Gigi']" multiple
                                    required></v-autocomplete>
                            </v-col>
                            <v-col cols="12" sm="6" md="6">
                                <v-row>
                                    <v-col cols="12" sm="6" md="6">
                                        <!-- NOME PARTECIPANE -->
                                    </v-col>
                                    <v-col cols="12" sm="6" md="6">
                                        <!-- IMPORTO DA PAGARE -->
                                        <v-text-field label="Data*" hint="Inserire data" required></v-text-field>
                                    </v-col>
                                </v-row>
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
                    <v-btn color="blue-darken-1" variant="text" @click="dialog = false">
                        Crea
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-row>
</template>

<script>
export default {
    data: () => ({
        dialog: false,
        isPeriodic: false,
    }),
    methods: {
        setPeriodic() {
            this.isPeriodic = !this.isPeriodic;
            console.log(this.isPeriodic);
        }
    }
}

</script>