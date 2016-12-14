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
    +  '<div class="form-group">'
    +    '<label for="new_expansions" class="control-label col-md-4">The <span class="question-content-type">new expansions</span> I would like are</label>'
    +    '<div class="col-md-8 checkbox-columns">'
    +      '<% newExpansions.forEach(function(newExpansion) { %>'
    +        '<label class="checkbox-inline" for="<%= newExpansion.title %>">'
    +          '<input type="checkbox" name="new_expansions" id="<%= newExpansion.title %>" value="<%= newExpansion.title %>"><%= newExpansion.title %>'
    +        '</label>'
    +      '<% }) %>'
    +    '</div>'
    +  '</div>'
    +  '<div class="form-group">'
    +    '<label for="old_expansions" class="control-label col-md-4">The <span class="question-content-type">old expansions</span> I would like are</label>'
    +    '<div class="col-md-8 checkbox-columns">'
    +      '<% oldExpansions.forEach(function(oldExpansion) { %>'
    +        '<label class="checkbox-inline" for="<%= oldExpansion.title %>">'
    +          '<input type="checkbox" name="old_expansions" id="<%= oldExpansion.title %>" value="<%= oldExpansion.title %>"><%= oldExpansion.title %>'
    +        '</label>'
    +      '<% }) %>'
    +    '</div>'
    +  '</div>'
    +  '<div class="form-group">'
    +    '<label for="new_pinups" class="control-label col-md-4">The <span class="question-content-type">new pinups</span> I would like are</label>'
    +    '<div class="col-md-8 checkbox-columns">'
    +      '<% newPinups.forEach(function(pinup) { %>'
    +        '<label class="checkbox-inline" for="<%= pinup.title %>">'
    +          '<input type="checkbox" name="new_pinups" id="<%= pinup.title %>" value="<%= pinup.title %>"><%= pinup.title %>'
    +        '</label>'
    +      '<% }) %>'
    +    '</div>'
    +  '</div>'
    +  '<div class="form-group">'
    +    '<label for="new_promos" class="control-label col-md-4">The <span class="question-content-type">new promos</span> I would like are</label>'
    +    '<div class="col-md-8 checkbox-columns">'
    +      '<% newPromos.forEach(function(promo) { %>'
    +        '<label class="checkbox-inline" for="<%= promo.title %>">'
    +          '<input type="checkbox" name="new_promos" id="<%= promo.title %>" value="<%= promo.title %>"><%= promo.title %>'
    +        '</label>'
    +      '<% }) %>'
    +    '</div>'
    +  '</div>'
    +  '<div class="form-group">'
    +    '<label for="new_crossovers" class="control-label col-md-4">The <span class="question-content-type">new crossovers</span> I would like are</label>'
    +    '<div class="col-md-8 checkbox-columns">'
    +      '<% newCrossovers.forEach(function(crossover) { %>'
    +        '<label class="checkbox-inline" for="<%= crossover.title %>">'
    +          '<input type="checkbox" name="new_crossovers" id="<%= crossover.title %>" value="<%= crossover.title %>"><%= crossover.title %>'
    +        '</label>'
    +      '<% }) %>'
    +    '</div>'
    +  '</div>'
    + '</form>'
  );

  const resultsTemplate = _.template(
      '<table class="table table-bordered">'
    +   '<tbody>'
    +     '<tr class="total-cost-row">'
    +       '<th>Total Cost</th>'
    +       '<% orders.forEach(function(order) { %>'
    +         '<td>$<%= order.total_cost %></td>'
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
    +   '</tbody>'
    + '</table>'
  );

  function KdmComparator(wrapperEl) {
    this.$wrapperEl = $(wrapperEl);
    this.contentManager = new KdmContentManager();
    this.addons = this.contentManager.getAddOns();
    this.newExpansions = this.contentManager.getAllNewExpansions().filter(function(expansion) { return expansion.addon; });
    this.oldExpansions = this.contentManager.getAllOldExpansions().filter(function(expansion) { return expansion.addon; });
    this.newPinups = this.contentManager.getAllNewPinups().filter(function(pinup) { return pinup.addon; });
    this.newPromos = this.contentManager.getAllNewPromos().filter(function(promo) { return promo.addon; });
    this.newCrossovers = this.contentManager.getAllNewCrossovers().filter(function(crossover) { return crossover.addon; });
  }

  KdmComparator.prototype.initialize = function() {
    this.initializeQuestionnaire();
    this.initializeQuestionnaireListeners();
    this.updateResults();
  };

  KdmComparator.prototype.initializeQuestionnaire = function() {
    this.$wrapperEl.find('.questionnaire').html(questionnaireTemplate({
      newExpansions: this.newExpansions,
      oldExpansions: this.oldExpansions,
      newPinups: this.newPinups,
      newPromos: this.newPromos,
      newCrossovers: this.newCrossovers
    }));
  };

  KdmComparator.prototype.initializeQuestionnaireListeners = function() {
    var self = this;
    self.$wrapperEl.on('change', 'select', function() {
      self.updateResults();
    });
    self.$wrapperEl.on('change', 'input', function() {
      self.updateResults();
    });
  };

  KdmComparator.prototype.updateResults = function() {
    var pledges = this.getPotentialPledgesForGameType();
    var requiredItems = this.getRequiredItems();
    var potentialOrders = this.getPotentialOrders(pledges, requiredItems);

    this.renderPotentialOrders(potentialOrders);
  };

  KdmComparator.prototype.getPotentialPledgesForGameType = function() {
    var gameType = this.$wrapperEl.find('select[data-type=gameType]').val();
    var pledges = this.contentManager.getPledgesForGameType(gameType);

    return this.combineSatanLevelPledges(pledges);
  };

  KdmComparator.prototype.getRequiredItems = function() {
    var newExpansionTitles = this.getFormValues('input[name=new_expansions]:checked');
    var oldExpansionTitles = this.getFormValues('input[name=old_expansions]:checked');
    var newPinupTitles = this.getFormValues('input[name=new_pinups]:checked');
    var newPromoTitles = this.getFormValues('input[name=new_promos]:checked');
    var newCrossoverTitles = this.getFormValues('input[name=new_crossovers]:checked');
    var requiredNewExpansions = this.newExpansions.filter(function(expansion) {
      return _.includes(newExpansionTitles, expansion.title);
    });
    var requiredOldExpansions = this.oldExpansions.filter(function(expansion) {
      return _.includes(oldExpansionTitles, expansion.title);
    });
    var requiredNewPinups = this.newPinups.filter(function(pinup) {
      return _.includes(newPinupTitles, pinup.title);
    });
    var requiredNewPromos = this.newPromos.filter(function(promo) {
      return _.includes(newPromoTitles, promo.title);
    });
    var requiredNewCrossovers = this.newCrossovers.filter(function(crossover) {
      return _.includes(newCrossoverTitles, crossover.title);
    });
    var requiresGamblersChest = this.$wrapperEl.find('select[data-type=gamblersChest]').val() === 'yes';
    var requiredItems = [].concat(requiredNewExpansions, requiredOldExpansions, requiredNewPinups, requiredNewPromos, requiredNewCrossovers).sort(itemSort);

    if (requiresGamblersChest) {
      var gamblersChest = _.find(this.addons, function(addon) { return addon.title === 'Gambler\'s Chest'; });
      if (gamblersChest) {
        requiredItems.unshift(gamblersChest);
      }
    }

    return requiredItems;
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
      satansLantern.title = 'Various Satan Lantern Pledges';
      filteredPledges.push(satansLantern);
      return filteredPledges;
    } else {
      return pledges;
    }
  };

  KdmComparator.prototype.getPotentialOrders = function(pledges, requiredItems) {
    const requiredItemTitles = _.map(requiredItems, 'title');
    const requiredItemsByTitle = _.keyBy(requiredItems, 'title');
    return pledges.map(function(pledge) {
      const applicableItems = pledge.getApplicableItems(this.addons);
      const applicableItemTitles = _.map(applicableItems, 'title');
      const missingItemTitles = _.difference(requiredItemTitles, applicableItemTitles);
      const missingItems = missingItemTitles.map(function(title) { return requiredItemsByTitle[title]; });
      const pledgeCost = pledge.price;
      const addOnCost = _.sumBy(missingItems, function(item) { return item.price; });
      const totalCost = pledgeCost + addOnCost;

      return {
        pledge_level_title: pledge.title,
        pledge_level_cost: pledgeCost,
        add_on_cost: addOnCost,
        total_cost: totalCost,
        add_ons: missingItems
      };
    }, this);
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
