'use strict';

(function () {
  var resetPageButton = document.querySelector('.ad-form__reset');
  var map = document.querySelector('.map');
  var pageAdForm = document.querySelector('.ad-form');
  var mainPin = document.querySelector('.map__pin--main');

  var mainPinDefaultCoord = {
    x: 570,
    y: 375,
  };


  var resetMainPin = function () {
    mainPin.style.left = mainPinDefaultCoord.x + 'px';
    mainPin.style.top = mainPinDefaultCoord.y + 'px';
  };

  var pageForms = document.querySelectorAll('form');
  var resetPageForms = function () {
    for (var i = 0; i < pageForms.length; i++) {
      pageForms[i].reset();
      pageForms[i].setAttribute('disabled', true);
    }
  };


  window.resetPage = function () {
    window.deleteAdCards();
    window.deletePins();
    resetMainPin();
    resetPageForms();
    map.classList.add('map--faded');
    pageAdForm.classList.add('ad-form--disabled');
    mainPin.addEventListener('mousedown', window.onAdMapEnableClick);
    mainPin.addEventListener('keydown', window.onAdMapEnablePress);
  };

  resetPageButton.addEventListener('click', window.resetPage);
})();
