const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');
const config = require('./config/config');
const session = require('express-session');
const api = require('./routes/api');


const app = express();



mongoose.connect(config.mongodbUrl, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../reactjs/build')));
app.use(express.static(path.join(__dirname, '../reactjs-admin/build')));
app.use(express.static(path.join(__dirname, './public')));
app.use(express.static(path.join(__dirname, '../file')));


app.use(session({
    key: 'user_sid',
    secret: config.sessionSecret,
    resave: false,
    saveUninitialized: false,
    cookie: {
        expires: 1000*60*config.sessionMinExpiresTime
    }
}));

app.use((req, res, next) => {


    if (req.cookies.user_sid && !req.session.user) {
        res.clearCookie('user_sid')
    };
    next();
});


app.use('/', api);


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
    console.log("res.locals.error: " + res.locals.error + "    \n  err: " + err);
    res.send('error');
});


module.exports = app;
