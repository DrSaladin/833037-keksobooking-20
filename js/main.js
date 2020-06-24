'use strict';

var TYPE_POOL = ['palace', 'flat', 'house', 'bungalo'];
var TIME_POOL = ['12:00', '13:00', '14:00'];
var DESCRIPTIONS_POOL = ['Текст Один', 'Текст Два', 'Текст Три', 'Текст Четыре', 'Текст Пять'];
var FEATURES_POOL = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var PHOTOS_POOL = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];

var MIN_TITLE_LENGTH = 30;
var MAX_TITLE_LENGTH = 100;

var MIN_BUNGALO_PRICE = 0;
var MIN_FLAT_PRICE = 1000;
var MIN_HOUSE_PRICE = 5000;
var MIN_PALACE_PRICE = 10000;

var MAX_PRICE = 1000000;
var minPrice = 0;


var advertisementQuantity = 8;

var map = document.querySelector('.map');
var pinList = document.querySelector('.map__pins');

var getRandomNumber = function (min, max) {
  return Math.floor(Math.random() * (Math.floor(max) - Math.ceil(min))) + Math.ceil(min);
};

var getArrRandomElement = function (array) {
  var randomElement = Math.floor(Math.random() * array.length);
  return array[randomElement];
};


var mainPin = pinList.querySelector('.map__pin--main');

var mainForm = document.querySelector('.ad-form');
var mainFormFieldsets = mainForm.querySelectorAll('fieldset');
var mainFormSelects = mainForm.querySelectorAll('select');

var mapFilterForm = document.querySelector('.map__filters');
var mapFilterFieldsets = mapFilterForm.querySelectorAll('fieldset');
var mapFilterSelects = mapFilterForm.querySelectorAll('select');


var disableForm = function (formElements) {
  for (var i = 0; i < formElements.length; i++) {
    formElements[i].setAttribute('disabled', true);
  }
};

var enableForm = function (formElements) {
  for (var i = 0; i < formElements.length; i++) {
    formElements[i].removeAttribute('disabled');
  }
};


var pinTemplate = document.querySelector('#pin')
  .content
  .querySelector('.map__pin');


var mapWidth = parseInt(getComputedStyle(map).width, 10);

var calcMainPinLocation = function () {
  var mainPinTop = parseInt(getComputedStyle(mainPin).top, 10);
  var mainPinLeft = parseInt(getComputedStyle(mainPin).left, 10);

  var pinLocation = mainPinTop + ', ' + mainPinLeft;

  return pinLocation;
};

var mainPinAddress = document.querySelector('input[name = "address"]');
mainPinAddress.value = calcMainPinLocation();
mainPinAddress.setAttribute('disabled', true);


