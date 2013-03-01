Ext.define('RedditApp.view.PostPanel', {
	extend: 'Ext.Panel',

	config: {
		id: 'postPanel',
		modal: true,
		hideOnMaskTap: true,
		centered: true,

		items: [
			{
				xtype: 'container',
				width: '100%',
				height: '100%',
				layout: 'vbox',
				items: [
					{
						xtype: 'container',
						layout: 'hbox',
						flex: 1,
						items: [
							{
								xtype: 'image',
								flex: 1,
								id: 'postPanelThumb',
							},
							{
								xtype: 'component',
								flex: 2,
								id: 'postPanelTitle'
							}
						]
					},
					{
						xtype: 'container',
						layout: 'hbox',
						flex: 2,
						items: [
							{
								xtype: 'component',
								flex: 1,
								style: 'background:red;'
							},
							{
								xtype: 'component',
								flex: 2,
								style: 'background: blue;'
							}
						]
					}
				]
			}
		]
	},

	load: function(data) {
		d = data;
		if (data.thumbnail === '' || data.thumbnail === 'self'){
			data.thumbnail = 'resources/icons/nothumb.png'
		}
		if (data.over_18){
			data.thumbnail = 'resources/icons/nsfwthumb.png'
		}
		Ext.getCmp('postPanelThumb').setSrc(data.thumbnail);
		Ext.getCmp('postPanelTitle').setHtml(data.title);

	}
});