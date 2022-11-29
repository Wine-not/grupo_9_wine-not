// Inputs
form = document.querySelector('form');
prodName = document.querySelector('#name');
price = document.querySelector('#price');
brand = document.querySelector('#brand');
grape = document.querySelector('#grape');
rating = document.querySelector('#rating');
region = document.querySelector('#region');
stock = document.querySelector('#stock');
description = document.querySelector('#description');

// Inputs messages
nameMsg = document.querySelector('#name-msg');
priceMsg = document.querySelector('#price-msg');
brandMsg = document.querySelector('#brand-msg');
grapeMsg = document.querySelector('#grape-msg');
ratingMsg = document.querySelector('#rating-msg');
regionMsg = document.querySelector('#region-msg');
stockMsg = document.querySelector('#stock-msg');
descMsg = document.querySelector('#desc-msg');

const lengthCheck = (input, length) => {
  let qty = [];
  
  if (input === 'Backspace') {
    qty.pop();
  } else {
    qty.push(input);
  }
  
  return qty.length < length;
}

const isInt = number => {
  return Number.isInteger(number);
}

const checkRating = input => {
  return input >= 1 && input <= 5;
}

// Name check

let lettersQty = []

prodName.addEventListener('keydown', e => {
  if (e.key === 'Backspace') {
    lettersQty.pop();
  } else {
    lettersQty.push(e.key);
  }
  
  let flagName = null;
  
  if (lettersQty.length === 0) {
    nameMsg.innerText = 'Input can not be empty';
    prodName.classList.remove('valid');
    prodName.classList.add('invalid');
    nameMsg.classList.add('form__message');
    flagName = false;
  } else if (lettersQty.length < 20) {
    nameMsg.innerText = 'Products must have at least 20 characters';
    prodName.classList.remove('valid');
    prodName.classList.add('invalid');
    nameMsg.classList.add('form__message');
    flagName = false;
  } else {
    nameMsg.innerText = '';
    prodName.classList.remove('invalid');
    prodName.classList.add('valid');
    nameMsg.classList.remove('form__message');
    flagName = true;
  }
  
  console.log(flagName);
});

// Price check

price.addEventListener('keyup', e => {
  let flagNumber = null;
  
  if (price.value === '') {
    priceMsg.innerText = 'Field must be a number and can not be empty';
    price.classList.remove('valid');
    price.classList.add('invalid');
    priceMsg.classList.add('form__message');
    flagNumber = false;
  } else {
    if (parseInt(price.value) < 10) {
      priceMsg.innerText = 'Price can not be less than ten';
      price.classList.remove('valid');
      price.classList.add('invalid');
      priceMsg.classList.add('form__message');
      flagNumber = false;
    } else {
      priceMsg.innerText = '';
      price.classList.remove('invalid');
      price.classList.add('valid');
      priceMsg.classList.remove('form__message');
      flagNumber = true;
    }
  }
});

// Brand check

brand.addEventListener('click', e => {
  let flagBrand = false;
  
  if (brand.value !== null) {
    brandMsg.innerText = 'Option selected';
    brandMsg.classList.add('form__correct-msg');
    brand.classList.remove('invalid');
    brand.classList.add('valid');
    flagBrand = true;
  }
});


// Grape check

grape.addEventListener('click', e => {
  let flagGrape = false;
  
  if (grape.value !== null) {
    grapeMsg.innerText = 'Option selected';
    grapeMsg.classList.add('form__correct-msg');
    grape.classList.remove('invalid');
    grape.classList.add('valid');
    flagGrape = true;
  }
});

// Price check

rating.addEventListener('keyup', e => {
  let flagRating = null;
  
  if (rating.value === '') {
    ratingMsg.innerText = 'Field must be a number and can not be empty';
    rating.classList.remove('valid');
    rating.classList.add('invalid');
    ratingMsg.classList.add('form__message');
    flagRating = false;
  } else {
    if (parseInt(rating.value) > 5 || parseInt(rating.value) < 1) {
      ratingMsg.innerText = 'Price must be between 1 and 5';
      rating.classList.remove('valid');
      rating.classList.add('invalid');
      ratingMsg.classList.add('form__message');
      flagRating = false;
    } else {
      ratingMsg.innerText = '';
      rating.classList.remove('invalid');
      rating.classList.add('valid');
      ratingMsg.classList.remove('form__message');
      flagRating = true;
    }
  }
});
