// you must run `npm install connect` in the terminal first..

var
connect = require('connect'),
port    = 1234,
world   = "world!";

connect.createServer(
  /*
    Log requests to standard out (the terminal)

    See: http://senchalabs.github.com/connect/middleware-logger.html
  */
  connect.logger(),


  /*
    Setup a route to http://localhost:1234/hello that responds with:
    world!

    See: http://senchalabs.github.com/connect/middleware-router.html
  */
  connect.router(function(app) {
    // Handle a GET to /hello
    app.get('/hello', function(request, response) {

      // Respond with a status code 200 with some headers
      response.writeHead(200, {
        'Content-type'   : 'text/plain',
        'Content-length' : world.length
      });

      // Write the body of the response and end
      response.end(world);
    });
  })
).listen(port);

console.log('listening on port', port, 
            '- In another terminal, try:\n\n',
            'curl localhost:1234/hello"');
