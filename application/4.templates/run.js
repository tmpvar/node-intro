// you must run `npm install connect` in the terminal first..

var
connect = require('connect'),
routes  = require('./routes');
port    = 1234,

connect.createServer(
  // Log requests to standard out (the terminal)
  connect.logger(),

  // Decode the body of the request
  connect.bodyParser(),

  /*
    Allow html forms to specify a _method to be used as the
    http method
    
    See: http://senchalabs.github.com/connect/middleware-methodOverride.html
  */
  connect.methodOverride(),

  // Setup routes
  connect.router(routes)
).listen(port);

console.log('listening on port', port);