var getPinCharacteristic = function () {
  var pinElement = pinTemplate.cloneNode();
  pinElement.style.visibility = 'hidden';
  pinList.appendChild(pinElement);

  var modelPin = pinList.querySelector('.map__pin');

  var pinWidth = modelPin.nextElementSibling.clientWidth;
  var pinHeight = modelPin.nextElementSibling.clientHeight;
  pinList.removeChild(modelPin.nextElementSibling);

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

var adForm = document.querySelector('.ad-form');
adForm.setAttribute('action', 'https://javascript.pages.academy/keksobooking');

var inputAdTitle = adForm.querySelector('#title');
inputAdTitle.required = true;
inputAdTitle.setAttribute('minlength', MIN_TITLE_LENGTH.toString());
inputAdTitle.setAttribute('maxlength', MAX_TITLE_LENGTH.toString());
inputAdTitle.addEventListener('input', function () {
  var titleValueLength = inputAdTitle.value.length;

  if (titleValueLength < MIN_TITLE_LENGTH) {
    inputAdTitle.setCustomValidity('Ещё ' + (MIN_TITLE_LENGTH - titleValueLength) + ' симв.');
  } else if (titleValueLength >= MAX_TITLE_LENGTH) {
    inputAdTitle.setCustomValidity(MAX_TITLE_LENGTH + ' - это максимальная длинна заголовка');
  } else {
    inputAdTitle.setCustomValidity('');
  }
});


var selectAdPrice = adForm.querySelector('#price');
selectAdPrice.required = true;
selectAdPrice.setAttribute('max', MAX_PRICE.toString());
selectAdPrice.addEventListener('input', function () {
  if (selectAdPrice.value >= MAX_PRICE) {
    selectAdPrice.setCustomValidity('Максимальная цена за ночь ' + MAX_PRICE);
  } else {
    selectAdPrice.setCustomValidity('');
  }
});

var selectAdRoomNumber = adForm.querySelector('#room_number');
var selectAdGuestNumber = adForm.querySelector('#capacity');

selectAdRoomNumber.addEventListener('change', function () {
  if (selectAdRoomNumber.value === '1' && selectAdGuestNumber.value > '1') {
    selectAdGuestNumber.setCustomValidity('Доступна опция "Для одного гостя"');
  } else if (selectAdRoomNumber.value === '2' && selectAdGuestNumber.value > '2') {
    selectAdGuestNumber.setCustomValidity('Доступные опции "Для одного гостя" или "Для двух гостей"');
  } else if (selectAdRoomNumber.value === '3' && selectAdGuestNumber.value > '3') {
    selectAdGuestNumber.setCustomValidity('Доступные опции "Для одного гостя", "Для двух гостей" или "Для трех гостей"');
  } else if (selectAdRoomNumber.value === '100' && selectAdGuestNumber.value > '0') {
    selectAdGuestNumber.setCustomValidity('Доступна опция "Не для гостей"');
  } else {
    selectAdGuestNumber.setCustomValidity('');
  }
});

var inputAdHousingType = adForm.querySelector('#type');

inputAdHousingType.addEventListener('change', function () {
  if (inputAdHousingType.value === 'bungalo') {
    minPrice = 0;
    selectAdPrice.setAttribute('min', minPrice.toString());
    selectAdPrice.setAttribute('placeholder', MIN_BUNGALO_PRICE.toString());
  } else if (inputAdHousingType.value === 'flat') {
    minPrice = 1000;
    selectAdPrice.setAttribute('min', minPrice.toString());
    selectAdPrice.setAttribute('placeholder', MIN_FLAT_PRICE.toString());
  } else if (inputAdHousingType.value === 'house') {
    minPrice = 5000;
    selectAdPrice.setAttribute('min', minPrice.toString());
    selectAdPrice.setAttribute('placeholder', MIN_HOUSE_PRICE.toString());
  } else if (inputAdHousingType.value === 'palace') {
    minPrice = 10000;
    selectAdPrice.setAttribute('min', minPrice.toString());
    selectAdPrice.setAttribute('placeholder', MIN_PALACE_PRICE.toString());
  }
});


var inputAdAvatar = adForm.querySelector('#avatar');
var inputAdRoomImg = adForm.querySelector('#images');
inputAdRoomImg.setAttribute('accept', 'image/png, image/jpeg');
inputAdAvatar.setAttribute('accept', 'image/png, image/jpeg');


var enableWindow = function () {
  if (map.classList.contains('map--faded')) {
    disableForm(mainFormFieldsets);
    disableForm(mainFormSelects);
    disableForm(mapFilterFieldsets);
    disableForm(mapFilterSelects);

    mainPin.addEventListener('mousedown', function () {
      map.classList.remove('map--faded');
      mainForm.classList.remove('ad-form--disabled');
      var mapPinCollection = pinList.querySelectorAll('.map__pin');
      for (var i = 0; i < mapPinCollection.length; i++) {
        if (!mapPinCollection[i].classList.contains('map__pin--main')) {
          pinList.removeChild(mapPinCollection[i]);
        }
      }
      renderPins(createAdvertisementList(advertisementQuantity));
      enableForm(mainFormFieldsets);
      enableForm(mainFormSelects);
      enableForm(mapFilterFieldsets);
      enableForm(mapFilterSelects);
    });

    mainPin.addEventListener('keydown', function (evt) {
      if (evt.keyCode === 13) {
        map.classList.remove('map--faded');
        mainForm.classList.remove('ad-form--disabled');
        var mapPinCollection = pinList.querySelectorAll('.map__pin');
        for (var i = 0; i < mapPinCollection.length; i++) {
          if (!mapPinCollection[i].classList.contains('map__pin--main')) {
            pinList.removeChild(mapPinCollection[i]);
          }
        }
        renderPins(createAdvertisementList(advertisementQuantity));
        enableForm(mainFormFieldsets);
        enableForm(mainFormSelects);
        enableForm(mapFilterFieldsets);
        enableForm(mapFilterSelects);
      }
    });
  }
};

enableWindow();
