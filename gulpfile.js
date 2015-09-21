var gulp = require('gulp'),
	jade = require('gulp-jade'),
	sass = require('gulp-sass'),
	livereload = require('gulp-livereload');

var outputDir = 'dist/';

gulp.task('jade', function(){
	return gulp.src('src/**/*.jade')
	.pipe(jade())
	.pipe(gulp.dest(outputDir))
	.pipe(livereload());
});

gulp.task('sass', function(){

	return gulp.src('src/sass/main.scss')
		.pipe(sass())
		.pipe(gulp.dest(outputDir+'/css'))
		.pipe(livereload());
});

gulp.task('watch', function(){
	livereload.listen();
	gulp.watch('src/**/*.jade', ['jade']);
	gulp.watch('src/sass/**/*.scss', ['sass']);
});

gulp.task('default', ['jade','sass','watch']);