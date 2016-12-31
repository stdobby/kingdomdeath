(function() {
  'use strict';

  const router = new VueRouter({
    routes: [
      {
        path: '/pledge_values',
        redirect: '/pledge_values/core_game'
      },
      {
        path: '/pledge_values/core_game',
        component: Vue.component('pledge-values-core-game')
      },
      {
        path: '/pledge_values/update_pack',
        component: Vue.component('pledge-values-update-pack')
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
