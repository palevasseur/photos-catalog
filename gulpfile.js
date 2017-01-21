var gulp = require('gulp');
var exec = require('child_process').exec;
var path = require('path');
var webpack = require('webpack');
var browserSync = require('browser-sync');
var runSequence = require('run-sequence');

var paths = {
    app: {
        build: 'app_build',
        src: 'app',
        entry: 'app_build/index.html',
        webpackEntry: 'app/js/index.jsx'
    },
    server: {
        build: 'server_build',
        src: 'server',
        entry: 'server_build/index.js'
    }
};

// main tasks
gulp.task('app-build', ['app-webpack', 'app-copy-html']);
gulp.task('db-start', ['db-start-mongo']);
gulp.task('api-start', ['api-start-node']);
gulp.task('app-dev', ['app-watch-html', 'app-webpack-watch', 'app-serve']);

// https://github.com/gulpjs/gulp/blob/master/docs/API.md
function runCommand(command) {
    return function (cb) {
        exec(command, function (err, stdout, stderr) {
            console.log(stdout);
            console.log(stderr);
            cb(err);
        });
    }
}

// -------
// mongodb
// -------
// launch mongo
gulp.task('db-start-mongo', runCommand('mongod')); // mongod --dbpath ./data/

// -------
// app
// -------
var srcRootHtml = paths.app.src + '/*.html';
// copy & watch root *.html
gulp.task("app-watch-html", ['app-copy-html'], function () {
    gulp.watch([srcRootHtml], ['app-copy-html']);
});

// copy root *.html => build
gulp.task("app-copy-html", function () {
    return gulp.src([srcRootHtml])
        .pipe(gulp.dest(paths.app.build));
});

function build(watch, callback) {
    webpack({
        watch: watch,
        module: {
            loaders: [
                {
                    test: /\.jsx?$/,
                    exclude: /node_modules/,
                    loader: 'babel-loader'
                }
            ]
        },
        entry: path.resolve(__dirname, paths.app.webpackEntry),
        output: {
            path: path.resolve(__dirname, paths.app.build),
            filename: 'bundle.js'
        }
    }, function (err, stats) {
        if (callback) callback();
    });
}

gulp.task('app-webpack-watch', function () {
    build(true);
});

// https://github.com/jacobmarshall-etc/gulp-webpack-react-babel/blob/master/gulpfile.js
gulp.task('app-webpack', function(watch) {
    build(false);
});

// https://github.com/google/web-starter-kit/blob/master/gulpfile.babel.js
// https://browsersync.io/docs/gulp
gulp.task('app-serve', function () {

    browserSync({
        //notify: false,
        // Customize the Browsersync console logging prefix
        //logPrefix: 'WSK',
        server: [paths.app.build],
        port: 4000
    });

    gulp.watch([paths.app.build + '/**/*.html'], browserSync.reload);
    //gulp.watch([paths.app.build + '/**/*.js'], ['lint', 'scripts', browserSync.reload]);
    gulp.watch([paths.app.build + '/**/*.js'], browserSync.reload);
});


// ------
// server
// ------
gulp.task('api-start-node', runCommand('node ./server_build/index.js'));

