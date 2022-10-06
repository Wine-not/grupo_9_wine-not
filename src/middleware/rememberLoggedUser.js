const readFile = require('fs/promises').readFile;
const path = require('path');


module.exports = rememberLoggedUser = async (req, res, next) => {
  if (req.cookies.rememberUser !== undefined && req.session.loggedUser === undefined) {
    const usersFilePath = path.join(__dirname, '../data/users.json');

    const users = JSON.parse(await readFile(usersFilePath, 'utf-8'));

    let userToLogin = users.find(user => user.email === req.cookies.rememberUser);

    if (userToLogin) {
      req.session.loggedUser = userToLogin;
    }
  }

  next();
}
