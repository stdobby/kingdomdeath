(function(global) {
  'use strict';

  var $kdmFormWrapper = $('#calculator');

  var pledgeTemplate = _.template(
    '<h3 style="margin-bottom: 30px">Pledge and Shipping Calculator</h3>'
    + '<form class="form-horizontal">'
    +  '<div id="pledgeBuilder" class="col-md-8">'
    +  '<div class="form-group">'
    +   '<label for="pledge" class="control-label col-md-6">Pledge</label>'
    +   '<div class="col-md-6">'
    +    '<select class="form-control" data-type="pledge">'
    +     '<% pledges.forEach(function(pledge) { %>'
    +      '<option value="<%= pledge.title %>"><%= pledge.title %> ($<%= pledge.price %>)</option>'
    +     '<% }) %>'
    +    '</select>'
    +   '</div>'
    +  '</div>'
    +  '<div class="form-group">'
    +   '<label for="shipping" class="control-label col-md-6">Shipping</label>'
    +   '<div class="col-md-6">'
    +    '<select class="form-control" data-type="shipping">'
    +     '<% shippingRegions.forEach(function(region) { %>'
    +      '<option value="<%= region %>"><%= region %></option>'
    +     '<% }) %>'
    +    '</select>'
    +   '</div>'
    +  '</div>'
    +  '</div>'
    + '</form>'
  );

  var addonTypeTemplate = _.template(
      '<form class="form-horizontal">'
    +  '<div class="form-group">'
    +   '<label class="section-label control-label col-md-6"><%= sectionLabel %></label>'
    +  '</div>'
    +  '<% addons.forEach(function(addon) { %>'
    +   '<div class="form-group">'
    +    '<label for="<%= addon.title %>" class="control-label col-md-6"><%= addon.title %></label>'
    +    '<div class="col-md-6">'
      +    '<div class="col-xs-10">'
      +     '<select class="form-control" data-type="addon" data-title="<%= addon.title %>">'
      +      '<% for (var i = 0; i <= 10; i++) { %>'
      +       '<option value="<%= i %>"><%= i %> (+$<%= addon.price * i %>)</option>'
      +      '<% } %>'
      +     '</select>'
      +    '</div>'
      +    '<div class="col-xs-2" style="padding: 7px 0 0 0; text-align: left;">'
      +     '<span class="glyphicon glyphicon-plus" aria-hidden="true" style="color: darkgreen; margin-right: 8px; cursor: pointer"></span>'
      +     '<span class="glyphicon glyphicon-minus" aria-hidden="true" style="color: darkred; cursor: pointer"></span>'
      +    '</div>'
    +    '</div>'
    +   '</div>'
    +  '<% }) %>'
    + '</form>'
  );

  var totalsTemplate = _.template(
      '<div class="col-md-4">'
    + '<hr>'
    + '<form class="form-horizontal totals-form">'
    +  '<div class="form-group">'
    +   '<label for="subtotal" class="total-label control-label col-md-8">Kickstarter</label>'
    +   '<div class="col-md-4">'
    +    '<p id="subtotal" class="form-control-static">$0</p>'
    +   '</div>'
    +  '</div>'
    +  '<div class="form-group">'
    +   '<label for="wave1" class="total-label control-label col-md-8">Wave 1 (2017)</label>'
    +   '<div class="col-md-4">'
    +    '<p id="wave1" class="form-control-static">$0</p>'
    +   '</div>'
    +  '</div>'
    +  '<div class="form-group">'
    +   '<label for="wave2" class="total-label control-label col-md-8">Wave 2 (2017)</label>'
    +   '<div class="col-md-4">'
    +    '<p id="wave2" class="form-control-static">$0</p>'
    +   '</div>'
    +  '</div>'
    +  '<div class="form-group">'
    +   '<label for="wave3" class="total-label control-label col-md-8">Wave 3 (2018)</label>'
    +   '<div class="col-md-4">'
    +    '<p id="wave3" class="form-control-static">$0</p>'
    +   '</div>'
    +  '</div>'
    +  '<div class="form-group">'
    +   '<label for="wave4" class="total-label control-label col-md-8">Wave 4 (2019)</label>'
    +   '<div class="col-md-4">'
    +    '<p id="wave4" class="form-control-static">$0</p>'
    +   '</div>'
    +  '</div>'
    +  '<div class="form-group">'
    +   '<label for="wave5" class="total-label control-label col-md-8">Wave 5 (2020)</label>'
    +   '<div class="col-md-4">'
    +    '<p id="wave5" class="form-control-static">$0</p>'
    +   '</div>'
    +  '</div>'
    +  '<div class="form-group">'
    +   '<label for="total" class="total-label control-label col-md-8">Total</label>'
    +   '<div class="col-md-4">'
    +    '<p id="total" class="form-control-static">$0</p>'
    +   '</div>'
    +  '</div>'
    + '</form>'
    + '<hr>'
    + '<form class="form-horizontal">'
    +  '<div class="form-group">'
    +   '<div class="col-md-4 col-md-offset-4">'
    +    '<button id="reset" class="btn btn-primary">Reset</button>'
    +   '</div>'
    +  '</div>'
    + '</form>'
    + '</div>'
  );

  var shippingBreakdownTemplate = _.template(
      '<div class="col-md-12">'
    + '<h3>Shipping Breakdown</h3>'
    + '<table class="table table-bordered">'
    +  '<tbody>'
    +   '<% waves.forEach(function(wave) { %>'
    +    '<tr class="wave-section-header info">'
    +     '<td colspan="2"><%= wave.meta.title %></td>'
    +    '</tr>'
    +    '<tr class="wave-table-header active">'
    +     '<td>Item</td>'
    +     '<td>Type</td>'
    +    '</tr>'
    +    '<% if (wave.items.length > 0) { %>'
    +     '<% wave.items.forEach(function(item) { %>'
    +      '<tr>'
    +       '<td><%= item.title %></td>'
    +       '<td><%= item.contentType.type %></td>'
    +      '</tr>'
    +     '<% }) %>'
    +    '<% } else { %>'
    +     '<tr class="no-content">'
    +      '<td colspan="2">No content</td>'
    +     '</tr>'
    +    '<% } %>'
    +   '<% }) %>'
    +  '</tbody>'
    + '</table>'
    + '</div>'
  );

  function KdmForm(wrapperEl, KdmContentManager) {
    var self = this;

    self.$wrapperEl = $(wrapperEl);
    self.pledges = KdmContentManager.getPledges();
    self.items = KdmContentManager.getAllItems();
    self.addons = KdmContentManager.getAddOns();
    self.addonsByType = _.groupBy(self.addons, 'contentType.type');
    self.shippingCalculator = new KdmShippingCalculator();
    self.$wrapperEl.on('change', 'select', function() {
      self.updateTotals();
      self.updateShippingBreakdown();
    });
  }

  KdmForm.prototype.initialize = function() {
    this.$wrapperEl.empty();
    this.initializePledgeAndShippingDropdowns();
    this.initializeAllAddOns();
    this.initializeTotals();
    this.listenToResetButton();
    this.listenToIncrementButtons();
    this.listenToDecrementButtons();
    this.updateTotals();
    this.updateShippingBreakdown();
  };

  KdmForm.prototype.initializePledgeAndShippingDropdowns = function() {
    this.$wrapperEl.append(pledgeTemplate({
      pledges: this.pledges,
      shippingRegions: this.shippingCalculator.getRegions()
    }));
  };

  KdmForm.prototype.initializeAllAddOns = function() {
    _.each(this.addonsByType, function(addons, type) {
      this.initializeAddOnsForType(type, addons);
    }.bind(this));
  };

  KdmForm.prototype.initializeAddOnsForType = function(type, addons) {
    var addonsByNewness = _.groupBy(addons, 'contentType.new');

    this.initializeAddOnsWithSectionLabel(addonsByNewness['true'], 'New ' + type + 's');
    this.initializeAddOnsWithSectionLabel(addonsByNewness['false'], 'Old ' + type + 's');
  };

  KdmForm.prototype.initializeAddOnsWithSectionLabel = function(addons, sectionLabel) {
    if (addons) {
      addons.sort(function(a, b) { return a.title.localeCompare(b.title); });

      this.$wrapperEl.find("#pledgeBuilder").append(addonTypeTemplate({
        sectionLabel: sectionLabel,
        addons: addons
      }));
    }
  };

  KdmForm.prototype.initializeTotals = function() {
    this.$wrapperEl.append(totalsTemplate());
  };

  KdmForm.prototype.getCart = function() {
    var self = this;
    var region = null;
    var orders = [];

    self.$wrapperEl.find('select').each(function() {
      var $select = $(this);
      var type = $select.attr('data-type');

      switch (type) {
        case 'addon':
          orders.push(self.getAddOnOrder($select));
          break;
        case 'pledge':
          orders.push(self.getPledgeOrder($select));
          break;
        case 'shipping':
          region = $select.val();
          break;
        default:
          console.error('Unknown type: ' + type);
          break;
      }
    });

    var subtotal = _.sumBy(orders, function(order) { return order.item.price * order.quantity; });
    var orderItems = self.getOrderItems(orders);

    return {
      region: region,
      subtotal: subtotal,
      orderItems: orderItems
    }
  };

  KdmForm.prototype.updateTotals = function() {
    var self = this;
    var cart = self.getCart();
    var waveTotals = self.shippingCalculator.calculateShippingForRegion(cart.region, cart.orderItems);
    var total = cart.subtotal;

    ['1', '2', '3', '4', '5'].forEach(function(wave) {
      var waveTotal = waveTotals[wave] || 0;
      self.$wrapperEl.find('#wave' + wave).html('$' + waveTotal);
      total += waveTotal;
    });

    self.$wrapperEl.find('#subtotal').html('$' + cart.subtotal);
    self.$wrapperEl.find('#total').html('$' + total);
  };

  KdmForm.prototype.getAddOnOrder = function($select) {
    var addonTitle = $select.attr('data-title');
    var addon = findByTitle(this.addons, addonTitle);
    var amount = parseInt($select.val(), 10);

    return {
      item: addon,
      type: 'addon',
      quantity: amount
    };
  };

  KdmForm.prototype.getPledgeOrder = function($select) {
    var pledgeTitle = $select.val();
    var pledge = findByTitle(this.pledges, pledgeTitle);

    return {
      item: pledge,
      type: 'pledge',
      quantity: 1
    };
  };

  KdmForm.prototype.getOrderItems = function(cart) {
    var self = this;
    var filteredOrders = cart.filter(function(order) { return order.quantity > 0; });

    return _.flatMap(filteredOrders, function(order) {
      var orderItems = [];
      if (order.type === 'addon') {
        for (var i = 0; i < order.quantity; i++) {
          orderItems.push(order.item);
        }
      } else if (order.type === 'pledge') {
        for (var i = 0; i < order.quantity; i++) {
          orderItems.push(order.item.getApplicableItems(self.items));
        }
      }
      return _.flatten(orderItems);
    });
  };

  KdmForm.prototype.listenToResetButton = function() {
    var self = this;
    $('#reset').on('click', function() {
      self.initialize();
    });
  };
  
  KdmForm.prototype.listenToIncrementButtons = function() {
    var self = this;
    $('.glyphicon-plus').on('click', function(e) {
      var elSelect = $(e.target).parent().parent().find("select");
      var curVal = parseInt(elSelect.val());
      var nextVal = curVal + 1;
      if (elSelect.find("option[value="+nextVal+"]").length > 0)
      {
        elSelect.val(nextVal);
        elSelect.change();
      }
    });
  };
  
  KdmForm.prototype.listenToDecrementButtons = function() {
    var self = this;
    $('.glyphicon-minus').on('click', function(e) {
      var elSelect = $(e.target).parent().parent().find("select");
      var curVal = parseInt(elSelect.val());
      var nextVal = curVal - 1;
      if (elSelect.find("option[value="+nextVal+"]").length > 0)
      {
        elSelect.val(nextVal);
        elSelect.change();
      }
    });
  };

  KdmForm.prototype.updateShippingBreakdown = function() {
    const waves = [{
        wave: 1,
        meta: {
          title: 'Wave 1 - Summer 2017 - 1.5 Core Game / Update Pack'
        },
        items: []
      }, {
        wave: 2,
        meta: {
          title: 'Wave 2 - Winter 2017 - Old Expansions'
        },
        items: []
      }, {
        wave: 3,
        meta: {
          title: 'Wave 3 - Spring 2018 - Gambler\'s Box, Promos, and Cross-Over Figures'
        },
        items: []
      }, {
        wave: 4,
        meta: {
          title: 'Wave 4 - Spring 2019 - New Expansions'
        },
        items: []
      }, {
        wave: 5,
        meta: {
          title: 'Wave 5 - Winter 2020 - ???'
        },
        items: []
      }];
    const cart = this.getCart();
    const items = cart.orderItems.sort(function(a, b) { return a.title.localeCompare(b.title); });

    items.forEach(function(item) {
      var waveConfig = _.find(waves, function(wave) { return wave.wave === item.wave; });
      if (waveConfig) {
        waveConfig.items.push(item);
      }
    });

    if (!this.$wrapperEl.find('.shipping-breakdown').length) {
      this.$wrapperEl.append($('<div></div>').addClass('shipping-breakdown'));
    }

    this.$wrapperEl.find('.shipping-breakdown').html(shippingBreakdownTemplate({ waves: waves }));
  };

  function findByTitle(items, title) {
    return _.find(items, function(item) { return item.title == title; });
  }

  var kdmForm = new KdmForm($kdmFormWrapper, new KdmContentManager());

  kdmForm.initialize();

})(window);
