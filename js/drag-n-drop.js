'use strict';

(function () {

  var dragged = false;

  var onClickPreventDefault = function (clickEvt) {
    clickEvt.preventDefault();
    window.utils.mainPin.removeEventListener('mousdown', onClickPreventDefault);
  };


  var mapBorders = {
    top: window.utils.map.offsetTop + 100,
    right: window.utils.map.offsetWidth - window.utils.mainPin.offsetWidth,
    bottom: window.utils.map.offsetHeight - window.utils.mainPin.offsetHeight * 2,
    left: 0
  };


  window.utils.mainPin.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startPoint = {
      x: evt.clientX,
      y: evt.clientY
    };

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      dragged = true;

      var shift = {
        x: startPoint.x - moveEvt.clientX,
        y: startPoint.y - moveEvt.clientY
      };


      startPoint = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      var topPosition = window.utils.mainPin.offsetTop - shift.y;
      var leftPosition = window.utils.mainPin.offsetLeft - shift.x;

      if (topPosition < mapBorders.top) {
        window.utils.mainPin.style.top = (mapBorders.top) + 'px';
      } else if (topPosition + window.pins.getPinCharacteristic().height > mapBorders.bottom) {
        window.utils.mainPin.style.top = (mapBorders.bottom) + 'px';
      } else {
        window.utils.mainPin.style.top = topPosition + 'px';
      }

      if (leftPosition < mapBorders.left) {
        window.utils.mainPin.style.left = (mapBorders.left) + 'px';
      } else if (leftPosition + window.pins.getPinCharacteristic().width > mapBorders.right) {
        window.utils.mainPin.style.left = (mapBorders.right) + 'px';
      } else {
        window.utils.mainPin.style.left = leftPosition + 'px';
      }
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);

      if (dragged) {
        window.utils.mainPin.addEventListener('mousdown', onClickPreventDefault);
      }
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });
})();
