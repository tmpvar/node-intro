// you must run `npm install connect` in the terminal first..

var
connect = require('connect'),
port    = 1234;

connect.createServer(
  connect.logger(),
  connect.router(function(app) {
    app.get('/hello', function(request, response) {
      response.writeHead(200, {
        'Content-type' : 'text/plain'
      });
      response.end('world!');
    });
  })
).listen(port);

console.log('listening on port', port, 
            '- In another terminal, try:\n\n',
            'curl localhost:1234"');
