'use strict';

(function () {
  var pageMain = document.querySelector('main');

  window.renderPopup = function (popupTemplate) {
    var popupElement = popupTemplate.cloneNode(true);
    pageMain.appendChild(popupElement);
  };

  window.closeSuccessPopup = function () {
    var popup = document.querySelector('.success');

    document.removeEventListener('keydown', window.onSuccessPopupEscPress);
    document.removeEventListener('click', window.onSuccessPopupClick);

    pageMain.removeChild(popup);
  };

  window.onErrorPopupEscPress = function (evt) {
    if (evt.keyCode === 27) {
      window.closeSuccessPopup();
    }
  };

  window.onErrorPopupClick = function () {
    window.closeSuccessPopup();
  };


  window.closeErrorPopup = function () {
    var popup = document.querySelector('.error');

    document.removeEventListener('keydown', window.onErrorPopupEscPress);
    document.removeEventListener('click', window.onErrorPopupClick);

    pageMain.removeChild(popup);
  };

  window.onErrorPopupEscPress = function (evt) {
    if (evt.keyCode === 27) {
      window.closeErrorPopup();
    }
  };

  window.onErrorPopupClick = function () {
    window.closeErrorPopup();
  };


})();
