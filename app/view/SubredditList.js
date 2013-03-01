Ext.define('RedditApp.view.SubredditList', {
	extend: 'Ext.Panel',
	requires: ['Ext.dataview.List'],

	config: {
		id: 'subredditPanel',
		height: '75%',
		width: '60%',
		modal: true,
		hideOnMaskTap: true,

		items: [
			{
				xtype: 'list',
				height: '100%',
				width: '100%',
				id: 'subredditList',
				store: 'SubredditStore',
				itemTpl: '{url}'
			}
		]
	}
});