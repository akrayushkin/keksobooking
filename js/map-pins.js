'use strict';
(function () {
  var mapPinTemplate = document.querySelector('template')
  .content
  .querySelector('.map__pin');

  var renderMapPin = function (pin) {
    var mapPin = mapPinTemplate.cloneNode(true);
    mapPin.style = 'left: ' + pin.location.x + 'px; top: ' + pin.location.y + 'px';
    mapPin.querySelector('img').src = pin.author.avatar;
    mapPin.querySelector('img').alt = pin.offer.title;
    return mapPin;
  };

  window.mapPins = function (mapPinList) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < window.mapData.length; i++) {
      var tempPin = fragment.appendChild(renderMapPin(window.mapData[i]));
      (function (index) {
        tempPin.addEventListener('click', function () {
          window.card(index);
        });
      })(i);
    }
    mapPinList.appendChild(fragment);
  };
})();
