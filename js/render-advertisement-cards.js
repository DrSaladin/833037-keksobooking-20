'use strict';

(function () {
  var maxCardQuantity = 1;

  var adCardTemplate = document.querySelector('#card')
    .content
    .querySelector('.map__card');

  var adMap = document.querySelector('.map');

  var mapFilter = document.querySelector('.map__filters-container');

  window.deleteAdCards = function () {
    var adCardCollection = document.querySelectorAll('.popup');
    for (var i = 0; i < adCardCollection.length; i++) {
      adMap.removeChild(adCardCollection[i]);
    }
  };

  var adPhotoTemplate = adCardTemplate.querySelector('.popup__photos');

  var renderAdCard = function (data) {
    var adCardElement = adCardTemplate.cloneNode(true);
    var adGalleryElement = adPhotoTemplate.cloneNode(true);

    adCardElement.querySelector('.popup__avatar').src = data.author.avatar;
    adCardElement.querySelector('.popup__avatar').alt = data.offer.title;

    adCardElement.querySelector('.popup__title').textContent = data.offer.title;
    adCardElement.querySelector('.popup__text--address').textContent = data.offer.address;
    adCardElement.querySelector('.popup__text--price').textContent = data.offer.price;

    switch (data.offer.type) {
      case 'palace':
        adCardElement.querySelector('.popup__type').textContent = 'Дворец';
        break;
      case 'flat':
        adCardElement.querySelector('.popup__type').textContent = 'Квартира';
        break;
      case 'house':
        adCardElement.querySelector('.popup__type').textContent = 'Дом';
        break;
      case 'bungalo':
        adCardElement.querySelector('.popup__type').textContent = 'Бунгало';
    }


    adCardElement.querySelector('.popup__text--capacity').textContent = data.offer.rooms + ' комнаты для ' + data.offer.guests + ' гостей';
    adCardElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + data.offer.checkin + ', выезд до ' + data.offer.checkout;

    var featureCollection = adCardElement.querySelectorAll('.popup__feature');
    for (var i = 0; i < featureCollection.length; i++) {
      if (featureCollection[i].indexOf === data.offer.features[i]) {
        featureCollection[i].style.backgroundColor = '#ff5635';
      }
    }

    adCardElement.querySelector('.popup__description').textContent = data.offer.description;

    for (var j = 0; j < data.offer.photos.length; j++) {
      adGalleryElement.querySelector('img').src = data.offer.photos[j];
      adGalleryElement.appendChild(adGalleryElement.querySelector('img'));
    }


    return adCardElement;
  };


  window.renderAdCards = function (data) {
    var fragment = document.createDocumentFragment();
    var takeNumber = data.length > maxCardQuantity ? maxCardQuantity : data.length;
    window.deleteAdCards();
    for (var i = 0; i < takeNumber; i++) {
      fragment.appendChild(renderAdCard(data[i]));
    }
    mapFilter.before(fragment);
  };


})();
