'use strict';
(function () {
  var adForm = document.querySelector('.ad-form');
  var selectTypeHousing = adForm.elements.type;
  var inputPrice = adForm.elements.price;
  var selectRooms = adForm.elements.rooms;
  var selectTime = adForm.querySelector('.ad-form__element--time');
  var selectCapacity = adForm.elements.capacity;
  var fieldsForm = document.querySelectorAll('.ad-form__element');

  var changeOptionType = function () {
    var selectedOption = selectTypeHousing.options[selectTypeHousing.selectedIndex];
    switch (selectedOption.value) {
      case 'bungalo':
        inputPrice.placeholder = '0';
        inputPrice.min = '0';
        break;
      case 'flat':
        inputPrice.placeholder = '1000';
        inputPrice.min = '1000';
        break;
      case 'house':
        inputPrice.placeholder = '5000';
        inputPrice.min = '5000';
        break;
      case 'palace':
        inputPrice.placeholder = '10 000';
        inputPrice.min = '10000';
        break;
    }
  };

  var synchOptionIndex = function (evt) {
    var selected = evt.target.selectedIndex;
    var children = this.children;
    for (var i = 0; i < children.length; i++) {
      if (typeof children[i].selectedIndex !== 'undefined') {
        children[i].selectedIndex = selected;
      }
    }
  };

  var setOptionCapacity = function () {
    var selectedOption = selectRooms.options[selectRooms.selectedIndex];
    switch (selectedOption.value) {
      case '1':
        for (var i = 0; i < selectCapacity.length; i++) {
          if (selectCapacity[i].value !== '1') {
            selectCapacity[i].classList.add('hidden');
          } else {
            selectCapacity[i].classList.remove('hidden');
          }
        }
        break;
      case '2':
        for (i = 0; i < selectCapacity.length; i++) {
          if (selectCapacity[i].value !== '1' && selectCapacity[i].value !== '2') {
            selectCapacity[i].classList.add('hidden');
          } else {
            selectCapacity[i].classList.remove('hidden');
          }
        }
        break;
      case '3':
        for (i = 0; i < selectCapacity.length; i++) {
          if (selectCapacity[i].value === '0') {
            selectCapacity[i].classList.add('hidden');
          } else {
            selectCapacity[i].classList.remove('hidden');
          }
        }
        break;
      case '100':
        for (i = 0; i < selectCapacity.length; i++) {
          if (selectCapacity[i].value !== '0') {
            selectCapacity[i].classList.add('hidden');
          } else {
            selectCapacity[i].classList.remove('hidden');
          }
        }
        break;
    }
    var index = selectCapacity.querySelector('option:not(.hidden)').index;
    selectCapacity.selectedIndex = index;
  };

  window.form = {
    active: function () {
      adForm.classList.remove('ad-form--disabled');
      window.tools.setAttributeDisabled(fieldsForm);
      selectTypeHousing.addEventListener('change', changeOptionType);
      selectTime.addEventListener('change', synchOptionIndex);
      setOptionCapacity();
      selectRooms.addEventListener('change', setOptionCapacity);
    }
  };

  window.tools.setAttributeDisabled(fieldsForm);
})();
