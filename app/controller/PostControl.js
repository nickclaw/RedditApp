Ext.define('RedditApp.controller.PostControl', {
	extend: 'Ext.app.Controller',

	config: {
		refs: {
			pageList: '#list',
			postPanel: '#postPanel',
		},

		control: {
			pageList: {
				postselect: 'onPostSelect',
				imageselect: 'onImageSelect'
			}
		}
	},

	onPostSelect: function(data, button) {
		this.getPostPanel().load(data, false);
		this.getPostPanel().show();
	},

	onImageSelect: function(data, image) {
		console.log('hey!');
		this.getPostPanel().load(data, true)
		this.getPostPanel().show();
	}
});