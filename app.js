var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var fileRouter = require('./routes/file/fileImage.js');

//readfile.js
var fs = require('fs');

//stream을 그대로 xmlstream으로 넘겨줌
var XmlStream = require('xml-stream');

//비동기 I/O, 파일 전체를 모두 로드하기 전에 뭔가를 할 수 있음
var stream=fs.createReadStream('C:/Users/WDJ/PycharmProjects/untitled/sample.xml');

var xml = new XmlStream(stream);
//태그 이름이 'data'것만 검색
xml.preserve('data',true);
//$children, $text, $name 다 나옴 
xml.collect('subitem');

//각 xml의 엘리먼트가 끝났을때마다 data 태그안의 데이터 출력
xml.on('endElement:data', function(data) {
	if(data['$text']=='신기술')
		console.log(data['$text']);
});

var app = express();

const port = 80;

app.get('/', (req, res, next) => {
  res.send('hello world!');
});

app.listen(port, () => {
  console.log(`Server is running at ${port}`);
});


// view engine setup
app.set("view engine", 'ejs');
app.set('views', './views');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/file', fileRouter);




// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
});

module.exports = app;
