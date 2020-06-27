'use strict';

(function () {

  var enableWindow = function () {
    if (window.utils.map.classList.contains('map--faded')) {
      window.form.disableForm(window.form.mainFormFieldsets);
      window.form.disableForm(window.form.mainFormSelects);
      window.form.disableForm(window.form.mapFilterFieldsets);
      window.form.disableForm(window.form.mapFilterSelects);

      window.utils.mainPin.addEventListener('mousedown', function () {
        if (event.button === 0) {
          window.utils.map.classList.remove('map--faded');
          window.form.mainForm.classList.remove('ad-form--disabled');
          var mapPinCollection = window.utils.pinList.querySelectorAll('.map__pin');
          for (var i = 0; i < mapPinCollection.length; i++) {
            if (!mapPinCollection[i].classList.contains('map__pin--main')) {
              window.utils.pinList.removeChild(mapPinCollection[i]);
            }
          }
          window.renderPins.renderPins(window.pins.createAdvertisementList(window.utils.advertisementQuantity));
          window.form.enableForm(window.form.mainFormFieldsets);
          window.form.enableForm(window.form.mainFormSelects);
          window.form.enableForm(window.form.mapFilterFieldsets);
          window.form.enableForm(window.form.mapFilterSelects);
        }
      });

      window.utils.mainPin.addEventListener('keydown', function (evt) {
        if (evt.keyCode === 13) {
          window.utils.map.classList.remove('map--faded');
          window.form.mainForm.classList.remove('ad-form--disabled');
          var mapPinCollection = window.utils.pinList.querySelectorAll('.map__pin');
          for (var i = 0; i < mapPinCollection.length; i++) {
            if (!mapPinCollection[i].classList.contains('map__pin--main')) {
              window.utils.pinList.removeChild(mapPinCollection[i]);
            }
          }
          window.renderPins.renderPins(window.pins.createAdvertisementList(window.utils.advertisementQuantity));
          window.form.enableForm(window.form.mainFormFieldsets);
          window.form.enableForm(window.form.mainFormSelects);
          window.form.enableForm(window.form.mapFilterFieldsets);
          window.form.enableForm(window.form.mapFilterSelects);
        }
      });
    }
  };

  enableWindow();
})();
