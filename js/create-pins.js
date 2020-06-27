'use strict';

(function () {
  var pinList = document.querySelector('.map__pins');
  var mainPin = pinList.querySelector('.map__pin--main');
  var map = document.querySelector('.map');


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
          title: window.utils.getRandomNumber(1, 8),
          address: window.utils.getRandomNumber(100, 1000) + ', ' + window.utils.getRandomNumber(100, 1000),
          price: window.utils.getRandomNumber(100, 12000),
          type: window.utils.getArrRandomElement(window.utils.TYPE_POOL),
          rooms: window.utils.getRandomNumber(1, 10),
          guests: window.utils.getRandomNumber(1, 10),
          checkin: window.utils.getArrRandomElement(window.utils.TIME_POOL),
          checkout: window.utils.getArrRandomElement(window.utils.TIME_POOL),
          features: window.utils.getArrRandomElement(window.utils.FEATURES_POOL),
          description: window.utils.getArrRandomElement(window.utils.DESCRIPTIONS_POOL),
          photos: window.utils.getArrRandomElement(window.utils.PHOTOS_POOL)
        },

        location: {
          x: window.utils.getRandomNumber(0 + getPinCharacteristic().width / 2, mapWidth - getPinCharacteristic().width / 2),
          y: window.utils.getRandomNumber(130 + getPinCharacteristic().height, 630 + getPinCharacteristic().height),
        },

      };
      advertisementList.push(advertisement);
    }
    return advertisementList;
  };

  window.createPins = {
    createAdvertisementList: createAdvertisementList,
    getPinCharacteristic: getPinCharacteristic,
  };
})();
