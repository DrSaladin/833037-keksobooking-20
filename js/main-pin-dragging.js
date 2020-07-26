'use strict';

(function () {
  var pinList = document.querySelector('.map__pins');
  var mainPin = pinList.querySelector('.map__pin--main');
  var mainPinWidth = mainPin.clientWidth;
  var mainPinHeight = mainPin.clientHeight;
  var map = document.querySelector('.map');

  var mainPinAddress = document.querySelector('#address');


  var mapTopLimit = 130;
  var mapBottomLimit = 130;
  var mapLeftLimit = 0;

  var mapBorders = {
    top: map.offsetTop + mapTopLimit,
    right: map.offsetWidth - mainPin.offsetWidth,
    bottom: map.offsetHeight - mapBottomLimit,
    left: mapLeftLimit,
  };


  if (map.classList.contains('map--faded')) {
    mainPinAddress.value = Math.round(parseInt(mainPin.style.top, 10) + mainPinHeight / 2) + ', ' + Math.round(parseInt(mainPin.style.left, 10) + mainPinWidth / 2);
    mainPinAddress.setAttribute('value', mainPinAddress.value);
  }

  var onClickPinStartMove = function (evt) {
    evt.preventDefault();


    var startPoint = {
      x: evt.clientX,
      y: evt.clientY
    };


    var onMainPinMove = function (moveEvt) {
      moveEvt.preventDefault();


      var shift = {
        x: startPoint.x - moveEvt.clientX,
        y: startPoint.y - moveEvt.clientY
      };


      startPoint = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      var topPosition = mainPin.offsetTop - shift.y;
      var leftPosition = mainPin.offsetLeft - shift.x;

      if (topPosition < mapBorders.top) {
        mainPin.style.top = (mapBorders.top) + 'px';
      } else if (topPosition > mapBorders.bottom) {
        mainPin.style.top = (mapBorders.bottom) + 'px';
      } else {
        mainPin.style.top = topPosition + 'px';
      }

      if (leftPosition < mapBorders.left) {
        mainPin.style.left = (mapBorders.left) + 'px';
      } else if (leftPosition > mapBorders.right) {
        mainPin.style.left = (mapBorders.right) + 'px';
      } else {
        mainPin.style.left = leftPosition + 'px';
      }

      mainPinAddress.value = Math.round(parseInt(mainPin.style.top, 10) + mainPinHeight) + ', ' + Math.round(parseInt(mainPin.style.left, 10) + mainPinWidth / 2);
      mainPinAddress.setAttribute('value', mainPinAddress.value);
    };


    var onMainPinUp = function (upEvt) {
      upEvt.preventDefault();


      document.removeEventListener('mousemove', onMainPinMove);
      document.removeEventListener('mouseup', onMainPinUp);
    };

    document.addEventListener('mousemove', onMainPinMove);
    document.addEventListener('mouseup', onMainPinUp);
  };

  mainPin.addEventListener('mousedown', onClickPinStartMove);
})();
