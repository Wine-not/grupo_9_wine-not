const fs = require('fs');

function logDBMiddleware(req, res, next) {
  fs.appendFileSync('logDB.txt', 'A register was created on' + 'URL: ' + req.url + '')
  
  next();
}

module.exports = logDBMiddleware;