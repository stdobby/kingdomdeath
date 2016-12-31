(function() {
  'use strict';

  const router = new VueRouter({
    routes: [
      {
        path: '/pledge_values',
        redirect: '/pledge_values/core',
      },
      {
        path: '/pledge_values/:pledgeType',
        component: Vue.component('pledge-values-content')
      },
      {
        path: '/add_on_menu',
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
