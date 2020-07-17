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
        for (var i = 0; i < xhr.response.length; i++) {
          xhr.response[i].id = 'advertisementNo' + i;
        }
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

    window.removeEventListener('keydown', onErrorPopupEscPress);
    document.removeEventListener('click', closeErrorPopup);
  };

  var onErrorPopupEscPress = function (evt) {
    if (evt.keyCode === 27) {
      closeErrorPopup();
    }
  };


  var renderErrorPopup = function () {
    var cardElement = errorPopupTemplate.cloneNode(true);
    pageMain.appendChild(cardElement);
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
      } else {
        renderErrorPopup();
        var popupCloseButton = document.querySelector('.error__button');
        popupCloseButton.addEventListener('click', closeErrorPopup);
        window.addEventListener('keydown', onErrorPopupEscPress);
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
