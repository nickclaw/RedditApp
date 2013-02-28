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
    views: ['Main', 'PostItem'],
    controllers: ['PageControl'],

    launch: function() {
        // Destroy the #appLoadingIndicator element
        Ext.fly('appLoadingIndicator').destroy();

        var main = Ext.create('RedditApp.view.Main');

        var timePicker = Ext.create('RedditApp.view.TimePicker');
        timePicker.hide();

        // Initialize the main view
        Ext.Viewport.add(main, timePicker);
    }
});
