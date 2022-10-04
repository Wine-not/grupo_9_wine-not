const fs = require('fs');
const path = require('path');
const bcrypt = require('bcrypt');
const { validationResult } = require('express-validator');
const usersFilePath = path.join(__dirname, '../data/users.json');
const users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));

module.exports = {
  // Show login form
  login: (req, res) => {
    res.render('./users/login');
  },

  // Process login form
  loginProcess: (req, res) => {
    let errors = validationResult(req);

    if (!errors.isEmpty()) {
      let oldData = req.body;
      res.render('./users/login', {
        errors: errors.mapped(),
        old: oldData
      })
    }

    let userToLogin = users.find(user => user.email === req.body.email);

    if (!userToLogin) {
      res.render('./users/login', {
        errors: {
          email: {
            msg: 'Email is not registered'
          }
        }
      })
    } else {
      bcrypt.compare(req.body.password, userToLogin.password)
        .then(result => {
          if (!result) {
            res.render('./users/login', {
              errors: {
                password: {
                  msg: 'Invalid password'
                }
              }
            })
          } else {
            delete userToLogin.password;
            req.session.loggedUser = userToLogin;

            if (req.body.rememberMe !== undefined) {
              res.cookie('rememberUser', userToLogin.email, { maxAge: 300000 })
            }

            res.send('Logged In, Cookie created')
          }
        })
    }
  },

  // Shows user profile
  profile: (req, res) => {
    res.render('./users/profile');
  },

  // Shows register form
  register: (req, res) => {
    res.render('./users/register');
  },

  // Process register form
  create: (req, res) => {
    let errors = validationResult(req);

    console.log(errors.mapped());

    if (!errors.isEmpty()) {
      let oldData = req.body;
      res.render('./users/register', {
        errors: errors.mapped(),
        old: oldData,
      });
    } else {
      const hashedPassword = bcrypt.hashSync(req.body.password, 10);
      let newUser = {
        id: Date.now().toString(),
        userId: req.body.userId,
        name: req.body.name,
        lastName: req.body.lastName,
        email: req.body.email,
        password: hashedPassword,
        birthdate: req.body.birthdate,
      };
      users.push(newUser);
      fs.writeFileSync(usersFilePath, JSON.stringify(users, null, ' '));
      res.redirect('/users/login');
    }
  },

  // Shows user to edit
  edit: (req, res) => {
    let userId = req.params.idUser;
    let userToEdit = users.find((user) => user.userId == userId);
    res.render('./users/edit', { userToEdit: userToEdit });
  },

  // Edit the user
  update: (req, res) => {
    let userId = req.params.userId;
    let userToEdit = users.find((user) => user.userId == userId);

    userToEdit = {
      userId: req.body.nickname,
      ...req.body,
    };

    let usersUpdated = users.map((user) => {
      if (user.userId == userToEdit.userId) {
        return (user = { ...userToEdit });
      }
      return user;
    });

    fs.writeFileSync(usersFilePath, JSON.stringify(usersUpdated, null, ' '));
    users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));
    res.redirect('./users/profile');
  },

  // Delete the user
  delete: (req, res) => {
    let userId = req.params.userId;
    let finalUsers = users.filter((user) => user.userId != userId);
    console.log(finalUsers);
    fs.writeFileSync(usersFilePath, JSON.stringify(finalUsers, null, ' '));
    res.redirect('/');
  },
};
