//<debug>
Ext.Loader.setPath({
    'Ext': 'touch/src',
    'RedditApp': 'app'
});
//</debug>

Ext.application({
    name: 'RedditApp',
    plugins: ['DataViewPaging'],
    models: ['Post', 'Subreddit'],
    stores: ['PostStore', 'SubredditStore', 'AllSubredditStore'],
    views: ['Main', 'PostItem', 'TimePicker', 'SubredditList', 'Settings', 'PostPanel'],
    controllers: ['PageControl', 'PostControl', 'SettingsControl'],

    launch: function() {
        // Destroy the #appLoadingIndicator element
        Ext.fly('appLoadingIndicator').destroy();

        var main = Ext.create('RedditApp.view.Main');

        var timePicker = Ext.create('RedditApp.view.TimePicker');
        timePicker.hide();

        var subredditList = Ext.create('RedditApp.view.SubredditList');
        subredditList.hide();

        var settings = Ext.create('RedditApp.view.Settings');

        var postPanel = Ext.create('RedditApp.view.PostPanel', {
        	zIndex: 1000
        });
        postPanel.hide();

        // Initialize the main view
        Ext.Viewport.add([main, timePicker, subredditList, settings, postPanel]);
    }
});
