var gulp = require('gulp');
var browserify = require('gulp-browserify');
var reactify = require('reactify');
var cwd = process.cwd();

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
