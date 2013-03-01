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
		this.hideSettings()
	}
});