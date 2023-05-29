<template>
    <v-container>
        <v-row justify="center">
            <v-col cols="12" sm="6" md="3">
                <v-card>
                    <v-card-title>Profilo</v-card-title>

                    <v-img :width="300" aspect-ratio="16/9" cover
                        src="https://cdn.vuetifyjs.com/images/parallax/material.jpg"></v-img>
                    <v-card-item>
                        <v-divider></v-divider>
                    </v-card-item>

                    <v-card-item>
                        <v-card-subtitle> Email </v-card-subtitle>
                        <v-card-text> prova@example.com </v-card-text>
                    </v-card-item>
                    <v-card-item>
                        <v-card-subtitle> Nickname </v-card-subtitle>
                        <v-card-text> test123 </v-card-text>
                    </v-card-item>
                    <v-card-item>
                        <v-card-subtitle> Password </v-card-subtitle>
                        <v-card-text> *********** </v-card-text>
                    </v-card-item>
                    <v-card-item></v-card-item>
                    <v-card-item>
                        <v-card-subtitle> Nome </v-card-subtitle>
                        <v-card-text> Mario </v-card-text>
                    </v-card-item>
                    <v-card-item>
                        <v-card-subtitle> Cognome </v-card-subtitle>
                        <v-card-text> Rossi </v-card-text>
                    </v-card-item>
                    <v-divider></v-divider>
                    <v-card-item>
                        <v-card-actions>
                            <v-btn>
                                Modifica
                            </v-btn>
                        </v-card-actions>
                    </v-card-item>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>

</script>