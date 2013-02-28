//<debug>
Ext.Loader.setPath({
    'Ext': 'touch/src',
    'RedditApp': 'app'
});
//</debug>

Ext.application({
    name: 'RedditApp',

    launch: function() {
        // Destroy the #appLoadingIndicator element
        Ext.fly('appLoadingIndicator').destroy();

        // Initialize the main view
        Ext.Viewport.add();
    }
});
