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

let mailre = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/

// Email check

email.addEventListener('keyup', () => {
  let chars = email.value;
  
  console.log(chars);
  
});
