'use strict';
(function () {
  var map = document.querySelector('.map');

  var mapAreaPins = map.querySelector('.map__pins');
  var MAP_INACCESSIBLE_AREA = 110;
  var mapAreaPinsCoords = window.tools.getCoordsWithScrolling(mapAreaPins);

  var mapPinMain = map.querySelector('.map__pin--main');
  var pinMainPointerHeight = parseInt(window.getComputedStyle(mapPinMain, ':after').height, 10);

  var mapMainPinLimits = {
    top: mapAreaPinsCoords.top + MAP_INACCESSIBLE_AREA,
    right: mapAreaPinsCoords.left + mapAreaPins.getBoundingClientRect().width - mapPinMain.offsetWidth,
    bottom: mapAreaPinsCoords.top + mapAreaPins.getBoundingClientRect().height - mapPinMain.offsetHeight - pinMainPointerHeight,
    left: mapAreaPinsCoords.left
  };

  var fieldAddress = document.querySelector('#address');
  function setValueAddress() {
    var locationX = Math.round(mapPinMain.offsetLeft + mapPinMain.offsetWidth / 2);
    var locationY = mapPinMain.offsetTop + mapPinMain.offsetHeight + pinMainPointerHeight;
    if (map.classList.contains('map--faded')) {
      locationY = Math.round(mapPinMain.offsetTop + mapPinMain.offsetHeight / 2);
    }

    fieldAddress.value = locationX + ', ' + locationY;
  }
  setValueAddress();

  function setActiveMode() {
    map.classList.remove('map--faded');
    window.form.active();
    window.mapPins(mapAreaPins);
  }

  mapPinMain.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    if (map.classList.contains('map--faded')) {
      setActiveMode();
    }

    var dragged = false;

    var mapPinMainCoords = window.tools.getCoordsWithScrolling(mapPinMain);
    var shift = {
      x: evt.pageX - mapPinMainCoords.left,
      y: evt.pageY - mapPinMainCoords.top
    };

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();
      dragged = true;

      var newCoords = {
        x: moveEvt.pageX - shift.x,
        y: moveEvt.pageY - shift.y
      };

      if (newCoords.x < mapMainPinLimits.left) {
        newCoords.x = mapMainPinLimits.left;
      }
      if (newCoords.x > mapMainPinLimits.right) {
        newCoords.x = mapMainPinLimits.right;
      }
      if (newCoords.y < mapMainPinLimits.top) {
        newCoords.y = mapMainPinLimits.top;
      }
      if (newCoords.y > mapMainPinLimits.bottom) {
        newCoords.y = mapMainPinLimits.bottom;
      }

      mapPinMain.style.left = newCoords.x - mapAreaPinsCoords.left + 'px';
      mapPinMain.style.top = newCoords.y - mapAreaPinsCoords.top + 'px';

      setValueAddress();
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);

      if (dragged) {
        var onClickPreventDefault = function (evt) {
          evt.preventDefault();
          mapPinMain.removeEventListener('click', onClickPreventDefault);
        };
        mapPinMain.addEventListener('click', onClickPreventDefault);
      }
      setValueAddress();
    };
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });
})();
