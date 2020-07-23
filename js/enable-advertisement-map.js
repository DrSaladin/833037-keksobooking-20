
'use strict';

(function () {
  var pinList = document.querySelector('.map__pins');
  var mainPin = pinList.querySelector('.map__pin--main');
  var map = document.querySelector('.map');

  mainPin.setAttribute('tabIndex', 0);

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


  var mapFilter = document.querySelector('.map__filters');

  var housingType = '';
  var advertisements = [];


  var updateAdvertisements = function () {
    var sameHousingType = advertisements.filter(function (it) {
      return it.offer.type === housingType;
    });

    window.renderMapPins(sameHousingType);
  };


  var selectHousingType = mapFilter.querySelector('#housing-type');
  selectHousingType.addEventListener('change', function () {
    housingType = selectHousingType.value;

    updateAdvertisements();
  });


  var successHandler = function (data) {
    advertisements = data;
    for (var i = 0; i < advertisements.length; i++) {
      advertisements[i].id = 'adNo' + i;
    }
    window.renderMapPins(advertisements);
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


  var enableAdMap = function () {
    map.classList.remove('map--faded');
    window.load(successHandler, errorHandler);
    advertisementForm.classList.remove('ad-form--disabled');
    enableFormElement(advertisementForm);
    enableFormElement(mapFilterForm);
    mainPin.removeEventListener('mousedown', window.onAdMapEnableClick);
    mainPin.removeEventListener('keydown', window.onAdMapEnablePress);
  };


  window.onAdMapEnableClick = function (evt) {
    if (evt.button === 0) {
      enableAdMap();
    }
  };

  window.onAdMapEnablePress = function (evt) {
    if (evt.keyCode === 13) {
      enableAdMap();
    }
  };

  mainPin.addEventListener('mousedown', window.onAdMapEnableClick);
  mainPin.addEventListener('keydown', window.onAdMapEnablePress);


  var disableAdvertisementForm = function () {
    if (map.classList.contains('map--faded')) {
      disableFormElement(advertisementForm);
      disableFormElement(mapFilterForm);
    }
  };


  disableAdvertisementForm();
})();
