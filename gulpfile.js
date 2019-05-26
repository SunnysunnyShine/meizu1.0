const gulp = require("gulp");
const webserver = require("gulp-webserver");
const express = require("express");
const babel = require("gulp-babel");
const uglify = require("gulp-uglify");
const sass = require("gulp-sass");
const csso = require("gulp-csso");
const autoprefixer = require("gulp-autoprefixer");
const https = require("https");
const http = require("http");
const imageMin = require("gulp-imagemin");

gulp.task("compileJS", () => {
	gulp.src("src/scripts/**/*.js")
		.pipe(babel({
			presets: ["@babel/env"]
		}))
		.pipe(gulp.dest("dist/scripts"))
	gulp.src("src/pages/**/*.js")
		.pipe(babel({
			presets: ["@babel/env"]
		}))
		.pipe(gulp.dest("dist/pages"))
	gulp.src("src/static/**/*").pipe(gulp.dest("dist/static"));
})
gulp.task("compileCSS", () => {
	gulp.src("src/styles/**/*.scss")
		.pipe(sass())
		.pipe(autoprefixer())
		.pipe(csso())
		.pipe(gulp.dest("dist/styles"))
})
gulp.task("compileHTML", () => {
	gulp.src("src/pages/**/*.html")
		.pipe(gulp.dest("dist/pages"))
})

gulp.task('image', function() {
	gulp.src('src/img/*.*')
		.pipe(imageMin({
			progressive: true
		}))
		.pipe(gulp.dest('dist/img'))
})
gulp.task('json', function() {
	 gulp.src('src/pages/goods/*.json')
	  .pipe(imageMin({progressive: true}))
	  .pipe(gulp.dest('dist/pages/goods'))
})

gulp.task("server", function() {
	//静态资源服务器 : 9999
	gulp.src("dist")
		.pipe(webserver({
			livereload: true,
			port: 9999
		}))
	gulp.watch("src/pages/**/*.js", ["compileJS"]);
	gulp.watch("src/scripts/**/*.js", ["compileJS"]);
	gulp.watch("src/styles/**/*.scss", ["compileCSS"]);
	gulp.watch("src/pages/**/*.html", ["compileHTML"]);
	gulp.watch("src/img/*.*", ["image"]);

	//接口代理服务器
	let app = express();
	app.get("/", (req, res) => {
		res.setHeader("Access-Control-Allow-Origin", "*"); //cors
		res.setHeader("Content-Type", "text/plain; charset=utf8")
		res.end("welcome");
	})
	app.listen(8000);
})
gulp.task("build", ["compileJS", "compileCSS", "compileHTML"])
