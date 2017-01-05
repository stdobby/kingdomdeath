(function() {
  'use strict';

  const addOnGroupTemplate = _.template(
      '<h4 class="text-center"><%= groupTitle %></h4>'
    + '<div class="table-responsive">'
    +   '<table class="table table-bordered table-condensed">'
    +     '<thead>'
    +       '<tr>'
    +         '<th>Item</th>'
    +         '<th>KS Price</th>'
    +       '</tr>'
    +     '</thead>'
    +     '<tbody>'
    +       '<% addOns.forEach(function(addOn) { %>'
    +         '<tr>'
    +           '<td><%= addOn.title %></td>'
    +           '<td>'
    +             '<% if(addOn.title === "Gambler\'s Chest") { %>'
    +             '$100/$150'
    +             '<% } else { %>'
    +             '$<%= addOn.price %>'
    +             '<% } %>'
    +           '</td>'
    +         '</tr>'
    +       '<% }) %>'
    +     '</tbody>'
    +   '</table>'
    + '</div>'
  );

  const addOnsTemplate = _.template(
      '<h3>Add-On Menu</h3>'
    + '<div class="alert alert-info col-sm-offset-2 col-sm-8 col-md-offset-4 col-md-4">'
    +   '<strong>Gambler\'s Chest:</strong>'
    +   '<ul>'
    +     '<li>Black Friday Lantern / Black Friday Lantern Upgrade'
    +       '<ul>'
    +         '<li>First - $100</li>'
    +         '<li>Additional - $150 each</li>'
    +       '</ul>'
    +     '<li>All other pledge levels</li>'
    +       '<ul>'
    +         '<li>$150 each</li>'
    +       '</ul>'
    +     '</li>'
    +   '</ul>'
    + '</div>'
    + '<% addOnGroups.forEach(function(addOnGroup) { %>'
    +   '<div class="row-fluid">'
    +     '<div class="col-sm-offset-2 col-sm-8 col-md-offset-4 col-md-4">'
    +       '<%= addOnGroupTemplate(addOnGroup) %>'
    +     '</div>'
    +   '</div>'
    + '<% }) %>'
  );

  // TODO: absolutely no reason to continue creating new ones of these...super pointless, shouldn't even be a class
  const contentManager = new KdmContentManager();

  const isAddOn = function(item) { return item.addon; };

  const addOnGroups = [{
    groupTitle: 'New Expansions',
    addOns: contentManager.getAllNewExpansions().filter(isAddOn)
  }, {
    groupTitle: 'Old Expansions',
    addOns: contentManager.getAllOldExpansions().filter(isAddOn)
  }, {
    groupTitle: 'New Extras',
    addOns: contentManager.getAllNewExtras().filter(isAddOn)
  }, {
    groupTitle: 'Old Extras',
    addOns: contentManager.getAllOldExtras().filter(isAddOn)
  }, {
    groupTitle: 'New Crossovers',
    addOns: contentManager.getAllNewCrossovers().filter(isAddOn)
  }, {
    groupTitle: 'New Promos',
    addOns: contentManager.getAllNewPromos().filter(isAddOn)
  }, {
    groupTitle: 'Old Promos',
    addOns: contentManager.getAllOldPromos().filter(isAddOn)
  }, {
    groupTitle: 'New Pinups',
    addOns: contentManager.getAllNewPinups().filter(isAddOn)
  }, {
    groupTitle: 'Old Pinups',
    addOns: contentManager.getAllOldPinups().filter(isAddOn)
  }];

  $('#addons').html(addOnsTemplate({
    addOnGroups: addOnGroups,
    addOnGroupTemplate: addOnGroupTemplate
  }));
})();
