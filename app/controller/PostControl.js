Ext.define('RedditApp.controller.PostControl', {
	extend: 'Ext.app.Controller',

	config: {
		refs: {
			pageList: '#list',			// datalist of all the posts
			postPanel: '#postPanel',	// the panel that displays posts once opened
		},

		control: {
			pageList: {
				postselect: 'onPostSelect',
				imageselect: 'onImageSelect'
			}
		}
	},

	/**
	 * called when button is tapped
	 * @param is all the posts data
	**/
	onPostSelect: function(data) {
		this.getPostPanel().load(data, false);
		this.getPostPanel().show();
	},

	/**
	 * called when thumbnail is tapped
	 * @param data is all the posts data
	**/
	onImageSelect: function(data) {
		this.getPostPanel().load(data, true)
		this.getPostPanel().show();
	}
});