(function() {
  'use strict';

  const router = new VueRouter({
    routes: [
      {
        path: '/calculator',
        component: Vue.component('calculator')
      },
      {
        path: '/pledge_values',
        redirect: '/pledge_values/core',
      },
      {
        path: '/pledge_values/:pledgeType',
        component: Vue.component('pledge-values')
      },
      {
        path: '/add_on_menu',
        redirect: '/add_on_menu/all'
      },
      {
        path: '/add_on_menu/:addOnType',
        component: Vue.component('add-on-menu')
      }
    ],
    linkActiveClass: 'is-active'
  });

  const app = new Vue({
    el: '#app',
    router: router
  });
})();
