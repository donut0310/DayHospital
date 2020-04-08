var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
//var cors = require('cors');

//>>라우터//
var indexRouter = require('./routes/index');
var layoutRouter = require('./routes/layout');
var cus_pmpcRouter = require('./routes/cus_pmpc');
var cus_consultingRouter = require('./routes/cus_consulting');
var cus_questionRouter = require('./routes/cus_question');
var adm_menuRouter = require('./routes/adm_menu');
var adm_pmpcRouter = require('./routes/adm_pmpc');
var cus_photoRouter = require('./routes/cus_photo');
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
app.use('/cus_pmpc', cus_pmpcRouter);
app.use('/cus_consulting', cus_consultingRouter);
app.use('/cus_question', cus_questionRouter);
app.use('/cus_photo',cus_photoRouter);
//app.use('/adm_menu', adm_menuRouter);
app.use('/adm_pmpc', adm_pmpcRouter);


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
  res.render('error');
});

module.exports = app;