'use strict';

(function () {
  var TIMEOUT_IN_MS = 10000;

  var StatusCode = {
    OK: 200,
  };

  var url = {
    load: 'https://javascript.pages.academy/keksobooking/data',
    upload: 'https://javascript.pages.academy/keksobooking',
  };

  var createXhr = function (onSuccess, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.timeout = TIMEOUT_IN_MS;

    var onLoadShowStatus = function () {
      if (xhr.status === StatusCode.OK) {
        onSuccess(xhr.response);
      } else {
        onError('Cтатус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    };

    var onErrorShowStatus = function () {
      onError('Произошла ошибка соединения');
    };

    var onTimeoutShowStatus = function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    };

    xhr.addEventListener('load', onLoadShowStatus);
    xhr.addEventListener('error', onErrorShowStatus);
    xhr.addEventListener('timeout', onTimeoutShowStatus);

    return xhr;
  };

  window.load = function (onSuccess, onError) {
    var xhr = createXhr(onSuccess, onError);

    xhr.open('GET', url.load);
    xhr.send();
  };

  window.upload = function (data, onSuccess, onError) {
    var xhr = createXhr(onSuccess, onError);

    xhr.open('POST', url.upload);
    xhr.send(data);
  };
})();
