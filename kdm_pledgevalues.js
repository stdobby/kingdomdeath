(function(global) {
  'use strict';

  const pledgeTableTemplate = _.template(
      '<div class="row-fluid">'
    +   '<div class="table-responsive col-sm-offset-2 col-sm-8 col-md-offset-4 col-md-4">'
    +     '<table class="table table-bordered table-condensed">'
    +       '<thead>'
    +         '<th>Pledge Level</th>'
    +         '<th>Pledge</th>'
    +         '<th>Gamer\'s</th>'
    +         '<th>KS</th>'
    +       '</thead>'
    +       '<tbody>'
    +         '<% pledges.forEach(function(pledge) { %>'
    +           '<tr>'
    +             '<td><%= pledge.title %></td>'
    +             '<td>$<%= pledge.price %></td>'
    +             '<td class="<%= pledge.gamersClassName %>">$<%= pledge.gamersValue %></td>'
    +             '<td class="<%= pledge.kickstarterClassName %>">$<%= pledge.kickstarterValue %></td>'
    +           '</tr>'
    +         '<% }) %>'
    +       '</tbody>'
    +     '</table>'
    +   '</div>'
    + '</div>'
  );

  const pledgesTemplate = _.template(
      '<% pledges.forEach(function(pledge) { %>'
    +   '<div class="row-fluid">'
    +     '<div class="col-sm-offset-2 col-sm-8 col-md-offset-4 col-md-4"><%= pledgeTemplate(pledge) %></div>'
    +   '</div>'
    + '<% }) %>'
  );

  const pledgeTemplate = _.template(
      '<h3><%= title %></h3>'
    + '<div class="pledge-prices">'
    +   '<dl>'
    +     '<dt>Pledge Price</dt>'
    +     '<dd>$<%= price %></dd>'
    +     '<dt>Gamer\'s Value</dt>'
    +     '<dd>$<%= gamersValue %></dd>'
    +     '<dt>Kickstarter Value</dt>'
    +     '<dd>$<%= kickstarterValue %></dd>'
    +   '</dl>'
    + '</div>'
    + '<div class="table-responsive">'
    +   '<table class="table table-bordered table-condensed">'
    +     '<thead>'
    +       '<th>Item</th>'
    +       '<th>Type</th>'
    +       '<th>KS</th>'
    +       '<th>Gamer\'s</th>'
    +     '</thead>'
    +     '<tbody>'
    +       '<% applicableItems.forEach(function(item) { %>'
    +         '<tr>'
    +           '<td><%= item.title %></td>'
    +           '<td><%= item.displayType %></td>'
    +           '<td><%= item.price ? "$" + item.price : "&mdash;" %></td>'
    +           '<td class="text-center"><%= item.gamersContent ? "Yes" : "&mdash;" %></td>'
    +         '</tr>'
    +       '<% }) %>'
    +     '</tbody>'
    +   '</table>'
    + '</div>'
  );

  function KdmPledgeValues(wrapperEl) {
    this.$wrapperEl = $(wrapperEl);
    this.contentManager = new KdmContentManager();
  }

  KdmPledgeValues.prototype.initialize = function() {
    const pledges = this.calculatePledgeValues().filter(function(pledge) {
      return pledge.title !== "Add-On's Only";
    });

    this.$wrapperEl.html(pledgeTableTemplate({
      pledges: pledges
    }));
    this.$wrapperEl.append(pledgesTemplate({
      pledges: pledges,
      pledgeTemplate: pledgeTemplate
    }));
  };

  KdmPledgeValues.prototype.calculatePledgeValues = function() {
    const allItems = this.contentManager.getAllItems();
    return this.contentManager.getPledges().map(function(pledge) {
      const applicableItems = pledge.getApplicableItems(allItems);
      pledge.applicableItems = this.transformItems(applicableItems);
      pledge.kickstarterValue = _.sumBy(pledge.applicableItems, function(item) { return item.price || 0; });
      pledge.kickstarterClassName = (pledge.kickstarterValue >= pledge.price ? 'success' : '');
      pledge.gamersValue = _.sumBy(pledge.applicableItems, function(item) { return item.gamersContent ? item.price : 0; });
      pledge.gamersClassName = (pledge.gamersValue >= pledge.price ? 'success' : '');
      return pledge;
    }, this);
  };

  KdmPledgeValues.prototype.transformItems = function(items) {
    const transformedItems = items.map(function(item) {
      const newContent = item.contentType.new;
      const type = item.contentType.type;

      if (item.title === '1.5 Core Game') {
        item.displayType = 'Core Game';
      } else if (item.title === '1.5 Update Pack') {
        item.displayType = 'Core Update';
      } else {
        item.displayType = (newContent ? 'New ' : 'Old ') + type;
      }

      item.gamersContent = this.determineGamersContent(item);

      return item;
    }, this);
    const itemsByType = _.groupBy(transformedItems, 'contentType.type');
    const sortedItems = [];

    ['Main Component', 'Extra', 'Expansion', 'Promo', 'Pinup'].forEach(function(type) {
      const typedItems = itemsByType[type] || [];
      sortedItems.push(_.sortBy(typedItems, 'displayType'));
    });

    return _.flatten(sortedItems);
  };

  KdmPledgeValues.prototype.determineGamersContent = function(item) {
    if (_.includes(['Main Component', 'Expansion'], item.contentType.type)) {
      return true;
    } else if (_.includes(['Gambler\'s Chest'], item.title)) {
      return true;
    }
    return false;
  };

  var pledgeValues = new KdmPledgeValues($('#pledgevalues'));
  pledgeValues.initialize();
})(window);
