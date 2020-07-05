'use strict';

(function () {
  var pinList = document.querySelector('.map__pins');
  var mainPin = pinList.querySelector('.map__pin--main');
  var map = document.querySelector('.map');

  mainPin.setAttribute('tabIndex', 0);

  var pinQuantity = 5;

  var advertisementForm = document.querySelector('.ad-form');

  var mapFilterForm = document.querySelector('.map__filters');


  var disableFormElement = function (form) {
    var selects = form.querySelectorAll('select');
    var fieldsets = form.querySelectorAll('fieldset');

    for (var i = 0; i < selects.length; i++) {
      selects[i].setAttribute('disabled', true);
    }

    for (var j = 0; j < fieldsets.length; j++) {
      fieldsets[j].setAttribute('disabled', true);
    }
  };

  var enableFormElement = function (form) {
    var selects = form.querySelectorAll('select');
    var fieldsets = form.querySelectorAll('fieldset');

    for (var i = 0; i < selects.length; i++) {
      selects[i].removeAttribute('disabled');
    }

    for (var j = 0; j < fieldsets.length; j++) {
      fieldsets[j].removeAttribute('disabled');
    }
  };


  var adMap = document.querySelector('.map');
  var mapFilter = document.querySelector('.map__filters');
  var mapFilterSelects = mapFilter.querySelectorAll('select');
  var mapFilterCheckboxes = mapFilter.querySelectorAll('checkbox');

  var selectHousingType = mapFilter.querySelector('#housing-type');
  var selectPriceType = mapFilter.querySelector('#housing-price');

  var selectedAd = [];
  var adPins = [];


  /* var filterPins = function (selectId) {
    for (var j = 0; j < mapFilterSelects.length; j++) {
      mapFilterSelects[j].addEventListener('change', function () {
        var mapPinCollection = pinList.querySelectorAll('.map__pin');
        for (var t = 0; t < mapPinCollection.length; t++) {
          if (!mapPinCollection[t].classList.contains('map__pin--main')) {
            pinList.removeChild(mapPinCollection[t]);
          }
        }
        var fragment = document.createDocumentFragment();
        for (var i = 0; i < adPins.length; i++) {
          if (adPins[i].offer.type === mapFilter.querySelector(selectId).value) {
            fragment.appendChild(window.renderMapPin(adPins[i]));
          }
        }
        pinList.appendChild(fragment);
      });
    }
  };


  var filterPins = function () {
    mapFilterSelects.forEach(function (mapFilterSelect) {
      mapFilterSelect.addEventListener('change', function () {
        var mapPinCollection = pinList.querySelectorAll('.map__pin');
        mapPinCollection.forEach(function (singlePin) {
          if (!singlePin.classList.contains('map__pin--main')) {
            pinList.removeChild(singlePin);
          }
        });
        var fragment = document.createDocumentFragment();
        adPins.forEach(function (adPin) {
          if (adPin.offer.type === selectHousingType.value) {
            fragment.appendChild(window.renderMapPin(adPin));
          }
        });
        pinList.appendChild(fragment);
      });
    }
    )};*/

  var updatePin = function () {
    var sameHousingType = adPins.filter(function (adPin) {
      return adPin.offer.type === selectHousingType.value;
    });
    var sameHousingPrice = adPins.filter(function (adPin) {
      return adPin.offer.price === selectPriceType.value;
    });

    var filteredAd = sameHousingType.concat(sameHousingPrice).concat(adPins);

    console.log(filteredAd);

    var uniqueAd =
      filteredAd.filter(function (it, i) {
        return filteredAd.indexOf(it) === i;
      });

    console.log(uniqueAd);
    return uniqueAd;
  };


  var filterPins = function () {
    mapFilterSelects.forEach(function (mapFilterSelect) {
      mapFilterSelect.addEventListener('change', function () {
        var mapPinCollection = pinList.querySelectorAll('.map__pin');
        mapPinCollection.forEach(function (singlePin) {
          if (!singlePin.classList.contains('map__pin--main')) {
            pinList.removeChild(singlePin);
          }
        });
        var fragment = document.createDocumentFragment();
        for (var i = 0; i < updatePin().length; i++) {
          console.log(updatePin()[i]);
          fragment.appendChild(updatePin()[i]);
        }
        pinList.appendChild(fragment);
      });
    });
  };


  var successHandler = function (data) {
    adPins = data;
    console.log(adPins);
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < pinQuantity; i++) {
      fragment.appendChild(window.renderMapPin(data[i]));
    }
    pinList.appendChild(fragment);
    filterPins();
  };

  var errorHandler = function (errorMessage) {
    var node = document.createElement('div');
    node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: red;';
    node.style.position = 'absolute';
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = '30px';

    node.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', node);
  };

  mainPin.addEventListener('mousedown', function (evt) {
    if (evt.button === 0) {
      map.classList.remove('map--faded');
      advertisementForm.classList.remove('ad-form--disabled');
      var mapPinCollection = pinList.querySelectorAll('.map__pin');
      for (var i = 0; i < mapPinCollection.length; i++) {
        if (!mapPinCollection[i].classList.contains('map__pin--main')) {
          pinList.removeChild(mapPinCollection[i]);
        }
      }
      window.load(successHandler, errorHandler);
      enableFormElement(advertisementForm);
      enableFormElement(mapFilterForm);
    }
  });

  mainPin.addEventListener('keydown', function (evt) {
    if (evt.keyCode === 13) {
      map.classList.remove('map--faded');
      advertisementForm.classList.remove('ad-form--disabled');
      var mapPinCollection = pinList.querySelectorAll('.map__pin');
      for (var i = 0; i < mapPinCollection.length; i++) {
        if (!mapPinCollection[i].classList.contains('map__pin--main')) {
          pinList.removeChild(mapPinCollection[i]);
        }
      }
      window.load(successHandler, errorHandler);
      enableFormElement(advertisementForm);
      enableFormElement(mapFilterForm);
    }
  });


  var disableAdvertisementForm = function () {
    if (map.classList.contains('map--faded')) {
      disableFormElement(advertisementForm);
      disableFormElement(mapFilterForm);
    }
  };


  disableAdvertisementForm();

})();
