var Backbone = require('backbone');
var TodoItemModel = require('./TodoItem');

var TodoCollection = Backbone.Collection.extend({
	model: TodoItemModel,
	done: function () {
		return this.reduce(function (s, model) {
			if (model.get('done')) {
				s ++;
			}
			return s;
		}, 0);
	}
});

module.exports = TodoCollection;
