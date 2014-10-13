/** @jsx React.DOM */
var React = require('react');
var ModelMixin = require('../utils/ModelMixin');

var TodoItem = React.createClass({
	mixins: [ModelMixin],

	render: function () {
		var className = ['todo-item'];
		var done = this.model.get('done');

		if (done) {
			className.push('done');
		}

		return <div className={className.join(' ')}>
			<input type="text" value={this.model.get('description')}/>
			<input type="text" value={this.model.get('date')}/>
			<input onChange={this.onChange} type="checkbox" checked={done}/>
		</div>;
	},

	onChange: function () {
		this.model.toggle();
	}
});

module.exports = TodoItem;
