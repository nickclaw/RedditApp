Ext.define('RedditApp.controller.PostControl', {
	extend: 'Ext.app.Controller',

	config: {
		refs: {
			pageList: '#list',
			postPanel: '#postPanel'
		},

		control: {
			pageList: {
				postselect: 'onPostSelect'
			}
		}
	},

	onPostSelect: function(data, button) {
		console.log('hey!');
		this.getPostPanel().load(data);
		this.getPostPanel().show();
	}
});