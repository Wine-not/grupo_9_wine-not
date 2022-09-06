const e = require('express');

const nameIn = document.querySelector('#name');
const surnameIn = document.querySelector('#surname');
const emailIn = document.querySelector('#email');
const passwordIn = document.querySelector('#password');
const passwordRepeatIn = document.querySelector('#passwordRepeat');
const birthDateIn = document.querySelector('#birthdate');
const termsIn = document.querySelector('#terms');
const formIn = document.querySelector('#form');

const isRequired = (value) => (value === '' ? false : true);

const isBetween = (length, min, max) => {
  length < min || length > max ? false : true;
};

const isEmailValid = (email) => {
  const re =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
};

const isPasswordSecure = (password) => {
  const re = new RegExp(
    '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})'
  );
  return re.test(password);
};

const olderThan18 = (age) => (age < 18 ? false : true);

const getAge = (dateInput) => {
  let today = new Date();
  let birth = new Date(dateInput);
  let age = today.getFullYear() - birth.getFullYear();
  let month = today.getMonth() - birth.getMonth();

  if (month < 0 || (month === 0 && today.getDate() < birth.getDate())) {
    age--;
  }

  return age;
};

const showError = (input, message) => {
  const formField = input.parentElement;
  input.classList.remove('success');
  input.classList.add('error');

  const error = formField.querySelector('small');
  error.textContext = message;
};

const showSucces = (input) => {
  const formField = input.parentElement;
  input.classList.remove('error');
  input.classList.add('success');

  const error = formField.querySelector('small');
  error.textContext = '';
};

const checkName = () => {
  let valid = false;
  const userName = nameIn.value.trim();

  if (!isRequired(userName)) {
    showError(nameIn, 'Name cannot be blank.');
  } else {
    valid = true;
  }

  return valid;
};

const checkSurname = () => {
  let valid = false;
  const surname = surnameIn.value.trim();

  if (!isRequired(surname)) {
    showError(surnameIn, 'Name cannot be blank.');
  } else {
    valid = true;
  }

  return valid;
};

const checkEmail = () => {
  let valid = false;
  const email = emailIn.value.trim();

  if (!isRequired(email)) {
    showError(emailIn, 'Email cannot be blank');
  } else if (!isEmailValid(email)) {
    showError(emailIn, 'Email is not valid');
  } else {
    valid = true;
  }

  return valid;
};

const checkPassword = () => {
  let valid = false;
  const password = passwordIn.value.trim();

  if (!isRequired(password)) {
    showError(passwordIn, 'Password cannot be blank');
  } else if (!isPasswordSecure(password)) {
    showError(
      passwordIn,
      'Password must has at least 8 characters that include at least 1 lowercase character, 1 uppercase characters and 1 number.'
    );
  } else {
    valid = true;
  }

  return valid;
};

const checkConfirmPassword = () => {
  let valid = false;
  const passwordRepeat = passwordRepeatIn.value.trim();
  const password = passwordIn.value.trim();

  if (!isRequired(passwordRepeat)) {
    showError(passwordRepeatIn, 'Password cannot be blank');
  } else if (password !== passwordRepeat) {
    showError(passwordRepeatIn, 'Passwords do not match');
  } else {
    valid = true;
  }

  return valid;
};

const checkAge = () => {
  let valid = false;
  const birth = birthDateIn.value;

  if (!isRequired(birth)) {
    showError(birthDateIn, 'Birthdate cannot be blank');
  } else if (getAge(birth) < 18) {
    showError(birthDateIn, 'You must be at least 18 to register');
  } else {
    valid = true;
  }

  return valid;
};

const checkTerms = () => {
  let valid = false;

  if (!termsIn.checked) {
    showError(termsIn, 'You must accept our terms and condition');
  } else {
    valid = true;
  }
};

form.addEventListener('submit', (e) => {
  e.preventDefault();

  let isNameValid = checkName(),
    isSurname = checkSurname(),
    isEmailValid = checkEmail(),
    isPasswordValid = checkPassword(),
    isPasswordRepeatValid = checkConfirmPassword(),
    isAgeValid = checkAge(),
    areTermsAccepted = checkTerms();

  let isFormValid =
    isNameValid &&
    isSurname &&
    isEmailValid &&
    isPasswordValid &&
    isPasswordRepeatValid &&
    isAgeValid &&
    areTermsAccepted;

  if (isFormValid) {
  }
});
