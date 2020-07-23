'use strict';

(function () {
  var adForm = document.querySelector('.ad-form');

  var submitHandler = function (evt) {
    evt.preventDefault();
    window.upload(new FormData(adForm), window.onSubmitSuccess, window.onSubmitError);
  };

  adForm.addEventListener('submit', submitHandler, window.onSubmitError);
})();
