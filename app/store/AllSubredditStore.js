Ext.define('RedditApp.store.AllSubredditStore', {
	extend: 'Ext.data.Store',

	config: {
		model: 'RedditApp.model.Subreddit',
		autoLoad: true,

		proxy: {
			type: 'ajax',
			url: 'resources/startup/allsubreddits.json',

			reader: {
				type: 'json',
				rootProperty: 'data.children',
				record: 'data'
			}
		},

		sorters: [
			{
				sorterFn: function(a,b) {
						if (b.data.title === 'redditNICK'){
							return 1;
						}
						if (a.data.title === 'redditNICK'){
							return -1;
						}
						
						var aName = a.data.url.toLowerCase();
						var bName = b.data.url.toLowerCase();
						return aName > bName ? 1: (aName == bName ? 0 : -1);
					},
				order: 'ASC'
			}
		]
	}
});