Ext.define('RedditApp.view.Main', {
	extend: 'Ext.Container',
	xtype: 'main',
	requires: [],

	config: {
		fullscreen: true,
		layout: 'fit',
		id: 'main',

		items: [
			{
				xtype: 'toolbar',
				docked: 'top',
				title: {
					xtype: 'container',
					centered: true,
					layout: 'hbox',
					items: [
						{
							xtype: 'component',
							id: 'logo'
						},
						{
							xtype: 'component',
							html: '/',
							id: 'logoText'
						}
					]
				}
			}
		]
	}
})