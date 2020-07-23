'use strict';

(function () {
  var adForm = document.querySelector('.ad-form');

  var onAdFormSubmit = function (evt) {
    evt.preventDefault();
    window.upload(new FormData(adForm), window.onSubmitSuccess, window.onSubmitError);
  };

  adForm.addEventListener('submit', onAdFormSubmit, window.onSubmitError);
})();
