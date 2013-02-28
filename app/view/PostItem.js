Ext.define('RedditApp.view.PostItem', {
	extend: 'Ext.dataview.component.DataItem',
	xtype: 'postitem',

	config: {
		cls: 'dataItem',
		style: '',
		bubbleEvents: ['postselect'],
		image: {
			cls: 'scoreBox',
			html: ''
		},

		title: {
			cls: 'title',
			flex: 1
		},

		arrow: {
			iconCls: 'icon',
			cls: 'button',
			style: 'border-radius: 100%'
		},

		layout: {
			type: 'hbox',
			align: 'center'
		},

		dataMap: {
			getImage: {
				setSrc: 'thumbnail',
				setHtml: 'score'
			},

			getTitle: {
				setHtml: 'title'
			}
		},

		listeners: {
			updatedata: function(me){
				record = me.getRecord().data;
				if (record.thumbnail==='' || record.thumbnail==='self'){
					this.getImage().setSrc("resources/icons/nothumb.png");
				} 

				if (record.thumbnail==='nsfw' || record.over_18) {
					this.getImage().setSrc("resources/icons/nsfwthumb.png");
				}

				this.getImage().setHtml('<div class="score">' + record.score + '</div>');

				if (record.over_18){
					this.setCls('dataItem nsfw');
				} else {
					this.setCls('dataItem');
				}
			}
		}
	},

	applyImage: function(config) {
		return Ext.factory(config, 'Ext.Img', this.getImage());
	},

	updateImage: function(newImage, oldImage) {
		if (newImage) {
			this.add(newImage);
		}

		if (oldImage) {
			this.remove(oldImage)
		}
	},

	applyTitle: function(config) {
		return Ext.factory(config, 'Ext.Container', this.getTitle());
	},

	updateTitle: function(newTitle, oldTitle) {
		if (newTitle) {
			this.add(newTitle);
		}
		if (oldTitle) {
			this.remove(oldTitle);
		}
	},

	applyArrow: function(config) {
		return Ext.factory(config, 'Ext.Button', this.getArrow());
	},

	updateArrow: function(newArrow, oldArrow) {
		if (newArrow) {
			newArrow.on('tap', this.onButtonTap, this);
			this.add(newArrow);
		}
		if (oldArrow) {
			this.remove(oldArrow);
		}
	},
	onButtonTap: function(button, e) {
		var data = this.getRecord().data;
		this.fireEvent('postselect', data, this);
	}
});