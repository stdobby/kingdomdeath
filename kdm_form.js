(function(global, pledges, items) {
  'use strict';

  var $kdmFormWrapper = $('#kdmFormWrapper');

  var pledgeTemplate = _.template(
      '<form class="form-horizontal">'
    +  '<div class="form-group">'
    +   '<label for="pledge" class="control-label col-md-4">Pledge</label>'
    +   '<div class="col-md-4">'
    +    '<select class="form-control" data-type="pledge">'
    +     '<% pledges.forEach(function(pledge) { %>'
    +      '<option value="<%= pledge.title %>"><%= pledge.title %> ($<%= pledge.price %>)</option>'
    +     '<% }) %>'
    +    '</select>'
    +   '</div>'
    +  '</div>'
    + '</form>'
  );

  var addonTypeTemplate = _.template(
      '<form class="form-horizontal">'
    +  '<div class="form-group">'
    +   '<label class="section-label control-label col-md-5"><%= sectionLabel %></label>'
    +  '</div>'
    +  '<% addons.forEach(function(addon) { %>'
    +   '<div class="form-group">'
    +    '<label for="<%= addon.title %>" class="control-label col-md-4"><%= addon.title %></label>'
    +    '<div class="col-md-2">'
    +     '<select class="form-control" data-type="addon" data-title="<%= addon.title %>">'
    +      '<% for (var i = 0; i <= 10; i++) { %>'
    +       '<option value="<%= i %>"><%= i %> (+$<%= addon.price * i %>)</option>'
    +      '<% } %>'
    +     '</select>'
    +    '</div>'
    +   '</div>'
    +  '<% }) %>'
    + '</form>'
  );

  var totalsTemplate = _.template(
      '<hr>'
    + '<form class="form-horizontal totals-form">'
    +  '<div class="form-group">'
    +   '<label for="subtotal" class="total-label control-label col-md-4">Subtotal</label>'
    +   '<div class="col-md-4">'
    +    '<p id="subtotal" class="form-control-static">$0</p>'
    +   '</div>'
    +  '</div>'
    +  '<div class="form-group">'
    +   '<label for="wave1" class="total-label control-label col-md-4">Wave 1 Shipping</label>'
    +   '<div class="col-md-4">'
    +    '<p id="wave1" class="form-control-static">$0</p>'
    +   '</div>'
    +  '</div>'
    +  '<div class="form-group">'
    +   '<label for="wave2" class="total-label control-label col-md-4">Wave 2 Shipping</label>'
    +   '<div class="col-md-4">'
    +    '<p id="wave2" class="form-control-static">$0</p>'
    +   '</div>'
    +  '</div>'
    +  '<div class="form-group">'
    +   '<label for="wave3" class="total-label control-label col-md-4">Wave 3 Shipping</label>'
    +   '<div class="col-md-4">'
    +    '<p id="wave3" class="form-control-static">$0</p>'
    +   '</div>'
    +  '</div>'
    +  '<div class="form-group">'
    +   '<label for="wave4" class="total-label control-label col-md-4">Wave 4 Shipping</label>'
    +   '<div class="col-md-4">'
    +    '<p id="wave4" class="form-control-static">$0</p>'
    +   '</div>'
    +  '</div>'
    +  '<div class="form-group">'
    +   '<label for="total" class="total-label control-label col-md-4">Total</label>'
    +   '<div class="col-md-4">'
    +    '<p id="total" class="form-control-static">$0</p>'
    +   '</div>'
    +  '</div>'
    + '</form>'
    + '<hr>'
  );

  pledges.sort(function(a, b) {
    return a.price - b.price;
  });

  function KdmForm(wrapperEl, pledges, items) {
    var self = this;

    self.$wrapperEl = $(wrapperEl);
    self.pledges = _.cloneDeep(pledges);
    self.items = _.cloneDeep(items);
    self.addons = self.items.filter(function(item) { return item.addon; });
    self.addonsByType = _.groupBy(self.addons, 'contentType.type');
    self.shippingCalculator = new KdmShippingCalculator();
    self.$wrapperEl.on('change', 'select', function() {
      self.updateTotals();
    });
  }

  KdmForm.prototype.initialize = function() {
    this.$wrapperEl.empty();
    this.initializePledgeDropdown();
    this.initializeAllAddOns();
    this.initializeTotals();
    this.listenToResetButton();
    this.updateTotals();
  };

  KdmForm.prototype.initializePledgeDropdown = function() {
    this.$wrapperEl.append(pledgeTemplate({ pledges: this.pledges }));
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

      this.$wrapperEl.append(addonTypeTemplate({
        sectionLabel: sectionLabel,
        addons: addons
      }));
    }
  };

  KdmForm.prototype.initializeTotals = function() {
    this.$wrapperEl.append(totalsTemplate());
  };

  KdmForm.prototype.updateTotals = function() {
    var self = this;
    var cart = [];

    self.$wrapperEl.find('select').each(function() {
      var $select = $(this);
      var type = $select.attr('data-type');

      switch (type) {
        case 'addon':
          cart.push(self.getAddOnOrder($select));
          break;
        case 'pledge':
          cart.push(self.getPledgeOrder($select));
          break;
        default:
          console.error('Unknown type: ' + type);
          break;
      }
    });

    var subtotal = _.sumBy(cart, function(order) { return order.item.price * order.quantity; });
    var orderItems = self.getOrderItems(cart);
    var waveTotals = self.shippingCalculator.calculateShippingForRegion('United States', orderItems); // TODO: don't hardcode region
    var total = subtotal;

    ['1', '2', '3', '4'].forEach(function(wave) {
      var waveTotal = waveTotals[wave] || 0;
      self.$wrapperEl.find('#wave' + wave).html('$' + waveTotal);
      total += waveTotal;
    });

    self.$wrapperEl.find('#subtotal').html('$' + subtotal);
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

  function findByTitle(items, title) {
    return _.find(items, function(item) { return item.title == title; });
  }

  var kdmForm = new KdmForm($kdmFormWrapper, pledges, items);

  kdmForm.initialize();

})(window, PLEDGES, ITEMS);
