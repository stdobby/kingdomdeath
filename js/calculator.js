(function() {
  'use strict';

  const items = kdm.content.getItems();
  const pledges = kdm.content.getPledges();

  pledges.forEach(function(pledge) {
    pledge.items = items.filter(pledge.contains || function() { return false; });
  });

  const shippingWave = function(wave) {
    return function(item) {
      return item.shippingWave === wave;
    };
  };

  const MAIN_SHIPPING_COSTS = {
    "United States": {
      "1.5 Core Game": 25,
      "1.5 Update Pack": 10
    },

    "European Union": {
      "1.5 Core Game": 40,
      "1.5 Update Pack": 20
    },

    "Canada": {
      "1.5 Core Game": 30,
      "1.5 Update Pack": 15
    },

    "Australia": {
      "1.5 Core Game": 40,
      "1.5 Update Pack": 20
    },

    "New Zealand": {
      "1.5 Core Game": 40,
      "1.5 Update Pack": 20
    },

    "Rest of the World": {
      "1.5 Core Game": 100,
      "1.5 Update Pack": 30
    }
  };

  const EXPANSIONS_SHIPPING_COSTS = {
    "United States": {
      "Base": 15,
      "Additional": 3
    },

    "European Union": {
      "Base": 15,
      "Additional": 3
    },

    "Canada": {
      "Base": 15,
      "Additional": 3
    },

    "Australia": {
      "Base": 15,
      "Additional": 3
    },

    "New Zealand": {
      "Base": 15,
      "Additional": 3
    },

    "Rest of the World": {
      "Base": 30,
      "Additional": 3
    }
  };

  const OTHER_SHIPPING_COSTS = {
    "United States": {
      "Base": 20,
      "Additional": 2
    },

    "European Union": {
      "Base": 20,
      "Additional": 2
    },

    "Canada": {
      "Base": 20,
      "Additional": 2
    },

    "Australia": {
      "Base": 20,
      "Additional": 2
    },

    "New Zealand": {
      "Base": 20,
      "Additional": 2
    },

    "Rest of the World": {
      "Base": 30,
      "Additional": 2
    }
  };

  var eventBus = new Vue();

  Vue.component('calculator-add-ons', {
    template: `
      <div class="tile is-parent">
        <div class="tile is-child panel">
          <p class="panel-heading has-text-centered">Add-On Options</p>
        </div>
      </div>
    `
  });

  Vue.component('calculator-totals', {
    template: `
      <div class="tile is-child panel">
        <p class="panel-heading has-text-centered">Totals</p>
        <table class="table is-bordered is-narrow">
          <tbody>
            <tr>
              <th>Kickstarter</th>
              <td>\${{ pledgePrice }}</td>
              <td></td>
            </tr>
            <tr>
              <td colspan="3"></td>
            </tr>
            <tr>
              <th>Wave 1 Shipping (2017)</th>
              <td>\${{ shippingWaveOneTotal }}</td>
              <td>{{ shippingWaveOneItemsCount }}</td>
            </tr>
            <tr>
              <th>Wave 2 Shipping (2017)</th>
              <td>\${{ shippingWaveTwoTotal }}</td>
              <td>{{ shippingWaveTwoItemsCount }}</td>
            </tr>
            <tr>
              <th>Wave 3 Shipping (2018)</th>
              <td>\${{ shippingWaveThreeTotal }}</td>
              <td>{{ shippingWaveThreeItemsCount }}</td>
            </tr>
            <tr>
              <th>Wave 4 Shipping (2019)</th>
              <td>\${{ shippingWaveFourTotal }}</td>
              <td>{{ shippingWaveFourItemsCount }}</td>
            </tr>
            <tr>
              <th>Wave 5 Shipping (2020)</th>
              <td>\${{ shippingWaveFiveTotal }}</td>
              <td>{{ shippingWaveFiveItemsCount }}</td>
            </tr>
            <tr>
              <td colspan="3"></td>
            </tr>
            <tr>
              <th>Shipping Subtotal</th>
              <td>\${{ shippingSubtotal }}</td>
            </tr>
            <tr>
              <td colspan="3"></td>
            </tr>
            <tr>
              <th>Total</th>
              <td>\${{ total }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    `,
    data: function() {
      return {
        pledge: null,
        shippingOption: null
      };
    },
    computed: {
      pledgePrice: function() {
        return this.pledge ? this.pledge.pledgePrice : 0;
      },
      shippingWaveOneItemsCount: function() {
        var numberOfItems = this.pledge ? this.pledge.items.filter(shippingWave(1)).length : 0;
        return numberOfItems + (numberOfItems === 1 ? ' Item' : ' Items');
      },
      shippingWaveTwoItemsCount: function() {
        var numberOfItems = this.pledge ? this.pledge.items.filter(shippingWave(2)).length : 0;
        return numberOfItems + (numberOfItems === 1 ? ' Item' : ' Items');
      },
      shippingWaveThreeItemsCount: function() {
        var numberOfItems = this.pledge ? this.pledge.items.filter(shippingWave(3)).length : 0;
        return numberOfItems + (numberOfItems === 1 ? ' Item' : ' Items');
      },
      shippingWaveFourItemsCount: function() {
        var numberOfItems = this.pledge ? this.pledge.items.filter(shippingWave(4)).length : 0;
        return numberOfItems + (numberOfItems === 1 ? ' Item' : ' Items');
      },
      shippingWaveFiveItemsCount: function() {
        var numberOfItems = this.pledge ? this.pledge.items.filter(shippingWave(5)).length : 0;
        return numberOfItems + (numberOfItems === 1 ? ' Item' : ' Items');
      },
      shippingWaveOneTotal: function() {
        var self = this;
        var items = this.pledge ? this.pledge.items.filter(shippingWave(1)) : [];
        var shippingCosts = MAIN_SHIPPING_COSTS[self.shippingOption] || null;
        return items.reduce(function(total, item) {
          return total + (shippingCosts && shippingCosts[item.title] ? shippingCosts[item.title] : 0);
        }, 0);
      },
      shippingWaveTwoTotal: function() {
        var self = this;
        var items = this.pledge ? this.pledge.items.filter(shippingWave(2)) : [];
        var shippingCosts = EXPANSIONS_SHIPPING_COSTS[self.shippingOption] || null;
        var startingCost = (shippingCosts && items.length > 0 ? shippingCosts['Base'] - shippingCosts['Additional'] : 0);
        return items.reduce(function(total, item) {
          return total + (shippingCosts ? shippingCosts['Additional'] : 0);
        }, startingCost);
      },
      shippingWaveThreeTotal: function() {
        var self = this;
        var items = this.pledge ? this.pledge.items.filter(shippingWave(3)) : [];
        console.log(_.map(items, 'title').sort());
        var shippingCosts = OTHER_SHIPPING_COSTS[self.shippingOption] || null;
        var startingCost = (shippingCosts && items.length > 0 ? shippingCosts['Base'] - shippingCosts['Additional'] : 0);
        return items.reduce(function(total, item) {
          return total + (shippingCosts ? shippingCosts['Additional'] : 0);
        }, startingCost);
      },
      shippingWaveFourTotal: function() {
        var self = this;
        var items = this.pledge ? this.pledge.items.filter(shippingWave(4)) : [];
        var shippingCosts = EXPANSIONS_SHIPPING_COSTS[self.shippingOption] || null;
        var startingCost = (shippingCosts && items.length > 0 ? shippingCosts['Base'] - shippingCosts['Additional'] : 0);
        return items.reduce(function(total, item) {
          return total + (shippingCosts ? shippingCosts['Additional'] : 0);
        }, startingCost);
      },
      shippingWaveFiveTotal: function() {
        return 0;
      },
      shippingSubtotal: function() {
        return this.shippingWaveOneTotal + this.shippingWaveTwoTotal + this.shippingWaveThreeTotal + this.shippingWaveFourTotal + this.shippingWaveFiveTotal;
      },
      total: function() {
        return this.pledgePrice + this.shippingSubtotal;
      }
    },
    created: function() {
      var self = this;
      eventBus.$on('pledge-changed', function(pledgeLevel) {
        self.pledge = _.find(pledges, { pledgeLevel: pledgeLevel });
      });
      eventBus.$on('shipping-option-changed', function(shippingOption) {
        self.shippingOption = shippingOption;
      });
    }
  });

  Vue.component('calculator-pledge-shipping', {
    template: `
      <div class="tile is-child panel">
        <p class="panel-heading has-text-centered">Pledge & Shipping Options</p>
        <div class="control is-horizontal">
          <div class="control-label">
            <label class="label">Pledge</label>
          </div>
          <div class="control">
            <span class="select is-fullwidth">
              <select v-on:change="notifyPledgeChange" v-model="selectedPledge">
                <option v-for="pledge in pledges" v-bind:value="pledge.pledgeLevel">{{ pledge.pledgeLevel }} - {{ pledge.pledgePrice | currency }}</option>
              </select>
            </span>
          </div>
        </div>
        <div class="control is-horizontal">
          <div class="control-label">
            <label class="label">Shipping</label>
          </div>
          <div class="control">
            <span class="select is-fullwidth">
              <select v-on:change="notifyShippingOptionChange" v-model="selectedShippingOption">
                <option v-for="shippingOption in shippingOptions" v-bind:value="shippingOption">{{ shippingOption }}</option>
              </select>
            </span>
          </div>
        </div>
      </div>
    `,
    data: function() {
      return {
        pledges: pledges,
        shippingOptions: _.keys(MAIN_SHIPPING_COSTS),
        selectedPledge: null,
        selectedShippingOption: null
      };
    },
    methods: {
      notifyPledgeChange: function() {
        eventBus.$emit('pledge-changed', this.selectedPledge);
      },
      notifyShippingOptionChange: function() {
        eventBus.$emit('shipping-option-changed', this.selectedShippingOption);
      }
    }
  });

  Vue.component('calculator', {
    template: `
      <div class="container is-fluid">
        <div class="tile is-ancestor">
          <div class="tile is-vertical is-4">
            <div class="tile is-parent">
              <calculator-pledge-shipping />
            </div>
            <div class="tile is-parent">
              <calculator-totals />
            </div>
          </div>

          <div class="tile is-vertical is-8">
            <calculator-add-ons />
          </div>
        </div>
      </div>
    `
  });
})();
