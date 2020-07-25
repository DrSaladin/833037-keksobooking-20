'use strict';

(function () {
  var DEBOUNCE_TIMER = 500;

  var lastTimeout;
  window.debounce = function (cb) {
    if (lastTimeout) {
      window.clearTimeout(lastTimeout);
    }
    lastTimeout = window.setTimeout(cb, DEBOUNCE_TIMER);
  };
})();
