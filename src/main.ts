import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import VueApexCharts from 'vue3-apexcharts';

import './assets/main.css';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

import StepsCard from './components/StepsCard.vue';
import UserCard from './components/UserCard.vue';

library.add(fas);

const app = createApp(App);

app.use(router);
app.use(VueApexCharts);
app.component('font-awesome-icon', FontAwesomeIcon);
app.component('StepsCard', StepsCard);
app.component('UserCard', UserCard);

app.mount('#app');
