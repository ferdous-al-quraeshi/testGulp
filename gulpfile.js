/*
Testing Gulp processes:
	# conversion ('.coffee' to '.js') ---> 'in-memory'/'on-the-fly' conversion
	# minification || uglification
	# merging (concatenation) "same type" of files in a single file
	# merging (concatenation) "different types" of file (.coffee, .js) in a single type (.js) of) file
	# performing watch task
*/



// Loading Modules
var gulp = require('gulp'),
	uglify = require('gulp-uglify'),
	concat = require('gulp-concat');
	coffee = require('gulp-coffee');
	es = require('event-stream');



/* :: The Short-cut Way (using 'event-stream' module) ::
=====================================================================*/

gulp.task('scripts', function(){
	var getJsFromCoffee = gulp.src('src/*.coffee')
								.pipe(coffee());	// convert '.coffee' into '.js'
	
	var js = gulp.src('src/*.js');	// get me the file(s) that match this pattern

	return es.merge(getJsFromCoffee, js)	// streamline & merge all the '.js'
			.pipe(concat('all.min.js'))		// cancat all & make a build in a single file
			.pipe(uglify())					// minify that single file
			.pipe(gulp.dest('dist'));		// place that final build in the defined directory
});

gulp.task('watch', function(){
	gulp.watch('src/*{js,coffee}', ['scripts']);
});


/* :: The Verbose Way ::
=====================================================================
// cmd command ---> gulp (with the tastName being default),n\
// OR,  gulp <taskName> (i.e. scripts)
// DON'T forget to "return" every tasks

gulp.task('makecoffee', function(){		// cmd: gulp makecoffee 
	return gulp.src('src/*.coffee')		// this select all the '.coffee' files in src dir
	.pipe(coffee())						// this convert '.coffee' into '.js'
	.pipe(gulp.dest('src'));			// destination dir
});

gulp.task('scripts', ['makecoffee'], function(){	// "taskName" can be 'default' or anything
	return gulp.src('src/*.js')			// setting target dir & files
	.pipe(concat('all.min.js'))		// single file build process
	.pipe(uglify())					// minification process
	.pipe(gulp.dest('dist'));		// setting destination dir (the named dir will be created in the process)
});
*/