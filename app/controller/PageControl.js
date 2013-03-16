Ext.define('RedditApp.controller.PageControl', {
	extend: 'Ext.app.Controller',

	config: {
		refs: {
			subredditButton: '#subredditButton', 	// button on top bar that shows the current subreddits name
			subredditPanel: '#subredditPanel', 		// panel to display subreddits
			subredditList: '#subredditList',		// list object in the subredditPanel
			subredditSearch: '#subredditSearch',	// text field int he subredditPanel

			sortingButtons: '#sortingButtons',		// segmented buttons on top bar

			timeButton: '#timeButton',				// button on top bar that shows a clock
			timePicker: '#timePicker',				// picker object to display times

			refreshButton: '#refresh',				// refresh button on top titlebar

			plugin: '#plugin'						// autopaging plugin to handle loading new pages
		},

		control: {
			subredditButton: {
				tap: 'openSubredditPanel'			// opens subreddit tab on tap
			},
			subredditList: {
				select: 'chooseSubreddit'			// load posts from subreddit when it is selected on the subredditPanel
			},
			sortingButtons: {
				toggle: 'chooseSorting'				// change sorting when the selection of the sortingButtons is changed
			},
			subredditSearch: {
				keyup: 'searchSubreddit'			// whenever anything is typed in the subredditSearch field, update the options shown
			},
			timeButton: {
				tap :'openTimePicker'				// open time picker on tap
			},
			timePicker: {
				change: 'chooseTime'				// change time chosen and reload
			},
			refreshButton: {
				tap: 'refreshPage'					// refresh page on tap
			},

			plugin: {
				'nextpage': 'getNextPage'			// load next page when the plugin fires nextpage event
			}
		}
	},

	/**
	 * Loads more posts to the post list
	 * @param url is a string representing the url to load
	 * @param addToStore is a boolean, true if the posts loaded should be added on, false if they should overwrite
	**/
	changeMainPage: function(url, addToStore) {
		var store = Ext.StoreManager.get('PostStore');

		store.getProxy().setUrl(url);
		Ext.getCmp('list').setScrollToTopOnRefresh(!addToStore); 
		store.load({addRecords: addToStore});

	},

	/**
	 * Creates a url to load based off current settings
	 * @returns url
	**/
	getUrl: function() {
		var mainUrl = 'http://www.reddit.com';
		list = this.getSubredditList();
		var subreddit = '/'; // default frontpage
			if (this.getSubredditList().getSelection().length){ // if anything is selected
				if (this.getSubredditList().getSelection()[0].data.url !== 'frontpage'){ // and the url isn't frontpage
					subreddit = this.getSubredditList().getSelection()[0].data.url; // update the subreddit string
				}
			}
		var sorting = this.getSortingButtons().getPressedButtons()[0].getText(); // gets the sorting value
		var time = this.getTimePicker().getValues()?this.getTimePicker().getValues().time:''; // gets the time value, empty string if nothing is selected

		var url = mainUrl + subreddit + sorting + '/.json' // creates the url
		if (sorting === 'top' || sorting === 'controversial'){
			url = this.addGetRequest(url, 't', time); // adds get request
		}
		return url;
	},

	// opens the subreddit panel, does all necessary setup
	openSubredditPanel: function() {
		this.getSubredditList().deselectAll(); // deselect current selection (necessary for the autoslot)
		this.getSubredditSearch().setValue(''); // clear the subredditSearch bar
		this.searchSubreddit(this.getSubredditSearch()); // searches the subreddit to update the list
		this.getSubredditPanel().showBy(this.getSubredditButton()); //shows the subredditPanel
	},

	// hides subreddit panel, updates all necessary text, updates post list
	chooseSubreddit: function() {
		this.getSubredditPanel().hide(); // hide panel
		this.getSubredditButton().setText(this.getSubredditList().getSelection()[0].data.url); 
		Ext.getCmp('logoText').setHtml(this.getSubredditList().getSelection()[0].data.url);
		Ext.getCmp('hiddenLogoText').setHtml(this.getSubredditList().getSelection()[0].data.url);
		this.changeMainPage(this.getUrl(), false);
	},

	/**
	 * changes the sorting of the posts, enabling or disabling the time button as needed
	 * @param segment represents the entire segmentButton
	 * @param button represents the selected button
	 * @param isPressed boolean if the button is now pressed
	**/
	chooseSorting: function(segment, button, isPressed) {
		// toggle is called twice for one button change, one for a button being unselected, 
		// and one for it being selected, I only deal with it once by seeing if it isPressed
		if (isPressed){
			if (button.getText() === 'top' || button.getText() === 'controversial'){
				this.getTimeButton().enable();
			} else {
				this.getTimeButton().disable();
			}
			this.changeMainPage(this.getUrl(), false);
		}
	},

	// opens time picker
	openTimePicker: function() {
		Ext.getCmp('timePicker').show();
	},

	/**
	 * hides the time picker and changes main page
	 * @param me is the picker
	**/
	chooseTime: function(me) {
		me.hide();
		this.changeMainPage(this.getUrl(), false);
	},

	// refreshes the main page
	refreshPage: function() {
		this.changeMainPage(this.getUrl(), false);
	},

	/**
	 * when typing, shows only subreddits that start with what you've typed out of top 300
	 * otherwise shows default top 25
	 * @param field is the subredditSearch field
	**/
	searchSubreddit: function(field) {
		var text = field.getValue();
		if (text){ // if anything is typed
			// show top 300 subreddits
			this.getSubredditList().setStore(Ext.StoreManager.get('AllSubredditStore'));
			this.getSubredditList().getStore().clearFilter();

			data = this.getSubredditList().getStore().getData().items;

			// handles the dataItem that matches what is typed
			if (data[0].data.title === 'redditNICK'){
				data[0].data.url = '/r/' + text + '/';
			}

			if (text.indexOf('/') !== 0){ // if they started typing '/r/{subreddit}'
				this.getSubredditList().getStore().filter('url', '/r/' + text);
			} else { // if they started typing {subreddit}
				this.getSubredditList().getStore().filter('url', text);
			}
		} else { // if nothing is typed
			// show top 25 subreddits
			this.getSubredditList().setStore(Ext.StoreManager.get('SubredditStore'));
		}
	},

	/**
	 * creates the url for the next page, loads
	 * @param id is the id of the form 't#_abcde' of the last post
	**/
	getNextPage: function(id) {
		var url = Ext.StoreManager.get('PostStore').getProxy().getUrl();
		this.changeMainPage(this.addGetRequest(url, 'after', id), true);
	},

	/**
	 * adds, updates, or deletes a given get request to a url
	 * @param url is the base url with any get requests already or not
	 * @param name is the name of the key to be updated, added, or deleted
	 * @param value is the matching value for the given key {false} or {''} to delete the name-value pair
	 * @return a url string with the 
	**/
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
				if (value === false || value === '') { // if you want to remove the name-value pair
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