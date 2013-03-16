Ext.define('RedditApp.store.AllSubredditStore', {
	extend: 'Ext.data.Store',
	requires: ['Ext.data.proxy.JsonP'],

	config: {
		model: 'RedditApp.model.Subreddit',
		autoLoad: {addRecords: true},
		pageSize: 100,
		count: 200,
		proxy: {
			type: 'jsonp',
			url: 'http://www.reddit.com/reddits/popular/.json',
			callbackKey: 'jsonp',
			pageParam: false,

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
		],

		listeners: {
			beforeload: function() {
				if (this.getAllCount() == 0){
					this.add([
							{
								title: 'redditNICK',
								url: undefined
							}
						]);
				}
			},

			load: function(me, records) {
				if (me.getAllCount() < this.getCount()) {
					this.getProxy().setUrl('http://www.reddit.com/reddits/popular/.json?after=' + records[records.length-1].data.name);
					this.load({addRecords: true});
				}
			}
		}
	}
});