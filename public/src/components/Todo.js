/** @jsx React.DOM */
var React = require('react');
var ModelMixin = require('../utils/ModelMixin');
var TodoItemModel = require('../models/TodoItem');
var TodoItem = require('./TodoItem');

var Todo = React.createClass({
	mixins: [ModelMixin],
	getInitialState: function() {
		return {
			list: [
				{target: 'olo', date: 2},
				{target: 'asdolo', date: 3}
			]
		};
	},

	_onClick: function () {
		this.setState({state: this.state.list.push({})});
	},
	render: function () {
		var list = this.state.list.map(function (item) {
			var model = new TodoItemModel(item);
			this._model.add(model);
			return <TodoItem model={model}/>;
		}, this);

		return <div>
			<span className="todo__done">Done: {this._model.done()}</span>
			<div className="todo__list"> {list}</div>
			<button onClick={this._onClick}>Add more</button>
		</div>;
	}
});

module.exports = Todo;
