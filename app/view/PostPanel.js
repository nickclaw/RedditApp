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
				id: 'postPanelMain',
				style: 'overflow:scroll'
			}
		]
	},

	load: function(data) {
		var url = data.url;
		var a = Ext.getCmp('postPanel').parent.element.getHeight();
			console.log(a);
		if (url.lastIndexOf('.gif') > 0 || url.lastIndexOf('.jpg') > 0 ||
			url.lastIndexOf('.png') > 0 || url.lastIndexOf('.jpeg') > 0){
			Ext.getCmp('postPanelMain').setHtml("<div style='width:100%;height:" + a + "px;background-image:url(" + url + ");background-size:contain;background-repeat:no-repeat;background-position:50% 50%;'></div>");
		} else {
			Ext.getCmp('postPanelMain').setHtml("<iframe src='" + url + "' style='width:100%;height:100%;'></iframe>");
		}
	}
});