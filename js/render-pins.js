'use strict';

(function () {

  var maxPinQuantity = 5;
  var pinList = document.querySelector('.map__pins');
  var mainPin = pinList.querySelector('.map__pin--main');

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

  window.renderMapPins = function (data) {
    var fragment = document.createDocumentFragment();
    var takeNumber = data.length > maxPinQuantity ? maxPinQuantity : data.length;
    pinList.innerHTML = '';

    for (var i = 0; i < takeNumber; i++) {
      fragment.appendChild(renderMapPin(data[i]));
    }
    pinList.appendChild(mainPin);
    pinList.appendChild(fragment);
  };
})();
