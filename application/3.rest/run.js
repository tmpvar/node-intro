// you must run `npm install connect` in the terminal first..

var
connect = require('connect'),
routes  = require(__dirname + '/routes'),
port    = 1234;

connect.createServer(
  // Log requests to standard out (the terminal)
  connect.logger(),

  // Decode the body of the request
  connect.bodyParser(),

  // Setup the routes
  connect.router(routes)
).listen(port);

console.log('listening on port', port);
