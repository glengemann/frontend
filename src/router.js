/* eslint-disable import/no-extraneous-dependencies */
import Vue from 'vue';
import Router from 'vue-router';

import App from './App.vue';
import ExploreHomer from './ExploreHomer.vue';
import ExploreLaertious from './ExploreLaertious.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: '',
  routes: [
    { path: '/', component: App, name: 'home' },
    { path: '/explore-homer/:urn?', component: ExploreHomer, name: 'reader' },
    {
      path: '/explore-laertious/:urn?',
      component: ExploreLaertious,
      name: 'reader-laertius',
    },
  ],
});
