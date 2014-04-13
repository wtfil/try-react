var koa = require('koa'),
	browserify = require('browserify'),
	thunkify = require('thunkify'),
	mime = require('mime'),
	fs = require('fs'),
	through = require('through'),
	transform = require('react-tools').transform,
	readFile = thunkify(fs.readFile),
	path = require('path'),
	app = koa();

app.use(function* (next) {
	if (!/\.jsx?$/.test(this.originalUrl)) {
		return yield next;
	}

	var filename = '.' + this.originalUrl,
		b = browserify(),
		bundle;

	b.transform(function (file) {
		var data = '';
		if (path.extname(file) !== '.jsx') {
			return through(write, function () {
				this.queue(data);
				this.queue(null);
			});
		}
		
		return through(write, end)
		function write (buf) { data += buf }
		function end () {
			var code;
			try {
				code = transform(data);
			} catch (err) {
				var message = showError(data, err);
				console.error(message);
				code = 'console.error("' + message.replace(/\n/g, '\\n') + '")';
			}
			this.queue(code);
			this.queue(null);
		}
	});

	b.add(filename);
	this.body = yield thunkify(b.bundle.bind(b));
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