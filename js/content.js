var kdm = (function(kdm) {
  'use strict';

  const PLEDGES = [
    { pledgeLevel: "Add-On's Only", pledgeType: "addon", pledgePrice: 5 },
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

    // New Expansions
    { title: "Black Knight", type: "expansion", new: true, addon: true, ksPrice: 50 },
    { title: "Campaigns of Death", type: "expansion", new: true, addon: true, ksPrice: 40 },
    { title: "Death Armor", type: "expansion", new: true, addon: true, ksPrice: 20 },
    { title: "Frogdog", type: "expansion", new: true, addon: true, ksPrice: 50 },
    { title: "Gryphon", type: "expansion", new: true, addon: true, ksPrice: 75 },
    { title: "Inverted Mountain Campaign", type: "expansion", new: true, addon: true, ksPrice: 50 },
    { title: "Nightmare Ram", type: "expansion", new: true, addon: true, ksPrice: 40 },
    { title: "Oblivion Mosquito", type: "expansion", new: true, addon: true, ksPrice: 50 },
    { title: "Pariah", type: "expansion", new: true, addon: true, ksPrice: 40 },
    { title: "Red Witches", type: "expansion", new: true, addon: true, ksPrice: 40 },
    { title: "Screaming God", type: "expansion", new: true, addon: true, ksPrice: 50 },
    { title: "The First Hero", type: "expansion", new: true, addon: true, ksPrice: 35 }

    // Old Expansions
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
