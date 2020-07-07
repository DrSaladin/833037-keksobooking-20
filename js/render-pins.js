'use strict';

(function () {

  var maxPinQuantity = 5;
  var pinList = document.querySelector('.map__pins');

  var pinTemplate = document.querySelector('#pin')
    .content
    .querySelector('.map__pin');

  var mainPinAddress = document.querySelector('input[name = "address"]');
  mainPinAddress.setAttribute('disabled', true);

  var renderMapPin = function (essence) {
    var pinElement = pinTemplate.cloneNode(true);

    pinElement.querySelector('img').alt = essence.offer.title;
    pinElement.querySelector('img').src = essence.author.avatar;
    pinElement.style.left = essence.location.x + 'px';
    pinElement.style.top = essence.location.y + 'px';

    return pinElement;
  };

  window.deletePins = function () {
    var mapPinCollection = pinList.querySelectorAll('.map__pin');
    for (var i = 0; i < mapPinCollection.length; i++) {
      if (!mapPinCollection[i].classList.contains('map__pin--main')) {
        pinList.removeChild(mapPinCollection[i]);
      }
    }
  };

  window.renderMapPins = function (data) {
    var fragment = document.createDocumentFragment();
    var takeNumber = data.length > maxPinQuantity ? maxPinQuantity : data.length;
    window.deleteUselessPins();
    for (var j = 0; j < takeNumber; j++) {
      fragment.appendChild(renderMapPin(data[j]));
    }
    pinList.appendChild(fragment);
  };
})();
