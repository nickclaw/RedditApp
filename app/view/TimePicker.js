Ext.define('RedditApp.view.TimePicker', {
	extend: 'Ext.picker.Picker',

	config: {
		id: 'timePicker',
		useTitles: true,
		modal: true,
		hideMaskOnTap: true,

		slots: [
			{
				name: 'time',
				title: 'Time',
				itemHeight: 65,
				
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