(function(global) {
  'use strict';

  const CONTENT_TYPES = {
    MAIN_COMPONENT: {
      type: 'Main Component',
      new: true
    },
    NEW_CROSSOVER: {
      type: 'Crossover',
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
      gameType: 'none',
      price: 5,
      getApplicableItems: function(items) {
        return [];
      }
    },
    {
      title: "Lantern Upgrade",
      gameType: 'update_pack',
      price: 60,
      getApplicableItems: function(items) {
        return items.filter(function(item) {
          return item.title === "1.5 Update Pack";
        });
      }
    },
    {
      title: "Silver Lantern",
      gameType: 'update_pack',
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
      gameType: 'core_game',
      price: 250,
      getApplicableItems: function(items) {
        return items.filter(function(item) {
          return item.title === "1.5 Core Game";
        });
      }
    },
    {
      title: "Gold Lantern",
      gameType: 'core_game',
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
      gameType: 'core_game',
      price: 750,
      getApplicableItems: function(items) {
        var titles = ["1.5 Core Game", "Gambler's Chest"]
        return items.filter(function(item) {
          return _.includes(titles, item.title) || (item.contentType.type === 'Expansion' && !item.contentType.new);
        });
      }
    },
    {
      title: "Black Friday Lantern Upgrade",
      gameType: 'update_pack',
      price: 50,
      getApplicableItems: function(items) {
        return items.filter(function(item) {
          return item.title === "1.5 Update Pack";
        });
      }
    },
    {
      title: "Black Friday Silver Lantern",
      gameType: 'update_pack',
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
      gameType: 'core_game',
      price: 200,
      getApplicableItems: function(items) {
        return items.filter(function(item) {
          return item.title === "1.5 Core Game";
        });
      }
    },
    {
      title: "Black Friday Gold Lantern",
      gameType: 'core_game',
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
      gameType: 'update_pack',
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
      title: "Frogdog",
      gameType: 'update_pack',
      price: 1000,
      getApplicableItems: function(items) {
        var titles = ["1.5 Update Pack", "Gambler's Chest", "Frogdog T-Shirt"]
        var types = ['Expansion', 'Pinup', 'Promo'];
        return items.filter(function(item) {
          return _.includes(titles, item.title) || (item.contentType.new && _.includes(types, item.contentType.type));
        });
      }
    },
    {
      title: "Black Friday Gambler's Lantern 2nd Face",
      gameType: 'core_game',
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
      gameType: 'core_game',
      price: 1666,
      getApplicableItems: function(items) {
        var titles = ["1.5 Core Game", "Gambler's Chest"]
        var types = ['Expansion', 'Pinup', 'Promo'];
        return items.filter(function(item) {
          return (_.includes(titles, item.title)
                  || (_.includes(types, item.contentType.type) && item.title !== 'Role Survivors')
                  || (!item.contentType.new && item.contentType.type === 'Extra'));
        });
      }
    },
    {
      title: "Twin Satan's Lantern",
      gameType: 'core_game',
      price: 1666,
      getApplicableItems: function(items) {
        var titles = ["1.5 Core Game", "Gambler's Chest"]
        var types = ['Expansion', 'Pinup', 'Promo'];
        return items.filter(function(item) {
          return (_.includes(titles, item.title)
                  || (_.includes(types, item.contentType.type) && item.title !== 'Role Survivors')
                  || (!item.contentType.new && item.contentType.type === 'Extra'));
        });
      }
    },
    {
      title: "True Form Satan's Lantern",
      gameType: 'core_game',
      price: 1666,
      getApplicableItems: function(items) {
        var titles = ["1.5 Core Game", "Gambler's Chest"]
        var types = ['Expansion', 'Pinup', 'Promo'];
        return items.filter(function(item) {
          return (_.includes(titles, item.title)
                  || (_.includes(types, item.contentType.type) && item.title !== 'Role Survivors')
                  || (!item.contentType.new && item.contentType.type === 'Extra'));
        });
      }
    },
    {
      title: "Final Form Satan's Lantern",
      gameType: 'core_game',
      price: 1666,
      getApplicableItems: function(items) {
        var titles = ["1.5 Core Game", "Gambler's Chest"]
        var types = ['Expansion', 'Pinup', 'Promo'];
        return items.filter(function(item) {
          return (_.includes(titles, item.title)
                  || (_.includes(types, item.contentType.type) && item.title !== 'Role Survivors')
                  || (!item.contentType.new && item.contentType.type === 'Extra'));
        });
      }
    },
    {
      title: "God Frogdog",
      gameType: "core_game",
      price: 2000,
      getApplicableItems: function(items) {
        var titles = ["1.5 Core Game", "Gambler's Chest", "Frogdog T-Shirt"]
        var types = ['Expansion', 'Pinup', 'Promo'];
        return items.filter(function(item) {
          return (_.includes(titles, item.title)
                  || (_.includes(types, item.contentType.type) && item.title !== 'Role Survivors')
                  || (!item.contentType.new && item.contentType.type === 'Extra'));
        });
      }
    }
  ];

  const ITEMS = [
    // Main Component
    { title: "1.5 Core Game", price: undefined, contentType: CONTENT_TYPES.MAIN_COMPONENT, addon: false, wave: 1 },
    { title: "1.5 Update Pack", price: undefined, contentType: CONTENT_TYPES.MAIN_COMPONENT, addon: false, wave: 1 },

    // New Expansions
    { title: "Frogdog Expansion", price: 50, contentType: CONTENT_TYPES.NEW_EXPANSION, addon: true, wave: 4, expansionNode: 'NODE_1' },
    { title: "Nightmare Ram Expansion", price: 40, contentType: CONTENT_TYPES.NEW_EXPANSION, addon: true, wave: 4, expansionNode: 'NODE_3', speculated: true },
    { title: "Oblivion Mosquito Expansion", price: 50, contentType: CONTENT_TYPES.NEW_EXPANSION, addon: true, wave: 4, expansionNode: 'NODE_2' },
    { title: "Pariah Expansion", price: 40, contentType: CONTENT_TYPES.NEW_EXPANSION, addon: true, wave: 4, expansionNode: 'NEMESIS_1' },
    { title: "Screaming God Expansion", price: 50, contentType: CONTENT_TYPES.NEW_EXPANSION, addon: true, wave: 4, expansionNode: 'NODE_5' },
    { title: "The First Hero Expansion", price: 35, contentType: CONTENT_TYPES.NEW_EXPANSION, addon: true, wave: 4 },

    // Old Expansions
    { title: "Dragon King Expansion", price: 75, contentType: CONTENT_TYPES.OLD_EXPANSION, addon: true, wave: 2 },
    { title: "Dung Beetle Knight Expansion", price: 30, contentType: CONTENT_TYPES.OLD_EXPANSION, addon: true, wave: 2 },
    { title: "Flower Knight Expansion", price: 40, contentType: CONTENT_TYPES.OLD_EXPANSION, addon: true, wave: 2 },
    { title: "Gorm Expansion", price: 50, contentType: CONTENT_TYPES.OLD_EXPANSION, addon: true, wave: 2, expansionNode: 'NODE_1' },
    { title: "Green Knight Armor Expansion", price: undefined, contentType: CONTENT_TYPES.OLD_EXPANSION, addon: false, wave: 2 },
    { title: "Lion God Expansion", price: undefined, contentType: CONTENT_TYPES.OLD_EXPANSION, addon: false, wave: 2 },
    { title: "Lion Knight Expansion", price: 35, contentType: CONTENT_TYPES.OLD_EXPANSION, addon: true, wave: 2 },
    { title: "Lonely Tree Expansion", price: undefined, contentType: CONTENT_TYPES.OLD_EXPANSION, addon: false, wave: 2 },
    { title: "Manhunter Expansion", price: 35, contentType: CONTENT_TYPES.OLD_EXPANSION, addon: true, wave: 2 },
    { title: "Slenderman Expansion", price: 40, contentType: CONTENT_TYPES.OLD_EXPANSION, addon: true, wave: 2 },
    { title: "Spidicules Expansion", price: undefined, contentType: CONTENT_TYPES.OLD_EXPANSION, addon: false, wave: 2, expansionNode: 'NODE_2', speculated: true },
    { title: "Sunstalker Expansion", price: undefined, contentType: CONTENT_TYPES.OLD_EXPANSION, addon: false, wave: 2 },

    // New Extras
    { title: "Extra Hardcover 1.5 Core Game Rulebook", price: 40, contentType: CONTENT_TYPES.NEW_EXTRA, addon: true, wave: 3 },
    { title: "Frogdog T-Shirt", price: 25, contentType: CONTENT_TYPES.NEW_EXTRA, addon: true, wave: 3 },
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
    { title: "Frogdog Armor", price: 15, contentType: CONTENT_TYPES.NEW_PINUP, addon: true, wave: 3 },
    { title: "Gold Smoke Knight Armor", price: 15, contentType: CONTENT_TYPES.NEW_PINUP, addon: true, wave: 3 },
    { title: "Male Dung Beetle Dancer", price: 15, contentType: CONTENT_TYPES.NEW_PINUP, addon: true, wave: 3 },
    { title: "Male Twilight Knight", price: 15, contentType: CONTENT_TYPES.NEW_PINUP, addon: true, wave: 3 },
    { title: "Screaming God Armor", price: 15, contentType: CONTENT_TYPES.NEW_PINUP, addon: true, wave: 3 },
    { title: "Male Screaming God Armor", price: 15, contentType: CONTENT_TYPES.NEW_PINUP, addon: true, wave: 3 },
    { title: "Nightmare Ram Armor & Ramette", price: 15, contentType: CONTENT_TYPES.NEW_PINUP, addon: true, wave: 3 },

    // Old Pinups
    { title: 'Pinups of Death 1', price: undefined, contentType: CONTENT_TYPES.OLD_PINUP, addon: false, wave: 3 },
    { title: 'Pinups of Death 2', price: 115, contentType: CONTENT_TYPES.OLD_PINUP, addon: true, wave: 3 },
    { title: 'Allison the Twilight Knight', price: undefined, contentType: CONTENT_TYPES.OLD_PINUP, addon: false, wave: 3 },

    // New Promos
    { title: "Role Survivors", price: 25, contentType: CONTENT_TYPES.NEW_PROMO, addon: true, wave: 3 },

    // Old Promos
    { title: 'Beyond the Wall', price: undefined, contentType: CONTENT_TYPES.OLD_PROMO, addon: false, wave: 3 },
    { title: 'Holiday Nico Speaker', price: undefined, contentType: CONTENT_TYPES.OLD_PROMO, addon: false, wave: 3 },
    { title: 'Messenger of Courage', price: undefined, contentType: CONTENT_TYPES.OLD_PROMO, addon: false, wave: 3 },
    { title: 'Messenger of First Story', price: undefined, contentType: CONTENT_TYPES.OLD_PROMO, addon: false, wave: 3 },
    { title: 'Messenger of Humanity', price: undefined, contentType: CONTENT_TYPES.OLD_PROMO, addon: false, wave: 3 },
    { title: 'Messenger of Spiral Path', price: undefined, contentType: CONTENT_TYPES.OLD_PROMO, addon: false, wave: 3 },

    // New Crossovers
    { title: "LY3 Candy & Cola", price: 20, contentType: CONTENT_TYPES.NEW_CROSSOVER, addon: true, wave: 3 }
  ];

  const CAMPAIGN_NODES = {
    'NODE_1': {
      node_order: 1,
      title: "Node 1",
      description: "Expansions in this node represent a monster that can be hunted at the very start of the campaign.",
      lantern_year: 1,
      core_game_monsters: ["White Lion"]
    },
    'NODE_2': {
      node_order: 2,
      title: "Node 2",
      description: "Expansions in this node contain content that can be utilized from as early as Lantern Year 2, and provides a good ramp to mid campaign content.",
      lantern_year: 2,
      core_game_monsters: ["Screaming Antelope"]
    },
    'NEMESIS_1': {
      node_order: 3,
      title: "Nemesis Node 1",
      description: "Expansions in this node will visit and attack your settlement early in the game.",
      lantern_year: 5,
      core_game_monsters: []
    },
    'NODE_3': {
      node_order: 4,
      title: "Node 3",
      description: "Unknown at the moment.",
      lantern_year: null,
      core_game_monsters: []
    },
    'NODE_4': {
      node_order: 5,
      title: "Node 4",
      description: "Unknown at the moment.",
      lantern_year: null,
      core_game_monsters: []
    },
    'NODE_5': {
      node_order: 6,
      title: "Node 5",
      description: "Expansions in this node are limited to ONE per campaign.",
      lantern_year: null,
      core_game_monsters: []
    }
  };

  const GAMBLERS_CHEST_ROLLS = [{
    rollNumber: 0,
    rollResultMin: 8,
    rollResultMax: 12,
    title: "Philosophy of Death",
    type: "Game System",
    mini: false,
    updateNumber: 0,
    contents: [{
      title: "Philosophy of Death",
      type: "Advanced Rulebook Upgrade",
      quantity: 1
    }]
  }, {
    rollNumber: 0,
    rollResultMin: null,
    rollResultMax: null,
    title: "Advanced KD:M Rulebook",
    type: "Advanced Rulebook",
    mini: false,
    updateNumber: 0,
    contents: [{
      title: "Advanced KD:M Rulebook",
      type: "Advanced Rulebook",
      quantity: 1
    }]
  }, {
    rollNumber: 1,
    rollResultMin: 66,
    rollResultMax: 69,
    title: "Nightmare Adam",
    type: "Promo",
    mini: true,
    updateNumber: 5,
    contents: [{
      title: "Nightmare Adam",
      type: "Miniature",
      quantity: 1
    }, {
      title: "Nightmare Inspiration Fighting Art Card",
      type: "Fighting Art",
      quantity: 1
    }, {
      title: "Ambitionism Philosophy",
      type: "Philosophy",
      quantity: 1
    }]
  }, {
    rollNumber: 2,
    rollResultMin: 35,
    rollResultMax: 37,
    title: "White Fang",
    type: "Narrative Sculpture",
    mini: true,
    updateNumber: 6,
    contents: [{
      title: "White Lion - Twilight Sword",
      type: "Miniature",
      quantity: 1
    }, {
      title: "Unique Base Insert",
      type: "Base Insert",
      quantity: 1
    }]
  }, {
    rollNumber: 2,
    rollResultMin: null,
    rollResultMax: null,
    title: "Sci-fi Aya the Survivor",
    type: "Promo",
    mini: true,
    updateNumber: 6,
    contents: [{
      title: "Sci-fi Aya",
      type: "Miniature",
      quantity: 1
    }, {
      title: "Promo Gear Cards",
      type: "Gear Card",
      quantity: 2
    }, {
      title: "Art Card",
      type: "Art Card",
      quantity: 1
    }]
  }, {
    rollNumber: 3,
    rollResultMin: 29,
    rollResultMax: 31,
    title: "Last Axeman Standing",
    type: "Narrative Sculpture",
    mini: true,
    updateNumber: 7,
    contents: [{
      title: "Last Axeman Standing",
      type: "Miniature",
      quantity: 1
    }, {
      title: "Mighty Bone Axe Rare Gear Card",
      type: "Gear Card",
      quantity: 1
    }]
  }, {
    rollNumber: 4,
    rollResultMin: 17,
    rollResultMax: 20,
    title: "Scouts of Death",
    type: "Game Feature",
    mini: false,
    updateNumber: 8,
    contents: [{
      title: "Scouts of Death Advanced Rules",
      type: "Advanced Rulebook Upgrade",
      quantity: 1
    }, {
      title: "Scout of Death",
      type: "Miniature",
      quantity: 1
    }, {
      title: "Cards",
      type: "Unknown Cards",
      quantity: 50,
      estimate: true
    }]
  }, {
    rollNumber: 5,
    rollResultMin: 85,
    rollResultMax: 89,
    title: "Murderer",
    type: "Narrative Sculpture",
    mini: true,
    updateNumber: 10,
    contents: [{
      title: "Murderer",
      type: "Miniature",
      quantity: 1
    }, {
      title: "Homicidal Philosophy",
      type: "Philosophy",
      quantity: 1
    }, {
      title: "Settlement Event Card",
      type: "Settlement Event",
      quantity: 1
    }, {
      title: "Secret Fighting Art",
      type: "Fighting Art",
      quantity: 1
    }, {
      title: "Gear Cards",
      type: "Gear Card",
      quantity: 2
    }]
  }, {
    rollNumber: 6,
    rollResultMin: 90,
    rollResultMax: 93,
    title: "Bow Master of Deadrock",
    type: "Narrative Sculpture",
    mini: true,
    updateNumber: 11,
    contents: [{
      title: "Bow Master of Deadrock",
      type: "Miniature",
      quantity: 1
    }, {
      title: "Unique Base Insert",
      type: "Base Insert",
      quantity: 1
    }, {
      title: "Lucky Cat Fang Knife Rare Gear Card",
      type: "Gear Card",
      quantity: 1
    }]
  }, {
    rollNumber: 6,
    rollResultMin: 90,
    rollResultMax: 93,
    title: "The Bloody Sword of Deadrock",
    type: "Narrative Sculpture",
    mini: true,
    updateNumber: 11,
    contents: [{
      title: "Bloody Sword of Deadrock",
      type: "Miniature",
      quantity: 1
    }, {
      title: "Unique Base Insert",
      type: "Base Insert",
      quantity: 1
    }, {
      title: "Clutch Fighting Art",
      type: "Fighting Art",
      quantity: 1
    }]
  }, {
    rollNumber: 7,
    rollResultMin: 13,
    rollResultMax: 16,
    title: "The Romantic Adventurer",
    type: "Narrative Sculpture",
    mini: true,
    updateNumber: 13,
    contents: [{
      title: "Male Conviction Romantic",
      type: "Miniature",
      quantity: 1
    }, {
      title: "Unique Base Insert",
      type: "Base Insert",
      quantity: 1
    }, {
      title: "Rare Gear Card",
      type: "Gear Card",
      quantity: 1
    }, {
      title: "Romanticism Philosophy",
      type: "Philosophy",
      quantity: 1
    }]
  }, {
    rollNumber: 7,
    rollResultMin: 70,
    rollResultMax: 73,
    title: "The Screaming Hoarder",
    type: "Narrative Sculpture",
    mini: true,
    updateNumber: 13,
    contents: [{
      title: "Screaming Hoarder",
      type: "Miniature",
      quantity: 1
    }, {
      title: "Unique Base Insert",
      type: "Base Insert",
      quantity: 1
    }, {
      title: "Advanced Disorder",
      type: "Disorder",
      quantity: 1
    }, {
      title: "Hunt Event",
      type: "Hunt Event",
      quantity: 1
    }]
  }, {
    rollNumber: 8,
    rollResultMin: 1,
    rollResultMax: 1,
    title: "Kingdom Death 1-1 Penalty",
    type: "Penalty",
    mini: false,
    updateNumber: 14,
    contents: []
  }, {
    rollNumber: 9,
    rollResultMin: 2,
    rollResultMax: 7,
    title: "Dark Eye",
    type: "Narrative Sculpture",
    mini: true,
    updateNumber: 16,
    contents: [{
      title: "Dark Eye",
      type: "Miniature",
      quantity: 1
    }, {
      title: "Unique Base Insert",
      type: "Base Insert",
      quantity: 1
    }, {
      title: "Advanced Fighting Art Card",
      type: "Fighting Art",
      quantity: 1
    }]
  }, {
    rollNumber: 10,
    rollResultMin: 24,
    rollResultMax: 28,
    title: "Cockroach Queen",
    type: "Narrative Sculpture",
    mini: true,
    updateNumber: 17,
    contents: [{
      title: "Cockroach Queen",
      type: "Miniature",
      quantity: 1
    }, {
      title: "Unique Base Insert",
      type: "Base Insert",
      quantity: 1
    }, {
      title: "Advanced Disorder",
      type: "Disorder",
      quantity: 1
    }, {
      title: "Verminism Philosophy",
      type: "Philosophy",
      quantity: 1
    }]
  }, {
    rollNumber: 11,
    rollResultMin: 87,
    rollResultMax: 87,
    title: "Murderer Penalty",
    type: "Penalty",
    mini: false,
    updateNumber: 18,
    contents: []
  }, {
    rollNumber: 12,
    rollResultMin: 41,
    rollResultMax: 43,
    title: "Beast Hunter Armor",
    type: "Narrative Sculpture",
    mini: true,
    updateNumber: 19,
    contents: [{
      title: "Beast Hunter",
      type: "Miniature",
      quantity: 1
    }, {
      title: "Armor Kit compatible Male Beast Hunter Helm",
      type: "Armor Kit Piece",
      quantity: 1
    }, {
      title: "Armor Kit compatible Female Beast Hunter Helm",
      type: "Armor Kit Piece",
      quantity: 1
    }, {
      title: "Unique Base Insert",
      type: "Base Insert",
      quantity: 1
    }, {
      title: "Hybride Phoenix & Screaming Antelope Armor Set Card",
      type: "Armor Set Card",
      quantity: 1
    }, {
      title: "Beast Hunter Helm Rare Gear Card",
      type: "Gear Card",
      quantity: 1
    }]
  }, {
    rollNumber: 13,
    rollResultMin: 55,
    rollResultMax: 55,
    title: "Mad & Mighty Striker",
    type: "Narrative Sculpture",
    mini: true,
    updateNumber: 20,
    contents: [{
      title: "Mad & Mighty Striker",
      type: "Miniature",
      quantity: 1
    }, {
      title: "Unique Base Insert",
      type: "Base Insert",
      quantity: 1
    }, {
      title: "Fighting Art",
      type: "Fighting Art",
      quantity: 1
    }, {
      title: "Impermanenism Philosophy",
      type: "Philosophy",
      quantity: 1
    }]
  }, {
    rollNumber: 14,
    rollResultMin: 74,
    rollResultMax: 77,
    title: "Bone Eater",
    type: "Narrative Sculpture",
    mini: true,
    updateNumber: 21,
    contents: [{
      title: "Bone Eater",
      type: "Miniature",
      quantity: 1
    }, {
      title: "Marrow Hunger Philosophy",
      type: "Philosophy",
      quantity: 1
    }, {
      title: "Settlement Event",
      type: "Settlement Event",
      quantity: 1
    }, {
      title: "Secret Fighting Art",
      type: "Fighting Art",
      quantity: 1
    }, {
      title: "New Bone Gear",
      type: "Gear Card",
      quantity: 1
    }]
  }, {
    rollNumber: 15,
    rollResultMin: 50,
    rollResultMax: 53,
    title: "Bright Knives",
    type: "Narrative Sculpture",
    mini: true,
    updateNumber: 23,
    contents: [{
      title: "Bright Knives",
      type: "Miniature",
      quantity: 1
    }, {
      title: "Unique Base Insert",
      type: "Base Insert",
      quantity: 1
    }, {
      title: "Fighting Art",
      type: "Fighting Art",
      quantity: 1
    }, {
      title: "Modified Rawhide Headband",
      type: "Gear Card",
      quantity: 1
    }]
  }];

  function KdmContentManager() {

  }

  KdmContentManager.prototype.getPledges = function() {
    var pledges = _.cloneDeep(PLEDGES);
    return _.sortBy(pledges, 'price');
  };

  KdmContentManager.prototype.getPledgesForGameType = function(gameType) {
    return this.getPledges().filter(function(pledge) { return pledge.gameType === gameType; });
  };

  KdmContentManager.prototype.getAllItems = function() {
    return _.cloneDeep(ITEMS);
  };

  KdmContentManager.prototype.getAddOns = function() {
    return this.getAllItems().filter(function(item) { return item.addon; });
  };

  KdmContentManager.prototype.getAllNewExpansions = function() {
    return this.getAllItems().filter(function(item) { return _.isEqual(item.contentType, CONTENT_TYPES.NEW_EXPANSION); }).sort(itemSort);
  };

  KdmContentManager.prototype.getAllOldExpansions = function() {
    return this.getAllItems().filter(function(item) { return _.isEqual(item.contentType, CONTENT_TYPES.OLD_EXPANSION); }).sort(itemSort);
  };

  KdmContentManager.prototype.getAllNewPinups = function() {
    return this.getAllItems().filter(function(item) { return _.isEqual(item.contentType, CONTENT_TYPES.NEW_PINUP); }).sort(itemSort);
  };

  KdmContentManager.prototype.getAllOldPinups = function() {
    return this.getAllItems().filter(function(item) { return _.isEqual(item.contentType, CONTENT_TYPES.OLD_PINUP); }).sort(itemSort);
  };

  KdmContentManager.prototype.getAllNewPromos = function() {
    return this.getAllItems().filter(function(item) { return _.isEqual(item.contentType, CONTENT_TYPES.NEW_PROMO); }).sort(itemSort);
  };

  KdmContentManager.prototype.getAllNewCrossovers = function() {
    return this.getAllItems().filter(function(item) { return _.isEqual(item.contentType, CONTENT_TYPES.NEW_CROSSOVER); }).sort(itemSort);
  };

  KdmContentManager.prototype.getGamblersChestRolls = function() {
    return _.cloneDeep(GAMBLERS_CHEST_ROLLS);
  };

  KdmContentManager.prototype.getCampaignNodes = function() {
    const expansionsWithNodes = this.getAllItems().filter(function(item) { return item.expansionNode; });
    const expansionsByCampaignNode = _.groupBy(expansionsWithNodes, 'expansionNode');
    return _.map(expansionsByCampaignNode, function(expansions, nodeNumber) {
      const expansionsByNewness = _.groupBy(expansions, 'contentType.new');
      const newExpansions = (expansionsByNewness['true'] || []).sort(itemSort);
      const oldExpansions = (expansionsByNewness['false'] || []).sort(itemSort);
      const campaignNode = CAMPAIGN_NODES[nodeNumber];
      return {
        nodeNumber: nodeNumber,
        nodeOrder: campaignNode.node_order,
        title: campaignNode.title,
        description: campaignNode.description,
        lanternYear: campaignNode.lantern_year,
        newExpansions: newExpansions,
        oldExpansions: oldExpansions,
        coreMonsters: campaignNode.core_game_monsters
      };
    }).sort(sortCampaignNodesByNodeNumber);
  };

  function sortCampaignNodesByNodeNumber(a, b) {
    return a.nodeOrder - b.nodeOrder;
  }

  function itemSort(a, b) {
    return a.title.localeCompare(b.title);
  }

  global.KdmContentManager = KdmContentManager;
})(window);
