Ext.define('RedditApp.controller.SettingsControl', {
	extend: 'Ext.app.Controller',

	config: {
		refs: {
			settingsButton: '#settings',
			form: '#form',
			cancel: '#cancelSettings',
			apply: '#applySettings',
			misc: '#misc',
			login: '#login'
		},

		control: {
			settingsButton: {
				tap: 'showSettings'
			},
			cancel: {
				tap: 'hideSettings'
			},
			apply: {
				tap: 'applySettings'
			}
		}
	},

	showSettings: function() {
		Ext.Viewport.animateActiveItem(this.getForm(), {type: 'slide', direction: 'down'});
	},

	hideSettings: function() {
		Ext.Viewport.animateActiveItem(Ext.getCmp('main'), {type: 'slide', direction: 'up'});
	},

	applySettings: function() {
		if (!this.getMisc().getValues().nsfw){
			Ext.StoreManager.get('PostStore').filterBy(function(record, index){return !record.data.over_18});
		} else {
			Ext.StoreManager.get('PostStore').clearFilter();
		}

		if (this.getLogin().getValues().user && this.getLogin().getValues().passwd){
			console.log('sending get request');
			var param = this.getLogin().getValues();
			param.api_type = 'json';
			console.log(param);

			a = Ext.Ajax.request({
				url: 'https://ssl.reddit.com/api/login',
				method: 'POST',

				params: param,
				useDefaultXhrHeader: false,
				// headers: {
				// 	'User-Agent' : '/u/illucidations practice application'
				// },

				success: function(response){
					console.log(response);
				}
			});
		}
		this.hideSettings()
	}
});