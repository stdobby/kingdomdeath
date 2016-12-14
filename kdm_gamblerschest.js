(function(global) {
  'use strict';

  const rollsTemplate = _.template(
      '<table class="table table-bordered table-condensed">'
    +   '<thead>'
    +     '<tr>'
    +       '<th>Chest Numbers</th>'
    +       '<th>Item</th>'
    +       '<th>Type</th>'
    +       '<th>Content</th>'
    +       '<th>Update</th>'
    +     '</tr>'
    +   '</thead>'
    +   '<tbody>'
    +     '<% rolls.forEach(function(roll) { %>'
    +       '<tr>'
    +         '<td><%= roll.chestRange %></td>'
    +         '<td><%= roll.title %></td>'
    +         '<td><%= roll.type %></td>'
    +         '<td>'
    +           '<ul>'
    +             '<% roll.contents.forEach(function(content) { %>'
    +             '<li><%= content.title %> (<%= content.type %>) x <%= content.quantity ? content.quantity : "???" %></li>'
    +             '<% }) %>'
    +           '</ul>'
    +         '</td>'
    +         '<td><%= roll.updateNumber %></td>'
    +       '</tr>'
    +     '<% }) %>'
    +   '</tbody>'
    + '</table>'
  );

  const breakdownTemplate = _.template(
      '<table class="table table-bordered table-condensed">'
    +   '<thead>'
    +     '<tr>'
    +       '<th>Quantity</th>'
    +       '<th>Type</th>'
    +       '<th>Contents</th>'
    +     '</tr>'
    +   '</thead>'
    +   '<tbody>'
    +     '<% contentTypes.forEach(function(contentType) { %>'
    +       '<tr>'
    +         '<td><%= contentType.quantity %></td>'
    +         '<td><%= contentType.type %></td>'
    +         '<td>'
    +           '<ul>'
    +             '<% contentType.items.forEach(function(item) { %>'
    +             '<li><%= item %></li>'
    +             '<% }) %>'
    +           '</ul>'
    +         '</td>'
    +       '</tr>'
    +     '<% }) %>'
    +   '</tbody>'
    + '</table>'
  );

  function KdmGamblersChest(wrapperEl) {
    this.$wrapperEl = $(wrapperEl);
    this.contentManager = new KdmContentManager();
    this.rolls = this.contentManager.getGamblersChestRolls();
  }

  KdmGamblersChest.prototype.initialize = function() {
    this.initializeRolls();
    this.initializeBreakdown();
  };

  KdmGamblersChest.prototype.initializeRolls = function() {
    const sortedRolls = _.sortBy(this.rolls, 'rollResultMin');
    const convertedRolls = sortedRolls.map(function(roll) {
      var chestRange = null;
      if (roll.rollResultMin) {
        if (roll.rollResultMin === roll.rollResultMax) {
          chestRange = roll.rollResultMin;
        } else {
          chestRange = roll.rollResultMin + ' - ' + roll.rollResultMax;
        }
      } else {
        chestRange = '-';
      }
      return {
        chestRange: chestRange,
        title: roll.title,
        type: roll.type,
        contents: _.sortBy(roll.contents, 'title'),
        updateNumber: roll.updateNumber ? roll.updateNumber : "Release"
      };
    });
    this.$wrapperEl.find('.gamblers-chest-rolls').html(rollsTemplate({
      rolls: convertedRolls
    }));
  };

  KdmGamblersChest.prototype.initializeBreakdown = function() {
    const updatedRolls = _.map(_.cloneDeep(this.rolls), function(roll) {
      roll.contents.forEach(function(content) {
        content.rollTitle = roll.title;
      });
      return roll;
    });
    const allContents = _.flatMap(updatedRolls, 'contents');
    const allContentsByType = _.groupBy(allContents, 'type');
    const contentTypes = _.map(allContentsByType, function(contents, type) {
      const contentsWithQuantity = contents.filter(function(content) { return content.quantity; });
      const totalQuantity = _.sumBy(contentsWithQuantity, 'quantity') || '???';
      const contentTitles = _.map(contents, function(content) {
        return content.title + ' (' + content.rollTitle + ')';
      }).sort();
      return {
        type: type,
        quantity: totalQuantity,
        items: contentTitles
      };
    });
    this.$wrapperEl.find('.gamblers-chest-breakdown').html(breakdownTemplate({
      contentTypes: contentTypes
    }));
  };

  var $wrapperEl = $('#gamblerschest');
  var gamblersChest = new KdmGamblersChest($wrapperEl);

  gamblersChest.initialize();
})(window);
