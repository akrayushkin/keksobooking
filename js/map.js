'use strict';
var map = document.querySelector('.map');
var mapPinMain = map.querySelector('.map__pin--main');
var widthMap = map.clientWidth;
var mapPins = map.querySelector('.map__pins');


var QUANTITY_AD = 8;
var TITLE = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
var TYPE = ['palace', 'flat', 'house', 'bungalo'];
var CHECKIN = ['12:00', '13:00', '14:00'];
var CHECKOUT = ['12:00', '13:00', '14:00'];
var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getArrRandom(array) {
  var arrCopy = array.slice();

  function compareRandom(a, b) {
    return Math.random() - 0.5;
  }

  arrCopy.sort(compareRandom);
  return arrCopy;
}

function getRandomStringFromArray(array) {
  var arrCopy = array.slice();
  var arrRand = [];

  for (var i = 0; i < arrCopy.length; i++) {
    var flag = getRandomInt(0, 1);
    if (flag) {
      arrRand.push(arrCopy[i]);
    }
  }

  return arrRand;
}

function createSimilarAd(quantity) {
  var adArray = [];
  var TITLE_RAND = getArrRandom(TITLE);

  for (var i = 0; i < quantity; i++) {
    var counter = i + 1;
    if (counter < 10) {
      counter = '0' + counter;
    }

    var title = TITLE_RAND[i];
    if (i >= TITLE_RAND.length) {
      title = TITLE_RAND[getRandomInt(0, TITLE_RAND.length - 1)];
    }

    var ad = {
      author: {
        avatar: 'img/avatars/user' + counter + '.png'
      },
      offer: {
        title: title,
        get address() {
          return ad.location.x + ', ' + ad.location.y;
        },
        price: getRandomInt(1000, 1000000),
        type: TYPE[getRandomInt(0, TYPE.length - 1)],
        rooms: getRandomInt(1, 5),
        guests: getRandomInt(1, 100),
        checkin: CHECKIN[getRandomInt(0, CHECKIN.length - 1)],
        checkout: CHECKOUT[getRandomInt(0, CHECKOUT.length - 1)],
        features: getRandomStringFromArray(FEATURES),
        description: '',
        photos: getArrRandom(PHOTOS)
      },
      location: {
        x: getRandomInt(20, widthMap - 20),
        y: getRandomInt(130, 630)
      }
    };
    adArray.push(ad);
  }
  return adArray;
}

var ads = createSimilarAd(QUANTITY_AD);

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

var fillingMap = function (mapPinList) {
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < ads.length; i++) {
    fragment.appendChild(renderMapPin(ads[i]));
  }

  mapPinList.appendChild(fragment);
};

fillingMap(mapPins);
