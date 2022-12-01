const bcryptjs = require('bcryptjs')
const { validationResult } = require('express-validator');
const { validateLogin } = require('../utilities/validateLogin');
const db = require('../databases/models');


module.exports = {
  // Show login form
  login: (req, res) => {
    res.render('./users/login');
  },

  loginProcess: async (req, res) => {
    const resultValidation = validationResult(req)
    if(resultValidation.errors.length > 0){
      return res.render('./users/login', {
        errors: resultValidation.mapped(),
        oldData: req.body
      })
    } else {
      let userToLogin = await db.User.findOne({
        where: {
          email: req.body.email,
        }
      });
      
      let pwdExists = await bcryptjs.compare(req.body.password, userToLogin.password);
      
      if (pwdExists) {
        req.session.loggedUser = userToLogin;
        res.render('./users/profile', { user: userToLogin });
      } else {
        res.redirect('./index');
      }
    }  
  },

  // Shows user profile
  profile: async (req, res) => {
    let userToLogin = await db.User.findByPk(req.session.loggedUser.id);
    
    res.render('./users/profile', { user: userToLogin });
  },

  // Shows register form
  register: (req, res) => {
    res.render('./users/register');
  },

  // Process register form
  create: async (req, res) => {
    const resultValidation = validationResult(req)
    if(resultValidation.errors.length > 0){
      return res.render('./users/register', {
        errors: resultValidation.mapped(),
        oldData: req.body
      })
    } else {
      let newAddress = await db.Address.create({
        address: 'Street 123',
        city: 'Buenos Aires',
        postal_code: '1248',
        country: 'Argentina'
      })
      
      let hash = await bcryptjs.hash(req.body.password, 10);
      
      db.User.create({
        nickname: 'user',
        name: req.body.name,
        surname: req.body.lastName,
        email: req.body.email,
        password: hash,
        birthdate: req.body.birthdate,
        role_id: 2,
        address_id: newAddress.id
      });
    }
    
    res.redirect('./login')
  },

  // Shows user to edit
  edit: (req, res) => {
    db.User.findByPk(req.session.loggedUser.id)
      .then((userToEdit) => {
        res.render('../views/users/edit.ejs', { userToEdit: userToEdit });
    })
  },

  // Edit the user
  update: (req, res) => {
    // TODO check user password
    db.User.update({
      name: req.body.name,
      surname: req.body.lastName,
      email: req.body.email,
    }, {
      where: {
        id: req.session.loggedUser.id
      }
    })
    
    db.User.findByPk(req.session.loggedUser.id).then(user => {
      res.render('./users/profile', { user: user });
    })
  },

  // Delete the user
  delete: (req, res) => {
    db.User.destroy({
      where: {
        id: req.session.loggedUser.id
      }
    })
    
    res.redirect('./products/shopAll');
  },
};

