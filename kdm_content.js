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
    },
    EXCLUSIVE: {
      type: 'Exclusive',
      new: false
    }
  };

  const GAME_TYPES = {
    'none': null,
    'update_pack': '1.5 Update Pack',
    'core_game': '1.5 Core Game'
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
        var titles = ["1.5 Update Pack", "Gambler's Chest", "The First Hero Expansion"];
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
        var titles = ["1.5 Core Game", "Gambler's Chest"];
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
        var titles = ["1.5 Core Game", "Gambler's Chest"];
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
        var titles = ["1.5 Update Pack", "Gambler's Chest", "The First Hero Expansion"];
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
        var titles = ["1.5 Core Game", "Gambler's Chest"];
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
        var titles = ["1.5 Update Pack", "Gambler's Chest", "Gambler's T-Shirt"];
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
        var titles = ["1.5 Update Pack", "Gambler's Chest", "Frogdog T-Shirt"];
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
        var titles = ["1.5 Core Game", "Gambler's Chest", "Gambler's T-Shirt"];
        var types = ['Expansion', 'Pinup', 'Promo'];
        return items.filter(function(item) {
          return _.includes(titles, item.title) || (item.contentType.new && _.includes(types, item.contentType.type));
        });
      }
    },
    {
      title: "Returning Gamer's Lantern",
      gameType: "update_pack",
      price: 1065,
      getApplicableItems: function(items) {
        var titles = ["1.5 Update Pack", "Gambler's Chest", "Watcher T-Shirt", "Death Dice"];
        var types = ['Expansion'];
        return items.filter(function(item) {
          return _.includes(titles, item.title) || (item.contentType.new && _.includes(types, item.contentType.type));
        });
      }
    },
    {
      title: "Gamer's Lantern",
      gameType: "core_game",
      price: 1650,
      getApplicableItems: function(items) {
        var titles = ["1.5 Core Game", "Gambler's Chest", "Watcher T-Shirt", "Death Dice"];
        var types = ['Expansion'];
        return items.filter(function(item) {
          return (_.includes(titles, item.title)
                  || (_.includes(types, item.contentType.type) && item.title !== 'Role Survivors'));
        });
      }
    },
    {
      title: "Satan's Lantern",
      gameType: 'core_game',
      price: 1666,
      getApplicableItems: function(items) {
        var titles = ["1.5 Core Game", "Gambler's Chest", "Satan T-Shirt"];
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
        var titles = ["1.5 Core Game", "Gambler's Chest", "Satan T-Shirt"];
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
        var titles = ["1.5 Core Game", "Gambler's Chest", "Satan T-Shirt"];
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
        var titles = ["1.5 Core Game", "Gambler's Chest", "Satan T-Shirt"];
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
        var titles = ["1.5 Core Game", "Gambler's Chest", "Frogdog T-Shirt"];
        var types = ['Expansion', 'Pinup', 'Promo'];
        return items.filter(function(item) {
          return (_.includes(titles, item.title)
                  || (_.includes(types, item.contentType.type) && item.title !== 'Role Survivors')
                  || (!item.contentType.new && item.contentType.type === 'Extra'));
        });
      }
    },
    {
      title: "Percival's Lantern",
      gameType: "core_game",
      price: 2500,
      getApplicableItems: function(items) {
        var titles = ["1.5 Core Game", "Gambler's Chest", "Percival T-Shirt", "Death Dice", "Percival"];
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
    { title: "1.5 Core Game", price: 300, contentType: CONTENT_TYPES.MAIN_COMPONENT, addon: true, wave: 1 },
    { title: "1.5 Update Pack", price: 75, contentType: CONTENT_TYPES.MAIN_COMPONENT, addon: true, wave: 1 },

    // New Expansions
    {
      title: "Abyssal Woods Expansion",
      price: 150,
      contentType: CONTENT_TYPES.NEW_EXPANSION,
      addon: true,
      wave: 4,
      expansionNode: 'NODE_5',
      nodes: [{
        title: "Abyssal Woods (Dragon Goblin)",
        node: 'NODE_3'
      }, {
        title: "Abyssal Woods (Lvl 4 Dragon Goblin)",
        node: 'NODE_5'
      }]
    },
    {
      title: "Black Knight Expansion",
      price: 50,
      contentType: CONTENT_TYPES.NEW_EXPANSION,
      addon: true,
      wave: 4,
      expansionNode: 'NODE_3',
      nodes: [{
        title: "Black Knight",
        node: 'NODE_3'
      }]
    },
    {
      title: "Campaigns of Death Expansion",
      price: 40,
      contentType: CONTENT_TYPES.NEW_EXPANSION,
      addon: true,
      wave: 4 ,
      nodes: []
    },
    {
      title: "Death Armor Expansion",
      price: 20,
      contentType: CONTENT_TYPES.NEW_EXPANSION,
      addon: true,
      wave: 4 ,
      nodes: []
    },
    {
      title: "Frogdog Expansion",
      price: 50,
      contentType: CONTENT_TYPES.NEW_EXPANSION,
      addon: true,
      wave: 4,
      expansionNode: 'NODE_1' ,
      nodes: [{
        title: "Frogdog",
        node: 'NODE_1'
      }]
    },
    {
      title: "Gryphon Expansion",
      price: 75,
      contentType: CONTENT_TYPES.NEW_EXPANSION,
      addon: true,
      wave: 4,
      expansionNode: 'NODE_4',
      nodes: [{
        title: "Gryphon",
        node: 'NODE_4'
      }]
    },
    {
      title: "Honeycomb Weaver Expansion",
      price: 50,
      contentType: CONTENT_TYPES.NEW_EXPANSION,
      addon: true,
      wave: 4,
      expansionNode: 'NODE_1',
      nodes: [{
        title: "10yr Honeycomb Weaver",
        node: 'NODE_1'
      }, {
        title: "100yr Honeycomb Weaver",
        node: 'NODE_3'
      }]
    },
    {
      title: "Inverted Mountain Campaign Expansion",
      price: 50,
      contentType: CONTENT_TYPES.NEW_EXPANSION,
      addon: true,
      wave: 4,
      nodes: []
    },
    {
      title: "Ivory Dragon Expansion",
      price: 100,
      contentType: CONTENT_TYPES.NEW_EXPANSION,
      addon: true,
      wave: 4,
      expansionNode: 'NODE_5',
      nodes: [{
        title: "Ivory Dragon",
        node: 'NODE_5'
      }]
    },
    {
      title: "Nightmare Ram Expansion",
      price: 40,
      contentType: CONTENT_TYPES.NEW_EXPANSION,
      addon: true,
      wave: 4,
      expansionNode: 'NODE_3',
      speculated: true,
      nodes: [{
        title: "Nightmare Ram",
        node: 'NODE_3'
      }]
    },
    {
      title: "Oblivion Mosquito Expansion",
      price: 50,
      contentType: CONTENT_TYPES.NEW_EXPANSION,
      addon: true,
      wave: 4,
      expansionNode: 'NODE_2',
      nodes: [{
        title: "Oblivion Mosquito",
        node: 'NODE_2'
      }]
    },
    {
      title: "Pariah Expansion",
      price: 40,
      contentType: CONTENT_TYPES.NEW_EXPANSION,
      addon: true,
      wave: 4,
      expansionNode: 'NEMESIS_1',
      nodes: [{
        title: "Pariah",
        node: 'NEMESIS_1'
      }]
    },
    {
      title: "Red Witches Expansion",
      price: 40,
      contentType: CONTENT_TYPES.NEW_EXPANSION,
      addon: true,
      wave: 4,
      nodes: []
    },
    {
      title: "Screaming God Expansion",
      price: 50,
      contentType: CONTENT_TYPES.NEW_EXPANSION,
      addon: true,
      wave: 4,
      expansionNode: 'NODE_5',
      nodes: [{
        title: "Screaming God",
        node: 'NODE_5'
      }]
    },
    {
      title: "The First Hero Expansion",
      price: 35,
      contentType: CONTENT_TYPES.NEW_EXPANSION,
      addon: true,
      wave: 4,
      nodes: []
    },
    {
      title: "The Silver City Expansion",
      price: 65,
      contentType: CONTENT_TYPES.NEW_EXPANSION,
      addon: true,
      wave: 4,
      nodes: []
    },

    // Old Expansions
    {
      title: "Dragon King Expansion",
      price: 75,
      contentType: CONTENT_TYPES.OLD_EXPANSION,
      addon: true,
      wave: 2,
      expansionNode: 'NODE_4',
      speculated: true,
      nodes: [{
        title: "Dragon King",
        node: 'NODE_4',
        speculated: true
      }]
    },
    {
      title: "Dung Beetle Knight Expansion",
      price: 30,
      contentType: CONTENT_TYPES.OLD_EXPANSION,
      addon: true,
      wave: 2,
      expansionNode: 'NODE_4',
      speculated: true,
      nodes: [{
        title: "Dung Beetle Knight",
        node: 'NODE_4',
        speculated: true
      }]
    },
    {
      title: "Flower Knight Expansion",
      price: 40,
      contentType: CONTENT_TYPES.OLD_EXPANSION,
      addon: true,
      wave: 2,
      expansionNode: 'NODE_3',
      speculated: true,
      nodes: [{
        title: "Flower Knight",
        node: 'NODE_3',
        speculated: true
      }]
    },
    {
      title: "Gorm Expansion",
      price: 50,
      contentType: CONTENT_TYPES.OLD_EXPANSION,
      addon: true,
      wave: 2,
      expansionNode: 'NODE_1',
      nodes: [{
        title: "Gorm",
        node: 'NODE_1'
      }]
    },
    {
      title: "Green Knight Armor Expansion",
      price: 15,
      contentType: CONTENT_TYPES.OLD_EXPANSION,
      addon: true,
      wave: 2,
      nodes: []
    },
    {
      title: "Lion God Expansion",
      price: 40,
      contentType: CONTENT_TYPES.OLD_EXPANSION,
      addon: true,
      wave: 2,
      expansionNode: 'NODE_5',
      speculated: true,
      nodes: [{
        title: "Lion God",
        node: 'NODE_5',
        speculated: true
      }]
    },
    {
      title: "Lion Knight Expansion",
      price: 35,
      contentType: CONTENT_TYPES.OLD_EXPANSION,
      addon: true,
      wave: 2,
      expansionNode: 'NEMESIS_2',
      speculated: true,
      nodes: [{
        title: "Lion Knight",
        node: 'NEMESIS_2',
        speculated: true
      }]
    },
    {
      title: "Lonely Tree Expansion",
      price: 40,
      contentType: CONTENT_TYPES.OLD_EXPANSION,
      addon: true,
      wave: 2,
      nodes: []
    },
    {
      title: "Manhunter Expansion",
      price: 35,
      contentType: CONTENT_TYPES.OLD_EXPANSION,
      addon: true,
      wave: 2,
      expansionNode: 'NEMESIS_1',
      speculated: true,
      nodes: [{
        title: "Manhunter",
        node: 'NEMESIS_1',
        speculated: true
      }]
    },
    {
      title: "Slenderman Expansion",
      price: 40,
      contentType: CONTENT_TYPES.OLD_EXPANSION,
      addon: true,
      wave: 2,
      expansionNode: 'NEMESIS_2',
      speculated: true,
      nodes: [{
        title: "Slenderman",
        node: 'NEMESIS_2',
        speculated: true
      }]
    },
    {
      title: "Spidicules Expansion",
      price: 60,
      contentType: CONTENT_TYPES.OLD_EXPANSION,
      addon: true,
      wave: 2,
      expansionNode: 'NODE_2',
      speculated: true,
      nodes: [{
        title: "Spidicules",
        node: 'NODE_2',
        speculated: true
      }]
    },
    {
      title: "Sunstalker Expansion",
      price: 60,
      contentType: CONTENT_TYPES.OLD_EXPANSION,
      addon: true,
      wave: 2,
      expansionNode: 'NODE_4',
      speculated: true,
      nodes: [{
        title: "Sunstalker",
        node: 'NODE_4',
        speculated: true
      }]
    },

    // New Extras
    { title: "2' x 3' Hard Plastic Showdown Board", price: 100, contentType: CONTENT_TYPES.NEW_EXTRA, addon: true, wave: 3 },
    { title: "Extra Hardcover 1.5 Core Game Rulebook", price: 40, contentType: CONTENT_TYPES.NEW_EXTRA, addon: true, wave: 3 },
    { title: "Death Dice", price: 18, contentType: CONTENT_TYPES.NEW_EXTRA, addon: true, wave: 3 },
    { title: "Frogdog T-Shirt", price: 25, contentType: CONTENT_TYPES.NEW_EXTRA, addon: true, wave: 3 },
    { title: "Gambler's Chest", price: 100, contentType: CONTENT_TYPES.NEW_EXTRA, addon: true, wave: 3 },
    { title: "Gambler's T-Shirt", price: 25, contentType: CONTENT_TYPES.NEW_EXTRA, addon: false, wave: 3 },
    { title: "Percival T-Shirt", price: 25, contentType: CONTENT_TYPES.NEW_EXTRA, addon: false, wave: 3 },
    { title: "Satan T-Shirt", price: 25, contentType: CONTENT_TYPES.NEW_EXTRA, addon: false, wave: 3 },
    { title: "Stone Face Insert Pack", price: 20, contentType: CONTENT_TYPES.NEW_EXTRA, addon: true, wave: 3 },
    { title: "Watcher T-Shirt", price: 25, contentType: CONTENT_TYPES.NEW_EXTRA, addon: false, wave: 3 },

    // Old Extras
    { title: 'Anna & Adam Explorers', price: undefined, contentType: CONTENT_TYPES.OLD_EXTRA, addon: false, wave: 3 },
    { title: "Satan Twins", price: 25, contentType: CONTENT_TYPES.OLD_EXTRA, addon: true, wave: 3 },
    { title: 'Percival', price: null, contentType: CONTENT_TYPES.EXCLUSIVE, addon: false, wave: 3 },

    // New Pinups
    { title: "Black Knight Armor", price: 15, contentType: CONTENT_TYPES.NEW_PINUP, addon: true, wave: 3 },
    { title: "Butcher", price: 15, contentType: CONTENT_TYPES.NEW_PINUP, addon: true, wave: 3 },
    { title: "Death Armor", price: 15, contentType: CONTENT_TYPES.NEW_PINUP, addon: true, wave: 3 },
    { title: "Disciple of the Witch", price: 15, contentType: CONTENT_TYPES.NEW_PINUP, addon: true, wave: 3 },
    { title: "Dragon Goblin", price: 15, contentType: CONTENT_TYPES.NEW_PINUP, addon: true, wave: 3 },
    { title: "Dung Ball", price: 15, contentType: CONTENT_TYPES.NEW_PINUP, addon: true, wave: 3 },
    { title: "Dung Beetle Dancer", price: 15, contentType: CONTENT_TYPES.NEW_PINUP, addon: true, wave: 3 },
    { title: "Dung Beetle Knight", price: 15, contentType: CONTENT_TYPES.NEW_PINUP, addon: true, wave: 3 },
    { title: "Faceless Survivor", price: 15, contentType: CONTENT_TYPES.NEW_PINUP, addon: true, wave: 3 },
    { title: "Frogdog Armor", price: 15, contentType: CONTENT_TYPES.NEW_PINUP, addon: true, wave: 3 },
    { title: "Gold Smoke Knight Armor", price: 15, contentType: CONTENT_TYPES.NEW_PINUP, addon: true, wave: 3 },
    { title: "Honeycomb Weaver", price: 15, contentType: CONTENT_TYPES.NEW_PINUP, addon: true, wave: 3 },
    { title: "Kingsman", price: 15, contentType: CONTENT_TYPES.NEW_PINUP, addon: true, wave: 3 },
    { title: "Male Dragon Goblin", price: 15, contentType: CONTENT_TYPES.NEW_PINUP, addon: true, wave: 3 },
    { title: "Male Dung Beetle Dancer", price: 15, contentType: CONTENT_TYPES.NEW_PINUP, addon: true, wave: 3 },
    { title: "Male Nightmare Ram Armor", price: 15, contentType: CONTENT_TYPES.NEW_PINUP, addon: true, wave: 3 },
    { title: "Male Screaming God Armor", price: 15, contentType: CONTENT_TYPES.NEW_PINUP, addon: true, wave: 3 },
    { title: "Male Twilight Knight", price: 15, contentType: CONTENT_TYPES.NEW_PINUP, addon: true, wave: 3 },
    { title: "Mountain Dungeon Armor", price: 15, contentType: CONTENT_TYPES.NEW_PINUP, addon: true, wave: 3 },
    { title: "Nightmare Ram Armor & Ramette", price: 15, contentType: CONTENT_TYPES.NEW_PINUP, addon: true, wave: 3 },
    { title: "Percival", price: 15, contentType: CONTENT_TYPES.NEW_PINUP, addon: true, wave: 3 },
    { title: "Pond Scum Armor", price: 15, contentType: CONTENT_TYPES.NEW_PINUP, addon: true, wave: 3 },
    { title: "Remastered Apotheosis", price: 15, contentType: CONTENT_TYPES.NEW_PINUP, addon: true, wave: 3 },
    { title: "Scout of Death", price: 15, contentType: CONTENT_TYPES.NEW_PINUP, addon: true, wave: 3 },
    { title: "Screaming God Armor", price: 15, contentType: CONTENT_TYPES.NEW_PINUP, addon: true, wave: 3 },
    { title: "Storm Knight Armor", price: 15, contentType: CONTENT_TYPES.NEW_PINUP, addon: true, wave: 3 },
    { title: "Twilight Deserter Knight", price: 15, contentType: CONTENT_TYPES.NEW_PINUP, addon: true, wave: 3 },

    // Old Pinups
    { title: 'Pinups of Death 1', price: 100, contentType: CONTENT_TYPES.OLD_PINUP, addon: true, wave: 3 },
    { title: 'Pinups of Death 2', price: 115, contentType: CONTENT_TYPES.OLD_PINUP, addon: true, wave: 3 },

    // New Promos
    { title: "Anonymous Survivor", price: 20, contentType: CONTENT_TYPES.NEW_PROMO, addon: true, wave: 3 },
    { title: "Role Survivors", price: 25, contentType: CONTENT_TYPES.NEW_PROMO, addon: true, wave: 3 },
    { title: "Super Survivors", price: 40, contentType: CONTENT_TYPES.NEW_PROMO, addon: true, wave: 3 },

    // Old Promos
    { title: "False Messengers", price: 60, contentType: CONTENT_TYPES.OLD_PROMO, addon: true, wave: 3 },
    { title: "Promos of Death", price: 125, contentType: CONTENT_TYPES.OLD_PROMO, addon: true, wave: 3 },

    // New Crossovers
    { title: "Death Drifter", price: 20, contentType: CONTENT_TYPES.NEW_CROSSOVER, addon: true, wave: 3 },
    { title: "Goth Amy, The Unraveling", price: 20, contentType: CONTENT_TYPES.NEW_CROSSOVER, addon: true, wave: 3 },
    { title: "LY3 Candy & Cola", price: 20, contentType: CONTENT_TYPES.NEW_CROSSOVER, addon: true, wave: 3 },
    { title: "Pathfinders of Death", price: 60, contentType: CONTENT_TYPES.NEW_CROSSOVER, addon: true, wave: 3 }
  ];

  const CAMPAIGN_NODES = {
    'NODE_1': {
      node_order: 1,
      title: "Node 1",
      description: "Expansions in this node represent a monster that can be hunted at the very start of the campaign.",
      lantern_year_min: 1,
      lantern_year_max: 1,
      core_game_monsters: ["White Lion"]
    },
    'NODE_2': {
      node_order: 2,
      title: "Node 2",
      description: "Expansions in this node contain content that can be utilized from as early as Lantern Year 2, and provides a good ramp to mid campaign content.",
      lantern_year_min: 2,
      lantern_year_max: 2,
      core_game_monsters: ["Screaming Antelope"]
    },
    'NEMESIS_1': {
      node_order: 3,
      title: "Nemesis Node 1",
      description: "Expansions in this node will visit and attack your settlement early in the game.",
      lantern_year_min: 4,
      lantern_year_max: 5,
      estimate: true,
      core_game_monsters: ["Butcher (speculated)"]
    },
    'NODE_3': {
      node_order: 4,
      title: "Node 3",
      description: "A campaign with experienced players might include two node 3's, provided they don't waste too much campaign time hunting too many low level monsters or losing against too many high level ones.",
      lantern_year_min: 5,
      lantern_year_max: 7,
      estimate: true,
      core_game_monsters: ["Phoenix"]
    },
    'NODE_4': {
      node_order: 6,
      title: "Node 4",
      description: "Introduces a very powerful monster that provides you with some top tier gear!  Node 4 monsters are very challenging and although they may appear early in the campaign, a under-prepared settlement will have a very hard time tackling them.",
      lantern_year_min: 8,
      lantern_year_max: 16,
      estimate: true,
      core_game_monsters: []
    },
    'NODE_5': {
      node_order: 7,
      title: "Node 5",
      description: "Expansions in this node are limited to ONE per campaign.",
      lantern_year_min: 13,
      lantern_year_max: 20,
      estimate: true,
      core_game_monsters: []
    },
    'NEMESIS_2': {
      node_order: 5,
      title: "Nemesis Node 2",
      description: "Unknown",
      lantern_year_min: 6,
      lantern_year_max: 6,
      estimate: true,
      core_game_monsters: ["King's Man (speculated)"]
    },
    'NEMESIS_3': {
      node_order: 8,
      title: "Nemesis Node 3",
      description: "Unknown",
      lantern_year_min: null,
      lantern_year_max: null,
      core_game_monsters: ["The Hand (speculated)"]
    }
  };

  const GAMBLERS_CHEST_ROLLS = [{
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
    title: "Kingdom Death 1-1 Penalty",
    type: "Penalty",
    mini: false,
    updateNumber: 14,
    contents: []
  }, {
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
    title: "Murderer Penalty",
    type: "Penalty",
    mini: false,
    updateNumber: 18,
    contents: []
  }, {
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
      title: "Hybrid Phoenix & Screaming Antelope Armor Set Card",
      type: "Armor Set Card",
      quantity: 1
    }, {
      title: "Beast Hunter Helm Rare Gear Card",
      type: "Gear Card",
      quantity: 1
    }]
  }, {
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
  }, {
    title: "Father & Son",
    type: "Narrative Sculpture",
    mini: true,
    updateNumber: 25,
    contents: [{
      title: "Father & Son",
      type: "Miniature",
      quantity: 1
    }, {
      title: "Unique Base Insert",
      type: "Base Insert",
      quantity: 1
    }, {
      title: "Fighting Art (Protect the Young Required)",
      type: "Fighting Art",
      quantity: 1
    }, {
      title: "Gear Card (Protect the Young Required)",
      type: "Gear Card",
      quantity: 1
    }]
  }, {
    title: "Cursed Spear",
    type: "Narrative Sculpture",
    mini: true,
    updateNumber: 26,
    contents: [{
      title: "Cursed Spear",
      type: "Miniature",
      quantity: 1
    }, {
      title: "Unique Base Insert",
      type: "Base Insert",
      quantity: 1
    }, {
      title: "King's Rule Philosophy",
      type: "Philosophy",
      quantity: 1
    }, {
      title: "Regal Armor",
      type: "Gear Card",
      quantity: 1
    }]
  }, {
    title: "Sprinter Armor",
    type: "Narrative Sculpture",
    mini: true,
    updateNumber: 27,
    contents: [{
      title: "Sprinter Armor",
      type: "Miniature",
      quantity: 1
    }, {
      title: "Unique Base Insert",
      type: "Base Insert",
      quantity: 1
    }, {
      title: "Hybrid White Lion & Screaming Antelope Armor Set Card",
      type: "Armor Set Card",
      quantity: 1
    }, {
      title: "Sprinter Armor Helm Gear Card",
      type: "Gear Card",
      quantity: 1
    }, {
      title: "Male Sprinter Armor Head",
      type: "Armor Kit Piece",
      quantity: 1
    }, {
      title: "Female Sprinter Armor Head",
      type: "Armor Kit Piece",
      quantity: 1
    }]
  }, {
    title: "Honorable Berserker",
    type: "Narrative Sculpture",
    mini: true,
    updateNumber: 28,
    contents: [{
      title: "Honorable Berserker",
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
      title: "Monster Trophy Gear Card",
      type: "Gear Card",
      quantity: 1
    }, {
      title: "Personal Oath Disorder",
      type: "Disorder",
      quantity: 1
    }]
  }, {
    title: "Female Scout of Death",
    type: "Narrative Sculpture",
    mini: true,
    updateNumber: 29,
    contents: [{
      title: "Female Scout of Death",
      type: "Miniature",
      quantity: 1
    }, {
      title: "Scout Upgrade Assets",
      type: "Game Assets",
      quantity: 1
    }, {
      title: "Scout Upgrade",
      type: "Advanced Rulebook Upgrade",
      quantity: 1
    }]
  }, {
    title: "Romantic Leyline Walker",
    type: "Narrative Sculpture",
    mini: true,
    updateNumber: 30,
    contents: [{
      title: "Romantic Leyline Walker",
      type: "Miniature",
      quantity: 1
    }, {
      title: "Romantic Only Gear",
      type: "Gear Card",
      quantity: 1,
      estimate: true
    }]
  }, {
    title: "Anna the Gourmet Hunter",
    type: "Narrative Sculpture",
    mini: true,
    updateNumber: 31,
    contents: [{
      title: "Anna the Gourmet Hunter",
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
      title: "Gear Card",
      type: "Gear Card",
      quantity: 1
    }, {
      title: "New Cooking Recipes",
      type: "Cooking Recipe",
      quantity: 1,
      estimate: true
    }]
  }, {
    title: "The Axerman Family",
    type: "Narrative Sculpture",
    mini: true,
    updateNumber: 32,
    contents: [{
      title: "Father Axerman",
      type: "Miniature",
      quantity: 1
    }, {
      title: "Mother Axerman",
      type: "Miniature",
      quantity: 1
    }, {
      title: "Baby Axerman",
      type: "Miniature",
      quantity: 1
    }]
  }, {
    title: "Atnas the Child-Eater",
    type: "Nemesis",
    mini: true,
    updateNumber: 32,
    contents: [{
      title: "Atnas the Child-Eater",
      type: "Miniature",
      quantity: 1
    }, {
      title: "Atnas Game Cards",
      type: "Game Card",
      quantity: 70,
      estimate: true
    }]
  }, {
    title: "Neko Twilight Knight",
    type: "Pinup",
    mini: true,
    updateNumber: 33,
    contents: [{
      title: "Neko Twilight Knight",
      type: "Miniature",
      quantity: 1
    }]
  }, {
    title: "White Lion Guys!",
    type: "Narrative Sculpture",
    mini: true,
    updateNumber: 34,
    contents: [{
      title: "White Lion Guy",
      type: "Miniature",
      quantity: 1
    }, {
      title: "White Lion Gal",
      type: "Miniature",
      quantity: 1
    }]
  }, {
    title: "Imitation Butcher Armor",
    type: "Narrative Sculpture",
    mini: true,
    updateNumber: 35,
    contents: [{
      title: "Imitation Butcher Armor",
      type: "Miniature",
      quantity: 1
    }, {
      title: "Unique Base Insert",
      type: "Base Insert",
      quantity: 1
    }, {
      title: "Hybrid Leather & Lantern Armor Set Card",
      type: "Armor Set Card",
      quantity: 1
    }, {
      title: "Imitation Butcher Mask Gear Card",
      type: "Gear Card",
      quantity: 1
    }, {
      title: "Male Imitation Butcher Armor Head",
      type: "Armor Kit Piece",
      quantity: 1
    }, {
      title: "Female Imitation Butcher Armor Head",
      type: "Armor Kit Piece",
      quantity: 1
    }, {
      title: "Ballad of the Butcher",
      type: "Settlement Event",
      quantity: 1
    }]
  }, {
    title: "Savage Bone Eaters",
    type: "Narrative Sculpture",
    mini: true,
    updateNumber: 36,
    contents:[{
      title: "Savage Bone Eater",
      type: "Miniature",
      quantity: 5
    }, {
      title: "New Resource Cards",
      type: "Resource Card",
      quantity: 1,
      estimate: true
    }, {
      title: "Settlement Event Card",
      type: "Settlement Event",
      quantity: 1
    }]
  }, {
    title: "Food Innovation Tree",
    type: "Innovation Tree",
    mini: false,
    updateNumber: 38,
    contents: [{
      title: "Innovation Cards",
      type: "Innovation Card",
      quantity: 5
    }, {
      title: "Food Innovation",
      type: "Advanced Rulebook Upgrade",
      quantity: 1
    }]
  }, {
    title: "Herb Gatherer",
    type: "Narrative Sculpture",
    mini: true,
    updateNumber: 38,
    contents: [{
      title: "Herb Gatherer",
      type: "Miniature",
      quantity: 1
    }, {
      title: "Unique Base Insert",
      type: "Base Insert",
      quantity: 1
    }, {
      title: "Gathering Philosophy",
      type: "Philosophy",
      quantity: 1
    }, {
      title: "Fighting Art",
      type: "Fighting Art",
      quantity: 1,
      estimate: true
    }, {
      title: "Gear Cards",
      type: "Gear Card",
      quantity: 1,
      estimate: true
    }]
  }, {
    title: "Murder Victim",
    type: "Narrative Sculpture",
    mini: true,
    updateNumber: 44,
    contents: [{
      title: "Dead Survivor",
      type: "Miniature",
      quantity: 1
    }, {
      title: "Murder Victim Disorder",
      type: "Disorder",
      quantity: 1
    }, {
      title: "New Terrain Card",
      type: "Terrain Card",
      quantity: 1
    }]
  }, {
    title: "Unknown Encounter Monster",
    type: "Encounter Monster",
    mini: true,
    updateNumber: 45,
    contents: [{
      title: "Unknown Encounter Monsters",
      type: "Encounter Monster",
      quantity: 3,
      estimate: true
    }]
  }, {
    title: "Tough Guy",
    type: "Narrative Sculpture",
    mini: true,
    updateNumber: 45,
    contents: [{
      title: "Herb Tough Guy",
      type: "Miniature",
      quantity: 1
    }, {
      title: "Unique Base Insert",
      type: "Base Insert",
      quantity: 1
    }, {
      title: "Gourmand Philosophy",
      type: "Philosophy",
      quantity: 1
    }, {
      title: "Fighting Art",
      type: "Fighting Art",
      quantity: 1
    }]
  }, {
    title: "Magma Masochist",
    type: "Narrative Sculpture",
    mini: true,
    updateNumber: 46,
    contents: [{
      title: "Transcended Masochist",
      type: "Miniature",
      quantity: 1
    }, {
      title: "Unique Base Insert",
      type: "Base Insert",
      quantity: 1
    }, {
      title: "Starbound Philosophy",
      type: "Philosophy",
      quantity: 1
    }, {
      title: "Fighting Art",
      type: "Fighting Art",
      quantity: 1
    }]
  }, {
    title: "Shadowstalker",
    type: "Narrative Sculpture",
    mini: true,
    updateNumber: 46,
    contents: [{
      title: "Shadowstalker",
      type: "Miniature",
      quantity: 1
    }, {
      title: "Unique Base Insert",
      type: "Base Insert",
      quantity: 1
    }, {
      title: "Shadowstalker Philosophy",
      type: "Philosophy",
      quantity: 1
    }, {
      title: "Fighting Art",
      type: "Fighting Art",
      quantity: 1
    }]
  }, {
    title: "Champion of the Goblin",
    type: "Narrative Sculpture",
    mini: true,
    updateNumber: 47,
    contents: [{
      title: "Champion of the Goblin",
      type: "Miniature",
      quantity: 1
    }, {
      title: "Unique Base Insert",
      type: "Base Insert",
      quantity: 1
    }, {
      title: "Champion Philosophy",
      type: "Philosophy",
      quantity: 1
    }, {
      title: "Fighting Art",
      type: "Fighting Art",
      quantity: 1
    }]
  }, {
    title: "Gambler Nemesis",
    type: "Nemesis",
    mini: true,
    updateNumber: 48,
    contents: [{
      title: "Gambler Nemesis",
      type: "Nemesis",
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

  KdmContentManager.prototype.getItemForGameType = function(gameType) {
    var itemTitle = GAME_TYPES[gameType];
    return _.find(this.getAllItems(), function(item) { return item.title === itemTitle; });
  };

  KdmContentManager.prototype.getAllItems = function() {
    return _.cloneDeep(ITEMS);
  };

  KdmContentManager.prototype.getAddOns = function() {
    return this.getAllItems().filter(function(item) { return item.addon; });
  };

  KdmContentManager.prototype.getAllMainComponents = function() {
    return this.getAllItems().filter(function(item) { return _.isEqual(item.contentType, CONTENT_TYPES.MAIN_COMPONENT); }).sort(itemSort);
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

  KdmContentManager.prototype.getAllOldPromos = function() {
    return this.getAllItems().filter(function(item) { return _.isEqual(item.contentType, CONTENT_TYPES.OLD_PROMO); }).sort(itemSort);
  };

  KdmContentManager.prototype.getAllNewCrossovers = function() {
    return this.getAllItems().filter(function(item) { return _.isEqual(item.contentType, CONTENT_TYPES.NEW_CROSSOVER); }).sort(itemSort);
  };

  KdmContentManager.prototype.getAllNewExtras = function() {
    return this.getAllItems().filter(function(item) { return _.isEqual(item.contentType, CONTENT_TYPES.NEW_EXTRA); }).sort(itemSort);
  };

  KdmContentManager.prototype.getAllOldExtras = function() {
    return this.getAllItems().filter(function(item) { return _.isEqual(item.contentType, CONTENT_TYPES.OLD_EXTRA); }).sort(itemSort);
  };

  KdmContentManager.prototype.getGamblersChestRolls = function() {
    return _.cloneDeep(GAMBLERS_CHEST_ROLLS);
  };

  KdmContentManager.prototype.getCampaignNodes = function() {
    const expansionsWithNodes = this.getAllItems().filter(function(item) { return !_.isEmpty(item.nodes); });
    const expansionsByCampaignNode = {};

    expansionsWithNodes.forEach(function(expansion) {
      expansion.nodes.forEach(function(node) {
        if (!expansionsByCampaignNode[node.node]) {
          expansionsByCampaignNode[node.node] = [];
        }

        expansionsByCampaignNode[node.node].push({
          title: node.title,
          new: expansion.contentType.new,
          speculated: node.speculated
        });
      });
    });

    return _.map(expansionsByCampaignNode, function(expansions, nodeTitle) {
      const expansionsByNewness = _.groupBy(expansions, 'new');
      const newExpansions = (expansionsByNewness['true'] || []).sort(itemSort);
      const oldExpansions = (expansionsByNewness['false'] || []).sort(itemSort);
      const campaignNode = CAMPAIGN_NODES[nodeTitle];
      const lanternYear = convertLanternYear(campaignNode);

      return {
        nodeNumber: nodeTitle,
        nodeOrder: campaignNode.node_order,
        title: campaignNode.title,
        description: campaignNode.description,
        lanternYear: lanternYear,
        estimate: campaignNode.estimate,
        newExpansions: newExpansions,
        oldExpansions: oldExpansions,
        coreMonsters: campaignNode.core_game_monsters
      };
    }).sort(sortCampaignNodesByNodeNumber);
  };

  KdmContentManager.prototype.containsRoleSurvivors = function(pledgeTitle) {
    return _.includes([
      "Ancient Gold Lantern",
      "Satan's Lantern",
      "Twin Satan's Lantern",
      "True Form Satan's Lantern",
      "Final Form Satan's Lantern",
      "God Frogdog"
    ], pledgeTitle);
  };

  function convertLanternYear(campaignNode) {
    if (campaignNode.lantern_year_min === campaignNode.lantern_year_max) {
      return campaignNode.lantern_year_min;
    } else {
      return campaignNode.lantern_year_min + ' - ' + campaignNode.lantern_year_max
    }
  }

  function sortCampaignNodesByNodeNumber(a, b) {
    return a.nodeOrder - b.nodeOrder;
  }

  function itemSort(a, b) {
    return a.title.localeCompare(b.title);
  }

  global.KdmContentManager = KdmContentManager;
})(window);
