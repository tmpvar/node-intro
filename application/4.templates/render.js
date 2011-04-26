// you will need to run `npm install template`
// See: https://github.com/graphnode/node-template

var
nodeTemplate = require('template'),
fs           = require('fs'),
path         = require('path'),
templateRoot = path.join(__dirname, '/templates/'),
cache        = {};


module.exports = function(request, template, data, callback) {
  var accept = request.headers['accept'] || '';

  if (request.headers['accept'].indexOf('application/json') === 0) {
    callback(data);

  } else {
    data = { self : data };

    if (!cache[template]) {
      fs.readFile(templateRoot + template, function(err, fileData) {
        if (err) {
          console.log(err);
        } else {
          cache[template] = nodeTemplate.create(fileData.toString());
          callback(cache[template](data));
        }
      });

    } else {
      callback(cache[template](data));
    }
  }
};