var
http = require('http'),
port = 1234;

http.createServer(function(request, response) {
  response.writeHead(200, {
    'Content-type' : 'text/plain'
  });

  response.end('hello node!');

}).listen(port);

console.log('listening on port', port, 
            '- In another terminal, try:\n\n',
            'curl localhost:1234');