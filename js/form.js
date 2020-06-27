'use strict';

(function () {

  var mainForm = document.querySelector('.ad-form');
  var mainFormFieldsets = mainForm.querySelectorAll('fieldset');
  var mainFormSelects = mainForm.querySelectorAll('select');

  var mapFilterForm = document.querySelector('.map__filters');
  var mapFilterFieldsets = mapFilterForm.querySelectorAll('fieldset');
  var mapFilterSelects = mapFilterForm.querySelectorAll('select');


  var disableForm = function (formElements) {
    for (var i = 0; i < formElements.length; i++) {
      formElements[i].setAttribute('disabled', true);
    }
  };

  var enableForm = function (formElements) {
    for (var i = 0; i < formElements.length; i++) {
      formElements[i].removeAttribute('disabled');
    }
  };

  window.form = {
    mainForm: mainForm,
    mainFormFieldsets: mainFormFieldsets,
    mainFormSelects: mainFormSelects,
    mapFilterFieldsets: mapFilterFieldsets,
    mapFilterSelects: mapFilterSelects,
    disableForm: disableForm,
    enableForm: enableForm
  };
})();
