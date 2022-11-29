const fs = require('fs');
const path = require('path');
// const bcrypt = require('bcrypt')
const bcryptjs = require('bcryptjs')
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
    const resultValidation = validationResult(req)
    if(resultValidation.errors.length > 0){
      return res.render('./users/login', {
        errors: resultValidation.mapped(),
        oldData: req.body
      })
    } else {
      db.User.findAll()
      .then((users) => {
      for (let user of users) {       
        if (req.body.email == user.email) {
          console.log(user)
          if (bcryptjs.compareSync(req.body.password, user.password)) {
            let userToLogin = user;    
            res.render('./users/profile', { userToLogin: user });
          } else {
            res.render('./users/profile', { userToLogin: user });
          } 
        }
      }
    }) 
   }  
},

  // Shows user profile
  profile: (req, res) => {    
    res.render('./users/profile', { userToLogin });
  },

  // Shows register form
  register: (req, res) => {
    res.render('./users/register');
  },

  // Process register form
  create: (req, res) => {
    const resultValidation = validationResult(req)
    if(resultValidation.errors.length > 0){
      return res.render('./users/register', {
        errors: resultValidation.mapped(),
        oldData: req.body
      })
    }


    db.User.create({
      nickname: 'user',
      name: req.body.name,
      surname: req.body.lastName,
      email: req.body.email,      
      password: bcryptjs.hashSync(req.body.password, 5),
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

