var ModelMixin = {
	_update: function () {
		console.log('update');
		// calling without params
		this.forceUpdate();
	},
	componentWillMount: function () {
		this._model = this._model || this.props.model;
		this._model.on('change', this._update, this);
	},

	componentWillUnmoun: function () {
		this._model.off(null, this._update, this);
	}
};

module.exports = ModelMixin;
