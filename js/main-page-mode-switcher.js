'use strict';

(function () {
  var pinList = document.querySelector('.map__pins');
  var mainPin = pinList.querySelector('.map__pin--main');
  var map = document.querySelector('.map');

  mainPin.setAttribute('tabIndex', 0);

  var mainForm = document.querySelector('.ad-form');
  var mainFormFieldsets = mainForm.querySelectorAll('fieldset');
  var mainFormSelects = mainForm.querySelectorAll('select');

  var mapFilterForm = document.querySelector('.map__filters');
  var mapFilterFieldsets = mapFilterForm.querySelectorAll('fieldset');
  var mapFilterSelects = mapFilterForm.querySelectorAll('select');

  var advertisementQuantity = 8;

  mainPin.addEventListener('mousedown', function (evt) {
    if (evt.button === 0) {
      map.classList.remove('map--faded');
      mainForm.classList.remove('ad-form--disabled');
      var mapPinCollection = pinList.querySelectorAll('.map__pin');
      for (var i = 0; i < mapPinCollection.length; i++) {
        if (!mapPinCollection[i].classList.contains('map__pin--main')) {
          pinList.removeChild(mapPinCollection[i]);
        }
      }
      window.renderPins.renderPins(window.createPins.createAdvertisementList(advertisementQuantity));
      window.formElementsModeSwitcher.enableFormElement(mainFormFieldsets);
      window.formElementsModeSwitcher.enableFormElement(mainFormSelects);
      window.formElementsModeSwitcher.enableFormElement(mapFilterFieldsets);
      window.formElementsModeSwitcher.enableFormElement(mapFilterSelects);
    }
  });

  mainPin.addEventListener('keydown', function (evt) {
    if (evt.keyCode === 13) {
      map.classList.remove('map--faded');
      mainForm.classList.remove('ad-form--disabled');
      var mapPinCollection = pinList.querySelectorAll('.map__pin');
      for (var i = 0; i < mapPinCollection.length; i++) {
        if (!mapPinCollection[i].classList.contains('map__pin--main')) {
          pinList.removeChild(mapPinCollection[i]);
        }
      }
      window.renderPins.renderPins(window.createPins.createAdvertisementList(advertisementQuantity));
      window.formElementsModeSwitcher.enableFormElement(mainFormFieldsets);
      window.formElementsModeSwitcher.enableFormElement(mainFormSelects);
      window.formElementsModeSwitcher.enableFormElement(mapFilterFieldsets);
      window.formElementsModeSwitcher.enableFormElement(mapFilterSelects);
    }
  });


  var disableMainForm = function () {
    if (map.classList.contains('map--faded')) {
      window.formElementsModeSwitcher.disableFormElement(mainFormFieldsets);
      window.formElementsModeSwitcher.disableFormElement(mainFormSelects);
      window.formElementsModeSwitcher.disableFormElement(mapFilterFieldsets);
      window.formElementsModeSwitcher.disableFormElement(mapFilterSelects);
    }
  };


  disableMainForm();

})();
