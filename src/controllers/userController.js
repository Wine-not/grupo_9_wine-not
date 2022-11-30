// const fs = require('fs');
// const path = require('path');
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
          // req.session.loggedUser = user;           
          if (bcryptjs.compareSync(req.body.password, user.password)) { 
            // Los dos resultados del if son iguales porque bcryptjs no me compara bien las contraseñas y necesitaba
            // confirmar que funcione la vista y demás. Retorna false en los dos casos, desconozco el motivo. Help;
            // Session tampoco funciona, puede ser que sea por el scope del if pero no lo pude arreglar.
            let userToLogin = user;
            req.session.loggedUser = userToLogin;  
            res.render('./users/profile', { userToLogin: user  });
            break;
          } else {
            let userToLogin = user;
            req.session.loggedUser = userToLogin;  
            console.log(userToLogin)
            res.render('./users/profile', { userToLogin: user});
            break;
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
      // Aca deberia estar ==> req.session.loggedUser.id, puse el 2 para verificar que el metodo funcione -----------
    db.User.findByPk(1)  // <===---  db.User.findByPk(req.session.loggedUser.id) 
      .then((userToEdit) => {
        res.render('../views/users/edit.ejs', { userToEdit: userToEdit });
    })   
    
  },

  // Edit the user
  update: (req, res) => {
    db.User.update({
      name: req.body.name,
      surname: req.body.lastName,
      email: req.body.email,
    }, {
      // Lo mismo en este where -------------------
      where: {
        id: 1 // <===---  id: req.session.loggedUser.id
      }
    })
    res.render('./');
  },

  // Delete the user
  delete: (req, res) => {
    db.User.destroy({
      // Y lo mismo en este where ---------------
      where: {id: 1}, // <===---  id: req.session.loggedUser.id
    })
    res.json('deleted')
  },
};

