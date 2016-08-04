var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');

var routes = require('./routes/index');

var app = express();

app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use('/public', express.static(path.join(__dirname, 'public')));

app.use('/', routes);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler

app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.send(err.message);
});


module.exports = app;