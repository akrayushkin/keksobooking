'use strict';
(function () {
  var map = document.querySelector('.map');
  var mapAreaPins = map.querySelector('.map__pins');
  var MAP_INACCESSIBLE_AREA = 110;

  var mapPinTemplate = document.querySelector('template')
  .content
  .querySelector('.map__pin');
  var mapPinTemp = mapPinTemplate.cloneNode(true);
  var mapPin = mapAreaPins.appendChild(mapPinTemp);
  mapPin.classList.add('visually-hidden');
  var pinWidth = parseInt(window.getComputedStyle(mapPin).width, 10);
  var pinHeight = parseInt(window.getComputedStyle(mapPin).height, 10);
  mapPin.remove();

  var pinLimits = {
    top: MAP_INACCESSIBLE_AREA,
    right: mapAreaPins.getBoundingClientRect().width - pinWidth,
    bottom: mapAreaPins.getBoundingClientRect().height - pinHeight,
    left: 0,
  };

  var QUANTITY_AD = 8;
  var TITLE = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
  var TYPE = ['palace', 'flat', 'house', 'bungalo'];
  var CHECKIN = ['12:00', '13:00', '14:00'];
  var CHECKOUT = ['12:00', '13:00', '14:00'];
  var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
  var PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];

  function createSimilarAd(quantity) {
    var adArray = [];
    var TITLE_RAND = window.tools.getArrRandomSort(TITLE);

    for (var i = 0; i < quantity; i++) {
      var counter = i + 1;
      if (counter < 10) {
        counter = '0' + counter;
      }

      var title = TITLE_RAND[i];
      if (i >= TITLE_RAND.length) {
        title = TITLE_RAND[window.tools.getRandomInt(0, TITLE_RAND.length - 1)];
      }

      var coordinate = {
        x: window.tools.getRandomInt(pinLimits.left, pinLimits.right),
        y: window.tools.getRandomInt(pinLimits.top, pinLimits.bottom)
      };

      var ad = {
        author: {
          avatar: 'img/avatars/user' + counter + '.png'
        },
        offer: {
          title: title,
          address: coordinate.x + pinWidth / 2 + ', ' + (coordinate.y + pinHeight),
          price: window.tools.getRandomInt(1000, 1000000),
          type: TYPE[window.tools.getRandomInt(0, TYPE.length - 1)],
          rooms: window.tools.getRandomInt(1, 5),
          guests: window.tools.getRandomInt(1, 100),
          checkin: CHECKIN[window.tools.getRandomInt(0, CHECKIN.length - 1)],
          checkout: CHECKOUT[window.tools.getRandomInt(0, CHECKOUT.length - 1)],
          features: window.tools.getRandomStringFromArray(FEATURES),
          description: '',
          photos: window.tools.getArrRandomSort(PHOTOS)
        },
        location: {
          x: coordinate.x,
          y: coordinate.y
        }
      };
      adArray.push(ad);
    }
    return adArray;
  }

  window.mapData = createSimilarAd(QUANTITY_AD);
})();
