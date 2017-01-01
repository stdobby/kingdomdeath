var kdm = (function(kdm) {
  'use strict';

  const or = kdm.utils.or;
  const and = kdm.utils.and;
  const not = kdm.utils.not;

  // TODO: fix all contains() methods
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
  const isRoleSurvivors = isItem('Role Survivors');
  const isCoreGame = isItem('1.5 Core Game');
  const isUpdatePack = isItem('1.5 Update Pack');
  const isGamblersChest = isItem('Gambler\'s Chest');

  const isNewContent = and(isNew, or(isExpansion, isPinup, isPromo));

  const satanContains = or(isCoreGame, isGamblersChest, isExpansion, and(isPinup, not(isRoleSurvivors)), isPromo, isItem('Satan T-Shirt'));
  const godFrogdogContains = or(isCoreGame, isGamblersChest, isExpansion, and(isPinup, not(isRoleSurvivors)), isPromo, isItem('Frogdog T-Shirt'));

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
    { title: "1.5 Core Game", type: "main", new: true, addOn: false, ksPrice: 250, retailPrice: 400, pureGameplay: true },
    { title: "1.5 Update Pack", type: "main", new: true, addOn: false, ksPrice: 60, retailPrice: null, pureGameplay: true },

    // New Crossovers
    { title: "LY3 Candy & Cola", type: "crossover", new: true, addOn: true, ksPrice: 20, retailPrice: null, pureGameplay: false },

    // New Expansions
    { title: "Black Knight", type: "expansion", new: true, addOn: true, ksPrice: 50, retailPrice: 75, pureGameplay: true },
    { title: "Campaigns of Death", type: "expansion", new: true, addOn: true, ksPrice: 40, retailPrice: 70, pureGameplay: true },
    { title: "Death Armor", type: "expansion", new: true, addOn: true, ksPrice: 20, retailPrice: 25, pureGameplay: true },
    { title: "Frogdog", type: "expansion", new: true, addOn: true, ksPrice: 50, retailPrice: 90, pureGameplay: true },
    { title: "Gryphon", type: "expansion", new: true, addOn: true, ksPrice: 75, retailPrice: 150, pureGameplay: true },
    { title: "Inverted Mountain Campaign", type: "expansion", new: true, addOn: true, ksPrice: 50, retailPrice: 80, pureGameplay: true },
    { title: "Nightmare Ram", type: "expansion", new: true, addOn: true, ksPrice: 40, retailPrice: 80, pureGameplay: true },
    { title: "Oblivion Mosquito", type: "expansion", new: true, addOn: true, ksPrice: 50, retailPrice: 90, pureGameplay: true },
    { title: "Pariah", type: "expansion", new: true, addOn: true, ksPrice: 40, retailPrice: 70, pureGameplay: true },
    { title: "Red Witches", type: "expansion", new: true, addOn: true, ksPrice: 40, retailPrice: 70, pureGameplay: true },
    { title: "Screaming God", type: "expansion", new: true, addOn: true, ksPrice: 50, retailPrice: 100, pureGameplay: true },
    { title: "The First Hero", type: "expansion", new: true, addOn: true, ksPrice: 35, retailPrice: 70, pureGameplay: true },

    // Old Expansions
    { title: "Dragon King", type: "expansion", new: false, addOn: true, ksPrice: 75, retailPrice: 150, pureGameplay: true },
    { title: "Dung Beetle Knight", type: "expansion", new: false, addOn: true, ksPrice: 30, retailPrice: 60, pureGameplay: true },
    { title: "Flower Knight", type: "expansion", new: false, addOn: true, ksPrice: 40, retailPrice: 60, pureGameplay: true },
    { title: "Gorm", type: "expansion", new: false, addOn: true, ksPrice: 50, retailPrice: 75, pureGameplay: true },
    { title: "Green Knight Armor", type: "expansion", new: false, addOn: true, ksPrice: 15, retailPrice: 25, pureGameplay: true },
    { title: "Lion Knight", type: "expansion", new: false, addOn: true, ksPrice: 35, retailPrice: 70, pureGameplay: true },
    { title: "Lion God", type: "expansion", new: false, addOn: false, ksPrice: null, retailPrice: null, pureGameplay: true }, // TODO:
    { title: "Lonely Tree", type: "expansion", new: false, addOn: true, ksPrice: 40, retailPrice: 75, pureGameplay: true },
    { title: "Manhunter", type: "expansion", new: false, addOn: true, ksPrice: 35, retailPrice: 60, pureGameplay: true },
    { title: "Slenderman", type: "expansion", new: false, addOn: true, ksPrice: 40, retailPrice: 60, pureGameplay: true },
    { title: "Spidicules", type: "expansion", new: false, addOn: true, ksPrice: 60, retailPrice: 100, pureGameplay: true },
    { title: "Sunstalker", type: "expansion", new: false, addOn: true, ksPrice: 60, retailPrice: 100, pureGameplay: true },

    // New Extras
    { title: "Extra Hardcover 1.5 Core Game Rulebook", type: "extra", new: true, addOn: true, ksPrice: 40, retailPrice: 60 },
    { title: "Frogdog T-Shirt", type: "extra", new: true, addOn: true, ksPrice: 25, retailPrice: null, pureGameplay: false },
    { title: "Gambler's Chest", type: "extra", new: true, addOn: true, ksPrice: 100, retailPrice: null, pureGameplay: true },
    { title: "Gambler's T-Shirt", type: "extra", new: true, addOn: false, ksPrice: 25, retailPrice: null, pureGameplay: false },
    { title: "Satan T-Shirt", type: "extra", new: true, addOn: false, ksPrice: 25, retailPrice: null, pureGameplay: false },

    // Old Extras
    { title: 'Anna & Adam Explorers', type: "extra", new: false, addOn: false, ksPrice: null, retailPrice: null, pureGameplay: false },
    { title: "Satan Twins", type: "extra", new: false, addOn: true, ksPrice: 25, retailPrice: null, pureGameplay: false },

    // New Pinups
    { title: "Black Knight Armor", type: "pinup", new: true, addOn: true, ksPrice: 15, retailPrice: 25, pureGameplay: false },
    { title: "Disciple of the Witch", type: "pinup", new: true, addOn: true, ksPrice: 15, retailPrice: 25, pureGameplay: false },
    { title: "Dung Ball", type: "pinup", new: true, addOn: true, ksPrice: 15, retailPrice: 25, pureGameplay: false },
    { title: "Dung Beetle Dancer", type: "pinup", new: true, addOn: true, ksPrice: 15, retailPrice: 25, pureGameplay: false },
    { title: "Dung Beetle Knight", type: "pinup", new: true, addOn: true, ksPrice: 15, retailPrice: 25, pureGameplay: false },
    { title: "Faceless Survivor", type: "pinup", new: true, addOn: true, ksPrice: 15, retailPrice: 25, pureGameplay: false },
    { title: "Frogdog Armor", type: "pinup", new: true, addOn: true, ksPrice: 15, retailPrice: 25, pureGameplay: false },
    { title: "Gold Smoke Knight Armor", type: "pinup", new: true, addOn: true, ksPrice: 15, retailPrice: 25, pureGameplay: false },
    { title: "Kingsman", type: "pinup", new: true, addOn: true, ksPrice: 15, retailPrice: 25, pureGameplay: false },
    { title: "Male Dung Beetle Dancer", type: "pinup", new: true, addOn: true, ksPrice: 15, retailPrice: 25, pureGameplay: false },
    { title: "Male Nightmare Ram Armor", type: "pinup", new: true, addOn: true, ksPrice: 15, retailPrice: 25, pureGameplay: false },
    { title: "Male Screaming God Armor", type: "pinup", new: true, addOn: true, ksPrice: 15, retailPrice: 25, pureGameplay: false },
    { title: "Male Twilight Knight", type: "pinup", new: true, addOn: true, ksPrice: 15, retailPrice: 25, pureGameplay: false },
    { title: "Nightmare Ram Armor & Ramette", type: "pinup", new: true, addOn: true, ksPrice: 15, retailPrice: 25, pureGameplay: false },
    { title: "Pond Scum Armor", type: "pinup", new: true, addOn: true, ksPrice: 15, retailPrice: 25, pureGameplay: false },
    { title: "Remastered Apotheosis", type: "pinup", new: true, addOn: true, ksPrice: 15, retailPrice: 25, pureGameplay: false },
    { title: "Screaming God Armor", type: "pinup", new: true, addOn: true, ksPrice: 15, retailPrice: 25, pureGameplay: false },

    // Old Pinups
    { title: 'Pinups of Death 1', type: "pinup", new: false, addOn: true, ksPrice: 100, retailPrice: null, pureGameplay: false },
    { title: 'Pinups of Death 2', type: "pinup", new: false, addOn: true, ksPrice: 115, retailPrice: null, pureGameplay: false },


    // New Promos
    { title: "Role Survivors", type: "promo", new: true, addOn: true, ksPrice: 25, retailPrice: null, pureGameplay: false },
    { title: "Super Survivors", type: "promo", new: true, addOn: true, ksPrice: 40, retailPrice: null, pureGameplay: false },

    // Old Promos
    { title: "False Messengers", type: "promo", new: false, addOn: true, ksPrice: 60, retailPrice: null, pureGameplay: false },
    { title: "Promos of Death", type: "promo", new: false, addOn: true, ksPrice: 125, retailPrice: null, pureGameplay: false }
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
