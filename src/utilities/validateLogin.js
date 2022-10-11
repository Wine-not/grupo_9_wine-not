const fs = require('fs');
const path = require('path');
const bcrypt = require('bcrypt');
const { validationResult } = require('express-validator');
const usersFilePath = path.join(__dirname, '../data/users.json');
const users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));


const validateLogin = (req) => {
    const resultValidateForm = validateForm(req); 
    if (resultValidateForm) {
      return resultValidateForm;
    } 
  
    const { password } = req.body;
    const userToLogin = users.find(user => user.email === req.body.email);
  
    if (!userToLogin) {
      return {
        email: {
          msg: 'Email is not registered',
        },
      };
    }
    const isPasswordValid = bcrypt.compareSync(password, userToLogin.password);
    
    if (!isPasswordValid) {
      return {
        password: {
          msg: 'Invalid password',
        },
      };
    }
  
    return null
  }
  
  const validateForm = (req) => {
    const formErrors = validationResult(req);
    if (!formErrors.isEmpty()) {
      return {
        errors: formErrors.mapped(),
        old: req.body,
      }
    }
  }

  module.exports = {validateForm, validateLogin};