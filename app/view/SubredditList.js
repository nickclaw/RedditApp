Ext.define('RedditApp.view.SubredditList', {
	extend: 'Ext.Panel',
	requires: ['Ext.dataview.List'],

	config: {
		id: 'subredditPanel',
		height: '75%',
		width: '60%',
		modal: true,
		layout: 'vbox',
		hideOnMaskTap: true,

		items: [
			{
				xtype: 'fieldset',
				height: 60,
				style: 'margin: 0px',
				items: [
					{
						xtype: 'searchfield',
						name: 'subreddit',
						id: 'subredditSearch',
						height: '100%',
					}
				]
			},
			{
				xtype: 'list',
				flex: 1,
				id: 'subredditList',
				store: 'SubredditStore',
				itemTpl: '{url}',
				itemHeight: 65
			}
		]
	}
});