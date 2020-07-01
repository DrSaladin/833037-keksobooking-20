'use strict';

(function () {

  var adForm = document.querySelector('.ad-form');
  var map = document.querySelector('.map');

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

  var submitHandler = function (evt) {
    evt.preventDefault();
    window.upload(new FormData(adForm), errorHandler, function () {
      map.classList.add('map--faded');
    });
  };

  adForm.addEventListener('submit', submitHandler, errorHandler);
})();
