'use strict';

(function () {

  var pinTemplate = document.querySelector('#pin')
    .content
    .querySelector('.map__pin');

  var mainPinAddress = document.querySelector('input[name = "address"]');
  mainPinAddress.setAttribute('disabled', true);

  window.renderMapPin = function (essence) {
    var pinElement = pinTemplate.cloneNode(true);

    pinElement.querySelector('img').alt = essence.offer.title;
    pinElement.querySelector('img').src = essence.author.avatar;
    pinElement.style.left = essence.location.x + 'px';
    pinElement.style.top = essence.location.y + 'px';

    return pinElement;
  };
})();
