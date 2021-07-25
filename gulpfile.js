const { series, src, dest, watch, parallel } = require("gulp");
const imagemin = require("gulp-imagemin");
const sass = require("gulp-sass")(require("dart-sass"));
const notify = require("gulp-notify");
const webp = require("gulp-webp");
const concat = require("gulp-concat");

//Utilidades CSS
const autoprefixer = require("autoprefixer");
const postcss = require("gulp-postcss");
const cssnano = require("cssnano");
const sourceMaps = require("gulp-sourcemaps");

//Utilidades JS
const terser = require("gulp-terser-js");

const paths = {
  imagenes: "src/img/**/*",
  scss: "src/scss/**/*.scss",
  js: "src/js/**/*.js",
};

// function css(done) {
//   console.log("Compilando SASS en Gulp");

//   done();
// }

// function javaScript(done) {
//   console.log("Compilando JavaScript");

//   done();
// }

// function minificarHTML(done) {
//   console.log("Minificando HTML");

//   done();
// }

// exports.css = css;

// /*Gulp ejecuta una serie de comandos para prevenir boilerplate*/
// exports.javaScript = javaScript;
// exports.default = series(css, javaScript, minificarHTML);

function css() {
  return src(paths.scss)
    .pipe(sourceMaps.init())
    .pipe(sass())
    .pipe(postcss([autoprefixer(), cssnano()]))
    .pipe(sourceMaps.write("."))
    .pipe(dest("./build/css"));
}

function javaScript() {
  return src(paths.js)
    .pipe(sourceMaps.init())
    .pipe(concat("bundle.js"))
    .pipe(terser())
    .pipe(sourceMaps.write())
    .pipe(dest("./build/js"));
}

function imagenes() {
  return src("src/img/**/*")
    .pipe(imagemin())
    .pipe(dest("./build/img"))
    .pipe(notify({ message: "Imagenes minificadas con éxito" }));
}

function versionWebp() {
  return src("src/img/**/*")
    .pipe(webp())
    .pipe(dest("./build/img"))
    .pipe(notify({ message: "Imagen Webp creada con éxito" }));
}

function watchArchivos() {
  watch(paths.scss, css);
  watch(paths.js, javaScript);
}

exports.css = css;
exports.javaScript = javaScript;
exports.imagenes = imagenes;
exports.watchArchivos = watchArchivos;

exports.default = series(css, javaScript, watchArchivos);
