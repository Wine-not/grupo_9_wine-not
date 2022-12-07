const db = require('../databases/models');


<<<<<<< HEAD
module.exports = rememberLoggedUser = async (req, res, next) => {
  if (req.cookies.rememberMe != undefined && req.session.loggedUser == undefined) {
    let userToLogin = await db.User.findOne({
=======

module.exports = rememberMe =  (req, res, next) => {
  if (req.cookies.rememberMe != undefined && req.session.loggedUser == undefined) {
    let userToLogin =  db.User.findOne({
>>>>>>> ddf2a531b67cb56652edb15a71d3295ca7bf75ef
      where: {
        email: req.cookies.rememberMe,
      }
    });
    req.session.loggedUser = userToLogin;
  }
<<<<<<< HEAD
  next();
=======
  next()
>>>>>>> ddf2a531b67cb56652edb15a71d3295ca7bf75ef
}

