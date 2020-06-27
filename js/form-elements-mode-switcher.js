'use strict';

(function () {
  var disableFormElement = function (formElements) {
    for (var i = 0; i < formElements.length; i++) {
      formElements[i].setAttribute('disabled', true);
    }
  };

  var enableFormElement = function (formElements) {
    for (var i = 0; i < formElements.length; i++) {
      formElements[i].removeAttribute('disabled');
    }
  };

  window.formElementsModeSwitcher = {
    disableFormElement: disableFormElement,
    enableFormElement: enableFormElement
  };
})();
