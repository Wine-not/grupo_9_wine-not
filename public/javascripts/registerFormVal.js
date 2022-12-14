// Inputs
form = document.querySelector('form');
userName = document.querySelector('#name');
lastName = document.querySelector('#lastName');
email = document.querySelector('#email');
password = document.querySelector('#password');
rePassword = document.querySelector('#passwordRepeat');
birthdate = document.querySelector('#birthdate');
terms = document.querySelector('#terms');

// Inputs Messages
userNameMsg = document.querySelector('#userName-msg');
lastNameMsg = document.querySelector('#lastName-msg');
emailMsg = document.querySelector('#email-msg');
pwdMsg = document.querySelector('#password-msg');
pwdRepeatMsg = document.querySelector('#passwordRepeat-msg');
birthdateMsg = document.querySelector('#birthdate-msg');
termsMsg = document.querySelector('#terms-msg');

// Name check

userName.addEventListener('keyup', () => {
  let chars = userName.value.length;
  
  if (chars === 0) {
    userNameMsg.innerText = 'Input can not be empty';
    userName.classList.remove('valid');
    userName.classList.add('invalid');
    userNameMsg.classList.add('form__message');
  } else if (chars < 3) {
    userNameMsg.innerText = 'Products must have at least 3 characters';
    userName.classList.remove('valid');
    userName.classList.add('invalid');
    userNameMsg.classList.add('form__message');
  } else {
    userNameMsg.innerText = '';
    userName.classList.remove('invalid');
    userName.classList.add('valid');
    userNameMsg.classList.remove('form__message');
  }
});

// Last name check

lastName.addEventListener('keyup', () => {
  let chars = lastName.value.length;
  
  if (chars === 0) {
    lastNameMsg.innerText = 'Input can not be empty';
    lastName.classList.remove('valid');
    lastName.classList.add('invalid');
    lastNameMsg.classList.add('form__message');
  } else if (chars < 3) {
    lastNameMsg.innerText = 'Products must have at least 3 characters';
    lastName.classList.remove('valid');
    lastName.classList.add('invalid');
    lastNameMsg.classList.add('form__message');
  } else {
    lastNameMsg.innerText = '';
    lastName.classList.remove('invalid');
    lastName.classList.add('valid');
    lastNameMsg.classList.remove('form__message');
  }
});

// Email check
let mailre = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

email.addEventListener('keyup', () => {
  let chars = email.value;
  
  if (mailre.test(chars)) {
    emailMsg.innerText = '';
    email.classList.remove('invalid');
    email.classList.add('valid');
    emailMsg.classList.add('form__message');
  } else {
    emailMsg.innerText = 'Please enter a valid email direction';
    email.classList.remove('valid');
    email.classList.add('invalid');
    emailMsg.classList.add('form__message');
  }
});

// passwords

let passwordre = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;

password.addEventListener('keyup', () => {
  let pwdToCheck =  password.value;
  if (passwordre.test(pwdToCheck)) {
    pwdMsg.innerText = '';
    password.classList.remove('invalid');
    password.classList.add('valid');
    pwdMsg.classList.add('form__message');
  } else {
    pwdMsg.innerText = 'Password must have at least one uppercase, one lowercase and one number and 8 characters';
    password.classList.remove('valid');
    password.classList.add('invalid');
    pwdMsg.classList.add('form__message');
  }
})

rePassword.addEventListener('keyup', () => {
  if (rePassword.value === password.value) {
    pwdRepeatMsg.innerText = '';
    rePassword.classList.remove('invalid');
    rePassword.classList.add('valid');
    pwdRepeatMsg.classList.add('form__message');
  } else {
    pwdRepeatMsg.innerText = 'Both password must match';
    rePassword.classList.remove('valid');
    rePassword.classList.add('invalid');
    pwdRepeatMsg.classList.add('form__message');
  }
})

// terms
let btnSubmit = document.querySelector('button[type=submit]');

btnSubmit.addEventListener('click', () => {
  if (!terms.checked) {
    btnSubmit.disabled = true;
    termsMsg.innerText = 'You must agree with terms and conditions to create an account';
  }
})

terms.addEventListener('change', () => {
  if (!terms.checked) {
    btnSubmit.disabled = true;
    termsMsg.innerText = 'You must agree with terms and conditions to create an account';
    termsMsg.classList.add('form__message');
  } else {
    btnSubmit.disabled = false;
    termsMsg.innerText = '';
  }
})
