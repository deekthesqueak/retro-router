import Vue from 'vue';
import Router from 'vue-router';
import Plasma from './views/Plasma.vue';
import Capture from './views/Capture.vue';
import Crt from './views/Crt.vue';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/plasma',
      name: 'plasma',
      component: Plasma,
    },
    {
      path: '/capture',
      name: 'capture',
      component: Capture,
    },
    {
      path: '/crt',
      name: 'crt',
      component: Crt,
    },
  ],
});
