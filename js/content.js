var kdm = (function(kdm) {
  'use strict';

  const PLEDGES = [
    { pledgeLevel: "Add-On's Only", pledgeType: "addOn", pledgePrice: 5 },
    { pledgeLevel: "Lantern Upgrade", pledgeType: "update", pledgePrice: 60 },
    { pledgeLevel: "Silver Lantern", pledgeType: "update", pledgePrice: 195 },
    { pledgeLevel: "Lantern", pledgeType: "core", pledgePrice: 250 },
    { pledgeLevel: "Gold Lantern", pledgeType: "core", pledgePrice: 350 },
    { pledgeLevel: "Ancient Gold Lantern", pledgeType: "core", pledgePrice: 750 },
    { pledgeLevel: "Black Friday Lantern Upgrade", pledgeType: "update", pledgePrice: 50 },
    { pledgeLevel: "Black Friday Silver Lantern", pledgeType: "update", pledgePrice: 185 },
    { pledgeLevel: "Black Friday Lantern", pledgeType: "core", pledgePrice: 200 },
    { pledgeLevel: "Black Friday Gold Lantern", pledgeType: "core", pledgePrice: 300 },
    { pledgeLevel: "Black Friday Gambler's Lantern", pledgeType: "update", pledgePrice: 777 },
    { pledgeLevel: "Frogdog", pledgeType: "update", pledgePrice: 1000 },
    { pledgeLevel: "Black Friday Gambler's Lantern 2nd Face", pledgeType: "core", pledgePrice: 927 },
    { pledgeLevel: "Satan's Lantern", pledgeType: "core", pledgePrice: 1666 },
    { pledgeLevel: "Twin Satan's Lantern", pledgeType: "core", pledgePrice: 1666 },
    { pledgeLevel: "True Form Satan's Lantern", pledgeType: "core", pledgePrice: 1666 },
    { pledgeLevel: "Final Form Satan's Lantern", pledgeType: "core", pledgePrice: 1666 },
    { pledgeLevel: "God Frogdog", pledgeType: "core", pledgePrice: 2000 }
  ];

  const ITEMS = [
    // Main Components
    { title: "1.5 Core Game" },
    { title: "1.5 Update Pack" },

    // New Crossovers
    { title: "LY3 Candy & Cola", type: "crossover", new: true, addOn: true, ksPrice: 20, retailPrice: null },

    // New Expansions
    { title: "Black Knight", type: "expansion", new: true, addOn: true, ksPrice: 50, retailPrice: 75 },
    { title: "Campaigns of Death", type: "expansion", new: true, addOn: true, ksPrice: 40, retailPrice: 70 },
    { title: "Death Armor", type: "expansion", new: true, addOn: true, ksPrice: 20, retailPrice: 25 },
    { title: "Frogdog", type: "expansion", new: true, addOn: true, ksPrice: 50, retailPrice: 90 },
    { title: "Gryphon", type: "expansion", new: true, addOn: true, ksPrice: 75, retailPrice: 150 },
    { title: "Inverted Mountain Campaign", type: "expansion", new: true, addOn: true, ksPrice: 50, retailPrice: 80 },
    { title: "Nightmare Ram", type: "expansion", new: true, addOn: true, ksPrice: 40, retailPrice: 80 },
    { title: "Oblivion Mosquito", type: "expansion", new: true, addOn: true, ksPrice: 50, retailPrice: 90 },
    { title: "Pariah", type: "expansion", new: true, addOn: true, ksPrice: 40, retailPrice: 70 },
    { title: "Red Witches", type: "expansion", new: true, addOn: true, ksPrice: 40, retailPrice: 70 },
    { title: "Screaming God", type: "expansion", new: true, addOn: true, ksPrice: 50, retailPrice: 100 },
    { title: "The First Hero", type: "expansion", new: true, addOn: true, ksPrice: 35, retailPrice: 70 },

    // Old Expansions
    { title: "Dragon King", type: "expansion", new: false, addOn: true, ksPrice: 75, retailPrice: 150 },
    { title: "Dung Beetle Knight", type: "expansion", new: false, addOn: true, ksPrice: 30, retailPrice: 60 },
    { title: "Flower Knight", type: "expansion", new: false, addOn: true, ksPrice: 40, retailPrice: 60 },
    { title: "Gorm", type: "expansion", new: false, addOn: true, ksPrice: 50, retailPrice: 75 },
    { title: "Green Knight Armor", type: "expansion", new: false, addOn: true, ksPrice: 15, retailPrice: 25 },
    { title: "Lion Knight", type: "expansion", new: false, addOn: true, ksPrice: 35, retailPrice: 70 },
    { title: "Lion God", type: "expansion", new: false, addOn: false, ksPrice: null, retailPrice: null }, // TODO:
    { title: "Lonely Tree", type: "expansion", new: false, addOn: true, ksPrice: 40, retailPrice: 75 },
    { title: "Manhunter", type: "expansion", new: false, addOn: true, ksPrice: 35, retailPrice: 60 },
    { title: "Slenderman", type: "expansion", new: false, addOn: true, ksPrice: 40, retailPrice: 60 },
    { title: "Spidicules", type: "expansion", new: false, addOn: true, ksPrice: 60, retailPrice: 100 },
    { title: "Sunstalker", type: "expansion", new: false, addOn: true, ksPrice: 60, retailPrice: 100 },

    // New Extras
    { title: "Extra Hardcover 1.5 Core Game Rulebook", type: "extra", new: true, addOn: true, ksPrice: 40, retailPrice: 60 },
    { title: "Frogdog T-Shirt", type: "extra", new: true, addOn: true, ksPrice: 25, retailPrice: null },
    { title: "Gambler's Chest", type: "extra", new: true, addOn: true, ksPrice: 100, retailPrice: null },
    { title: "Gambler's T-Shirt", type: "extra", new: true, addOn: false, ksPrice: 25, retailPrice: null },
    { title: "Satan T-Shirt", type: "extra", new: true, addOn: false, ksPrice: 25, retailPrice: null },

    // Old Extras
    { title: 'Anna & Adam Explorers', type: "extra", new: false, addOn: false, ksPrice: null, retailPrice: null },
    { title: "Satan Twins", type: "extra", new: false, addOn: true, ksPrice: 25, retailPrice: null },

    // New Pinups
    { title: "Black Knight Armor", type: "pinup", new: true, addOn: true, ksPrice: 15, retailPrice: 25 },
    { title: "Disciple of the Witch", type: "pinup", new: true, addOn: true, ksPrice: 15, retailPrice: 25 },
    { title: "Dung Ball", type: "pinup", new: true, addOn: true, ksPrice: 15, retailPrice: 25 },
    { title: "Dung Beetle Dancer", type: "pinup", new: true, addOn: true, ksPrice: 15, retailPrice: 25 },
    { title: "Dung Beetle Knight", type: "pinup", new: true, addOn: true, ksPrice: 15, retailPrice: 25 },
    { title: "Faceless Survivor", type: "pinup", new: true, addOn: true, ksPrice: 15, retailPrice: 25 },
    { title: "Frogdog Armor", type: "pinup", new: true, addOn: true, ksPrice: 15, retailPrice: 25 },
    { title: "Gold Smoke Knight Armor", type: "pinup", new: true, addOn: true, ksPrice: 15, retailPrice: 25 },
    { title: "Kingsman", type: "pinup", new: true, addOn: true, ksPrice: 15, retailPrice: 25 },
    { title: "Male Dung Beetle Dancer", type: "pinup", new: true, addOn: true, ksPrice: 15, retailPrice: 25 },
    { title: "Male Nightmare Ram Armor", type: "pinup", new: true, addOn: true, ksPrice: 15, retailPrice: 25 },
    { title: "Male Screaming God Armor", type: "pinup", new: true, addOn: true, ksPrice: 15, retailPrice: 25 },
    { title: "Male Twilight Knight", type: "pinup", new: true, addOn: true, ksPrice: 15, retailPrice: 25 },
    { title: "Nightmare Ram Armor & Ramette", type: "pinup", new: true, addOn: true, ksPrice: 15, retailPrice: 25 },
    { title: "Pond Scum Armor", type: "pinup", new: true, addOn: true, ksPrice: 15, retailPrice: 25 },
    { title: "Remastered Apotheosis", type: "pinup", new: true, addOn: true, ksPrice: 15, retailPrice: 25 },
    { title: "Screaming God Armor", type: "pinup", new: true, addOn: true, ksPrice: 15, retailPrice: 25 },

    // Old Pinups
    { title: 'Pinups of Death 1', type: "pinup", new: false, addOn: true, ksPrice: 100, retailPrice: null },
    { title: 'Pinups of Death 2', type: "pinup", new: false, addOn: true, ksPrice: 115, retailPrice: null },


    // New Promos
    { title: "Role Survivors", type: "promo", new: true, addOn: true, ksPrice: 25, retailPrice: null },
    { title: "Super Survivors", type: "promo", new: true, addOn: true, ksPrice: 40, retailPrice: null },

    // Old Promos
    { title: "False Messengers", type: "promo", new: false, addOn: true, ksPrice: 60, retailPrice: null },
    { title: "Promos of Death", type: "promo", new: false, addOn: true, ksPrice: 125, retailPrice: null }
  ];

  var content = kdm.content = {};

  content.getPledges = function() {
    return _.sortBy(_.cloneDeep(PLEDGES), 'pledgePrice');
  };

  content.getItems = function() {
    return _.cloneDeep(ITEMS);
  };

  return kdm;
})(kdm || {});
