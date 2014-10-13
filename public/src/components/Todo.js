/** @jsx React.DOM */
var React = require('react');
var ModelMixin = require('../utils/ModelMixin');
var TodoItemModel = require('../models/TodoItem');
var TodoItem = require('./TodoItem');

var Todo = React.createClass({
	mixins: [ModelMixin],

	onClick: function () {
		this.model.add({});
		console.log(this.model);
	},

	render: function () {

		return <div>
			<span className="todo__done">Done: {this.model.done()} (of {this.model.length})</span>

			<div className="todo__list">
				{this.model.map(function (model) {
					return <TodoItem model={model}/>;
				})}
			</div>

			<button onClick={this.onClick}>Add more</button>
		</div>;
	}

});

module.exports = Todo;
