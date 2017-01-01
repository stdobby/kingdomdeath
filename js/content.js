var kdm = (function(kdm) {
  'use strict';

  const or = kdm.utils.or;
  const and = kdm.utils.and;
  const not = kdm.utils.not;

  const isNew = function(item) { return item.new === true; };
  const isType = function(type) {
    return function(item) {
      return item.type === type;
    };
  };
  const isItem = function(title) {
    return function(item) {
      return item.title === title;
    };
  };
  const isExpansion = isType('expansion');
  const isNewExpansion = and(isNew, isExpansion);
  const isOldExpansion = and(not(isNew), isExpansion);
  const isPinup = isType('pinup');
  const isPromo = isType('promo');
  const isExtra = isType('extra');
  const isRoleSurvivors = isItem('Role Survivors');
  const isCoreGame = isItem('1.5 Core Game');
  const isUpdatePack = isItem('1.5 Update Pack');
  const isGamblersChest = isItem('Gambler\'s Chest');

  const isNewContent = and(isNew, or(isExpansion, isPinup, isPromo));

  const satanContains = or(isCoreGame, isGamblersChest, isExpansion, and(not(isNew), isExtra), and(isPromo, not(isRoleSurvivors)), isPinup, isItem('Satan T-Shirt'));
  const godFrogdogContains = or(isCoreGame, isGamblersChest, isExpansion, and(not(isNew), isExtra), and(isPromo, not(isRoleSurvivors)), isPinup, isItem('Frogdog T-Shirt'));

  const PLEDGES = [
    { pledgeLevel: "Add-On's Only", pledgeType: "addOn", pledgePrice: 5 },
    { pledgeLevel: "Lantern Upgrade", pledgeType: "update", pledgePrice: 60, contains: isUpdatePack },
    { pledgeLevel: "Silver Lantern", pledgeType: "update", pledgePrice: 195, contains: or(isUpdatePack, isGamblersChest, isItem('The First Hero')) },
    { pledgeLevel: "Lantern", pledgeType: "core", pledgePrice: 250, contains: isCoreGame },
    { pledgeLevel: "Gold Lantern", pledgeType: "core", pledgePrice: 350, contains: or(isCoreGame, isGamblersChest) },
    { pledgeLevel: "Ancient Gold Lantern", pledgeType: "core", pledgePrice: 750, contains: or(isCoreGame, isGamblersChest, isOldExpansion) },
    { pledgeLevel: "Black Friday Lantern Upgrade", pledgeType: "update", pledgePrice: 50, contains: isUpdatePack },
    { pledgeLevel: "Black Friday Silver Lantern", pledgeType: "update", pledgePrice: 185, contains: or(isUpdatePack, isGamblersChest, isItem('The First Hero')) },
    { pledgeLevel: "Black Friday Lantern", pledgeType: "core", pledgePrice: 200, contains: isCoreGame },
    { pledgeLevel: "Black Friday Gold Lantern", pledgeType: "core", pledgePrice: 300, contains: or(isCoreGame, isGamblersChest) },
    { pledgeLevel: "Black Friday Gambler's Lantern", pledgeType: "update", pledgePrice: 777, contains: or(isUpdatePack, isGamblersChest, isNewContent, isItem('Gambler\'s T-Shirt')) },
    { pledgeLevel: "Frogdog", pledgeType: "update", pledgePrice: 1000, contains: or(isUpdatePack, isGamblersChest, isNewContent, isItem('Frogdog T-Shirt')) },
    { pledgeLevel: "Black Friday Gambler's Lantern 2nd Face", pledgeType: "core", pledgePrice: 927, contains: or(isCoreGame, isGamblersChest, isNewContent, isItem('Gambler\'s T-Shirt')) },
    { pledgeLevel: "Satan's Lantern", pledgeType: "core", pledgePrice: 1666, contains: satanContains },
    { pledgeLevel: "Twin Satan's Lantern", pledgeType: "core", pledgePrice: 1666, contains: satanContains },
    { pledgeLevel: "True Form Satan's Lantern", pledgeType: "core", pledgePrice: 1666, contains: satanContains },
    { pledgeLevel: "Final Form Satan's Lantern", pledgeType: "core", pledgePrice: 1666, contains: satanContains },
    { pledgeLevel: "God Frogdog", pledgeType: "core", pledgePrice: 2000, contains: godFrogdogContains }
  ];

  const ITEMS = [
    // Main Components
    { title: "1.5 Core Game", type: "main", new: true, addOn: false, ksPrice: 250, retailPrice: 400, pureGameplay: true, shippingWave: 1 },
    { title: "1.5 Update Pack", type: "main", new: true, addOn: false, ksPrice: 60, retailPrice: null, pureGameplay: true, shippingWave: 1 },

    // New Crossovers
    { title: "LY3 Candy & Cola", type: "crossover", new: true, addOn: true, ksPrice: 20, retailPrice: null, pureGameplay: false, shippingWave: 3 },

    // New Expansions
    { title: "Black Knight", type: "expansion", new: true, addOn: true, ksPrice: 50, retailPrice: 75, pureGameplay: true, shippingWave: 4 },
    { title: "Campaigns of Death", type: "expansion", new: true, addOn: true, ksPrice: 40, retailPrice: 70, pureGameplay: true, shippingWave: 4 },
    { title: "Death Armor", type: "expansion", new: true, addOn: true, ksPrice: 20, retailPrice: 25, pureGameplay: true, shippingWave: 4 },
    { title: "Frogdog", type: "expansion", new: true, addOn: true, ksPrice: 50, retailPrice: 90, pureGameplay: true, shippingWave: 4 },
    { title: "Gryphon", type: "expansion", new: true, addOn: true, ksPrice: 75, retailPrice: 150, pureGameplay: true, shippingWave: 4 },
    { title: "Inverted Mountain Campaign", type: "expansion", new: true, addOn: true, ksPrice: 50, retailPrice: 80, pureGameplay: true, shippingWave: 4 },
    { title: "Nightmare Ram", type: "expansion", new: true, addOn: true, ksPrice: 40, retailPrice: 80, pureGameplay: true, shippingWave: 4 },
    { title: "Oblivion Mosquito", type: "expansion", new: true, addOn: true, ksPrice: 50, retailPrice: 90, pureGameplay: true, shippingWave: 4 },
    { title: "Pariah", type: "expansion", new: true, addOn: true, ksPrice: 40, retailPrice: 70, pureGameplay: true, shippingWave: 4 },
    { title: "Red Witches", type: "expansion", new: true, addOn: true, ksPrice: 40, retailPrice: 70, pureGameplay: true, shippingWave: 4 },
    { title: "Screaming God", type: "expansion", new: true, addOn: true, ksPrice: 50, retailPrice: 100, pureGameplay: true, shippingWave: 4 },
    { title: "The First Hero", type: "expansion", new: true, addOn: true, ksPrice: 35, retailPrice: 70, pureGameplay: true, shippingWave: 4 },

    // Old Expansions
    { title: "Dragon King", type: "expansion", new: false, addOn: true, ksPrice: 75, retailPrice: 150, pureGameplay: true, shippingWave: 2 },
    { title: "Dung Beetle Knight", type: "expansion", new: false, addOn: true, ksPrice: 30, retailPrice: 60, pureGameplay: true, shippingWave: 2 },
    { title: "Flower Knight", type: "expansion", new: false, addOn: true, ksPrice: 40, retailPrice: 60, pureGameplay: true, shippingWave: 2 },
    { title: "Gorm", type: "expansion", new: false, addOn: true, ksPrice: 50, retailPrice: 75, pureGameplay: true, shippingWave: 2 },
    { title: "Green Knight Armor", type: "expansion", new: false, addOn: true, ksPrice: 15, retailPrice: 25, pureGameplay: true, shippingWave: 2 },
    { title: "Lion Knight", type: "expansion", new: false, addOn: true, ksPrice: 35, retailPrice: 70, pureGameplay: true, shippingWave: 2 },
    { title: "Lion God", type: "expansion", new: false, addOn: false, ksPrice: null, retailPrice: null, pureGameplay: true, shippingWave: 2 }, // TODO:
    { title: "Lonely Tree", type: "expansion", new: false, addOn: true, ksPrice: 40, retailPrice: 75, pureGameplay: true, shippingWave: 2 },
    { title: "Manhunter", type: "expansion", new: false, addOn: true, ksPrice: 35, retailPrice: 60, pureGameplay: true, shippingWave: 2 },
    { title: "Slenderman", type: "expansion", new: false, addOn: true, ksPrice: 40, retailPrice: 60, pureGameplay: true, shippingWave: 2 },
    { title: "Spidicules", type: "expansion", new: false, addOn: true, ksPrice: 60, retailPrice: 100, pureGameplay: true, shippingWave: 2 },
    { title: "Sunstalker", type: "expansion", new: false, addOn: true, ksPrice: 60, retailPrice: 100, pureGameplay: true, shippingWave: 2 },

    // New Extras
    { title: "Extra Hardcover 1.5 Core Game Rulebook", type: "extra", new: true, addOn: true, ksPrice: 40, retailPrice: 60, shippingWave: 3 },
    { title: "Frogdog T-Shirt", type: "extra", new: true, addOn: true, ksPrice: 25, retailPrice: null, pureGameplay: false, shippingWave: 3 },
    { title: "Gambler's Chest", type: "extra", new: true, addOn: true, ksPrice: 100, retailPrice: null, pureGameplay: true, shippingWave: 3 },
    { title: "Gambler's T-Shirt", type: "extra", new: true, addOn: false, ksPrice: 25, retailPrice: null, pureGameplay: false, shippingWave: 3 },
    { title: "Satan T-Shirt", type: "extra", new: true, addOn: false, ksPrice: 25, retailPrice: null, pureGameplay: false, shippingWave: 3 },

    // Old Extras
    { title: 'Anna & Adam Explorers', type: "extra", new: false, addOn: false, ksPrice: null, retailPrice: null, pureGameplay: false, shippingWave: 3 },
    { title: "Satan Twins", type: "extra", new: false, addOn: true, ksPrice: 25, retailPrice: null, pureGameplay: false, shippingWave: 3 },

    // New Pinups
    { title: "Black Knight Armor", type: "pinup", new: true, addOn: true, ksPrice: 15, retailPrice: 25, pureGameplay: false, shippingWave: 3 },
    { title: "Disciple of the Witch", type: "pinup", new: true, addOn: true, ksPrice: 15, retailPrice: 25, pureGameplay: false, shippingWave: 3 },
    { title: "Dung Ball", type: "pinup", new: true, addOn: true, ksPrice: 15, retailPrice: 25, pureGameplay: false, shippingWave: 3 },
    { title: "Dung Beetle Dancer", type: "pinup", new: true, addOn: true, ksPrice: 15, retailPrice: 25, pureGameplay: false, shippingWave: 3 },
    { title: "Dung Beetle Knight", type: "pinup", new: true, addOn: true, ksPrice: 15, retailPrice: 25, pureGameplay: false, shippingWave: 3 },
    { title: "Faceless Survivor", type: "pinup", new: true, addOn: true, ksPrice: 15, retailPrice: 25, pureGameplay: false, shippingWave: 3 },
    { title: "Frogdog Armor", type: "pinup", new: true, addOn: true, ksPrice: 15, retailPrice: 25, pureGameplay: false, shippingWave: 3 },
    { title: "Gold Smoke Knight Armor", type: "pinup", new: true, addOn: true, ksPrice: 15, retailPrice: 25, pureGameplay: false, shippingWave: 3 },
    { title: "Kingsman", type: "pinup", new: true, addOn: true, ksPrice: 15, retailPrice: 25, pureGameplay: false, shippingWave: 3 },
    { title: "Male Dung Beetle Dancer", type: "pinup", new: true, addOn: true, ksPrice: 15, retailPrice: 25, pureGameplay: false, shippingWave: 3 },
    { title: "Male Nightmare Ram Armor", type: "pinup", new: true, addOn: true, ksPrice: 15, retailPrice: 25, pureGameplay: false, shippingWave: 3 },
    { title: "Male Screaming God Armor", type: "pinup", new: true, addOn: true, ksPrice: 15, retailPrice: 25, pureGameplay: false, shippingWave: 3 },
    { title: "Male Twilight Knight", type: "pinup", new: true, addOn: true, ksPrice: 15, retailPrice: 25, pureGameplay: false, shippingWave: 3 },
    { title: "Nightmare Ram Armor & Ramette", type: "pinup", new: true, addOn: true, ksPrice: 15, retailPrice: 25, pureGameplay: false, shippingWave: 3 },
    { title: "Pond Scum Armor", type: "pinup", new: true, addOn: true, ksPrice: 15, retailPrice: 25, pureGameplay: false, shippingWave: 3 },
    { title: "Remastered Apotheosis", type: "pinup", new: true, addOn: true, ksPrice: 15, retailPrice: 25, pureGameplay: false, shippingWave: 3 },
    { title: "Screaming God Armor", type: "pinup", new: true, addOn: true, ksPrice: 15, retailPrice: 25, pureGameplay: false, shippingWave: 3 },

    // Old Pinups
    { title: 'Pinups of Death 1', type: "pinup", new: false, addOn: true, ksPrice: 100, retailPrice: null, pureGameplay: false, shippingWave: 3 },
    { title: 'Pinups of Death 2', type: "pinup", new: false, addOn: true, ksPrice: 115, retailPrice: null, pureGameplay: false, shippingWave: 3 },


    // New Promos
    { title: "Role Survivors", type: "promo", new: true, addOn: true, ksPrice: 25, retailPrice: null, pureGameplay: false, shippingWave: 3 },
    { title: "Super Survivors", type: "promo", new: true, addOn: true, ksPrice: 40, retailPrice: null, pureGameplay: false, shippingWave: 3 },

    // Old Promos
    { title: "False Messengers", type: "promo", new: false, addOn: true, ksPrice: 60, retailPrice: null, pureGameplay: false, shippingWave: 3 },
    { title: "Promos of Death", type: "promo", new: false, addOn: true, ksPrice: 125, retailPrice: null, pureGameplay: false, shippingWave: 3 }
  ];

  const DISPLAY_TYPES = {
    crossover: "Crossovers",
    expansion: "Expansions",
    extra: "Extras",
    pinup: "Pinups",
    promo: "Promos"
  };

  var content = kdm.content = {};

  content.getPledges = function() {
    return _.sortBy(_.cloneDeep(PLEDGES), 'pledgePrice');
  };

  content.getItems = function() {
    return _.cloneDeep(ITEMS);
  };

  content.getDisplayTypes = function() {
    return _.cloneDeep(DISPLAY_TYPES);
  };

  return kdm;
})(kdm || {});
