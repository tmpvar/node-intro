var merge = require('connect').utils.merge;


// Provide a helper to end requests
module.exports  = function end(res, code, body, headers) {

  headers = headers || {};
  body    = body    || '';

  var contentType = 'application/json';

  if (typeof body === 'string' || body instanceof String) {
    contentType = 'text/html';

    if (code < 300) {
      code = 303;
    }
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