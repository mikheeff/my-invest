import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';
import Portfolio from '../views/Portfolio.vue';

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Portfolio',
    component: Portfolio,
  },
];

const router = new VueRouter({
  routes,
});

export default router;
