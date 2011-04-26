var
http = require('http'),
port = 1234;

http.createServer(function(request, response) {
  request.on('data', function(chunk) {
    console.log(chunk.toString());
  });
  
  request.on('end', function() {
    response.writeHead(200, {
      'Content-type' : 'text/plain'
    });

    response.end('hello node!');
  });

}).listen(port);

console.log('listening on port', port, 
            '- In another terminal, try:\n\n',
            'curl localhost:1234 -d "hello there...and some more data"');