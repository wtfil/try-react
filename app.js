var koa = require('koa'),
	thunkify = require('thunkify'),
	mime = require('mime'),
	through = require('through'),
	transform = require('react-tools').transform,
	readFile = thunkify(require('fs').readFile),
	cjs = require('pure-cjs'),
	app = koa();

app.use(function* (next) {
	if (!/\.jsx?$/.test(this.originalUrl)) {
		return yield next;
	}
	var filename = '.' + this.originalUrl;
	/*
	var compiled = yield cjs.transform({
		input: filename,
		dryRun: true,
		transform: function () {
			var data = '';
			return through(write, end);
			function write(chunk) {data += chunk};
			function end() {
				var code;
				try {
					code = transform(data);
				} catch (err) {
					console.error(err.stack);
					code = 'console.error(' + err.stack + ')';
				}
				this.queue(code);
				this.queue(null);
			}
			
		}
	});
	this.body = compiled.code;
	*/
	var b = require('browserify')();
	b.add(filename);
	b.transform(function () {
		var data = '';
		return through(write, end);
		function write(chunk) {data += chunk};
		function end() {
			var code;
			if (~data.indexOf('/** @jsx React.DOM */')) {
				try {
					code = transform(data);
				} catch (err) {
					console.error(err.stack);
					code = 'console.error(' + err.stack + ')';
				}
			} else {
				code = data;
			}
			this.queue(code);
			this.queue(null);
		}
	});
	this.body = yield require('thunkify')(b.bundle.bind(b));

});

app.use(function* (next) {
	this.res.setHeader('Content-Type', mime.lookup(this.originalUrl));
	try {
		this.body = yield readFile('.' + this.originalUrl);
	} catch (e) {
		this.body = e.stack;
	}
});


app.listen(3000);