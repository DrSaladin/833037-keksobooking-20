'use strict';

(function () {

  var adCardTemplate = document.querySelector('#card')
    .content
    .querySelector('.map__card');


  var adMap = document.querySelector('.map');

  var mapFilter = document.querySelector('.map__filters-container');

  window.deleteAdCards = function () {
    var adCards = document.querySelectorAll('.map__card');
    for (var i = 0; i < adCards.length; i++) {
      adMap.removeChild(adCards[i]);
    }
  };

  var closeAdCard = function () {
    var adCards = document.querySelectorAll('.map__card');
    for (var j = 0; j < adCards.length; j++) {
      adCards[j].classList.add('hidden');
    }
    document.removeEventListener('keydown', onCardEscPress);
  };

  var onCardEscPress = function (evt) {
    if (evt.keyCode === 27) {
      closeAdCard();
    }
  };


  var onCloseButtonClick = function () {
    var closeButtons = adMap.querySelectorAll('.popup__close');
    for (var i = 0; i < closeButtons.length; i++) {
      closeButtons[i].addEventListener('click', closeAdCard);
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

    var features = cardElement.querySelectorAll('.popup__feature');
    for (var i = 0; i < features.length; i++) {
      if (features[i].indexOf === data.offer.features[i]) {
        features[i].style.backgroundColor = '#ff5635';
      }
    }

    cardElement.querySelector('.popup__description').textContent = data.offer.description;


    var adCardPhotoContainer = cardElement.querySelector('.popup__photos');
    for (var j = 0; j < data.offer.photos.length; j++) {
      var photoElement = adPhotoTemplate.cloneNode(true);
      photoElement.src = data.offer.photos[j];
      adCardPhotoContainer.appendChild(photoElement);
    }

    return cardElement;
  };


  var adPhotoGallery = document.querySelector('#card')
    .content
    .querySelector('.popup__photos');

  adPhotoGallery.removeChild(adPhotoTemplate);


  window.renderAdCards = function (data) {
    var fragment = document.createDocumentFragment();
    window.deleteAdCards();
    fragment.appendChild(renderAdCard(data[0]));
    mapFilter.before(fragment);
    document.addEventListener('keydown', onCardEscPress);
    onCloseButtonClick();
  };
})();
