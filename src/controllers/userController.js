const fs = require('fs');
const path = require('path');
const bcrypt = require('bcrypt')
// const bcryptjs = require('bcryptjs')
const { validationResult } = require('express-validator');
const { validateLogin } = require('../utilities/validateLogin');
const validationsLogin = require('../routes/userRouter');
const db = require('../databases/models');


module.exports = {
  // Show login form
  login: (req, res) => {
    res.render('./users/login');
  },

  loginProcess: (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            success: false,
            errors: errors.array()
        });
    } else {
      db.User.findAll()
      .then((users) => {
      for (let user of users) {       
        if (req.body.email == user.email) {
          let userToLogin = user;
          bcrypt.compare(req.body.password, userToLogin.password, function(err, result) {
            if (result == false) {
             req.session.loggedUser = userToLogin;               
              res.render('./users/profile', { userToLogin });
            } else {
               res.json('error')
            }
          })
        }
      }
    }) 
   }  
},

  // Shows user profile
  profile: (req, res) => {    
    res.render('./users/profile', {userToLogin: userToLogin});
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
      nickname: 'user',
      name: req.body.name,
      surname: req.body.lastName,
      email: req.body.email,
      password: bcrypt.hash(req.body.password, 5),
      birthdate: req.body.birthdate,
      role_id: 1,
      address_id: 1
    })
    res.redirect('./login')
  },

  // Shows user to edit
  edit: (req, res) => {    
    db.User.findByPk(23)
      .then((userToEdit) => {
        res.render('../views/users/edit.ejs', { userToEdit });
    })   
    
  },

  // Edit the user
  update: (req, res) => {
    db.User.update({
      name: req.body.name,
      surname: req.body.lastName,
      email: req.body.email,
    }, {
      where: {
        id: 23
      }
    })
    res.render('./');
  },

  // Delete the user
  delete: (req, res) => {
    db.User.destroy({
      where: {id: 23}
    })
    res.json('deleted')
  },
};

