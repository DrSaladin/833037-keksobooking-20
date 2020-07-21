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
    updateAdvertisements();
    window.renderMapPins(data);
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

  window.load(successHandler, errorHandler);


  mainPin.addEventListener('mousedown', function (evt) {
    if (evt.button === 0) {
      map.classList.remove('map--faded');
      advertisementForm.classList.remove('ad-form--disabled');
      enableFormElement(advertisementForm);
      enableFormElement(mapFilterForm);
    }
  });

  mainPin.addEventListener('keydown', function (evt) {
    if (evt.keyCode === 13) {
      map.classList.remove('map--faded');
      advertisementForm.classList.remove('ad-form--disabled');
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
