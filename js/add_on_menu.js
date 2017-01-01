(function() {
  'use strict';

  const DISPLAY_TYPES = kdm.content.getDisplayTypes();
  const getDisplayType = function(type) { return DISPLAY_TYPES[type] || type; };

  const allAddOns = _.filter(kdm.content.getItems(), "addOn");
  const getAddOnsByType = function(type) {
    let matchingAddOns;
    if (type === "all") {
      matchingAddOns = allAddOns;
    } else {
      matchingAddOns = _.filter(allAddOns, { type: type });
    }
    return _.groupBy(matchingAddOns, "type");
  };
  const groupAddOns = function(addOnType) {
    const addOnsByType = getAddOnsByType(addOnType);
    return _.flatMap(addOnsByType, function(addOns, type) {
      const newContent = _.filter(addOns, { new: true });
      const existingContent = _.filter(addOns, { new: false });
      let groups = [];

      if (!_.isEmpty(newContent)) {
        groups.push({
          title: "New " + getDisplayType(type),
          addOns: _.sortBy(newContent, 'title')
        });
      }
      if (!_.isEmpty(existingContent)) {
        groups.push({
          title: "Old " + getDisplayType(type),
          addOns: _.sortBy(existingContent, 'title')
        });
      }
      return groups;
    });
  };

  Vue.component('add-on-table-row', {
    template: `
      <tr>
        <td>{{ addOn.title }}</td>
        <td>{{ addOn.ksPrice | currency }}</td>
        <td>{{ addOn.retailPrice | currency }}</td>
        <td>{{ savings | percentage }}</td>
      </tr>
    `,
    computed: {
      savings: function() {
        if (this.addOn.retailPrice && this.addOn.ksPrice) {
          return Math.round(((this.addOn.retailPrice - this.addOn.ksPrice) / this.addOn.retailPrice) * 100);
        } else {
          return null;
        }
      }
    },
    props: ['addOn']
  });

  Vue.component('add-on-panel', {
    template: `
      <div class="panel">
        <p class="panel-heading">{{ title }}</p>
        <table class="table is-bordered is-narrow">
          <thead>
            <tr>
              <th>Name</th>
              <th>KS</th>
              <th>Retail</th>
              <th>Savings</th>
            </tr>
          </thead>
          <tfoot>
            <tr>
              <th>Name</th>
              <th>KS</th>
              <th>Retail</th>
              <th>Savings</th>
            </tr>
          </tfoot>
          <tbody>
            <add-on-table-row v-for="addOn in addOns" v-bind:addOn="addOn" />
          </tbody>
        </table>
      </div>
    `,
    props: ['title', 'addOns']
  });

  Vue.component('add-on-tables', {
    template: `
      <div class="columns">
        <div class="column is-half is-offset-one-quarter">
          <add-on-panel v-for="grouping in groupedAddOns" v-bind:title="grouping.title" v-bind:addOns="grouping.addOns" />
        </div>
      </div>
    `,
    props: ['groupedAddOns']
  });

  Vue.component('add-on-menu-navigation', {
    template: `
      <div class="tabs is-centered">
        <ul>
          <li><router-link to="/add_on_menu/all" class="nav-item is-tab">All</router-link></li>
          <li><router-link to="/add_on_menu/crossover" class="nav-item is-tab">Crossovers</router-link></li>
          <li><router-link to="/add_on_menu/expansion" class="nav-item is-tab">Expansions</router-link></li>
          <li><router-link to="/add_on_menu/extra" class="nav-item is-tab">Extras</router-link></li>
          <li><router-link to="/add_on_menu/pinup" class="nav-item is-tab">Pinups</router-link></li>
          <li><router-link to="/add_on_menu/promo" class="nav-item is-tab">Promos</router-link></li>
        </ul>
      </div>
    `
  });

  Vue.component('add-on-menu', {
    template: `
      <div class="container is-fluid">
        <add-on-menu-navigation />
        <add-on-tables v-bind:groupedAddOns="groupedAddOns" />
      </div>
    `,
    data: function() {
      return {
        groupedAddOns: groupAddOns(this.$route.params.addOnType)
      };
    },
    watch: {
      '$route': function(to, from) {
        this.groupedAddOns = groupAddOns(to.params.addOnType);
      }
    }
  });
})();
