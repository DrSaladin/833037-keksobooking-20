'use strict';

(function () {

  var adCardTemplate = document.querySelector('#card')
    .content
    .querySelector('.map__card');


  var adMap = document.querySelector('.map');

  var mapFilter = document.querySelector('.map__filters-container');

  window.deleteAdCards = function () {
    var adCardCollection = document.querySelectorAll('.map__card');
    for (var i = 0; i < adCardCollection.length; i++) {
      adMap.removeChild(adCardCollection[i]);
    }
  };

  var closePopup = function () {
    var closeButtonCollection = adMap.querySelectorAll('.popup__close');
    var adCardCollection = document.querySelectorAll('.map__card');
    for (var j = 0; j < closeButtonCollection.length; j++) {
      adCardCollection[j].setAttribute('hidden', true);
    }
  };


  var closePopupButton = function () {
    var closeButtonCollection = adMap.querySelectorAll('.popup__close');
    for (var i = 0; i < closeButtonCollection.length; i++) {
      closeButtonCollection[i].addEventListener('click', function () {
        closePopup();
      });
    }
  };


  var closePopupEsc = function () {
    var adCardCollection = document.querySelectorAll('.map__card');
    for (var i = 0; i < adCardCollection.length; i++) {
      window.addEventListener('keydown', function (evt) {
        if (evt.keyCode === 27) {
          closePopup();
        }
      });
    }
  };


  var adPhotoTemplate = document.querySelector('#card')
    .content
    .querySelector('.popup__photo');


  var renderAdCard = function (data) {
    var cardElement = adCardTemplate.cloneNode(true);


    cardElement.querySelector('.popup__avatar').src = data.author.avatar;
    cardElement.querySelector('.popup__avatar').alt = data.offer.title;

    cardElement.querySelector('.popup__title').textContent = data.offer.title;
    cardElement.querySelector('.popup__text--address').textContent = data.offer.address;
    cardElement.querySelector('.popup__text--price').textContent = data.offer.price + '₽/ночь';

    switch (data.offer.type) {
      case 'palace':
        cardElement.querySelector('.popup__type').textContent = 'Дворец';
        break;
      case 'flat':
        cardElement.querySelector('.popup__type').textContent = 'Квартира';
        break;
      case 'house':
        cardElement.querySelector('.popup__type').textContent = 'Дом';
        break;
      case 'bungalo':
        cardElement.querySelector('.popup__type').textContent = 'Бунгало';
    }


    cardElement.querySelector('.popup__text--capacity').textContent = data.offer.rooms + ' комнаты для ' + data.offer.guests + ' гостей';
    cardElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + data.offer.checkin + ', выезд до ' + data.offer.checkout;

    var featureCollection = cardElement.querySelectorAll('.popup__feature');
    for (var i = 0; i < featureCollection.length; i++) {
      if (featureCollection[i].indexOf === data.offer.features[i]) {
        featureCollection[i].style.backgroundColor = '#ff5635';
      }
    }

    cardElement.querySelector('.popup__description').textContent = data.offer.description;


    var popupPhotoContainer = cardElement.querySelector('.popup__photos');
    for (var j = 0; j < data.offer.photos.length; j++) {
      var photoElement = adPhotoTemplate.cloneNode(true);
      photoElement.src = data.offer.photos[j];
      popupPhotoContainer.appendChild(photoElement);
    }


    return cardElement;
  };

  var adPhotoGallery = document.querySelector('#card')
    .content
    .querySelector('.popup__photos');

  adPhotoGallery.removeChild(adPhotoTemplate);


  window.renderAdCards = function (data) {
    var fragment = document.createDocumentFragment();
    var cardQuantity = 1;
    window.deleteAdCards();

    for (var i = 0; i < cardQuantity; i++) {
      fragment.appendChild(renderAdCard(data[i]));
    }
    mapFilter.before(fragment);
    closePopupButton();
    closePopupEsc();
  };

})();
