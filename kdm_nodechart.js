(function(global) {
  'use strict';

  const pageTemplate = _.template(
      '<h3>Campaign Nodes</h3>'
    + '<div class="table-responsive">'
    + '<table class="table table-bordered table-condensed">'
    +  '<thead>'
    +   '<tr>'
    +     '<th></th>'
    +     '<% nodes.forEach(function(node) { %>'
    +       '<th><%= node.title %></th>'
    +     '<% }) %>'
    +   '</tr>'
    +  '</thead>'
    +  '<tbody>'
    +   '<tr class="hidden-xs">'
    +     '<th>Description</th>'
    +     '<% nodes.forEach(function(node) { %>'
    +       '<td><%= node.description %></td>'
    +     '<% }) %>'
    +   '</tr>'
    +   '<tr>'
    +     '<th>Appearance</th>'
    +     '<% nodes.forEach(function(node) { %>'
    +       '<td><%= node.lanternYear ? "Lantern Year " + (node.estimate ? "~" : "") + node.lanternYear : "Unknown" %></td>'
    +     '<% }) %>'
    +   '</tr>'
    +   '<tr class="expansions-row">'
    +     '<th>New Expansions</th>'
    +     '<% nodes.forEach(function(node) { %>'
    +       '<td>'
    +         '<ul>'
    +           '<% node.newExpansions.forEach(function(expansion) { %>'
    +             '<li><%= expansion.title %> <%= expansion.speculated ? "(speculated)" : "" %></li>'
    +           '<% }) %>'
    +         '</ul>'
    +       '</td>'
    +     '<% }) %>'
    +   '</tr>'
    +   '<tr class="expansions-row">'
    +     '<th>Old Expansions</th>'
    +     '<% nodes.forEach(function(node) { %>'
    +       '<td>'
    +         '<ul>'
    +           '<% node.oldExpansions.forEach(function(expansion) { %>'
    +             '<li><%= expansion.title %> <%= expansion.speculated ? "(speculated)" : "" %></li>'
    +           '<% }) %>'
    +         '</ul>'
    +       '</td>'
    +     '<% }) %>'
    +   '</tr>'
    +   '<tr class="expansions-row">'
    +     '<th>Core Game</th>'
    +     '<% nodes.forEach(function(node) { %>'
    +       '<td>'
    +         '<ul>'
    +           '<% node.coreMonsters.forEach(function(monster) { %>'
    +             '<li><%= monster %></li>'
    +           '<% }) %>'
    +         '</ul>'
    +       '</td>'
    +     '<% }) %>'
    +   '</tr>'
    +  '</tbody>'
    + '</table>'
    + '</div>'
  );

  function KdmNodeChart(wrapperEl) {
    this.$wrapperEl = $(wrapperEl);
    this.contentManager = new KdmContentManager();
  }

  KdmNodeChart.prototype.initialize = function() {
    const campaignNodes = this.contentManager.getCampaignNodes();

    this.$wrapperEl.html(pageTemplate({
      nodes: campaignNodes,
      rows: [{
        columns: campaignNodes
      }]
    }));
  };

  var $wrapperEl = $('#nodechart');
  var nodeChart = new KdmNodeChart($wrapperEl);

  nodeChart.initialize();
})(window);
