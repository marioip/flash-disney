var gulp = require('gulp'),
	jade = require('gulp-jade'),
	sass = require('gulp-sass'),
	sprity = require('sprity'),
	gulpif = require('gulp-if'),
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

// generate sprite.png and _sprite.scss 
gulp.task('sprites', function () {
  return sprity.src({
    src: './src/images/**/*.{png,jpg}',
    style: './_sprite.css',
    // ... other optional options 
    // for example if you want to generate scss instead of css 
    processor: 'sass', // make sure you have installed sprity-sass 
  })
  .pipe(gulpif('*.png', gulp.dest('./dist/images/'), gulp.dest('./src/sass/')))
});

gulp.task('watch', function(){
	livereload.listen();
	gulp.watch('src/**/*.jade', ['jade']);
	gulp.watch('src/sass/**/*.scss', ['sass']);
});

gulp.task('default', ['jade','sass','watch']);