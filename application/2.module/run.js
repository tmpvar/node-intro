// you must run `npm install connect` in the terminal first..

var
connect = require('connect'),
routes  = require('./routes'),
port    = 1234;

connect.createServer(
  // Log requests to standard out (the terminal)
  connect.logger(),

  // Use the routes that are defined in routes.js
  connect.router(routes)
).listen(port);

console.log('listening on port', port, 
            '- In another terminal, try:\n\n',
            'curl localhost:1234/hello');
