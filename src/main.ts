import axios from 'axios';
import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import '@/styles/styles.scss';

Vue.config.productionTip = false;

axios.defaults.headers.common.Authorization = `Bearer ${process.env.VUE_APP_TOKEN}`;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
