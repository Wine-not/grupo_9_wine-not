// Inputs
nameIn = document.querySelector('#name');
priceIn = document.querySelector('#price');
brandIn = document.querySelector('#brand');
grapeIn = document.querySelector('#grape');
ratingIn = document.querySelector('#rating');
regionIn = document.querySelector('#region');
stockIn = document.querySelector('#stock');

// Inputs messages
nameMsg = document.querySelector('#name-msg');
priceMsg = document.querySelector('#price-msg');
brandMsg = document.querySelector('#brand-msg');
grapeMsg = document.querySelector('#grape-msg');
ratingMsg = document.querySelector('#rating-msg');
regionMsg = document.querySelector('#region-msg');
stockMsg = document.querySelector('#stock-msg');

// Name
nameMsg !== undefined
  ? nameIn.classList.add('error')
  : nameIn.classList.remove('error');

// Price
priceMsg !== undefined
  ? priceIn.classList.add('error')
  : priceIn.classList.remove('error');

// Brand
brandMsg !== undefined
  ? brandIn.classList.add('error')
  : brandIn.classList.remove('error');

// Grape
grapeMsg !== undefined
  ? grapeIn.classList.add('error')
  : grapeIn.classList.remove('error');

// Rating
ratingMsg !== undefined
  ? ratingIn.classList.add('error')
  : ratingIn.classList.remove('error');

// Region
regionMsg !== undefined
  ? regionIn.classList.add('error')
  : regionIn.classList.remove('error');

// Stock
stockMsg !== undefined
  ? stockIn.classList.add('error')
  : stockIn.classList.remove('error');
