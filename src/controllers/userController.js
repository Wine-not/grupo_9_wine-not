const fs = require('fs');
const path = require('path');
const bcrypt = require('bcrypt');
const { validationResult } = require('express-validator');
const usersFilePath = path.join(__dirname, '../data/users.json');
const users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));

const userController = {
  login: (req, res) => {
    res.render('./users/login');
  },

  loginProcess: (req, res) => {
    let errors = validationResult(req);
    if (errors.isEmpty()) {
      let userToLogin = users.find((user) => user.email == req.body.email);
      if (userToLogin) {
        let isOkThePassword = bcrypt.compareSync(
          req.body.password,
          userToLogin.password
        );
        if (isOkThePassword) {
          delete userToLogin.password;
          req.session.userLogged = userToLogin;
          if (req.body.remember_user) {
            res.cookie('userEmail', req.body.email, { maxAge: 1000 * 60 * 60 });
          }
          return res.redirect('/users/profile');
        }
        return res.render('./users/login', {
          errors: {
            email: {
              msg: 'Incorrect password',
            },
          },
        });
      }
      return res.render('./users/login', {
        errors: {
          email: {
            msg: 'You are not registered',
          },
        },
      });
    }
    return res.render('./users/login', {
      errors: errors.mapped(),
      old: req.body,
    });
  },

  profile: (req, res) => {
    res.render('./users/profile');
  },

  register: (req, res) => {
    res.render('./users/register');
  },

  create: (req, res) => {
    // let errors = validationResult(req);
    // if (!errors.isEmpty()) {
    //   let oldData = req.body;
    //   res.render('./users/register', {
    //     errors: errors.mapped(),
    //     old: oldData,
    //   });
    // }
    //   const hashedPassword = bcrypt.hashSync(req.body.password, 10);
    //   let newUser = {
    //     id: Date.now().toString(),
    //     userId: req.body.userId,
    //     firstName: req.body.firstName,
    //     lastName: req.body.lastName,
    //     email: req.body.email,
    //     password: hashedPassword,
    //     birthdate: req.body.birthdate,
    //   };
    //   users.push(newUser);
    //   fs.writeFileSync(usersFilePath, JSON.stringify(users, ' '));
    //   res.redirect('/users/login');
    let errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.render('./users/register', {
        errors: errors.mapped(),
        old: req.body,
      });
      return;
    }

    let newUser = {
      id: users[users.length - 1].id + 1,
      nickname: req.body.nickname,
      name: req.body.name,
      surname: req.body.surname,
      email: req.body.email,
      password: req.body.password,
      repeatPassword: req.body.passwordrepeat,
      birthdate: req.body.birthdate,
      terms: req.body.terms == undefined ? false : true,
    };

    users.push(newUser);

    let userAdded = JSON.stringify(users, null, '');

    fs.writeFile(usersFilePath, userAdded, (err) => {
      if (err) throw err;
    });

    res.redirect('/');
  },

  edit: (req, res) => {
    let userId = req.params.idUser;
    let userToEdit = users.find((user) => user.userId == userId);
    res.render('./users/edit', { userToEdit: userToEdit });
  },

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

  delete: (req, res) => {
    let userId = req.params.userId;
    let finalUsers = users.filter((user) => user.userId != userId);
    console.log(finalUsers);
    fs.writeFileSync(usersFilePath, JSON.stringify(finalUsers, null, ' '));
    res.redirect('/');
  },
};

module.exports = userController;
