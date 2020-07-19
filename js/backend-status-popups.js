'use strict';

(function () {
  var pageMain = document.querySelector('main');

  window.closeStatusPopup = function (popupClass) {
    document.querySelector(popupClass).classList.add('visually-hidden');

    window.removeEventListener('keydown', window.onPopupEscPress);
    document.removeEventListener('click', window.closeStatusPopup);
  };


  window.onPopupEscPress = function (evt) {
    if (evt.keyCode === 27) {
      window.closeStatusPopup('.error');
      window.closeStatusPopup('.success');
    }
  };


  window.renderPopup = function (popupTemplate) {
    var popupElement = popupTemplate.cloneNode(true);
    pageMain.appendChild(popupElement);
  };
})();
