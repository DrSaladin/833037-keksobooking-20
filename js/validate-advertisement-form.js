'use strict';

(function () {

  var adForm = document.querySelector('.ad-form');
  adForm.setAttribute('action', 'https://javascript.pages.academy/keksobooking');

  var inputAdTitle = adForm.querySelector('#title');
  inputAdTitle.required = true;
  inputAdTitle.setAttribute('minlength', window.utils.MIN_TITLE_LENGTH.toString());
  inputAdTitle.setAttribute('maxlength', window.utils.MAX_TITLE_LENGTH.toString());
  inputAdTitle.addEventListener('input', function () {
    var titleValueLength = inputAdTitle.value.length;

    if (titleValueLength < window.utils.MIN_TITLE_LENGTH) {
      inputAdTitle.setCustomValidity('Ещё ' + (window.utils.MIN_TITLE_LENGTH - titleValueLength) + ' симв.');
    } else if (titleValueLength >= window.utils.MAX_TITLE_LENGTH) {
      inputAdTitle.setCustomValidity(window.utils.MAX_TITLE_LENGTH + ' - это максимальная длинна заголовка');
    } else {
      inputAdTitle.setCustomValidity('');
    }
  });


  var minPrice = 0;

  var selectAdPrice = adForm.querySelector('#price');
  selectAdPrice.setAttribute('placeholder', '1000');
  selectAdPrice.required = true;
  selectAdPrice.setAttribute('max', window.utils.MAX_PRICE.toString());
  selectAdPrice.addEventListener('input', function () {
    if (selectAdPrice.value >= window.utils.MAX_PRICE) {
      selectAdPrice.setCustomValidity('Максимальная цена за ночь ' + window.utils.MAX_PRICE);
    } else {
      selectAdPrice.setCustomValidity('');
    }
  });

  var selectAdRoomNumber = adForm.querySelector('#room_number');
  var selectAdGuestNumber = adForm.querySelector('#capacity');

  adForm.addEventListener('change', function () {
    if (selectAdRoomNumber.value === '1' && selectAdGuestNumber.value > '1') {
      selectAdGuestNumber.setCustomValidity('Доступна опция "Для одного гостя"');
    } else if (selectAdRoomNumber.value === '2' && selectAdGuestNumber.value > '2') {
      selectAdGuestNumber.setCustomValidity('Доступные опции "Для одного гостя" или "Для двух гостей"');
    } else if (selectAdRoomNumber.value === '3' && selectAdGuestNumber.value > '3') {
      selectAdGuestNumber.setCustomValidity('Доступные опции "Для одного гостя", "Для двух гостей" или "Для трех гостей"');
    } else if (selectAdRoomNumber.value === '100' && selectAdGuestNumber.value > '0') {
      selectAdGuestNumber.setCustomValidity('Доступна опция "Не для гостей"');
    } else {
      selectAdGuestNumber.setCustomValidity('');
    }
  });


  var checkIn = adForm.querySelector('#timein');
  var checkOut = adForm.querySelector('#timeout');
  var formTimeDependency = function (listenedElement, leadElement, dependentElement) {
    listenedElement.addEventListener('change', function () {
      if (leadElement.value === '12:00') {
        dependentElement.value = leadElement.value;
      } else if (leadElement.value === '13:00') {
        dependentElement.value = leadElement.value;
      } else if (leadElement.value === '14:00') {
        dependentElement.value = leadElement.value;
      }
    });
  };

  formTimeDependency(checkIn, checkIn, checkOut);
  formTimeDependency(checkOut, checkOut, checkIn);



  var inputAdHousingType = adForm.querySelector('#type');

  inputAdHousingType.addEventListener('change', function () {
    if (inputAdHousingType.value === 'bungalo') {
      minPrice = 0;
      selectAdPrice.setAttribute('min', minPrice.toString());
      selectAdPrice.setAttribute('placeholder', window.utils.MIN_BUNGALO_PRICE.toString());
    } else if (inputAdHousingType.value === 'flat') {
      minPrice = 1000;
      selectAdPrice.setAttribute('min', minPrice.toString());
      selectAdPrice.setAttribute('placeholder', window.utils.MIN_FLAT_PRICE.toString());
    } else if (inputAdHousingType.value === 'house') {
      minPrice = 5000;
      selectAdPrice.setAttribute('min', minPrice.toString());
      selectAdPrice.setAttribute('placeholder', window.utils.MIN_HOUSE_PRICE.toString());
    } else if (inputAdHousingType.value === 'palace') {
      minPrice = 10000;
      selectAdPrice.setAttribute('min', minPrice.toString());
      selectAdPrice.setAttribute('placeholder', window.utils.MIN_PALACE_PRICE.toString());
    }
  });


  var inputAdAvatar = adForm.querySelector('#avatar');
  var inputAdRoomImg = adForm.querySelector('#images');
  inputAdRoomImg.setAttribute('accept', 'image/png, image/jpeg');
  inputAdAvatar.setAttribute('accept', 'image/png, image/jpeg');
})();
