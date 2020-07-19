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
        onLoad(window.createAdArray(xhr.response));
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

  var successPopupTemplate = document.querySelector('#success')
    .content
    .querySelector('.success');


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
        window.renderPopup(successPopupTemplate);
        window.addEventListener('keydown', window.onPopupEscPress);
        document.addEventListener('click', function () {
          window.closeStatusPopup('.success');
        });
      } else {
        window.renderPopup(errorPopupTemplate);
        var errorPopupCloseButton = document.querySelector('.error__button');
        errorPopupCloseButton.addEventListener('click', function () {
          window.closeStatusPopup('.error');
        });
        window.addEventListener('keydown', window.onPopupEscPress);
        document.addEventListener('click', function () {
          window.closeStatusPopup('.error');
        });
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
