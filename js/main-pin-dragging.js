'use strict';

(function () {
  var pinList = document.querySelector('.map__pins');
  var mainPin = pinList.querySelector('.map__pin--main');
  var mainPinWidth = mainPin.clientWidth;
  var mainPinHeight = mainPin.clientHeight;
  var map = document.querySelector('.map');

  var mainPinAddress = document.querySelector('input[name = "address"]');


  var mapTopLimit = 100;
  var mapBottomLimit = 130;
  var mapLeftLimit = 0;

  var mapBorders = {
    top: map.offsetTop + mapTopLimit,
    right: map.offsetWidth - mainPin.offsetWidth,
    bottom: map.offsetHeight - mapBottomLimit,
    left: mapLeftLimit,
  };


  mainPin.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startPoint = {
      x: evt.clientX,
      y: evt.clientY
    };

    var onMouseMove = function (moveEvt) {
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

      mainPinAddress.value = (parseInt(mainPin.style.top, 10) + mainPinHeight) + ', ' + (parseInt(mainPin.style.left, 10) + mainPinWidth / 2);
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

})();
