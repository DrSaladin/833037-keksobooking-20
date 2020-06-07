'use strict';

var IMG_POOL = ['img/avatars/user01.png', 'img/avatars/user02.png', 'img/avatars/user03.png', 'img/avatars/user04.png', 'img/avatars/user05.png', 'img/avatars/user06.png', 'img/avatars/user07.png', 'img/avatars/user08.png'];
var TYPE_POOL = ['palace', 'flat', 'house', 'bungalo'];
var TIME_POOL = ['12:00', '13:00', '14:00'];
var DESCRIPTIONS_POOL = ['Норм так', 'Пойдет', 'Гадюшник', 'Клоповник', 'Дворец просто'];
var FEATURES_POOL = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var PHOTOS_POOL = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];


var map = document.querySelector('.map');
map.classList.remove('map--faded');


var pinTemplate = document.querySelector('#pin')
.content
.querySelector('.map__pin');


var pinList = document.querySelector('.map__pins');


var getRandomNumber = function (min, max) {
  return Math.floor(Math.random() * (Math.floor(max) - Math.ceil(min))) + Math.ceil(min);
};


var getArrayRandomElement = function (array) {
  var randomElement = Math.floor(Math.random() * array.length);
  return array[randomElement];
};


/*
var author = {
  avatar: getArrayRandomElement(IMG_POOL),
};

var offer = {
  title: 1,
  address: getRandomNumber(100, 1000) + getRandomNumber(100, 1000),
  price: getRandomNumber(100, 12000),
  type: getArrayRandomElement(TYPE_POOL),
  rooms: getRandomNumber(1, 10),
  guests: getRandomNumber(1, 10),
  checkin: getArrayRandomElement(TIME_POOL),
  checkout: getArrayRandomElement(TIME_POOL),
  features: getArrayRandomElement(FEATURES_POOL),
  description: getArrayRandomElement(DESCRIPTIONS_POOL),
  photos: getArrayRandomElement(PHOTOS_POOL),
};

var location = {
  xLocation: getRandomNumber(130, 430),
  yLocation: getRandomNumber(130, 630),
};
*/

var getCustomerArray = function (authorObject, offerObject, locationObject, quantity) {
  var customerObject = {};
  var customerArray = [];
  for (var i = 0; i < quantity; i++) {
    customerObject = {
      authorObject,
      offerObject,
      locationObject,
    };
    customerArray.push(customerObject);
  }
  return customerArray;
};


var customers = [
  {

    author: {
      avatar: getArrayRandomElement(IMG_POOL),
    },


    offer: {
      title: 1,
      address: getRandomNumber(100, 1000) + getRandomNumber(100, 1000),
      price: getRandomNumber(100, 12000),
      type: getArrayRandomElement(TYPE_POOL),
      rooms: getRandomNumber(1, 10),
      guests: getRandomNumber(1, 10),
      checkin: getArrayRandomElement(TIME_POOL),
      checkout: getArrayRandomElement(TIME_POOL),
      features: getArrayRandomElement(FEATURES_POOL),
      description: getArrayRandomElement(DESCRIPTIONS_POOL),
      photos: getArrayRandomElement(PHOTOS_POOL),
    },

    location: {
      xLocation: 'top: 250px',
      yLocation: getRandomNumber(130, 630),
    },
  },

/*
  {
    author: {
      avatar: getArrayRandomElement(IMG_POOL),
    },

    offer: {
      title: 1,
      address: getRandomNumber(100, 1000) + getRandomNumber(100, 1000),
      price: getRandomNumber(100, 12000),
      type: getArrayRandomElement(TYPE_POOL),
      rooms: getRandomNumber(1, 10),
      guests: getRandomNumber(1, 10),
      checkin: getArrayRandomElement(TIME_POOL),
      checkout: getArrayRandomElement(TIME_POOL),
      features: getArrayRandomElement(FEATURES_POOL),
      description: getArrayRandomElement(DESCRIPTIONS_POOL),
      photos: getArrayRandomElement(PHOTOS_POOL),
    },

    location: {
      xLocation: getRandomNumber(120, 200),
      yLocation: getRandomNumber(130, 630),
    },
  },


  {
    author: {
      avatar: getArrayRandomElement(IMG_POOL),
    },

    offer: {
      title: 1,
      address: getRandomNumber(100, 1000) + getRandomNumber(100, 1000),
      price: getRandomNumber(100, 12000),
      type: getArrayRandomElement(TYPE_POOL),
      rooms: getRandomNumber(1, 10),
      guests: getRandomNumber(1, 10),
      checkin: getArrayRandomElement(TIME_POOL),
      checkout: getArrayRandomElement(TIME_POOL),
      features: getArrayRandomElement(FEATURES_POOL),
      description: getArrayRandomElement(DESCRIPTIONS_POOL),
      photos: getArrayRandomElement(PHOTOS_POOL),
    },

    location: {
      xLocation: getRandomNumber(120, 200),
      yLocation: getRandomNumber(130, 630),
    },
  }, */
];


console.log(customers[0]['location']['xLocation']);


var renderMapPin = function (arr) {
  var pinElement = pinTemplate.cloneNode(true);

  // pinElement.querySelector('.map__pin').style.left = arr['location']['xLocation'];
  // console.log(pinElement.querySelector('.map__pin').style.left = customers[0]['location']['xLocation']);
  return pinElement;
};


var fragment = document.createDocumentFragment();
for (var i = 0; i < customers.length; i++) {
  fragment.appendChild(renderMapPin(customers[i]));

}
pinList.appendChild(fragment);
