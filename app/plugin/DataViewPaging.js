Ext.define('RedditApp.plugin.DataViewPaging', {
	extend: 'Ext.Component',
	alias: 'plugin.dataviewpaging',

	config: {
		bubbleEvents: ['nextpage'],
		dataview: null,
		scroller: null,

	},
	init: function(dataview) {
	    var scroller  = dataview.getScrollable().getScroller();
	    var store = dataview.getStore();


        this.setDataview(dataview);
        this.setScroller(scroller);


        this.getDataview().setScrollToTopOnRefresh(false);


        scroller.on({
            scroll: this.onScroll,
            scope: this
        });
    },

    onScroll: function(scroller, x, y) {
        if (!this.getDataview().getStore().isLoading() && y > scroller.maxPosition.y) {
            this.loadNextPage();
        }
    },

    loadNextPage: function() {
        if (!this.storeFullyLoaded()) {
        	var store = this.getDataview().getStore();
        	var data = store.data.all[store.data.all.length-1].data;
        	var lastElementId = data.name;
        	this.fireEvent('nextpage', lastElementId);
        }
    },

    storeFullyLoaded: function() {
        var store = this.getDataview().getStore();
        var total = store.getTotalCount();


        return total !== null ? total <= (store.currentPage * store.getPageSize()) : false;
    }
});