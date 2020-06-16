'use strict';

var TYPE_POOL = ['palace', 'flat', 'house', 'bungalo'];
var TIME_POOL = ['12:00', '13:00', '14:00'];
var DESCRIPTIONS_POOL = ['Текст Один', 'Текст Два', 'Текст Три', 'Текст Четыре', 'Текст Пять'];
var FEATURES_POOL = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var PHOTOS_POOL = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];

var MIN_TITLE_LENGTH = 30;
var MAX_TITLE_LENGTH = 100;

var advertisementQuantity = 8;

var pinList = document.querySelector('.map__pins');

var getRandomNumber = function (min, max) {
  return Math.floor(Math.random() * (Math.floor(max) - Math.ceil(min))) + Math.ceil(min);
};

var getArrRandomElement = function (array) {
  var randomElement = Math.floor(Math.random() * array.length);
  return array[randomElement];
};

var map = document.querySelector('.map');

var mainPin = document.querySelector('.map__pin--main');
var mainForm = document.querySelector('.ad-form');


var advertisementFieldsets = document.querySelectorAll('fieldset');
var advertisementSelects = document.querySelectorAll('select');

var disableForm = function () {
  for (var i = 0; i < advertisementFieldsets.length; i++) {
    advertisementFieldsets[i].setAttribute('disabled', true);
  }

  for (var j = 0; j < advertisementSelects.length; j++) {
    advertisementSelects[j].setAttribute('disabled', true);
  }
};


var enableForm = function () {
  for (var i = 0; i < advertisementFieldsets.length; i++) {
    advertisementFieldsets[i].removeAttribute('disabled');
  }

  for (var j = 0; j < advertisementSelects.length; j++) {
    advertisementSelects[j].removeAttribute('disabled');
  }
};

var pinTemplate = document.querySelector('#pin')
  .content
  .querySelector('.map__pin');


var mapWidth = parseInt(getComputedStyle(map).width, 10);

var mainPinLocation = function () {
  var mainPinTop = parseInt(getComputedStyle(mainPin).top, 10);
  var mainPinLeft = parseInt(getComputedStyle(mainPin).left, 10);

  var pinLocation = mainPinTop + ',' + ' ' + mainPinLeft;

  return pinLocation;
};

var mainPinAddress = document.querySelector('input[name = "address"]');
var showAddress = function () {
  mainPinAddress.value = mainPinLocation();
};
showAddress();

var getPinCharacteristic = function () {
  var pinElement = pinTemplate.cloneNode(true);
  var fragment = document.createDocumentFragment();
  fragment.appendChild(pinElement);
  pinList.appendChild(fragment);

  var modelPin = document.querySelector('.map__pin');

  var pinWidth = modelPin.nextElementSibling.clientWidth;
  var pinHeight = modelPin.nextElementSibling.clientHeight;

  var pinCharacteristic = {
    height: pinHeight,
    width: pinWidth,
  };

  return pinCharacteristic;
};


var createAdvertisementList = function (quantity) {
  var advertisementList = [];
  for (var i = 0; i < quantity; i++) {
    var advertisement = {
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
        x: getRandomNumber(0 + getPinCharacteristic().width / 2, mapWidth - getPinCharacteristic().width / 2),
        y: getRandomNumber(130 + getPinCharacteristic().height, 630 + getPinCharacteristic().height),
      },

    };

    advertisementList.push(advertisement);
  }
  return advertisementList;
};

var renderMapPin = function (essence) {
  var pinElement = pinTemplate.cloneNode(true);

  pinElement.style.left = essence.location.x - getPinCharacteristic().width / 2 + 'px';
  pinElement.style.top = essence.location.y - getPinCharacteristic().height + 'px';
  pinElement.querySelector('img').alt = essence.offer.title;
  pinElement.querySelector('img').src = essence.author.avatar;

  return pinElement;
};

function renderPins(array) {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < array.length; i++) {
    fragment.appendChild(renderMapPin(array[i]));
  }
  pinList.appendChild(fragment);
}

var titleInput = document.querySelector('#title');
titleInput.setAttribute('required', true);
titleInput.setAttribute('minlength', MIN_TITLE_LENGTH);
titleInput.setAttribute('maxlength', MAX_TITLE_LENGTH);
titleInput.addEventListener('input', function () {
  var titleLength = titleInput.value.length;

  if (titleLength < MIN_TITLE_LENGTH) {
    titleInput.setCustomValidity('Ещё ' + (MIN_TITLE_LENGTH - titleLength) + ' симв.');
  } else if (titleLength >= MAX_TITLE_LENGTH) {
    titleInput.setCustomValidity(MAX_TITLE_LENGTH + ' - это максимальная длинна заголовка');
  } else {
    titleInput.setCustomValidity('');
  }
});

var housingTypeInput = document.querySelector('#housing-type');


var priceInput = document.querySelector('#price');
priceInput.setAttribute('required', true);
var maxPrice = 1000000;
priceInput.setAttribute('max', maxPrice);
priceInput.addEventListener('input', function () {
  if (priceInput.value >= maxPrice) {
    priceInput.setCustomValidity('Максимальная цена за ночь ' + maxPrice);
  } else {
    priceInput.setCustomValidity('');
  }
});

var avatarInput = document.querySelector('#avatar');
var roomImgInput = document.querySelector('#images');
roomImgInput.setAttribute('accept', 'image/png, image/jpeg');
avatarInput.setAttribute('accept', 'image/png, image/jpeg');


var enableWindow = function () {
  if (map.classList.contains('map--faded')) {
    disableForm();

    mainPin.addEventListener('mousedown', function () {
      if (event.button === 0) {
        map.classList.remove('map--faded');
        mainForm.classList.remove('ad-form--disabled');
        enableForm();
      }
    });
  }
};


enableWindow();
renderPins(createAdvertisementList(advertisementQuantity));

