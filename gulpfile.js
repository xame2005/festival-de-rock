const { series, src, dest, watch } = require("gulp");
const sass = require("gulp-sass")(require("dart-sass"));

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
  return src("src/scss/app.scss")
    .pipe(
      sass({
        outputStyle: "expanded",
      })
    )
    .pipe(dest("./build/css"));
}

function minificarCSS() {
  return src("src/scss/app.scss")
    .pipe(
      sass({
        outputStyle: "compressed",
      })
    )
    .pipe(dest("./build/css"));
}

function watchArchivos() {
  watch("src/scss/**/*.scss", css);
}

exports.css = css;
exports.minificarCSS = minificarCSS;
exports.watchArchivos = watchArchivos;
