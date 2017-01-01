(function() {
  'use strict';

  const items = kdm.content.getItems();
  const pledges = kdm.content.getPledges();
  const isPledgeType = function(pledgeType) {
    return function(pledge) {
      return pledge.pledgeType === pledgeType;
    };
  };

  pledges.forEach(function(pledge) {
    pledge.items = items.filter(pledge.contains || function() { return false; });
  });

  Vue.component('pledge-components-row', {
    template: `
      <tr>
        <td>{{ item.title }}</td>
        <td>{{ item.new | boolean }}</td>
        <td>{{ item.type | capitalize }}</td>
        <td>{{ item.pureGameplay | boolean }}</td>
        <td>{{ item.ksPrice | currency }}</td>
      </tr>
    `,
    props: ['item']
  });

  Vue.component('pledge-components', {
    template: `
      <div class="tile is-child panel">
        <p class="panel-heading">{{ pledge.pledgeLevel }} - {{ pledge.pledgePrice | currency }}</p>
        <table class="table is-bordered is-narrow">
          <thead>
            <tr>
              <th>Item</th>
              <th>New</th>
              <th>Type</th>
              <th>Pure Gameplay</th>
              <th>KS Price</th>
            </tr>
          </thead>
          <tfoot>
            <tr>
              <th>Item</th>
              <th>New</th>
              <th>Type</th>
              <th>Pure Gameplay</th>
              <th>KS Price</th>
            </tr>
          </tfoot>
          <tbody>
            <pledge-components-row v-for="item in pledge.items" v-bind:item="item" />
          </tbody>
        </table>
      </div>
    `,
    props: ['pledge']
  });

  Vue.component('pledge-value-breakdown-row', {
    template: `
      <tr>
        <td>{{ pledge.pledgeLevel }}</td>
        <td>{{ pledge.pledgePrice | currency }}</td>
        <td>{{ gamersValue | currency }}</td>
        <td>{{ ksValue | currency }}</td>
      </tr>
    `,
    computed: {
      gamersValue: function() {
        const pureGameplayItems = _.filter(this.pledge.items, 'pureGameplay');
        return pureGameplayItems.reduce(function(value, item) {
          return value + item.ksPrice;
        }, 0);
      },
      ksValue: function() {
        return this.pledge.items.reduce(function(value, item) {
          return value + item.ksPrice;
        }, 0);
      }
    },
    props: ['pledge']
  });

  Vue.component('pledge-value-breakdown', {
    template: `
      <div class="tile is-child panel">
        <p class="panel-heading">Breakdown</p>
        <table class="table is-bordered is-narrow">
          <thead>
            <tr>
              <th>Pledge Level</th>
              <th>Pledge</th>
              <th>Gamer's</th>
              <th>KS</th>
            </tr>
          </thead>
          <tfoot>
            <tr>
              <th>Pledge Level</th>
              <th>Pledge</th>
              <th>Gamer's</th>
              <th>KS</th>
            </tr>
          </tfoot>
          <tbody>
            <pledge-value-breakdown-row v-for="pledge in pledges" v-bind:pledge="pledge" />
          </tbody>
        </table>
      </div>
    `,
    props: ['pledges']
  });

  Vue.component('pledge-values-content', {
    template: `
      <div class="tile is-ancestor">
        <div class="tile is-5 is-parent">
          <pledge-value-breakdown v-bind:pledges="pledges" />
        </div>
        <div class="tile is-vertical is-parent">
          <pledge-components v-for="pledge in pledges" v-bind:pledge="pledge" />
        </div>
      </div>
    `,
    props: ['pledges']
  });

  Vue.component('pledge-values-navigation', {
    template: `
      <div class="tabs is-centered">
        <ul>
          <li><router-link to="/pledge_values/core" class="nav-item is-tab">Core Game</router-link></li>
          <li><router-link to="/pledge_values/update" class="nav-item is-tab">Update Pack</router-link></li>
        </ul>
      </div>
    `
  });

  Vue.component('pledge-values', {
    template: `
      <div class="container is-fluid">
        <pledge-values-navigation />
        <pledge-values-content v-bind:pledges="pledges" />
      </div>
    `,
    data: function() {
      return {
        pledges: pledges.filter(isPledgeType(this.$route.params.pledgeType))
      };
    },
    watch: {
      '$route': function(to, from) {
        this.pledges = pledges.filter(isPledgeType(to.params.pledgeType));
      }
    }
  });
})();
