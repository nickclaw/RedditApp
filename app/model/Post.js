Ext.define('RedditApp.model.Post', {
	extend: 'Ext.data.Model',

	config: {
		fields: [
			{name: 'author', type: 'string'},
			{name: 'domain', type: 'string'},
			{name: 'downs', type: 'int'},
			{name: 'ups', type: 'int'},
			{name: 'score', type: 'int'},
			{name: 'num_comments', type: 'string'},
			{name: 'edited', type: 'boolean'},
			{name: 'is_self', type: 'boolean'},
			{name: 'name', type: 'string'},
			{name: 'over_18', type: 'boolean'},
			{name: 'subreddit', type: 'string'},
			{name: 'subreddit_id', type: 'string'},
			{name: 'thumbnail', type: 'string'},
			{name: 'title', type: 'string'},
			{name: 'url', type: 'string'},
			{name: 'selftext', type: 'string'}
		]
	}
});