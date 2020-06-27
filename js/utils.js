'use strict';

(function () {
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


  var getRandomNumber = function (min, max) {
    return Math.floor(Math.random() * (Math.floor(max) - Math.ceil(min))) + Math.ceil(min);
  };

  var getArrRandomElement = function (array) {
    var randomElement = Math.floor(Math.random() * array.length);
    return array[randomElement];
  };

  window.utils = {
    TYPE_POOL: TYPE_POOL,
    TIME_POOL: TIME_POOL,
    DESCRIPTIONS_POOL: DESCRIPTIONS_POOL,
    FEATURES_POOL: FEATURES_POOL,
    PHOTOS_POOL: PHOTOS_POOL,
    MIN_TITLE_LENGTH: MIN_TITLE_LENGTH,
    MAX_TITLE_LENGTH: MAX_TITLE_LENGTH,
    MIN_BUNGALO_PRICE: MIN_BUNGALO_PRICE,
    MIN_FLAT_PRICE: MIN_FLAT_PRICE,
    MIN_HOUSE_PRICE: MIN_HOUSE_PRICE,
    MIN_PALACE_PRICE: MIN_PALACE_PRICE,
    MAX_PRICE: MAX_PRICE,
    getRandomNumber: getRandomNumber,
    getArrRandomElement: getArrRandomElement,
  };
})();
