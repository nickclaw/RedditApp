Ext.define('RedditApp.store.PostStore', {
	extend: 'Ext.data.Store',
	requires: ['Ext.data.proxy.JsonP'],

	config: {
		model: 'RedditApp.model.Post',
		autoLoad: true,

		proxy: {
			type: 'jsonp',
			url: 'http://www.reddit.com/.json',
			callbackKey: 'jsonp',

			listeners: {
					exception: function(me, response, operation) {
						console.log('PROXY Exception');
						Ext.getStore('PostStore').clearData();
					}
			},

			reader: {
				type: 'json',
				rootProperty: 'data.children',
				record: 'data'
			}
		}
	}
});