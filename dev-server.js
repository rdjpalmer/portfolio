var express = require('express');
var server = express();

if(process.env.NODE_ENV === 'debug') {
  server.use('/', function(req, res, next) {
    console.log(req.originalUrl);
    next();
  });
}

server.use('/', express.static(__dirname + '/dist', {
  extensions: ['html']
}));

server = server.listen(8000, function() {

  const host = server.address().address
  const port = server.address().port

  console.log('Example app listening at http://%s:%s', host, port)
});