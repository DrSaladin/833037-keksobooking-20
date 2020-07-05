'use strict';

(function () {

  var adMap = document.querySelector('.map');
  var mapFilter = document.querySelector('.map__filters');
  var mapFilterSelects = mapFilter.querySelectorAll('select');
  var mapFilterCheckboxes = mapFilter.querySelectorAll('checkbox');

  var selectHousingType = mapFilter.querySelector('#housing-type');

  var selectedAd = [];


  var filterPins = function () {
    if (!adMap.classList.contains('.map--faded')) {
      for (var i = 0; i < mapFilterSelects.length; i++) {
        mapFilterSelects[i].addEventListener('change', function () {
          console.log(selectHousingType.value);
        });
      }
    }
  };

  filterPins();


})();
