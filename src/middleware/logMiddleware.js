const fs = require('fs');

function logMiddleware(req, res, next) {
  fs.appendFileSync('log.txt', 'URL: ' + req.url + '')
  
  next();
}

module.exports = logMiddleware;