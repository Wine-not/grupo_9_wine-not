const userName = document.querySelector('#name');
const surname = document.querySelector('#surname');
const email = document.querySelector('#email');
const password = document.querySelector('#password');
const passwordRepeat = document.querySelector('#passwordRepeat');
const birthDate = document.querySelector('#birthdate');
const terms = document.querySelector('#terms');
const form = document.querySelector('#form');

const isRequired = (value) => (value === '' ? false : true);

const isBetween = (length, min, max) =>
  length < min || length > max ? false : true;

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
  const name = userName.value.trim();

  if (!isRequired(name)) {
    showError(userName, 'Name cannot be blank.');
  } else {
    valid = true;
  }
};

const checkSurname = () => {
  let valid = false;
  const surname = surname.value.trim();

  if (!isRequired(surname)) {
    showError(surname, 'Name cannot be blank.');
  } else {
    valid = true;
  }
};

form.addEventListener('submit', (e) => {
  e.preventDefault();
});
