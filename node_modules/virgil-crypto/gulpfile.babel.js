import 'babel-core/external-helpers';

import gulp from 'gulp';
import gulpUtil from 'gulp-util';
import gulpPlumber from 'gulp-plumber';
import vinylNamed from 'vinyl-named';
import webpackStream from 'webpack-stream';
import gulpNotify from 'gulp-notify';
import path, { join as pathJoin } from 'path';
import webpack, { DefinePlugin } from 'webpack';
import packageJson from './package.json';
import yargs from 'yargs';
import _ from 'lodash';

import { Server as KarmaServer } from 'karma';
import karmaWebpack from 'karma-webpack';
import karmaJasmine from 'karma-jasmine';
import karmaJasmineMatchers from 'karma-jasmine-matchers';
import karmaChromeLauncher from 'karma-chrome-launcher';
import karmaFirefoxLauncher from 'karma-firefox-launcher';
import karmaSafariLauncher from 'karma-safari-launcher';
import karmaMochaReporter from 'karma-mocha-reporter';
import karmaSourcemapLoader from 'karma-sourcemap-loader';

function handleError (...args) {
	gulpNotify.onError({ title: 'COMPILE ERROR:', message: '<%= error %>' })(...args);
	this.emit('end');
}

export const fromRoot = pathJoin.bind(path, __dirname);

export const PATHS = {
	root: fromRoot('./'),
	build: fromRoot('dist')
};

export const ENVIRONMENTS = {
	DEV: 'development',
	PROD: 'production'
};

const ARGV = yargs.argv;

export const IS_DEBUG = !!ARGV.debug;
export const IS_WATCH = !!ARGV.watch;
export const IS_PROD = !!ARGV[ENVIRONMENTS.PROD];
export const IS_DEV = !IS_PROD;

export const BUNDLE_POSTFIX = `${IS_DEV ? 'dev' : 'min'}`;
export const PACKAGE_VERSION = packageJson.version;

let plugins = [
	new webpack.optimize.OccurenceOrderPlugin(),
	new DefinePlugin({
		PACKAGE_VERSION: JSON.stringify(PACKAGE_VERSION),
		IS_DEBUG: IS_DEBUG,
		IS_DEV: IS_DEV,
		IS_PROD: IS_PROD
	})
];

if (!IS_DEV) {
	plugins = plugins.concat([
		new webpack.optimize.DedupePlugin(),
		new webpack.optimize.UglifyJsPlugin({ sourceMap: false }),
		new webpack.optimize.AggressiveMergingPlugin()
	]);
}

const WEBPACK_CONFIG = {
	entry: {
		crypto: fromRoot('browser.js')
	},

	output: {
		path: PATHS.build,
		filename: `virgil-[name].${BUNDLE_POSTFIX}.js`,
		libraryTarget: 'umd'
	},

	target: 'web',

	cache: IS_DEBUG,
	debug: IS_DEBUG,
	useMemoryFs: true,
	progress: true,
	watch: IS_WATCH,

	stats: {
		colors: true,
		reasons: IS_DEBUG
	},

	plugins: plugins,

	devtool: IS_DEBUG ? 'inline-source-map' : false,

	resolve: {
		modulesDirectories: ['node_modules'],
		extensions: ['', '.webpack.js', '.web.js', '.js', '.jsx']
	},

	module: {
		loaders: [
			{
				test: /\.js$/,
				exclude: /node_modules|virgil-emscripten\.js/,
				// use runtime to optimize the code, but it make sense when you have a lot of ES6 files
				loader: 'babel-loader'
			}
		]
	}
};

const KARMA_CONFIG = {
	basePath: PATHS.root,
	browsers: ARGV.browsers ? ARGV.browsers.split(',') : ['Chrome'],
	browserNoActivityTimeout: 240 * 1000,
	autoWatch: IS_WATCH,
	// to avoid spamming and double running just increase the watch delay
	autoWatchBatchDelay: 300,
	singleRun: !IS_WATCH,
	frameworks: ['jasmine', 'jasmine-matchers'],
	port: 9876,
	colors: true,
	files: [
		'./src/browser/__TEST__/tests.bundle.js'
	],
	preprocessors: {
		'./src/browser/__TEST__/tests.bundle.js': ['webpack'].concat(IS_DEBUG ? ['sourcemap'] : [])
	},
	reporters: ['mocha'],
	webpack: {
		devtool: 'inline-source-map',
		resolve: WEBPACK_CONFIG.resolve,
		plugins: WEBPACK_CONFIG.plugins,
		module: {
			loaders: WEBPACK_CONFIG.module.loaders
		}
	},
	plugins: [
		karmaWebpack,
		karmaJasmine,
		karmaJasmineMatchers,
		karmaChromeLauncher,
		karmaFirefoxLauncher,
		karmaSafariLauncher,
		karmaMochaReporter,
		karmaSourcemapLoader
	],
	webpackMiddleware: {
		noInfo: true
	},
	webpackServer: {
		noInfo: true
	},
	logLevel: 'INFO'
};

gulp.task('test', function(done) {
	let isDoneCallbackCalled = false;

	let karmaServer = new KarmaServer(KARMA_CONFIG, () => {
		if (!isDoneCallbackCalled) {
			done();
		}
	});

	karmaServer.start();
});

gulp.task('build', () => {
	return gulp.src(_.values(WEBPACK_CONFIG.entry))
		.pipe(vinylNamed())
		.pipe(gulpPlumber(handleError))
		.pipe(webpackStream(WEBPACK_CONFIG, webpack))
		.pipe(gulpPlumber.stop())
		.pipe(gulp.dest(WEBPACK_CONFIG.output.path));
});

gulp.task('default', ['build']);
