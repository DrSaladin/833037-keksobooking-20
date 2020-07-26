
'use strict';

(function () {
  var pageMain = document.querySelector('main');
  var successPopupTemplate = document.querySelector('#success')
    .content.querySelector('.success');
  var errorPopupTemplate = document.querySelector('#error')
    .content.querySelector('.error');


  window.onSubmitSuccess = function () {
    pageMain.appendChild(successPopupTemplate);

    successPopupTemplate.addEventListener('click', onSuccessCloseClick);
    document.addEventListener('keydown', onSuccessCloseEsc);
  };


  var closeSuccessPopup = function () {
    var popup = document.querySelector('.success');

    document.removeEventListener('keydown', onSuccessCloseEsc);
    document.removeEventListener('click', onSuccessCloseClick);

    pageMain.removeChild(popup);
    window.onClickResetPage();
  };

  var onSuccessCloseEsc = function (evt) {
    if (evt.keyCode === window.utils.ESC_KEY_CODE) {
      closeSuccessPopup();
    }
  };

  var onErrorCloseEsc = function (evt) {
    if (evt.keyCode === window.utils.ESC_KEY_CODE) {
      closeErrorPopup();
    }
  };

  var onSuccessCloseClick = function () {
    closeSuccessPopup();
  };

  window.onSubmitError = function () {
    pageMain.appendChild(errorPopupTemplate);
    var errorPopupButton = document.querySelector('.error__button');

    errorPopupButton.addEventListener('click', onErrorCloseClick);
    document.addEventListener('click', onErrorCloseClick);
    document.addEventListener('keydown', onErrorCloseEsc);
  };


  var closeErrorPopup = function () {
    var popup = document.querySelector('.error');

    document.removeEventListener('keydown', onErrorCloseEsc);
    document.removeEventListener('click', onErrorCloseClick);

    pageMain.removeChild(popup);
  };

  var onErrorCloseClick = function () {
    closeErrorPopup();
  };
})();
