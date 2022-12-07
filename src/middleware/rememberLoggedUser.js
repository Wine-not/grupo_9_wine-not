const db = require('../databases/models');



module.exports = rememberMe =  (req, res, next) => {
  if (req.cookies.rememberMe != undefined && req.session.loggedUser == undefined) {
    let userToLogin =  db.User.findOne({
      where: {
        email: req.cookies.rememberMe,
      }
    });
    req.session.loggedUser = userToLogin;
  }
  next()
}

