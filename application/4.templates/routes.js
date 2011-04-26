var
todos    = {},
render   = require(__dirname + '/render'),
end      = require(__dirname + '/end');


module.exports = function (app) {

  // List all of the todos
  app.get('/', function(req, res) {
    render(req, 'index.html', todos, function(data) {
      end(res, 200, data);
    });
  });

  // Get the a single TODO
  app.get('/:todo', function(req, res) {
    var todo = req.params.todo;

    if (!todos[todo]) {
      end(res, 404, 'TODO not found');

    } else {
      render(req, 'todo.html', todos[todo], function(data) {
        end(res, 200, data);
      });
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

      end(res, 201, '', { 'Location' : '/'});
    }
  });

  // Update a TODO
  app.put('/:todo', function(req, res) {

    var
    todoData = req.body,
    todo = req.params.todo;

    if (!todoData || !todoData.name) {
      end(res, 400, 'Invalid, please include a valid TODO (ie: {"name" : "testing todo"})');

    } else if (!todos[todo]) {
      console.log(todos, todo)
      end(res, 404, 'TODO not found');

    } else {

      var new_slug = todoData.name.replace(/[ ]+/g,'-');

      delete todos[todo];

      todoData.slug = new_slug;
      todos[new_slug] = todoData;

      end(res, 200, '', { 'Location' : '/' });
    }
  });

  // Remove a TODO
  app.delete('/:todo', function(req, res) {

    var todo = req.params.todo;

    if (!todos[todo]) {
      end(res, 404, 'TODO not found')

    } else {
      delete todos[todo];
      end(res, 303, '', { 'Location': '/' });
    }
  });
};