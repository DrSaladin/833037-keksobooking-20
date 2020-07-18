'use strict';

(function () {
  window.load = function (onLoad, onError) {
    var URL = 'https://javascript.pages.academy/keksobooking/data';
    var StatusCode = {
      OK: 200,
    };
    var TIMEOUT_IN_MS = 10000;

    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === StatusCode.OK) {
        /* for (var i = 0; i < xhr.response.length; i++) {
          xhr.response[i].id = 'advertisementNo' + i;
        } */
        onLoad(xhr.response);
      } else {
        onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });
    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });
    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.timeout = TIMEOUT_IN_MS;

    xhr.open('GET', URL);
    xhr.send();
  };

  var errorPopupTemplate = document.querySelector('#error')
    .content
    .querySelector('.error');

  var pageMain = document.querySelector('main');

  var closeErrorPopup = function () {
    var errorPopup = document.querySelector('.error');
    errorPopup.classList.add('hidden');
    errorPopup.setAttribute('tabindex', '0');

    window.removeEventListener('keydown', onPopupEscPress);
    document.removeEventListener('click', closeErrorPopup);
  };

  var onPopupEscPress = function (evt) {
    if (evt.keyCode === 27) {
      closeErrorPopup();
    }
  };


  var renderErrorPopup = function () {
    var popupElement = errorPopupTemplate.cloneNode(true);
    pageMain.appendChild(popupElement);
  };


  var successPopupTemplate = document.querySelector('#success')
    .content
    .querySelector('.success');


  var closeSuccessPopup = function () {
    var successPopup = document.querySelector('.success');
    successPopup.classList.add('hidden');

    window.removeEventListener('keydown', onPopupEscPress);
    document.removeEventListener('click', closeSuccessPopup);
  };


  var renderSuccessPopup = function () {
    var popupElement = successPopupTemplate.cloneNode(true);
    pageMain.appendChild(popupElement);
  };

  window.upload = function (data, onLoad, onError) {
    var URL = 'https://javascript.pages.academy/keksobooking';
    var StatusCode = {
      OK: 200,
    };
    var TIMEOUT_IN_MS = 10000;

    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === StatusCode.OK) {
        onLoad(xhr.response);
        renderSuccessPopup();
        window.addEventListener('keydown', onPopupEscPress);
        document.addEventListener('click', closeSuccessPopup);
      } else {
        renderErrorPopup();
        var errorPopupCloseButton = document.querySelector('.error__button');
        errorPopupCloseButton.addEventListener('click', closeErrorPopup);
        window.addEventListener('keydown', onPopupEscPress);
        document.addEventListener('click', closeErrorPopup);
      }
    });
    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });

    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.timeout = TIMEOUT_IN_MS;

    xhr.open('POST', URL);
    xhr.send(data);
  };
})();
