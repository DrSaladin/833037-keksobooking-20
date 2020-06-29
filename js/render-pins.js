'use strict';

(function () {
  var pinList = document.querySelector('.map__pins');

  var pinTemplate = document.querySelector('#pin')
    .content
    .querySelector('.map__pin');


  var mainPinAddress = document.querySelector('input[name = "address"]');
  mainPinAddress.setAttribute('disabled', true);


  window.getPinCharacteristic = function () {
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

  var renderMapPin = function (essence) {
    var pinElement = pinTemplate.cloneNode(true);

    pinElement.style.left = essence.location.x - window.getPinCharacteristic().width / 2 + 'px';
    pinElement.style.top = essence.location.y - window.getPinCharacteristic().height + 'px';
    pinElement.querySelector('img').alt = essence.offer.title;
    pinElement.querySelector('img').src = essence.author.avatar;

    return pinElement;
  };

  window.renderPins = function (array) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < array.length; i++) {
      fragment.appendChild(renderMapPin(array[i]));
    }
    pinList.appendChild(fragment);
  };
})();
