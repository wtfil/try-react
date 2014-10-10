/** @jsx React.DOM */
var React = require('react');
var ModelMixin = require('../utils/ModelMixin');

var TodoItem = React.createClass({
	mixins: [ModelMixin],
	render: function () {
		var p = this._model.toJSON(),
			className = ['todo-item'];

		if (p.done) {
			className.push('done');
		}

		return <div className={className.join(' ')}>
			<input type="text" value={p.target}/>
			<input type="text" value={p.date}/>
			<input onChange={this._onChange} type="checkbox" checked={p.done}/>
		</div>;
	},
	_onChange: function () {
		this._model.toggle();
	}
});

module.exports = TodoItem;
