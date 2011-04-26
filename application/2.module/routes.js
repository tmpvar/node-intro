var world       = 'world!';

// This is how you define a module
module.exports = function(app) {
  app.get('/hello', function(request, response) {
    response.writeHead(200, {
      'Content-type'   : 'text/plain',
      'Content-length' : world.length
    });
    response.end(world);
  });
};