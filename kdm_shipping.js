(function(window) {
  'use strict';

  const CORE_SHIPPING_COSTS = {
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

  function KdmShippingCalculator() {

  }

  KdmShippingCalculator.prototype.getRegions = function() {
    return Object.keys(CORE_SHIPPING_COSTS);
  };

  KdmShippingCalculator.prototype.calculateShippingForRegion = function(region, items) {
    var self = this;
    var itemsByWave = _.groupBy(items, 'wave');

    return _.mapValues(itemsByWave, function(itemsInWave) {
      return self.calculateShippingForItemsInWave(region, itemsInWave);
    });
  };

  KdmShippingCalculator.prototype.calculateShippingForItemsInWave = function(region, items) {
    var coresTotal = this.calculateShippingForCoreGames(region, items);
    var expansionsTotal = this.calculateShippingForExpansions(region, items);
    var otherContentTotal = this.calculateShippingForOtherContent(region, items);

    return coresTotal + expansionsTotal + otherContentTotal;
  };

  KdmShippingCalculator.prototype.calculateShippingForCoreGames = function(region, items) {
    var cores = items.filter(function(item) { return item.contentType.type === 'Core Game'; });
    return cores.reduce(function(total, item) {
      return total + CORE_SHIPPING_COSTS[region][item.title];
    }, 0);
  };

  KdmShippingCalculator.prototype.calculateShippingForExpansions = function(region, items) {
    var startingExpansionCost = EXPANSIONS_SHIPPING_COSTS[region]['Base'] - EXPANSIONS_SHIPPING_COSTS[region]['Additional'];
    var expansions = items.filter(function(item) { return item.contentType.type === 'Expansion'; });
    return expansions.length ? expansions.reduce(function(total, item) {
      return total + EXPANSIONS_SHIPPING_COSTS[region]['Additional'];
    }, startingExpansionCost) : 0;
  };

  KdmShippingCalculator.prototype.calculateShippingForOtherContent = function(region, items) {
    var startingOtherContentCost = OTHER_SHIPPING_COSTS[region]['Base'] - OTHER_SHIPPING_COSTS[region]['Additional'];
    var otherContent = items.filter(function(item) { return item.contentType.type !== 'Expansion' && item.contentType.type !== 'Core Game'; });
    return otherContent.length ? otherContent.reduce(function(total, item) {
      return total + OTHER_SHIPPING_COSTS[region]['Additional'];
    }, startingOtherContentCost) : 0;
  };

  window.KdmShippingCalculator = KdmShippingCalculator;
})(window);
