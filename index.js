/** @jsx React.DOM */

var TodoItemModel = Exoskeleton.Model.extend({

	defaults: {
		target: '',
		date: Date.now() + 24 * 3600 * 1000,
		done: false
	},

	toggle: function () {
		this.set('done', !this.get('done'));
	}
});


var TodoCollection = Exoskeleton.Collection.extend({
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


var ModelComponent = {
	componentWillMount: function () {
		this._model = this._model || this.props.model;
		this._update = this.forceUpdate.bind(this, null);
		this._model.on('change', this._update, this)
	},

	componentWillUnmoun: function () {
		this._model.off(null, this._update, this);
	}
};

var TodoItem = React.createClass({
	mixins: [ModelComponent],
	render: function () {
		var p = this._model.toJSON();
			
		return <div>
			<input type="text" value={p.target}/>
			<input type="text" value={p.date}/>
			<input onChange={this._onChange} type="checkbox" checked={p.done}/>
		</div>
	},
	_onChange: function () {
		this._model.toggle();
	}
})

var Todo = React.createClass({
	mixins: [ModelComponent],
	getInitialState: function() {
		this._model = new TodoCollection();

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
			<span>{this._model.done()}</span>
			<div class="todo__list"> {list}</div>
			<button onClick={this._onClick}>Add more</button>
		</div>;
	}
});

React.renderComponent(
	<Todo/>,
	document.querySelector('.app')
);