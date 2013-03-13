Ext.define('RedditApp.view.Settings', {
	extend: 'Ext.Container',
	requires: ['Ext.field.*', 'Ext.tab.Panel', 'Ext.form.*'],

	config: {
		fullscreen: true,
        id: 'form',
        layout: 'fit',
        items: [
            {
                xtype: 'toolbar',
                docked: 'bottom',
                height: 65,
                items: [
                    {
                    	xtype: 'button',
                    	text: 'Cancel',
                    	id: 'cancelSettings',
                    	width: 150
                    },
                    {xtype: 'spacer'},
                    {
                    	xtype: 'button',
                    	text: 'Apply',
                    	id: 'applySettings',
                    	width: 150
                    }
                ]
            },
            {
                xtype: 'tabpanel',
                tabBarPosition: 'bottom',
                items: [
                    {
                        title: 'Login',
                        iconCls: 'user', 
                        iconMask: true,
                        xtype: 'formpanel',
                        id: 'login',
                        flex: 1,
                        items : [
                            {
                                xtype: 'fieldset',
                                title: 'Login info',
                                instructions:'Enter your login information',
                                margin: '7%',
                                items: [
                                    {
                                        xtype: 'textfield',
                                        name: 'username',
                                        label: 'Username',
                                        required: 'true'
                                    },
                                    {
                                        xtype: 'passwordfield',
                                        name: 'password',
                                        label: 'Password',
                                        required: 'true'
                                    },
                                    {
                                        xtype: 'checkboxfield',
                                        name: 'remember',
                                        label: 'Remember?',
                                        checked: true
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        title: 'Settings',
                        iconCls: 'settings',
                        iconMask: true,
                        xtype: 'formpanel',
                        id: 'misc',
                        flex: 1,
                        items: [
                            {
                                xtype: 'fieldset',
                                title: 'Miscellaneous Settings',
                                margin: '7%',
                                items: [
                                    {
                                        xtype: 'checkboxfield',
                                        name: 'nsfw',
                                        label: 'Show Nsfw?',
                                        checked: 'true'
                                    }
                                ]
                            }
                        ]
                    },
                ]
            }
        ]
	}
});
