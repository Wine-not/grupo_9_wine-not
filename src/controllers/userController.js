const fs = require('fs');
const path = require('path');
const bcrypt = require('bcrypt');
const { validationResult } = require('express-validator');
const { validateLogin } = require('../utilities/validateLogin');
const db = require('../databases/models');
const User = db.User;
// const usersFilePath = path.join(__dirname, '../data/users.json');
// const users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));


module.exports = {
  // Show login form
  login: (req, res) => {
    res.render('./users/login');
  },

  // Process login form
  loginProcess:  (req, res) => {
    db.User.findAll()
      .then((users) => {
        let errors = validateLogin(req);
        let loggedUser = [];

        if (req.body.email != '' && req.body.password != '') {
          loggedUser = users.filter(function (user) {
            return user.email === req.body.email
          });
          if(bcrypt.compareSync(req.body.password, loggedUser[0].password) === false){
            loggedUser = [];
          console.log('test')
          }
        }
        if (loggedUser.length === 0) {
          return res.render(path.resolve(__dirname, '../views/users/login.ejs'), { errors: [{msg: 'Credenciales invalidas'}]})
        } else {
          req.session.user = loggedUser[0];
        }
        if (req.body.rememberMe) {
          res.cookie('email',loggedUser[0].email,{maxAge: 1000 * 60 * 60 * 24})
        }
        return res.redirect('/'); 
      }
      
    )
    // let errors = validateLogin(req);    //
    // if (errors) {
    //   res.render('./users/login', {
    //     errors: errors.mapped(),
    //     old: req.body,
    //   });
    //   return
    // }

    // let userToLogin = users.find(user => user.email === req.body.email);

    // const { password, ...user} = userToLogin;
    // req.session.loggedUser = user;
    //
    // if (req.body.rememberMe) {
    //   res.cookie('userMail', req.body.email, { maxAge: 1000 * 60 * 60 * 24 });
    // }
    // res.redirect('/users/profile');
  },

  // Shows user profile
  profile: (req, res) => {
    // res.render('./users/profile', { user: req.session.loggedUser });
    res.render('./users/profile');
  },

  // Shows register form
  register: (req, res) => {
    res.render('./users/register');
  },

  // Process register form
  create: (req, res) => {
    let errors = validationResult(req);
    console.log(errors)
    if(!errors.isEmpty()) {
      return res.render(path.resolve(__dirname, '../views/users/register.ejs'), {
        errors: errors.errors, old: req.body
      });
    } 

    db.User.create({
      name: req.body.name,
      surname: req.body.lastName,
      email: req.body.email,
      password: req.body.password,
      birthdate: req.body.birthdate,
      role_id: 1,
      address_id: 1
    });
    console.log(User);

    res.redirect('./login');


    // let errors = validationResult(req);
    //
    // console.log(errors.mapped());
    //
    // if (!errors.isEmpty()) {
    //   let oldData = req.body;
    //   res.render('./users/register', {
    //     errors: errors.mapped(),
    //     old: oldData,
    //   });
    // } else {
    //   const hashedPassword = bcrypt.hashSync(req.body.password, 10);
    //   let newUser = {
    //     id: Date.now().toString(),
    //     userId: req.body.userId,
    //     name: req.body.name,
    //     lastName: req.body.lastName,
    //     email: req.body.email,
    //     password: hashedPassword,
    //     birthdate: req.body.birthdate,
    //   };
    //   // users.push(newUser);
    //   // fs.writeFileSync(usersFilePath, JSON.stringify(users, null, ' '));
    //   res.redirect('/users/login');
    // }
  },

  // Shows user to edit
  edit: (req, res) => {
    // let userId = req.params.idUser;
    // let userToEdit = users.find((user) => user.userId == userId);
    // res.render('./users/edit', { userToEdit: userToEdit });
  },

  // Edit the user
  update: (req, res) => {
    // let userId = req.params.userId;
    // let userToEdit = users.find((user) => user.userId == userId);

    // userToEdit = {
    //   userId: req.body.nickname,
    //   ...req.body,
    // };

    // let usersUpdated = users.map((user) => {
      // if (user.userId == userToEdit.userId) {
      //   return (user = { ...userToEdit });
      // }
      // return user;
    // });

    // fs.writeFileSync(usersFilePath, JSON.stringify(usersUpdated, null, ' '));
    // users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));
    // res.redirect('./users/profile');
  },

  // Delete the user
  delete: (req, res) => {
    // let userId = req.params.userId;
    // let finalUsers = users.filter((user) => user.userId != userId);
    // console.log(finalUsers);
    // fs.writeFileSync(usersFilePath, JSON.stringify(finalUsers, null, ' '));
    // res.redirect('/');
  },
};

