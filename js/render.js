'use strict';
(function () {
  var mapPinList = document.querySelector('.map__pins');
  var mapPinTemplate = document.querySelector('template')
  .content
  .querySelector('.map__pin');

  var renderPin = function (pin) {
    var mapPin = mapPinTemplate.cloneNode(true);
    mapPin.style = 'left: ' + pin.location.x + 'px; top: ' + pin.location.y + 'px';
    mapPin.querySelector('img').src = pin.author.avatar;
    mapPin.querySelector('img').alt = pin.offer.title;
    return mapPin;
  };

  window.render = function (data) {
    while (mapPinList.querySelector('.map__pin:not(.map__pin--main)')) {
      mapPinList.removeChild(mapPinList.querySelector('.map__pin:not(.map__pin--main)'));
    }
    var fragment = document.createDocumentFragment();
    var QUANTITY_AD = data.length < 5 ? data.length : 5;
    for (var i = 0; i < QUANTITY_AD; i++) {
      var tempPin = fragment.appendChild(renderPin(data[i]));
      (function (pin) {
        tempPin.addEventListener('click', function () {
          window.card(pin);
        });
      })(data[i]);
    }
    mapPinList.appendChild(fragment);
  };
})();
