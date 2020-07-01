'use strict';

(function () {

  var adForm = document.querySelector('.ad-form');
  var map = document.querySelector('.map');

  var submitHandler = function (evt) {
    evt.preventDefault();
    window.upload(new FormData(adForm), function () {
      map.classList.add('map--faded');
    }, window.errorHandler);
  };

  adForm.addEventListener('submit', submitHandler, window.errorHandler);
})();
