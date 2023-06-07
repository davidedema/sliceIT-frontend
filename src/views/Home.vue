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
                            $ +19.64
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
                        <p class="text-h2 text-center">
                            $ -35.36
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
                            $ -55.00
                        </p>
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>

        <v-divider :thickness="20" class="border-opacity-2"></v-divider>

        <v-row>
            <v-col cols="4">
                <v-card elevation="0">
                    <v-card-title>
                        <p class="text-h5 text-right">
                            Carlo Verdi $ 5.00
                        </p>
                    </v-card-title>
                    <v-card-text>
                        <p class="text-body-1 text-right">
                            dal gruppo Mikonos $ 2.16 
                        </p>
                        <p class="text-body-1 text-right">
                            dal gruppo Cenone $ 1.84
                        </p>
                        <p class="text-body-1 text-right">
                            dal gruppo Squadra $ 1.00 
                        </p>
                    </v-card-text>
                </v-card>
            </v-col>
            <v-col cols="4">
                <!-- colonna totale vuota -->
            </v-col>
            <v-col  cols="4">
                <v-card elevation="0">
                    <v-card-title>
                        <p class="text-h5 text-left">
                            Giuseppe B... $ 29.36
                        </p>
                    </v-card-title>
                    <v-card-text>
                        <p class="text-body-1 text-left">
                            dal gruppo Mikonos $ 29.36 
                        </p>
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
    </v-card>
</template>

<script>
    
</script>