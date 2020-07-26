'use strict';

(function () {

  var adForm = document.querySelector('.ad-form');
  adForm.setAttribute('action', 'https://javascript.pages.academy/keksobooking');

  var minPrice = 0;

  var guestsQuantity = {
    zero: '0',
    one: '1',
    two: '2',
    three: '3',
    oneHundred: '100',
  };

  var timeOptions = {
    noon: '12:00',
    thirteenHundred: '13:00',
    fourteenHundred: '14:00',
  };

  var inputAdTitle = adForm.querySelector('#title');
  inputAdTitle.required = true;
  inputAdTitle.setAttribute('minlength', window.utils.MIN_TITLE_LENGTH.toString());
  inputAdTitle.setAttribute('maxlength', window.utils.MAX_TITLE_LENGTH.toString());

  var onInputAdTitle = function () {
    var titleValueLength = inputAdTitle.value.length;
    if (titleValueLength < window.utils.MIN_TITLE_LENGTH) {
      inputAdTitle.setCustomValidity('Ещё ' + (window.utils.MIN_TITLE_LENGTH - titleValueLength) + ' симв.');
    } else if (titleValueLength >= window.utils.MAX_TITLE_LENGTH) {
      inputAdTitle.setCustomValidity(window.utils.MAX_TITLE_LENGTH + ' - это максимальная длинна заголовка');
    } else {
      inputAdTitle.setCustomValidity('');
    }
  };

  inputAdTitle.addEventListener('input', onInputAdTitle);


  var selectAdPrice = adForm.querySelector('#price');
  selectAdPrice.setAttribute('placeholder', window.utils.MIN_FLAT_PRICE.toString());
  selectAdPrice.required = true;
  selectAdPrice.setAttribute('max', window.utils.MAX_PRICE.toString());

  var onInputPriceSelect = function () {
    if (selectAdPrice.value >= window.utils.MAX_PRICE) {
      selectAdPrice.setCustomValidity('Максимальная цена за ночь ' + window.utils.MAX_PRICE);
    } else {
      selectAdPrice.setCustomValidity('');
    }
  };

  selectAdPrice.addEventListener('input', onInputPriceSelect);


  var selectAdRoomNumber = adForm.querySelector('#room_number');
  var selectAdGuestNumber = adForm.querySelector('#capacity');

  var onChangeValidateGuestSelect = function () {
    if (selectAdRoomNumber.value === guestsQuantity.one && selectAdGuestNumber.value > guestsQuantity.one) {
      selectAdGuestNumber.setCustomValidity('Доступна опция "Для одного гостя"');
    } else if (selectAdRoomNumber.value === guestsQuantity.two && selectAdGuestNumber.value > guestsQuantity.two) {
      selectAdGuestNumber.setCustomValidity('Доступные опции "Для одного гостя" или "Для двух гостей"');
    } else if (selectAdRoomNumber.value === guestsQuantity.three && selectAdGuestNumber.value > guestsQuantity.three) {
      selectAdGuestNumber.setCustomValidity('Доступные опции "Для одного гостя", "Для двух гостей" или "Для трех гостей"');
    } else if (selectAdRoomNumber.value === guestsQuantity.oneHundred && selectAdGuestNumber.value > guestsQuantity.zero) {
      selectAdGuestNumber.setCustomValidity('Доступна опция "Не для гостей"');
    } else {
      selectAdGuestNumber.setCustomValidity('');
    }
  };

  adForm.addEventListener('change', onChangeValidateGuestSelect);


  var checkIn = adForm.querySelector('#timein');
  var checkOut = adForm.querySelector('#timeout');


  var onChangeValidateTime = function () {
    if (checkIn.value === timeOptions.noon) {
      checkOut.value = checkIn.value;
    } else if (checkIn.value === timeOptions.thirteenHundred) {
      checkOut.value = checkIn.value;
    } else if (checkIn.value === timeOptions.fourteenHundred) {
      checkOut.value = checkIn.value;
    } else if (checkOut.value === timeOptions.noon) {
      checkIn.value = checkOut.value;
    } else if (checkOut.value === timeOptions.thirteenHundred) {
      checkIn.value = checkOut.value;
    } else if (checkOut.value === timeOptions.fourteenHundred) {
      checkIn.value = checkOut.value;
    }
  };


  checkIn.addEventListener('change', onChangeValidateTime);
  checkOut.addEventListener('change', onChangeValidateTime);

  var inputAdHousingType = adForm.querySelector('#type');
  var onChangeValidateTypeSelect = function () {
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
  };

  inputAdHousingType.addEventListener('change', onChangeValidateTypeSelect);


  var inputAdAvatar = adForm.querySelector('#avatar');
  var inputAdRoomImg = adForm.querySelector('#images');
  inputAdRoomImg.setAttribute('accept', 'image/png, image/jpeg');
  inputAdAvatar.setAttribute('accept', 'image/png, image/jpeg');
})();
