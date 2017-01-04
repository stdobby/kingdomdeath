(function(global) {
  'use strict';

  const $comparatorWrapper = $('#comparator');

  const questionnaireTemplate = _.template(
      '<form class="form-horizontal">'
    +  '<div class="form-group">'
    +   '<label for="gameType" class="control-label col-md-4">To play the game I need to purchase</label>'
    +   '<div class="col-md-4">'
    +    '<select class="form-control" data-type="gameType">'
    +     '<option value="core_game">the Core Game</option>'
    +     '<option value="update_pack">the Update Pack</option>'
    +     '<option value="none">nothing</option>'
    +    '</select>'
    +   '</div>'
    +  '</div>'
    +  '<div class="form-group">'
    +   '<label for="gamblersChest" class="control-label col-md-4">Do you want the Gambler\'s Chest?</label>'
    +   '<div class="col-md-4">'
    +    '<select class="form-control" data-type="gamblersChest">'
    +     '<option value="yes">Yes</option>'
    +     '<option value="no">No</option>'
    +    '</select>'
    +   '</div>'
    +  '</div>'
    +  '<% addOnGroups.forEach(function(addOnGroup) { %>'
    +    '<hr />'
    +    '<div class="form-group">'
    +      '<div class="col-md-offset-4 cold-md-8 select-all-checkbox">'
    +        '<label class="checkbox-inline">'
    +          '<input type="checkbox" data-type="select_all" data-target="<%= addOnGroup.contentType %>"> Select/Unselect All'
    +        '</label>'
    +      '</div>'
    +    '</div>'
    +    '<div class="form-group">'
    +      '<label for="<%= addOnGroup.contentType %>" class="control-label col-md-4">The <span class="question-content-type"><%= addOnGroup.contentDisplayType %></span> I would like are</label>'
    +      '<div class="col-md-8 checkbox-columns">'
    +        '<% addOnGroup.addOns.forEach(function(addOn) { %>'
    +          '<label class="checkbox-inline" for="<%= addOn.title %>">'
    +            '<input type="checkbox" data-type="addon" name="<%= addOnGroup.contentType %>" id="<%= addOn.title %>" value="<%= addOn.title %>"><%= addOn.title %>'
    +          '</label>'
    +        '<% }) %>'
    +      '</div>'
    +    '</div>'
    +  '<% }) %>'
  );

  const resultsTemplate = _.template(
      '<table class="table table-bordered">'
    +   '<tbody>'
    +     '<tr class="total-cost-row">'
    +       '<th>Total Cost</th>'
    +       '<% orders.forEach(function(order) { %>'
    +         '<th>$<%= order.total_cost %></th>'
    +       '<% }) %>'
    +     '</tr>'
    +     '<tr class="cost-difference-row">'
    +       '<th>Cost Difference from Cheapest</th>'
    +       '<% orders.forEach(function(order) { %>'
    +         '<td>+$<%= order.cost_difference %></td>'
    +       '<% }) %>'
    +     '</tr>'
    +     '<tr class="table-section-divider info">'
    +       '<td colspan="<%= orders.length + 1 %>">Pledge Information</td>'
    +     '</tr>'
    +     '<tr class="pledge-name-row">'
    +       '<th>Pledge Name</th>'
    +       '<% orders.forEach(function(order) { %>'
    +         '<td><%= order.pledge_level_title %></td>'
    +       '<% }) %>'
    +     '</tr>'
    +     '<tr class="pledge-cost-row">'
    +       '<th>Pledge Cost</th>'
    +       '<% orders.forEach(function(order) { %>'
    +         '<td>$<%= order.pledge_level_cost %></td>'
    +       '<% }) %>'
    +     '</tr>'
    +     '<tr class="table-section-divider info">'
    +       '<td colspan="<%= orders.length + 1 %>">Add-On Information</td>'
    +     '</tr>'
    +     '<tr class="add-ons-row">'
    +       '<th>Add-Ons</th>'
    +       '<% orders.forEach(function(order) { %>'
    +         '<td>'
    +           '<ul>'
    +             '<% order.add_ons.forEach(function(add_on) { %>'
    +               '<li><%= add_on.title %></li>'
    +             '<% }) %>'
    +           '</ul>'
    +         '</td>'
    +       '<% }) %>'
    +     '</tr>'
    +     '<tr class="add-on-cost-row">'
    +       '<th>Add-On Cost</th>'
    +       '<% orders.forEach(function(order) { %>'
    +         '<td>$<%= order.add_on_cost %></td>'
    +       '<% }) %>'
    +     '</tr>'
    +     '<tr class="table-section-divider info">'
    +       '<td colspan="<%= orders.length + 1 %>">Other Items You Receive</td>'
    +     '</tr>'
    +     '<tr class="extras-row">'
    +       '<th></th>'
    +       '<% orders.forEach(function(order) { %>'
    +         '<td>'
    +           '<ul>'
    +             '<% order.extras.forEach(function(extra) { %>'
    +               '<li><%= extra.title %></li>'
    +             '<% }) %>'
    +           '</ul>'
    +         '</td>'
    +       '<% }) %>'
    +     '</tr>'
    +   '</tbody>'
    + '</table>'
  );

  const COMBINED_SATAN_LEVEL_TITLE = 'All Satan Lantern Pledges';
  const PLEDGE_TITLES_WITH_ROLE_SURVIVORS_IN_EXPANSION = ['Ancient Gold Lantern', COMBINED_SATAN_LEVEL_TITLE, 'God Frogdog'];

  function KdmComparator(wrapperEl) {
    this.$wrapperEl = $(wrapperEl);
    this.contentManager = new KdmContentManager();
    this.allItems = this.contentManager.getAllItems();
    this.addons = this.contentManager.getAddOns();
    this.newExpansions = this.contentManager.getAllNewExpansions().filter(function(expansion) { return expansion.addon; });
    this.oldExpansions = this.contentManager.getAllOldExpansions().filter(function(expansion) { return expansion.addon; });
    this.newPinups = this.contentManager.getAllNewPinups().filter(function(pinup) { return pinup.addon; });
    this.oldPinups = this.contentManager.getAllOldPinups().filter(function(pinup) { return pinup.addon; });
    this.newPromos = this.contentManager.getAllNewPromos().filter(function(promo) { return promo.addon; });
    this.oldPromos = this.contentManager.getAllOldPromos().filter(function(promo) { return promo.addon; });
    this.newCrossovers = this.contentManager.getAllNewCrossovers().filter(function(crossover) { return crossover.addon; });
    this.oldExtras = this.contentManager.getAllOldExtras().filter(function(extra) { return extra.addon; });
  }

  KdmComparator.prototype.initialize = function() {
    this.initializeQuestionnaire();
    this.initializeQuestionnaireListeners();
    this.updateResults();
  };

  KdmComparator.prototype.initializeQuestionnaire = function() {
    const addOnGroups = [{
      contentType: 'new_expansions',
      contentDisplayType: 'new expansions',
      addOns: this.newExpansions
    }, {
      contentType: 'old_expansions',
      contentDisplayType: 'old expansions',
      addOns: this.oldExpansions
    }, {
      contentType: 'new_pinups',
      contentDisplayType: 'new pinups',
      addOns: this.newPinups
    }, {
      contentType: 'old_pinups',
      contentDisplayType: 'old pinups',
      addOns: this.oldPinups
    }, {
      contentType: 'new_promos',
      contentDisplayType: 'new promos',
      addOns: this.newPromos
    }, {
      contentType: 'old_promos',
      contentDisplayType: 'old promos',
      addOns: this.oldPromos
    }, {
      contentType: 'new_crossovers',
      contentDisplayType: 'new crossovers',
      addOns: this.newCrossovers
    }, {
      contentType: 'old_extras',
      contentDisplayType: 'old extras',
      addOns: this.oldExtras
    }];

    this.$wrapperEl.find('.questionnaire').html(questionnaireTemplate({
      addOnGroups: addOnGroups
    }));
  };

  KdmComparator.prototype.initializeQuestionnaireListeners = function() {
    var self = this;
    self.$wrapperEl.on('change', 'select', function() {
      self.updateResults();
    });
    self.$wrapperEl.on('change', 'input[data-type=select_all]', function() {
      self.toggleCheckboxesForSection($(this));
      self.updateResults();
    });
    self.$wrapperEl.on('change', 'input[data-type=addon]', function() {
      self.updateResults();
    });
  };

  KdmComparator.prototype.toggleCheckboxesForSection = function($selectAllCheckbox) {
    var targetContentType = $selectAllCheckbox.attr('data-target');
    var selectAll = $selectAllCheckbox.is(':checked');
    var $checkboxes = this.$wrapperEl.find('input[name=' + targetContentType + ']');

    $checkboxes.prop('checked', selectAll);
  };

  KdmComparator.prototype.updateResults = function() {
    console.log('update results');
    var pledges = this.getPotentialPledgesForGameType();
    var requiredItems = this.getRequiredItems();
    var potentialOrders = this.getPotentialOrders(pledges, requiredItems);

    this.renderPotentialOrders(potentialOrders);
  };

  KdmComparator.prototype.getPotentialPledgesForGameType = function() {
    var gameType = this.getSelectedGameType();
    var pledges = this.contentManager.getPledgesForGameType(gameType);

    return this.combineSatanLevelPledges(pledges);
  };

  KdmComparator.prototype.getRequiredItems = function() {
    var requiredTitles = this.getFormValues('input[data-type=addon]:checked');
    var requiredItems = this.addons.filter(function(item) { return _.includes(requiredTitles, item.title); }).sort(itemSort);
    var requiresGamblersChest = this.$wrapperEl.find('select[data-type=gamblersChest]').val() === 'yes';
    if (requiresGamblersChest) {
      var gamblersChest = _.find(this.addons, function(addon) { return addon.title === 'Gambler\'s Chest'; });
      if (gamblersChest) {
        requiredItems.unshift(gamblersChest);
      }
    }
    var gameType = this.getSelectedGameType();
    var gameTypeItem = this.contentManager.getItemForGameType(gameType);
    if (gameTypeItem) {
      requiredItems.unshift(gameTypeItem);
    }

    return requiredItems;
  };

  KdmComparator.prototype.getSelectedGameType = function() {
    return this.$wrapperEl.find('select[data-type=gameType]').val();
  };

  KdmComparator.prototype.getFormValues = function(selector) {
    return this.$wrapperEl.find(selector).map(function() {
      return $(this).val();
    }).get();
  };

  KdmComparator.prototype.combineSatanLevelPledges = function(pledges) {
    var satansLantern = _.cloneDeep(_.find(pledges, function(pledge) { return pledge.title === "Satan's Lantern"; }));
    if (satansLantern) {
      var filteredPledges = pledges.filter(function(pledge) {
        return pledge.title.indexOf('Satan') === -1;
      });
      satansLantern.title = COMBINED_SATAN_LEVEL_TITLE;
      filteredPledges.push(satansLantern);
      return filteredPledges;
    } else {
      return pledges;
    }
  };

  KdmComparator.prototype.getPotentialOrders = function(pledges, requiredItems) {
    const requiredItemTitles = _.map(requiredItems, 'title');
    const allItemTitles = _.map(this.allItems, 'title');
    const allItemsByTitle = _.keyBy(this.allItems, 'title');
    const potentialOrders = pledges.map(function(pledge) {
      const applicableItems = pledge.getApplicableItems(this.allItems);
      const applicableItemTitles = _.map(applicableItems, 'title');
      var missingItemTitles = _.difference(requiredItemTitles, applicableItemTitles);

      if (_.includes(PLEDGE_TITLES_WITH_ROLE_SURVIVORS_IN_EXPANSION, pledge.title) && _.includes(missingItemTitles, 'Role Survivors')) {
        missingItemTitles = _.without(missingItemTitles, 'Role Survivors');
      }

      const missingItems = missingItemTitles.map(function(title) { return allItemsByTitle[title]; });
      const extraItems = _.difference(applicableItemTitles, requiredItemTitles).map(function(title) { return allItemsByTitle[title]; });
      const pledgeCost = pledge.price;
      const addOnCost = _.sumBy(missingItems, function(item) { return item.price; });
      const totalCost = pledgeCost + addOnCost;

      return {
        pledge_level_title: pledge.title,
        pledge_level_cost: pledgeCost,
        add_on_cost: addOnCost,
        total_cost: totalCost,
        add_ons: missingItems,
        extras: extraItems.sort(itemSort)
      };
    }, this).sort(function(a, b) {
      return a.total_cost - b.total_cost;
    });
    const lowest_cost = (_.find(potentialOrders) || {total_cost: 0}).total_cost;

    potentialOrders.forEach(function(potentialOrder) {
      potentialOrder.cost_difference = potentialOrder.total_cost - lowest_cost;
    });

    return potentialOrders;
  };

  KdmComparator.prototype.renderPotentialOrders = function(potentialOrders) {
    this.$wrapperEl.find('.compare-results').html(resultsTemplate({
      orders: potentialOrders
    }));
  };

  function itemSort(a, b) {
    return a.title.localeCompare(b.title);
  }

  var comparator = new KdmComparator($comparatorWrapper);

  comparator.initialize();

})(window);
