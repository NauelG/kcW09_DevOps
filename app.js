var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');
app.engine('html', require('ejs').__express);

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(express.static(path.join(__dirname, 'public')));

/**
 * Multiidioma de la app
 */
const i18n = require('./lib/i18nConfig')();
app.use(i18n.init);

/**
 * Connexión a la DB y carga de modelo
 */
require('./lib/connectDB');
require('./models/Anuncio');

/**
 * Carga del micro servicio de resize
 */
const resizeService = require('./services/imageResizeService');

/**
 * Rutas de la primera versión de la api
 */
app.use('/api/anuncios', require('./routes/api/v1/anuncios'));

/**
 * Rutas de la segunda versión de la api
 */
app.use('/apiv2/anuncios', require('./routes/api/v2/anuncios'));
app.use('/apiv2/authenticate', require('./routes/api/v2/authenticate'))

/**
 * Rutas del sitio WEB
 */
app.use('/anuncios', require('./routes/web/anuncios'));
app.use('/locale', require('./routes/web/locale'));
app.use('/', require('./routes/web/index'));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error', { title: 'Error' });
});

module.exports = app;