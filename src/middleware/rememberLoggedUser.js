const fsPromises = require('fs').promises;
const path = require('path');

module.exports = rememberLoggedUser = (req, res, next) => {
  if (req.cookies.rememberUser !== undefined && req.session.loggedUser === undefined) {
    const usersFilePath = path.join(__dirname, '../data/users.json');

    fsPromises.readFile(usersFilePath, 'utf-8')
      .then(result => {
        const users = JSON.parse(result);

        let userToLogin = users.find(user => user.email === req.body.email);

        if (userToLogin) {
          if (userToLogin.email === req.cookies.rememberUser.email) {
            req.session.loggedUser = userToLogin;
          }
        }
      }).catch(err => {
      if (err) throw err
    })

  }

  next();
}
