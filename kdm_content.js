(function(global) {
  'use strict';

  const CONTENT_TYPES = {
    MAIN_COMPONENT: {
      type: 'Main Component',
      new: true
    },
    NEW_EXPANSION: {
      type: 'Expansion',
      new: true
    },
    NEW_EXTRA: {
      type: 'Extra',
      new: true
    },
    NEW_PINUP: {
      type: 'Pinup',
      new: true
    },
    NEW_PROMO: {
      type: 'Promo',
      new: true
    },
    OLD_EXPANSION: {
      type: 'Expansion',
      new: false
    },
    OLD_EXTRA: {
      type: 'Extra',
      new: false
    },
    OLD_PINUP: {
      type: 'Pinup',
      new: false
    },
    OLD_PROMO: {
      type: 'Promo',
      new: false
    }
  };

  const PLEDGES = [
    {
      title: "Add-On's Only",
      price: 5,
      getApplicableItems: function(items) {
        return [];
      }
    },
    {
      title: "Lantern Upgrade",
      price: 60,
      getApplicableItems: function(items) {
        return items.filter(function(item) {
          return item.title === "1.5 Update Pack";
        });
      }
    },
    {
      title: "Silver Lantern",
      price: 195,
      getApplicableItems: function(items) {
        var titles = ["1.5 Update Pack", "Gambler's Chest", "The First Hero Expansion"]
        return items.filter(function(item) {
          return _.includes(titles, item.title);
        });
      }
    },
    {
      title: "Lantern",
      price: 250,
      getApplicableItems: function(items) {
        return items.filter(function(item) {
          return item.title === "1.5 Core Game";
        });
      }
    },
    {
      title: "Gold Lantern",
      price: 350,
      getApplicableItems: function(items) {
        var titles = ["1.5 Core Game", "Gambler's Chest"]
        return items.filter(function(item) {
          return _.includes(titles, item.title);
        });
      }
    },
    {
      title: "Ancient Gold Lantern",
      price: 750,
      getApplicableItems: function(items) {
        var titles = ["1.5 Core Game", "Gambler's Chest"]
        return items.filter(function(item) {
          return _.includes(titles, item.title) || (item.contentType.type === 'Expansion' && !item.contentType.new);
        });
      }
    },
    {
      title: "Retail Lantern",
      price: 1200,
      getApplicableItems: function(items) {
        var coreGame = _.find(items, function(item) { return item.title === "1.5 Core Game"; });
        var items = [];
        for (var i = 0; i < 6; i++) {
          items.push(coreGame);
        }
        return items;
      }
    },
    {
      title: "Black Friday Lantern Upgrade",
      price: 50,
      getApplicableItems: function(items) {
        return items.filter(function(item) {
          return item.title === "1.5 Update Pack";
        });
      }
    },
    {
      title: "Black Friday Silver Lantern",
      price: 185,
      getApplicableItems: function(items) {
        var titles = ["1.5 Update Pack", "Gambler's Chest", "The First Hero Expansion"]
        return items.filter(function(item) {
          return _.includes(titles, item.title);
        });
      }
    },
    {
      title: "Black Friday Lantern",
      price: 200,
      getApplicableItems: function(items) {
        return items.filter(function(item) {
          return item.title === "1.5 Core Game";
        });
      }
    },
    {
      title: "Black Friday Gold Lantern",
      price: 300,
      getApplicableItems: function(items) {
        var titles = ["1.5 Core Game", "Gambler's Chest"]
        return items.filter(function(item) {
          return _.includes(titles, item.title);
        });
      }
    },
    {
      title: "Black Friday Gambler's Lantern",
      price: 777,
      getApplicableItems: function(items) {
        var titles = ["1.5 Update Pack", "Gambler's Chest"]
        var types = ['Expansion', 'Pinup', 'Promo'];
        return items.filter(function(item) {
          return _.includes(titles, item.title) || (item.contentType.new && _.includes(types, item.contentType.type));
        });
      }
    },
    {
      title: "Black Friday Gambler's Lantern 2nd Face",
      price: 927,
      getApplicableItems: function(items) {
        var titles = ["1.5 Core Game", "Gambler's Chest"]
        var types = ['Expansion', 'Pinup', 'Promo'];
        return items.filter(function(item) {
          return _.includes(titles, item.title) || (item.contentType.new && _.includes(types, item.contentType.type));
        });
      }
    },
    {
      title: "Satan's Lantern",
      price: 1666,
      getApplicableItems: function(items) {
        var titles = ["1.5 Core Game", "Gambler's Chest"]
        var types = ['Expansion', 'Pinup', 'Promo'];
        return items.filter(function(item) {
          return _.includes(titles, item.title) || _.includes(types, item.contentType.type) || (!item.contentType.new && item.contentType.type === 'Extra');
        });
      }
    },
    {
      title: "Twin Satan's Lantern",
      price: 1666,
      getApplicableItems: function(items) {
        var titles = ["1.5 Core Game", "Gambler's Chest"]
        var types = ['Expansion', 'Pinup', 'Promo'];
        return items.filter(function(item) {
          return _.includes(titles, item.title) || _.includes(types, item.contentType.type) || (!item.contentType.new && item.contentType.type === 'Extra');
        });
      }
    },
    {
      title: "True Form Satan's Lantern",
      price: 1666,
      getApplicableItems: function(items) {
        var titles = ["1.5 Core Game", "Gambler's Chest"]
        var types = ['Expansion', 'Pinup', 'Promo'];
        return items.filter(function(item) {
          return _.includes(titles, item.title) || _.includes(types, item.contentType.type) || (!item.contentType.new && item.contentType.type === 'Extra');
        });
      }
    },
    {
      title: "Final Form Satan's Lantern",
      price: 1666,
      getApplicableItems: function(items) {
        var titles = ["1.5 Core Game", "Gambler's Chest"]
        var types = ['Expansion', 'Pinup', 'Promo'];
        return items.filter(function(item) {
          return _.includes(titles, item.title) || _.includes(types, item.contentType.type) || (!item.contentType.new && item.contentType.type === 'Extra');
        });
      }
    }
  ];

  const ITEMS = [
    // Main Component
    { title: "1.5 Core Game", price: undefined, contentType: CONTENT_TYPES.MAIN_COMPONENT, addon: false, wave: 1 },
    { title: "1.5 Update Pack", price: undefined, contentType: CONTENT_TYPES.MAIN_COMPONENT, addon: false, wave: 1 },

    // New Expansions
    { title: "Frogdog Expansion", price: 50, contentType: CONTENT_TYPES.NEW_EXPANSION, addon: true, wave: 4, expansionNode: 1 },
    { title: "Nightmare Ram Expansion", price: 40, contentType: CONTENT_TYPES.NEW_EXPANSION, addon: true, wave: 4 },
    { title: "Screaming God Expansion", price: 50, contentType: CONTENT_TYPES.NEW_EXPANSION, addon: true, wave: 4, expansionNode: 5 },
    { title: "The First Hero Expansion", price: 35, contentType: CONTENT_TYPES.NEW_EXPANSION, addon: true, wave: 4 },

    // Old Expansions
    { title: "Dragon King Expansion", price: 75, contentType: CONTENT_TYPES.OLD_EXPANSION, addon: true, wave: 2 },
    { title: "Dung Beetle Knight Expansion", price: 30, contentType: CONTENT_TYPES.OLD_EXPANSION, addon: true, wave: 2 },
    { title: "Flower Knight Expansion", price: 40, contentType: CONTENT_TYPES.OLD_EXPANSION, addon: true, wave: 2 },
    { title: "Gorm Expansion", price: undefined, contentType: CONTENT_TYPES.OLD_EXPANSION, addon: false, wave: 2, expansionNode: 1 },
    { title: "Green Knight Armor Expansion", price: undefined, contentType: CONTENT_TYPES.OLD_EXPANSION, addon: false, wave: 2 },
    { title: "Lion God Expansion", price: undefined, contentType: CONTENT_TYPES.OLD_EXPANSION, addon: false, wave: 2 },
    { title: "Lion Knight Expansion", price: 35, contentType: CONTENT_TYPES.OLD_EXPANSION, addon: true, wave: 2 },
    { title: "Lonely Tree Expansion", price: undefined, contentType: CONTENT_TYPES.OLD_EXPANSION, addon: false, wave: 2 },
    { title: "Manhunter Expansion", price: undefined, contentType: CONTENT_TYPES.OLD_EXPANSION, addon: false, wave: 2 },
    { title: "Slenderman Expansion", price: undefined, contentType: CONTENT_TYPES.OLD_EXPANSION, addon: false, wave: 2 },
    { title: "Spidicules Expansion", price: undefined, contentType: CONTENT_TYPES.OLD_EXPANSION, addon: false, wave: 2 },
    { title: "Sunstalker Expansion", price: undefined, contentType: CONTENT_TYPES.OLD_EXPANSION, addon: false, wave: 2 },

    // New Extras
    { title: "Extra Hardcover 1.5 Core Game Rulebook", price: 40, contentType: CONTENT_TYPES.NEW_EXTRA, addon: true, wave: 3 },
    { title: "Gambler's Chest", price: 100, contentType: CONTENT_TYPES.NEW_EXTRA, addon: true, wave: 3 },

    // Old Extras
    { title: 'Anna & Adam Explorers', price: undefined, contentType: CONTENT_TYPES.OLD_EXTRA, addon: false, wave: 3 },
    { title: 'Aya the Survivor', price: undefined, contentType: CONTENT_TYPES.OLD_EXTRA, addon: false, wave: 3 },
    { title: 'Paul the Survivor', price: undefined, contentType: CONTENT_TYPES.OLD_EXTRA, addon: false, wave: 3 },
    { title: "Satan", price: 25, contentType: CONTENT_TYPES.OLD_EXTRA, addon: true, wave: 3 },
    { title: 'Snow the Savior', price: undefined, contentType: CONTENT_TYPES.OLD_EXTRA, addon: false, wave: 3 },
    { title: 'Twilight Knight', price: undefined, contentType: CONTENT_TYPES.OLD_EXTRA, addon: false, wave: 3 },

    // New Pinups
    { title: "Dung Ball", price: 15, contentType: CONTENT_TYPES.NEW_PINUP, addon: true, wave: 3 },
    { title: "Dung Beetle Dancer", price: 15, contentType: CONTENT_TYPES.NEW_PINUP, addon: true, wave: 3 },
    { title: "Dung Beetle Knight", price: 15, contentType: CONTENT_TYPES.NEW_PINUP, addon: true, wave: 3 },
    { title: "Gold Smoke Knight Armor", price: 15, contentType: CONTENT_TYPES.NEW_PINUP, addon: true, wave: 3 },
    { title: "Male Dung Beetle Dancer", price: 15, contentType: CONTENT_TYPES.NEW_PINUP, addon: true, wave: 3 },
    { title: "Male Twilight Knight", price: 15, contentType: CONTENT_TYPES.NEW_PINUP, addon: true, wave: 3 },
    { title: "Screaming God Armor", price: 15, contentType: CONTENT_TYPES.NEW_PINUP, addon: true, wave: 3 },

    // Old Pinups
    { title: 'Dragon Sacrifice', price: undefined, contentType: CONTENT_TYPES.OLD_PINUP, addon: false, wave: 3 },
    { title: 'Lantern Festival', price: undefined, contentType: CONTENT_TYPES.OLD_PINUP, addon: false, wave: 3 },
    { title: 'Leather Queen', price: undefined, contentType: CONTENT_TYPES.OLD_PINUP, addon: false, wave: 3 },
    { title: 'Lioness', price: undefined, contentType: CONTENT_TYPES.OLD_PINUP, addon: false, wave: 3 },
    { title: 'Phoenix Dancer', price: undefined, contentType: CONTENT_TYPES.OLD_PINUP, addon: false, wave: 3 },
    { title: 'Pinups of Death', price: undefined, contentType: CONTENT_TYPES.OLD_PINUP, addon: false, wave: 3 },
    { title: 'Primal Huntress', price: undefined, contentType: CONTENT_TYPES.OLD_PINUP, addon: false, wave: 3 },
    { title: 'Rawhide Dame', price: undefined, contentType: CONTENT_TYPES.OLD_PINUP, addon: false, wave: 3 },
    { title: 'Regeneration Suit', price: undefined, contentType: CONTENT_TYPES.OLD_PINUP, addon: false, wave: 3 },
    { title: 'Silk Assassin', price: undefined, contentType: CONTENT_TYPES.OLD_PINUP, addon: false, wave: 3 },
    { title: 'Sunstalker Dancer', price: undefined, contentType: CONTENT_TYPES.OLD_PINUP, addon: false, wave: 3 },
    { title: 'Twilight Witch', price: undefined, contentType: CONTENT_TYPES.OLD_PINUP, addon: false, wave: 3 },
    { title: 'Allison the Twilight Knight', price: undefined, contentType: CONTENT_TYPES.OLD_PINUP, addon: false, wave: 3 },

    // New Promos
    { title: "Role Survivors", price: 25, contentType: CONTENT_TYPES.NEW_PROMO, addon: true, wave: 3 },

    // Old Promos
    { title: 'Beyond the Wall', price: undefined, contentType: CONTENT_TYPES.OLD_PROMO, addon: false, wave: 3 },
    { title: 'Holiday Nico Speaker', price: undefined, contentType: CONTENT_TYPES.OLD_PROMO, addon: false, wave: 3 },
    { title: 'Messenger of Courage', price: undefined, contentType: CONTENT_TYPES.OLD_PROMO, addon: false, wave: 3 },
    { title: 'Messenger of First Story', price: undefined, contentType: CONTENT_TYPES.OLD_PROMO, addon: false, wave: 3 },
    { title: 'Messenger of Humanity', price: undefined, contentType: CONTENT_TYPES.OLD_PROMO, addon: false, wave: 3 },
    { title: 'Messenger of Spiral Path', price: undefined, contentType: CONTENT_TYPES.OLD_PROMO, addon: false, wave: 3 }
  ];

  function KdmContentManager() {

  }

  KdmContentManager.prototype.getPledges = function() {
    var pledges = _.cloneDeep(PLEDGES);
    return _.sortBy(pledges, 'price');
  };

  KdmContentManager.prototype.getAllItems = function() {
    return _.cloneDeep(ITEMS);
  };

  KdmContentManager.prototype.getAddOns = function() {
    return this.getAllItems().filter(function(item) { return item.addon; });
  };

  global.KdmContentManager = KdmContentManager;
})(window);
