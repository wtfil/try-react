var Backbone = require('backbone');

var TodoItem = Backbone.Model.extend({

	defaults: {
		description: '',
		date: (new Date()).toDateString(),
		done: false
	},

	toggle: function () {
		this.set('done', !this.get('done'));
	}
});

module.exports = TodoItem;
