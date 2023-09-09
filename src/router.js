import {createRouter, createWebHistory} from 'vue-router';
import Explorer from './components/Explorer.vue';

const routes = [
  {
    path: '/reader/:urn',
    component: Explorer,
    name: 'reader',
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
