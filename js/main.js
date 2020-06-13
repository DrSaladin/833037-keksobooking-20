'use strict';

var TYPE_POOL = ['palace', 'flat', 'house', 'bungalo'];
var TIME_POOL = ['12:00', '13:00', '14:00'];
var DESCRIPTIONS_POOL = ['Текст Один', 'Текст Два', 'Текст Три', 'Текст Четыре', 'Текст Пять'];
var FEATURES_POOL = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var PHOTOS_POOL = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];

var adQuantity = 8;

var pinList = document.querySelector('.map__pins');

var getRandomNumber = function (min, max) {
  return Math.floor(Math.random() * (Math.floor(max) - Math.ceil(min))) + Math.ceil(min);
};

var getArrRandomElement = function (array) {
  var randomElement = Math.floor(Math.random() * array.length);
  return array[randomElement];
};

var map = document.querySelector('.map');
map.classList.remove('map--faded');

var pinTemplate = document.querySelector('#pin')
  .content
  .querySelector('.map__pin');


var rawMapWidth = getComputedStyle(map).width;
var mapWidth = parseInt(rawMapWidth, 10);


var getPinCharacteristic = function () {
  var pinElement = pinTemplate.cloneNode(true);
  var fragment = document.createDocumentFragment();
  fragment.appendChild(pinElement);
  pinList.appendChild(fragment);

  var modelPin = document.querySelectorAll('.map__pin');

  var pinWidth = parseInt(getComputedStyle(modelPin[1]).width, 10);
  var pinHeight = parseInt(getComputedStyle(modelPin[1]).height, 10);

  var pinCharacteristic = {
    height: pinHeight,
    width: pinWidth,
  };

  pinList.removeChild(pinElement);

  return pinCharacteristic;
};


var createAdList = function (quantity) {
  var adList = [];
  for (var i = 0; i < quantity; i++) {
    var ad = {
      author: {
        avatar: 'img/avatars/user0' + (i + 1) + '.png'
      },

      offer: {
        title: getRandomNumber(1, 8),
        address: getRandomNumber(100, 1000) + ', ' + getRandomNumber(100, 1000),
        price: getRandomNumber(100, 12000),
        type: getArrRandomElement(TYPE_POOL),
        rooms: getRandomNumber(1, 10),
        guests: getRandomNumber(1, 10),
        checkin: getArrRandomElement(TIME_POOL),
        checkout: getArrRandomElement(TIME_POOL),
        features: getArrRandomElement(FEATURES_POOL),
        description: getArrRandomElement(DESCRIPTIONS_POOL),
        photos: getArrRandomElement(PHOTOS_POOL)
      },

      location: {
        x: getRandomNumber(0, mapWidth),
        y: getRandomNumber(130, 630),
      },

    };

    adList.push(ad);
  }
  return adList;
};

var renderMapPin = function (ad) {
  var pinElement = pinTemplate.cloneNode(true);

  pinElement.style.left = ad.location.x - getPinCharacteristic().width / 2 + 'px';
  pinElement.style.top = ad.location.y - getPinCharacteristic().height + 'px';
  pinElement.querySelector('img').alt = ad.offer.title;
  pinElement.querySelector('img').src = ad.author.avatar;

  return pinElement;
};

function renderPins(array) {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < array.length; i++) {
    fragment.appendChild(renderMapPin(array[i]));
  }
  pinList.appendChild(fragment);
}

renderPins(createAdList(adQuantity));


