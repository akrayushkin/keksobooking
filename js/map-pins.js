'use strict';
(function () {
  var QUANTITY_AD = 8;
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
    var handler = {
      success: function (data) {
        var fragment = document.createDocumentFragment();
        for (var i = 0; i < QUANTITY_AD; i++) {
          var tempPin = fragment.appendChild(renderMapPin(data[i]));
          (function (index) {
            tempPin.addEventListener('click', function () {
              window.card(index);
            });
          })(i);
        }
        mapPinList.appendChild(fragment);
        window.mapData = data;
      },

      error: function (errorMessage) {
        var node = document.createElement('div');
        node.textContent = errorMessage;
        node.style = 'box-sizing: border-box; z-index: 100; width: 100%; padding: 10px 40px; text-align: center; background-color: red;';
        node.style.position = 'absolute';
        node.style.bottom = '15%';
        node.style.fontSize = '30';
        node.classList.add('errorMessage');
        window.tools.deleteElement('div.errorMessage');
        document.querySelector('.map').insertAdjacentElement('afterbegin', node);
      }
    };
    window.backend.load(handler.success, handler.error);
  };
})();
