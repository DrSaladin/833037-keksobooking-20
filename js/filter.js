'use strict';

(function () {

  var FIRST_PRICE_BREAKPOINT = 10000;
  var SECOND_PRICE_BREAKPOINT = 50000;

  var adMapForm = document.querySelector('.map__filters-container');
  var adTypeSelects = adMapForm.querySelectorAll('select');

  var sameGuestsQuantity = '';

  var sameHousingType = '';
  var filterHousingType = function () {
    var typeHouseElement = document.querySelector('#housing-type');
    if (typeHouseElement.value !== 'any') {
      sameHousingType = window.advertisements.filter(function (it) {
        return it.offer.type === typeHouseElement.value;
      });
    } else {
      sameHousingType = window.advertisements;
    }
    return sameHousingType;
  };

  var sameHousingPrice = '';
  var filterHousingPrice = function () {
    var typePriceElement = document.querySelector('#housing-price');

    switch (typePriceElement.value) {
      case 'low':
        sameHousingPrice = window.advertisements.filter(function (it) {
          return it.offer.price < FIRST_PRICE_BREAKPOINT;
        });
        break;
      case 'middle':
        sameHousingPrice = window.advertisements.filter(function (it) {
          return (it.offer.price >= FIRST_PRICE_BREAKPOINT) && (it.offer.price <= SECOND_PRICE_BREAKPOINT);
        });
        break;
      case 'high':
        sameHousingPrice = window.advertisements.filter(function (it) {
          return it.offer.price > SECOND_PRICE_BREAKPOINT;
        });
        break;
      case 'any':
        sameHousingPrice = window.advertisements;
        break;
    }
    return sameHousingPrice;
  };

  var sameRoomsQuantity = '';
  var filterRoomsQuantity = function () {
    var typeRoomsElement = document.querySelector('#housing-rooms');
    if (typeRoomsElement.value === 'any') {
      sameRoomsQuantity = window.advertisements;
    } else {
      sameRoomsQuantity = window.advertisements.filter(function (it) {
        return it.offer.rooms === +typeRoomsElement.value;
      });
    }
    return sameRoomsQuantity;
  };


  var filterGuestsQuantity = function () {
    var typeGuestsElement = document.querySelector('#housing-guests');
    if (typeGuestsElement.value !== 'any') {
      sameGuestsQuantity = window.advertisements.filter(function (it) {
        return it.offer.guests === +typeGuestsElement.value;
      });
    } else {
      sameGuestsQuantity = window.advertisements;
    }
    return sameGuestsQuantity;
  };

  var compareAdTypes = function (firstArray, secondArray) {
    var originalAds = [];
    firstArray.forEach(function (e) {
      if (secondArray.indexOf(e) !== -1) {
        originalAds.push(e);
      }
    });

    return originalAds;
  };

  var filterAdFeatures = function () {
    sameFeatures = [];
    featureElements.forEach(function (e, i) {
      if (featureElements[i].checked) {
        sameFeatures.push(e.value);
      }
    });
    return sameFeatures;
  };

  var featureElements = document.querySelectorAll('.map__features input');
  var sameFeatures = [];
  featureElements.forEach(function (e) {
    e.addEventListener('click', filterAdFeatures);
  });

  var generalAdFilter = function () {
    filterHousingType();
    filterHousingPrice();
    filterRoomsQuantity();
    filterGuestsQuantity();
    var firstTurn = compareAdTypes(sameHousingType, sameHousingPrice);
    var secondTurn = compareAdTypes(sameRoomsQuantity, sameGuestsQuantity);
    var finalResult = compareAdTypes(firstTurn, secondTurn);
    var utilityArray = [];
    if (sameFeatures.length !== 0) {
      finalResult.forEach(function (element) {
        if (element.offer.features.includes(sameFeatures[0])) {
          utilityArray.push(element);
        }
      });

      if (sameFeatures.length > 1) {
        for (var i = 1; i < sameFeatures.length; i++) {
          utilityArray.forEach(function (element, index) {
            if (element.offer.features.includes(sameFeatures[i]) === false) {
              utilityArray.splice(index, 1);
            }
          });
        }
      }
    } else {
      utilityArray = finalResult;
    }

    window.debounce(window.renderMapPins(utilityArray));
  };

  adTypeSelects.forEach(function (e) {
    e.addEventListener('input', generalAdFilter);
  });
  featureElements.forEach(function (e) {
    e.addEventListener('input', generalAdFilter);
  });
})();
