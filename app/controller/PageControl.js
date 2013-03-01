Ext.define('RedditApp.controller.PageControl', {
	extend: 'Ext.app.Controller',

	config: {
		refs: {
			subredditButton: '#subredditButton',
			subredditPanel: '#subredditPanel',
			subredditList: '#subredditList',

			sortingButtons: '#sortingButtons',

			timeButton: '#timeButton',
			timePicker: '#timePicker',

			refreshButton: '#refresh',

			plugin: '#plugin'
		},

		control: {
			subredditButton: {
				tap: 'toggleSubreddit',
			},
			subredditList: {
				select: 'chooseSubreddit'
			},
			sortingButtons: {
				toggle: 'chooseSorting'
			},
			timeButton: {
				tap :'toggleTime'
			},
			timePicker: {
				change: 'chooseTime'
			},
			refreshButton: {
				tap: 'refreshPage'
			},

			plugin: {
				'nextpage': 'getNextPage'
			}
		}
	},

	changeMainPage: function(url, addToStore) {
		console.log('requesting: ' + url);
		var store = Ext.StoreManager.get('PostStore');

		store.getProxy().setUrl(url); // sets url of store
		Ext.getCmp('list').setScrollToTopOnRefresh(!addToStore); // makes list scroll to top on refresh if bool is false
		store.load({addRecords: addToStore}); // reloads store, adds what was returned to store if addToStore is true

	},

	getUrl: function() {
		var mainUrl = 'http://www.reddit.com';
		list = this.getSubredditList();
		var subreddit = '/';
			if (this.getSubredditList().getSelection().length){
				if (this.getSubredditList().getSelection()[0].data.url !== 'frontpage'){
					subreddit = this.getSubredditList().getSelection()[0].data.url;
				}
			}
		var sorting = this.getSortingButtons().getPressedButtons()[0].getText();
		var time = this.getTimePicker().getValues()?this.getTimePicker().getValues().time:'';
		me = this;

		var url = mainUrl + subreddit + sorting + '/.json'
		if (sorting === 'top' || sorting === 'controversial'){
			url = this.addGetRequest(url, 't', time);
		}
		return url;
	},

	toggleSubreddit: function() {
		console.log('toggled subreddit panel');
		this.getSubredditPanel().showBy(this.getSubredditButton());
	},

	chooseSubreddit: function() {
		this.getSubredditPanel().hide();
		this.getSubredditButton().setText(this.getSubredditList().getSelection()[0].data.url);
		Ext.getCmp('logoText').setHtml(this.getSubredditList().getSelection()[0].data.url);
		Ext.getCmp('hiddenLogoText').setHtml(this.getSubredditList().getSelection()[0].data.url);
		this.changeMainPage(this.getUrl(), false);
	},

	chooseSorting: function(segment, button, isPressed) {
		if (isPressed){
			console.log('chose sorting')
			if (button.getText() === 'top' || button.getText() === 'controversial'){
				this.getTimeButton().enable();
			} else {
				this.getTimeButton().disable();
			}
			this.changeMainPage(this.getUrl(), false);
		}
	},

	toggleTime: function() {
		console.log('toggled time panel');
		timePicker = Ext.getCmp('timePicker');

		timePicker.show();
	},

	chooseTime: function(me) {
		me.hide();
		this.changeMainPage(this.getUrl(), false);
	},

	refreshPage: function() {
		this.changeMainPage(this.getUrl(), false);
	},


	getNextPage: function(id) {
		var url = Ext.StoreManager.get('PostStore').getProxy().getUrl();
		this.changeMainPage(this.addGetRequest(url, 'after', id), true);
	},

	addGetRequest: function(url, name, value) {
		url = url.split('?');
		if (url.length === 1) { // if url has no mappings
			if (value === false || value === ''){
				return url[0];
			} else {
				return url[0] + '?' + name + "=" + value; // return url
			}
		} else { // if url has one or more mappings
			var isSet = false;
			url[1] = url[1].split('&');
			for(var i = 0; i < url[1].length; i++) {
				if (value === false || value === '') { // if you want to take the 
					url[1][i] = '';
					isSet = true;
				} else if (url[1][i].substring(0, name.length+1)===name+'='){
					url[1][i] = name + "=" + value;
					isSet = true;
				}
			}
			if (url[1].indexOf('') >= 0){
				url[1].splice(url[1].indexOf(''), 1);
			}
			url[1] = url[1].join('&');
			if (!isSet){ //that get name was not in string
				url[1]+= '&' + name + '=' + value;
			}
			url = url.join('?');
		}
		return url;
	}
});