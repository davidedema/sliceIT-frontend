<template>
    <Pie :options="chartOptions" :data="chartData" />
</template>
  
<script>
import { Pie } from 'vue-chartjs'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { useUserStore } from "@/stores/user-store";

ChartJS.register(ArcElement, Tooltip, Legend)

const userStore = useUserStore();
const HOST = import.meta.env.VITE_APP_API_HOST || 'http://localhost:3001'
const API_URL = HOST + '/api/v1'
const OUTGOINGS_URL = API_URL + '/users/' + userStore.id + '/outgoings'

export default {
    mounted() {
        this.createDataSet();
    },
    name: 'BarChart',
    components: { Pie },
    data() {
        return {
            chartData: null,
            chartData: {
                labels: ['Spesa', 'Casa', 'Svago', 'Altro'],
                datasets: [
                    {
                        backgroundColor: ['#41B883', '#E46651', '#00D8FF', '#DD1B16'],
                        data: [0, 0, 0, 0]
                    }
                ]
            },
            chartOptions: {
                responsive: true,
                maintainAspectRatio: false
            }
        }
    },
    methods: {
        async createDataSet() {
            let spesa1 = 0;
            let casa1 = 0;
            let svago1 = 0;
            let altro1 = 0;
            
            const response = await fetch(OUTGOINGS_URL, {
                method: "GET",
                headers: {
                    "x-auth-token": userStore.token,
                },
            });
            if (response.status == 200) {
                const data = await response.json();
                data.forEach(function (spesa) {
                    if (spesa.tag == 'Spesa') {
                        spesa1 += spesa.value;
                    }
                    if (spesa.tag == 'Casa') {
                        casa1 += spesa.value;
                    }
                    if (spesa.tag == 'Svago') {
                        svago1 += spesa.value;
                    }
                    if (spesa.tag == 'Altro') {
                        altro1 += spesa.value;
                    }
                })
                this.chartData = {
                    labels: ['Spesa', 'Casa', 'Svago', 'Altro'],
                    datasets: [
                        {
                            backgroundColor: ['#41B883', '#E46651', '#00D8FF', '#DD1B16'],
                            data: [spesa1, casa1, svago1, altro1]
                        }
                    ]
                }
            } else {
                alert('Dati non caricati')
            }
        }
    }
}
</script>
  