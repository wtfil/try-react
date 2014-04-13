var koa = require('koa'),
	browserify = require('browserify'),
	thunkify = require('thunkify'),
	mime = require('mime'),
	fs = require('fs'),
	readFile = thunkify(fs.readFile),
	app = koa();

app.use(function* (next) {
	if (!/\.jsx?$/.test(this.originalUrl)) {
		return yield next;
	}

	var filename = '.' + this.originalUrl,
		b = browserify(),
		bundle;

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