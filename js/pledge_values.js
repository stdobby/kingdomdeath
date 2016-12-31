(function() {
  'use strict';

  const pledges = kdm.content.getPledges();
  const isPledgeType = function(pledgeType) {
    return function(pledge) {
      return pledge.pledgeType === pledgeType;
    };
  };

  Vue.component('pledge-components', {
    template: `
      <div class="tile is-child panel">
        <p class="panel-heading">{{ pledge.pledgeLevel }} - {{ pledge.pledgePrice | currency }}</p>
      </div>
    `,
    props: ['pledge']
  });

  Vue.component('pledge-value-breakdown-row', {
    template: `
      <tr>
        <td>{{ pledge.pledgeLevel }}</td>
        <td>{{ pledge.pledgePrice | currency }}</td>
        <td>{{ pledge.gamersValue | currency }}</td>
        <td>{{ pledge.ksValue | currency }}</td>
      </tr>
    `,
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
      <div class="container is-fluid">
        <div class="tabs is-centered">
          <ul>
            <li><router-link to="/pledge_values/core" class="nav-item is-tab">Core Game</router-link></li>
            <li><router-link to="/pledge_values/update" class="nav-item is-tab">Update Pack</router-link></li>
          </ul>
        </div>
        <div class="tile is-ancestor">
          <div class="tile is-4 is-parent">
            <pledge-value-breakdown v-bind:pledges="pledges" />
          </div>
          <div class="tile is-vertical is-parent">
            <pledge-components v-for="pledge in pledges" v-bind:pledge="pledge" />
          </div>
        </div>
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
