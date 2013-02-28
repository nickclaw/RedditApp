Ext.define('RedditApp.view.TimePicker', {
	extend: 'Ext.picker.Picker',

	config: {
		id: 'timePicker',
		useTitles: true,

		slots: [
			{
				name: 'time',
				title: 'Time',
				
				data: [
					{text: 'this hour', value: 'hour'},
					{text: 'today', value: 'day'},
					{text: 'this week', value: 'week'},
					{text: 'this month', value: 'month'},
					{text: 'this year', value: 'year'},
					{text: 'all time', value: 'all'}
				]
			}
		]
	}
});