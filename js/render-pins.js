'use strict';

(function () {
  var renderMapPin = function (essence) {
    var pinElement = window.pins.pinTemplate.cloneNode(true);

    pinElement.style.left = essence.location.x - window.pins.getPinCharacteristic().width / 2 + 'px';
    pinElement.style.top = essence.location.y - window.pins.getPinCharacteristic().height + 'px';
    pinElement.querySelector('img').alt = essence.offer.title;
    pinElement.querySelector('img').src = essence.author.avatar;

    return pinElement;
  };

  function renderPins(array) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < array.length; i++) {
      fragment.appendChild(renderMapPin(array[i]));
    }
    window.utils.pinList.appendChild(fragment);
  }

  window.renderPins = {
    renderPins: renderPins,

  };
})();
