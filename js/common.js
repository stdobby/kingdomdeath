var kdm = (function(kdm) {
  'use strict';

  Vue.filter('currency', function(value) {
    return value ? '$' + value : '???';
  });

  Vue.filter('boolean', function(value) {
    return value ? 'Yes' : 'No';
  });

  Vue.filter('percentage', function(value) {
    return value ? value + '%' : '???';
  });

  var utils = kdm.utils = {};

  utils.isGamersContent = function(item) {
    if (_.includes(['Main Component', 'Expansion'], item.contentType.type)) {
      return true;
    } else if (_.includes(['Gambler\'s Chest'], item.title)) {
      return true;
    }
    return false;
  };

  utils.or = function() {
    const predicates = [...arguments];
    return function(x) {
      for (let i = 0; i < predicates.length; i++) {
        if (predicates[i](x)) { return true; }
      }
      return false;
    };
  };

  utils.and = function(p1, p2) {
    const predicates = [...arguments];
    return function(x) {
      for (let i = 0; i < predicates.length; i++) {
        if (!predicates[i](x)) { return false; }
      }
      return true;
    };
  };

  utils.not = function(p) {
    return function(x) {
      return !p(x);
    };
  };

  return kdm;
})(kdm || {});
