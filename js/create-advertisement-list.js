'use strict';

(function () {
  var map = document.querySelector('.map');


  var mapWidth = parseInt(getComputedStyle(map).width, 10);

  window.createAdvertisementList = function (quantity) {
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
          x: window.utils.getRandomNumber(0 + window.getPinCharacteristic().width / 2, mapWidth - window.getPinCharacteristic().width / 2),
          y: window.utils.getRandomNumber(130 + window.getPinCharacteristic().height, 630 + window.getPinCharacteristic().height),
        },

      };
      advertisementList.push(advertisement);
    }
    return advertisementList;
  };
})();
