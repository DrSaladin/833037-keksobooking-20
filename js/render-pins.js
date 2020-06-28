'use strict';

(function () {
  var pinList = document.querySelector('.map__pins');

  var pinTemplate = document.querySelector('#pin')
    .content
    .querySelector('.map__pin');

  var renderMapPin = function (essence) {
    var pinElement = pinTemplate.cloneNode(true);

    pinElement.style.left = essence.location.x - window.createAdvertisements.getPinCharacteristic().width / 2 + 'px';
    pinElement.style.top = essence.location.y - window.createAdvertisements.getPinCharacteristic().height + 'px';
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

  window.renderPins = {
    renderPins: renderPins,
  };
})();
