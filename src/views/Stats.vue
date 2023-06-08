<template>
    <div>
        <canvas id="myChart"></canvas>
    </div>
</template>
  
<script>
import { Pie, mixins } from 'vue-chartjs';
import { useUserStore } from '@/stores/user-store';

const userStore = useUserStore()
const HOST = import.meta.env.VITE_APP_API_HOST || 'http://localhost:3001'
const API_URL = HOST + '/api/v1'
const id = userStore.id
const GET_OUT_URL = API_URL + '/users/' + id + '/outgoings'


export default {
    extends: Pie,
    mixins: [mixins.reactiveProp],
    props: ['options'],
    mounted() {
        this.fetchData();
    },
    methods: {
        async fetchData() {
            const response = await fetch(GET_OUT_URL, {
                method: 'GET',
                headers: {
                    'x-auth-token': userStore.token,
                },
            });
            if (response.status == 200) {
                const data = await response.json();
                const labels = data.map((item) => item.tag);
                const values = data.map((item) => item.value);
                this.chartData = {
                    labels,
                    datasets: [
                        {
                            backgroundColor: this.getRandomColors(data.length),
                            data: values,
                        },
                    ],
                };

                this.renderChart(this.chartData, this.options);
            }
        },
        getRandomColors(length) {
            const colors = [];
            for (let i = 0; i < length; i++) {
                const color = '#' + Math.floor(Math.random() * 16777215).toString(16);
                colors.push(color);
            }
            return colors;
        },
    },
};
</script>
  
<style scoped>
#myChart {
    max-width: 600px;
    margin: 0 auto;
}
</style>
  