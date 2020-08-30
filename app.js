const http = require('http');
const path = require('path')
var express = require('express');
var app = express();

app.use(express.static(path.join(__dirname, 'public')));

// サーバーを起動する部分
var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;
  console.log('Example app listening at http://%s:%s', host, port);
});
