var gulp = require('gulp');
var browserify = require('gulp-browserify');
var reactify = require('reactify');
var gutil = require('gulp-util');
var cwd = process.cwd();
var server = require('http-server');

function asset(path) {
	return cwd + '/public/' + path;
}

gulp.task('js', function () {
	gulp.src(asset('src/index.js'))
		.pipe(browserify({
			debug: true,
			transform: reactify
		}))
		.pipe(gulp.dest(asset('build')));
});

gulp.task('server', function (cb) {
	var port = process.env.NODE_PORT || 3030;
	server.createServer().listen(port, cb);
	gutil.log('Server started at ' + gutil.colors.blue('http://127.0.0.1:' + port));
});

gulp.task('watch', ['server', 'js'], function () {
	gulp.watch(asset('src/**/*'), ['js']);
});
