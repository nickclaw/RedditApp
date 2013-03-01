Ext.define('RedditApp.model.Subreddit', {
	extend: 'Ext.data.Model',

	config: {
		fields: [
			{name: 'title', type: 'string'},
			{name: 'url', type: 'string'},
			{name: 'subscribers', type: 'int'},
			{name: 'name', type: 'string'},
			{name: 'id', type: 'string'},
		]
	}
})