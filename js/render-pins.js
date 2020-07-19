'use strict';

(function () {

  var MAX_PIN_QUANTITY = 5;
  var pinList = document.querySelector('.map__pins');

  var pinTemplate = document.querySelector('#pin')
    .content
    .querySelector('.map__pin');

  var mainPinAddress = document.querySelector('input[name = "address"]');
  mainPinAddress.setAttribute('disabled', true);

  var renderMapPin = function (data) {
    var pinElement = pinTemplate.cloneNode(true);
    pinElement.id = data.adId.id;

    pinElement.querySelector('img').alt = data.offer.title;
    pinElement.querySelector('img').src = data.author.avatar;
    pinElement.style.left = data.location.x + 'px';
    pinElement.style.top = data.location.y + 'px';

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

  var renderClickedCard = function (data, evt) {
    var filterCards = data.filter(function (it) {
      return it.adId.id === evt.currentTarget.id;
    });
    window.renderAdCards(filterCards);
  };

  var onPinClick = function (data) {
    var mapPinCollection = pinList.querySelectorAll('.map__pin');
    for (var i = 0; i < mapPinCollection.length; i++) {
      if (!mapPinCollection[i].classList.contains('map__pin--main')) {
        mapPinCollection[i].addEventListener('click', function (evt) {
          renderClickedCard(data, evt);
        });
      }
    }
  };


  window.renderMapPins = function (data) {
    var fragment = document.createDocumentFragment();
    var takeNumber = data.length > MAX_PIN_QUANTITY ? MAX_PIN_QUANTITY : data.length;
    window.deletePins();
    for (var j = 0; j < takeNumber; j++) {
      fragment.appendChild(renderMapPin(data[j]));
    }
    pinList.appendChild(fragment);
    onPinClick(data);
  };
})();
