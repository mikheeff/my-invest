import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';
import PortfolioOverview from '../views/PortfolioOverview.vue';

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Portfolio',
    component: PortfolioOverview,
  },
];

const router = new VueRouter({
  routes,
});

export default router;
