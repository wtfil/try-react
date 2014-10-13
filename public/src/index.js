/** @jsx React.DOM */
var React = require('react');
var TodoCollection = require('./models/TodoCollection');
var Todo = require('./components/Todo');

window.addEventListener('load', function () {
	var items = [
		{description: 'Buy apples'},
		{description: 'Buy oranges'}
	];

	React.renderComponent(
		<Todo model={new TodoCollection(items)}/>,
		document.querySelector('.todo')
	);
}, false);
