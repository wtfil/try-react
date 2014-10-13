var ModelMixin = {

	update: function () {
		this.forceUpdate();
	},

	componentWillMount: function () {
		this.model = this.model || this.props.model;
		this.model.on('change add remove', this.update, this);
	},

	componentWillUnmoun: function () {
		this.model.off(null, this.update, this);
	}

};

module.exports = ModelMixin;
