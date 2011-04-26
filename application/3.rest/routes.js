/*
  This part of the build process adds a restful interface to your todos
  
  Try the following in another terminal for more fun :)
  
  # create a new TODO
  curl localhost:1234/ -i -d '{"name" : "do the dishes"}' -H "Content-type: application/json"

  # view all TODOS
  curl localhost:1234/

  # view a TODO
  curl localhost:1234/do-the-dishes -i

  # update a TODO
  curl localhost:1234/do-the-dishes -i -X PUT -d '{"name" : "do more dishes"}' -H "Content-type: application/json"

  # delete a TODO
  curl localhost:1234/do-more-dishes -i -X DELETE

*/


var
todos   = {},
merge = require('connect').utils.merge,

// Provide a helper to end requests
end  = function(res, code, body, headers) {

  headers = headers || {};
  body    = body    || '';

  var contentType = 'application/json';

  if (typeof body === 'string' || body instanceof String) {
    contentType = 'text/html';
  } else {
    // the double spaces are for formatting
    body = JSON.stringify(body, null, "  ");
  }

  headers = merge({
    'Content-type' : contentType,
    'Content-Length' : body.length
  }, headers);

  res.writeHead(code, headers);
  res.end(body);
};


module.exports = function(app) {

  // List all of the todos
  app.get('/', function(req, res) {
    end(res, 200, todos);
  });

  // Get the a single TODO
  app.get('/:todo', function(req, res) {
    var todo = req.params.todo;

    if (!todos[todo]) {
      end(res, 404, 'TODO not found');

    } else {

      end(res, 200, todos[todo]);
    }
  });

  // Create a new TODO
  app.post('/', function(req, res) {

    var todo = req.body

    if (!todo || !todo.name) {
      end(res, 400, 'Invalid, please include a valid TODO (ie: {"name" : "testing todo"})');

    } else {
      slug = todo.name.replace(/[ ]+/g,'-');

      todo.slug = slug;
      todos[slug] = todo;

      end(res, 201, '', { 'Location' : '/' + slug });
    }
  });

  // Update a TODO
  app.put('/:todo', function(req, res) {

    var
    todoData = req.body,
    todo = req.params.todo;

    if (!todoData || !todoData.name) {
      end(res, 400, 'Invalid, please include a valid TODO (ie: {"name" : "testing todo"})');

    } else if (todos[todo]) {
      end(res, 404, 'TODO not found');

    } else {

      var new_slug = todoData.name.replace(/[ ]+/g,'-');

      delete todos[todo];

      todoData.slug = new_slug;
      todos[new_slug] = todoData;

      end(res, 200, '', { 'Location' : '/' + todo });
    }
  });

  // Remove a TODO
  app.delete('/:todo', function(req, res) {

    var todo = req.params.todo;

    if (!todos[todo]) {
      end(res, 404, 'TODO not found')

    } else {
      delete todos[todo];
      end(res, 200, '', { 'Location': '/' });
    }
  });
};