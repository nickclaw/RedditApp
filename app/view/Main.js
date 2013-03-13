Ext.define('RedditApp.view.Main', {
	extend: 'Ext.Container',
	requires: ['Ext.Button', 'Ext.Toolbar', 'RedditApp.plugin.DataViewPaging', 'Ext.SegmentedButton', 'Ext.DataView'],
	xtype: 'main',

	config: {
		fullscreen: true,
		layout: 'fit',
		id: 'main',

		items: [
			{ // top toolbar with logo
				xtype: 'toolbar',
				docked: 'top',
				height: 65,
				title: { // title in center of titlebar
					xtype: 'container',
					centered: true,
					layout: 'hbox',
					items: [
						{ // hidden subreddit text space to make logo centered
							xtype: 'component',
							html: '/',
							id: 'hiddenLogoText',
						},
						{ // reddit logo image
							xtype: 'component',
							id: 'logo'
						},
						{ // subreddit text space
							xtype: 'component',
							html: '/',
							id: 'logoText'
						}
					]
				},

				defaults: {
					xtype: 'button',
					iconMask: 'true',
					ui: 'action',
					height: 45,
				},
				items: [
					{ // refresh page button
						iconCls: 'refresh',
						id: 'refresh',
						width: 45
					},
					{xtype: 'spacer'},
					{ // settings button
						iconCls: 'settings',
						id: 'settings',
						width: 45
					}
				]
			},
			{ // toolbar for subreddit, sorting, and time
				xtype: 'toolbar',
				docked: 'top',
				height: 65,

				items: [
					{xtype: 'spacer'},
					{ // button to press to open list of subreddits
						xtype: 'button',
						id: 'subredditButton',
						text: 'frontpage',
						height: 45
					},
					{ // segmented buttons to choose sorting
						xtype: 'segmentedbutton',
						id: 'sortingButtons',
						allowMultiple: false,
						height: 45,

						items: [
							{
								text: 'hot',
								pressed: true,
							},
							{text: 'new'},
							{text: 'rising'},
							{text: 'controversial'},
							{text: 'top'}
						]
					},
					{ // button to press to choose time
						xtype: 'button',
						id: 'timeButton',
						iconCls: 'time',
						iconMask: true,
						disabled: true,
						height: 45
					},
					{xtype: 'spacer'}
				]
			},
			{
				xtype: 'dataview',
	            store: 'PostStore',
	            useComponents: true,
	            defaultType: 'postitem',
	            id: 'list',
	            plugins: [
	            	{
	            		xclass: 'RedditApp.plugin.DataViewPaging',
	            		id: 'plugin'
	            	}
	            ],

	         	listeners: {
	         		nextpage: function() {
	         			console.log('hey!');
	         		}
	         	}
			}
		]
	}
})