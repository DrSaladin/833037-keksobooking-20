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

  var enablePageByClick = function () {
    if (event.button === 0) {
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
      mainPin.removeEventListener('mousedown', enablePageByClick);
    }
  };

  var enablePageByKeydown = function () {
    if (event.keyCode === 13) {
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
      mainPin.removeEventListener('keydown', enablePageByKeydown);
    }
  };


  var disableMainForm = function () {
    if (map.classList.contains('map--faded')) {
      window.formElementsModeSwitcher.disableFormElement(mainFormFieldsets);
      window.formElementsModeSwitcher.disableFormElement(mainFormSelects);
      window.formElementsModeSwitcher.disableFormElement(mapFilterFieldsets);
      window.formElementsModeSwitcher.disableFormElement(mapFilterSelects);
    }
  };

  mainPin.addEventListener('mousedown', enablePageByClick);
  mainPin.addEventListener('keydown', enablePageByKeydown);

  disableMainForm();

})();
