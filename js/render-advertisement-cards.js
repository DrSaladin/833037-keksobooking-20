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


  var onCloseClick = function () {
    var cardClose = adMap.querySelectorAll('.popup__close');
    var adCardCollection = document.querySelectorAll('.map__card');
    for (var i = 0; i < cardClose.length; i++) {
      cardClose[i].addEventListener('click', function () {
        for (var j = 0; j < cardClose.length; j++) {
          adCardCollection[j].setAttribute('hidden', true);
        }
      });
    }
  };


  var onEscPress = function () {
    var adCardCollection = document.querySelectorAll('.map__card');
    for (var i = 0; i < adCardCollection.length; i++) {
      window.addEventListener('keydown', function (evt) {
        if (evt.keyCode === 27) {
          for (var j = 0; j < adCardCollection.length; j++) {
            adCardCollection[j].setAttribute('hidden', true);
          }
        }
      });
    }
  };


  var adPhotoTemplate = document.querySelector('#card')
    .content
    .querySelector('.popup__photo');

  var adPhotoGallery = document.querySelector('#card')
    .content
    .querySelector('.popup__photos');


  var renderAdCard = function (data) {
    var сardElement = adCardTemplate.cloneNode(true);


    сardElement.querySelector('.popup__avatar').src = data.author.avatar;
    сardElement.querySelector('.popup__avatar').alt = data.offer.title;

    сardElement.querySelector('.popup__title').textContent = data.offer.title;
    сardElement.querySelector('.popup__text--address').textContent = data.offer.address;
    сardElement.querySelector('.popup__text--price').textContent = data.offer.price + '₽/ночь';

    switch (data.offer.type) {
      case 'palace':
        сardElement.querySelector('.popup__type').textContent = 'Дворец';
        break;
      case 'flat':
        сardElement.querySelector('.popup__type').textContent = 'Квартира';
        break;
      case 'house':
        сardElement.querySelector('.popup__type').textContent = 'Дом';
        break;
      case 'bungalo':
        сardElement.querySelector('.popup__type').textContent = 'Бунгало';
    }


    сardElement.querySelector('.popup__text--capacity').textContent = data.offer.rooms + ' комнаты для ' + data.offer.guests + ' гостей';
    сardElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + data.offer.checkin + ', выезд до ' + data.offer.checkout;

    var featureCollection = сardElement.querySelectorAll('.popup__feature');
    for (var i = 0; i < featureCollection.length; i++) {
      if (featureCollection[i].indexOf === data.offer.features[i]) {
        featureCollection[i].style.backgroundColor = '#ff5635';
      }
    }

    сardElement.querySelector('.popup__description').textContent = data.offer.description;

    var gallery = сardElement.querySelector('.popup__photos');
    for (var l = 0; l < data.offer.photos.length; l++) {
      var photoElement = adPhotoTemplate.cloneNode(true);
      photoElement.src = data.offer.photos[l];
      gallery.appendChild(photoElement);
    }

    return сardElement;
  };


  window.renderAdCards = function (data) {
    var fragment = document.createDocumentFragment();
    var takeNumber = data.length > maxCardQuantity ? maxCardQuantity : data.length;
    window.deleteAdCards();
    adPhotoTemplate.setAttribute('hidden', true);
    for (var i = 0; i < takeNumber; i++) {
      fragment.appendChild(renderAdCard(data[i]));
    }
    mapFilter.before(fragment);
    onCloseClick();
    onEscPress();
  };
})();
