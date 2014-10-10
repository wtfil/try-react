var Backbone = require('backbone');

var TodoItem = Backbone.Model.extend({

	defaults: {
		target: '',
		date: Date.now() + 24 * 3600 * 1000,
		done: false
	},

	toggle: function () {
		this.set('done', !this.get('done'));
	}
});

module.exports = TodoItem;
