//<debug>
Ext.Loader.setPath({
    'Ext': 'touch/src',
    'RedditApp': 'app'
});
//</debug>

Ext.application({
    name: 'RedditApp',
    plugins: ['DataViewPaging'],
    models: ['Post'],
    stores: ['PostStore'],
    views: ['Main'],
    controllers: [],

    launch: function() {
        // Destroy the #appLoadingIndicator element
        Ext.fly('appLoadingIndicator').destroy();

        var main = Ext.create('RedditApp.view.Main');

        // Initialize the main view
        Ext.Viewport.add(main);
    }
});
