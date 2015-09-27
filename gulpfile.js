var gulp = require('gulp'),
	jade = require('gulp-jade'),
	sass = require('gulp-sass'),
	sprity = require('sprity'),
	gulpif = require('gulp-if'),
	concat = require('gulp-concat'),
	uglify = require('gulp-uglify'),
	browserify = require('gulp-browserify'),
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

gulp.task('js-libraries',function(){
    return gulp.src(['src/js/jquery.min.js','src/js/jquery-ui-1.11.4/jquery-ui.min.js','src/js/fabric.js-1.5.0/dist/fabric.min.js'])
    	.pipe(concat('js-libraries.js'))
    	.pipe(gulp.dest(outputDir + '/js'))
});

gulp.task('js',function(){
    return gulp.src('src/js/main.js')
    	.pipe(gulp.dest(outputDir + '/js'))
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
	gulp.watch('src/js/**/*.js', ['js']);
});

gulp.task('default', ['jade','sass','js','watch']);