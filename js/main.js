'use strict';

var IMG_POOL = ['01', '02', '03', '04', '05', '06', '07', '08'];
var TYPE_POOl = ['palace', 'flat', 'house', 'bungalo'];
var GUESTS_POOL = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'];
var TIME_POOL = ['12:00', '13:00', '14:00'];
var FEATURES_POOL = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var PHOTOS_POOL = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
var X_LOCATION = [];
var Y_LOCATION = [];


var map = document.querySelector('.map');
map.classList.remove('map--faded');

var getRandomElement = function (array) {
  var randomElement = Math.floor(Math.random() * array.length);
  return array[randomElement];
};

var renderAdPin = function() {


};
