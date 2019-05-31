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