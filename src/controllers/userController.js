const fs = require('fs');
const path = require('path');
const bcrypt = require('bcrypt');
const { validationResult } = require('express-validator');
const { validateLogin } = require('../utilities/validateLogin');
const usersFilePath = path.join(__dirname, '../data/users.json');
const users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));


module.exports = {
  // Show login form
  login: (req, res) => {
    res.render('./users/login');
  },

  // Process login form
  loginProcess: (req, res) => {
    let errors = validateLogin(req);

    if (errors) {
      console.log(errors);
      res.render('./users/login', {
        errors: errors.mapped(),
        old: req.body,
      });
      return
    }

    let userToLogin = users.find(user => user.email === req.body.email);

    const { password, ...user} = userToLogin;
    req.session.loggedUser = user;

    if (req.body.rememberMe) {
      res.cookie('userMail', req.body.email, { maxAge: 1000 * 60 * 60 * 24 });
    }
    res.redirect('/users/profile');

  },

  // Shows user profile
  profile: (req, res) => {
    res.render('./users/profile', { user: req.session.loggedUser });
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

