const db = require('../databases/models');


module.exports = rememberLoggedUser = async (req, res, next) => {
  if (req.cookies.rememberMe != undefined && req.session.loggedUser == undefined) {
    let userToLogin = await db.User.findOne({
      where: {
        email: req.cookies.rememberMe,
      }
    });
    req.session.loggedUser = userToLogin;
  }
  next();
}

