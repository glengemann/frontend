import {createRouter, createWebHistory} from 'vue-router';
import Explorer from './components/Explorer.vue';

const routes = [
  {
    path: '/',
    redirect: to => {
      return {
        name: 'reader',
        params: {
          urn: 'urn:cts:greekLit:tlg0012.tlg001.perseus-eng3:12.80-12.230'
        },
      };
    },
  },
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
