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

// Name check

let lettersQty = [];

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
  } else if (lettersQty.length < 5) {
    nameMsg.innerText = 'Products must have at least 5 characters';
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
});

// Price check

price.addEventListener('keyup', e => {
  let flagPrice = null;
  
  if (price.value === '') {
    priceMsg.innerText = 'Field must be a number and can not be empty';
    price.classList.remove('valid');
    price.classList.add('invalid');
    priceMsg.classList.add('form__message');
    flagPrice = false;
  } else {
    if (parseInt(price.value) < 10) {
      priceMsg.innerText = 'Price can not be less than ten';
      price.classList.remove('valid');
      price.classList.add('invalid');
      priceMsg.classList.add('form__message');
      flagPrice = false;
    } else {
      priceMsg.innerText = '';
      price.classList.remove('invalid');
      price.classList.add('valid');
      priceMsg.classList.remove('form__message');
      flagPrice = true;
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

// Region check

region.addEventListener('click', e => {
  let flagRegion = false;
  
  if (region.value !== null) {
    regionMsg.innerText = 'Option selected';
    regionMsg.classList.add('form__correct-msg');
    region.classList.remove('invalid');
    region.classList.add('valid');
    flagRegion = true;
  }
});

// Stock check

stock.addEventListener('keyup', e => {
  let flagStock = null;
  
  if (stock.value === '') {
    stockMsg.innerText = 'Field must be a number and can not be empty';
    stock.classList.remove('valid');
    stock.classList.add('invalid');
    stockMsg.classList.add('form__message');
    flagStock = false;
  } else {
    if (parseInt(stock.value) < 1) {
      stockMsg.innerText = 'Stock must be greater or equal than 1';
      stock.classList.remove('valid');
      stock.classList.add('invalid');
      stockMsg.classList.add('form__message');
      flagStock = false;
    } else {
      stockMsg.innerText = '';
      stock.classList.remove('invalid');
      stock.classList.add('valid');
      stockMsg.classList.remove('form__message');
      flagStock = true;
    }
  }
});

// Description check

let charsQty = []

description.addEventListener('keydown', e => {
  if (e.key === 'Backspace') {
    charsQty.pop();
  } else {
    charsQty.push(e.key);
  }
  
  let flagDesc = null;
  
  if (charsQty.length === 0) {
    descMsg.innerText = 'Input can not be empty';
    description.classList.remove('valid');
    description.classList.add('invalid');
    descMsg.classList.add('form__message');
    flagDesc = false;
  } else if (charsQty.length < 20) {
    descMsg.innerText = 'Description must have at least 20 characters';
    description.classList.remove('valid');
    description.classList.add('invalid');
    descMsg.classList.add('form__message');
    flagDesc = false;
  } else {
    descMsg.innerText = '';
    description.classList.remove('invalid');
    description.classList.add('valid');
    descMsg.classList.remove('form__message');
    flagDesc = true;
  }
});

