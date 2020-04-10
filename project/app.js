var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
//var cors = require('cors');

//>>라우터//
var indexRouter = require('./routes/index');
var layoutRouter = require('./routes/layout');

var pmpcRouter = require('./routes/pmpc');
var photoRouter = require('./routes/photo');

var consultingRouter = require('./routes/consulting');
var questionRouter = require('./routes/question');

var mealRouter = require('./routes/meal');

//라우터<<//

// express 연결
var app = express();

app.set('views', path.join(__dirname, 'public/html'));
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);
//app.engine('html', require('jade').renderFile);

// app에서 사용할 options
//app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

/* API 요청 URL======================================= */
app.use('/', indexRouter);
app.use('/layout', layoutRouter);
app.use('/pmpc', pmpcRouter);
app.use('/consulting', consultingRouter);
app.use('/question', questionRouter);
app.use('/photo',photoRouter);
app.use('/meal',mealRouter);


//catch 404 and forward to error handler
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
  res.render('error.html');
});

module.exports = app;