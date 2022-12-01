const fs = require('fs');
const path = require('path');
const bcrypt = require('bcrypt');
const { validationResult } = require('express-validator');
const db = require('../databases/models');
const User = db.User;
const { Op } = require('sequelize');




const validateLogin = (req) => {
  const resultValidateForm = validateForm(req);
  if (resultValidateForm) {
    return resultValidateForm;
  }

  const { password } = req.body; 
  // const userToLogin = User.find((user) => user.email === req.body.email);
  const userToLogin = User.findOne({
    where: { email: req.body.email }
  })
  

  if (!userToLogin) {
    return {
      email: {
        msg: 'Email is not registered',
      },
    };
  }
};

const validateForm = (req) => {
  const formErrors = validationResult(req);
  if (!formErrors.isEmpty()) {
    return {
      errors: formErrors.mapped(),
      old: req.body,
    };
  }
};

module.exports = { validateForm, validateLogin };
