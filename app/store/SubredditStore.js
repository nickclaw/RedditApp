Ext.define('RedditApp.store.SubredditStore', {
	extend: 'Ext.data.Store',
	requires: ['Ext.data.proxy.JsonP'],

	config: {
		model: 'RedditApp.model.Subreddit',
		autoLoad: {addRecords: true},

		proxy: {
			type: 'jsonp',
			url: 'http://www.reddit.com/reddits/popular/.json',
			callbackKey: 'jsonp',

			reader: {
				type: 'json',
				rootProperty: 'data.children',
				record: 'data'
			}
		},

		sorters: [
			{
				sorterFn: function(a,b) {
					if (b.data.url === 'frontpage'){
						return 1;
					}
					if (a.data.url === 'frontpage'){
						return -1;
					}
					if(b.data.url === '/r/all/'){
						return 1;
					}
					if (a.data.url === '/r/all/'){
						return -1;
					}
					
					var aName = a.data.url.toLowerCase();
					var bName = b.data.url.toLowerCase();
					return aName > bName ? 1: (aName == bName ? 0 : -1);
				},
				order: 'ASC'
			}
		],

		listeners: {
			beforeload: function() {
				this.add([
						{
							title: 'all',
							url: '/r/all/'
						},
						{
							title: 'frontpage',
							url: 'frontpage'
						}
					]);
			}
		}
	}
});