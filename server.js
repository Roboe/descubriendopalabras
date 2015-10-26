/* node static server */
var Server = require('node-static').Server;
var port = process.env.PORT || 8000;

require('http').createServer(function(req, res) {
  var server = new Server('./public', { cache: false });
  server.serve(req, res);
}).listen(port);

console.log('App running on http://localhost:%s', port);
