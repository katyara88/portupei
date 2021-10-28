/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
var gulp 		 = require('gulp'),
	pug			 = require('gulp-pug'),
	stylus 		 = require('gulp-stylus'),
	browserSync  = require('browser-sync'),
	concat		 = require('gulp-concat'),
	uglify		 = require('gulp-uglify-es').default,
	cssnano		 = require('gulp-cssnano'),
	rename		 = require('gulp-rename'),
	del			 = require('del'),
	imagemin 	 = require('gulp-imagemin'),
	pngquant	 = require('imagemin-pngquant'),
	cache 		 = require('gulp-cache'),
	autoprefixer = require('gulp-autoprefixer'),
	plumber		 = require('gulp-plumber'),
	reload 		 = browserSync.reload;

gulp.task('stylus', () => {
	return gulp.src('src/stylus/**/*.styl')
		.pipe(plumber())
		.pipe(stylus({
			'include css': true
		}))
		.pipe(autoprefixer(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], { cascade: true }))
		.pipe(gulp.dest('src/css'))
		.pipe(reload({stream: true}));
});

gulp.task('pug', () => {
	return gulp.src('src/pug/**/!(_)*.pug')
		.pipe(plumber())
		.pipe(pug({
			pretty: true
		}))
		.pipe(gulp.dest('src'))
		.pipe(reload({stream: true}));
});

gulp.task('scripts', () => {
	return gulp.src([
		'src/vendor/jquery/jquery.min.js',
	])
		.pipe(concat('libs.min.js'))
		.pipe(uglify())
		.pipe(gulp.dest('src/js'));
});

gulp.task('css-libs', ['stylus'], () => {
	return gulp.src('src/css/libs.css')
		.pipe(cssnano())
		.pipe(rename({suffix: '.min'}))
		.pipe(gulp.dest('src/css'));
});

gulp.task('browser-sync', () => {
	browserSync({
		server: {
			baseDir: 'src'
		},
		notify: false
	});
});

gulp.task('clean', () => {
	return del.sync('build');
});

gulp.task('clear', () => {
	return cache.clearAll();
});

gulp.task('img', () => {
	return gulp.src('src/images/**/*')
		.pipe(cache(imagemin({
			interlaced: true,
			progressive: true,
			svgoPlugins: [{removeViewBox: false}],
			une: [pngquant()]
		})))
		.pipe(gulp.dest('build/images'))
		.pipe(reload({stream: true}));
});

gulp.task('watch', ['browser-sync', 'css-libs', 'scripts'], () => {
	gulp.watch('src/stylus/**/*.styl', ['stylus']);
	gulp.watch('src/pug/**/*.pug', ['pug']);
	gulp.watch('src/*.html', reload);
	gulp.watch('src/js/*.js', reload);
	gulp.watch('src/css/*.css', reload);
});

gulp.task('build', ['clean', 'img', 'stylus', 'pug', 'scripts'], () => {
	const buildCss = gulp.src([
		'src/css/app.css',
		'src/css/libs.min.css',
	])
		.pipe(gulp.dest('build/css'));

	const buildFonts = gulp.src('src/fonts/**/*')
		.pipe(gulp.dest('build/fonts'));

	const buildJs = gulp.src('src/js/**/*')
		.pipe(gulp.dest('build/js'));

	const buildHtml = gulp.src('src/*.html')
		.pipe(gulp.dest('build'));
});
