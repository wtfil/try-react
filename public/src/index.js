/** @jsx React.DOM */
var React = require('react');
var TodoCollection = require('./models/TodoCollection');
var Todo = require('./components/Todo');

window.addEventListener('load', function () {
	React.renderComponent(
		<Todo model={new TodoCollection()}/>,
		document.querySelector('.todo')
	);
}, false);
