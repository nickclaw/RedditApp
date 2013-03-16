Ext.define('RedditApp.controller.SettingsControl', {
	extend: 'Ext.app.Controller',

	config: {
		refs: {
			settingsButton: '#settings',	// the settings button in the top titlebar
			form: '#form',					// the form that slides down
			cancel: '#cancelSettings',		// button on the forms bottom titlebar
			apply: '#applySettings',		// button onthe forms bottom titlebar
			misc: '#misc',					// miscellanious fields
			login: '#login'					// login fields
		},

		control: {
			settingsButton: {
				tap: 'showSettings'			// open settings form on tap of settingsButton
			},
			cancel: {
				tap: 'hideSettings'			// hide settings form on tap of  cancel button
			},
			apply: {
				tap: 'applySettings'		// apply settings on tap of apply button
			}
		},

		loggedIn: false
	},

	// animates the settings form onto the page
	showSettings: function() {
		Ext.Viewport.animateActiveItem(this.getForm(), {type: 'slide', direction: 'down'});
	},

	// animate the settings form off the page
	hideSettings: function() {
		Ext.Viewport.animateActiveItem(Ext.getCmp('main'), {type: 'slide', direction: 'up'});
	},

	// apply all the settings
	applySettings: function() {
		// LOGIN
		if (this.getLogin().getValues().user && this.getLogin().getValues().passwd && !this.getLoggedIn()){
			var param = this.getLogin().getValues();
			param.api_type = 'json';
			console.log(param);
			me = this;

			Ext.Ajax.request({
				url: 'https://ssl.reddit.com/api/login',
				method: 'POST',

				params: param,
				useDefaultXhrHeader: false,
				// headers: {
				// 	'User-Agent' : '/u/illucidations practice application'
				// },

				success: function(response){
					console.log(response.responseText);
					me.setLoggedIn(true);
					Ext.Ajax.request({
						url: 'https://ssl.reddit.com/api/me.json',
						method: 'GET',
						useDefaultXhrHeader: false,

						success: function(response){
							console.log(response.responseText);
							var allSubredditStore = Ext.getStore('AllSubredditStore');
							allSubredditStore.setCount(me.getMisc().getValues().subreddits);
							allSubredditStore.load({addRecords: false});
						}
					})
				}
			});
		}

		if (!this.getMisc().getValues().nsfw){
			Ext.getStore('PostStore').filterBy(function(record, index){return !record.data.over_18});
		} else {
			Ext.getStore('PostStore').clearFilter();
		}
		this.hideSettings()
	}
});