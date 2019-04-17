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

var similarAdTemplate = document.querySelector('template')
.content
.querySelector('.map__card');

var renderAd = function (ad) {
  var adElement = similarAdTemplate.cloneNode(true);

  adElement.querySelector('.popup__avatar').src = ad.author.avatar;
  adElement.querySelector('.popup__title').textContent = ad.offer.title;
  adElement.querySelector('.popup__text--address').textContent = ad.offer.address;
  adElement.querySelector('.popup__text--price').innerHTML = ad.offer.price + ' &#x20bd / ночь';
  adElement.querySelector('.popup__type').textContent = ad.offer.type;
  var textRooms = 'комнат';
  if (ad.offer.rooms % 10 === 1 && ad.offer.rooms % 100 !== 11) {
    textRooms = 'комната';
  } else if (ad.offer.rooms % 10 > 1 && ad.offer.rooms % 10 < 5 && (ad.offer.rooms % 100 < 11 || ad.offer.rooms % 100 > 19)) {
    textRooms = 'комнаты';
  }
  var textGuests = 'гостей';
  if (ad.offer.guests % 10 === 1 && ad.offer.guests % 100 !== 11) {
    textGuests = 'гостя';
  }
  adElement.querySelector('.popup__text--capacity').textContent = ad.offer.rooms + ' ' + textRooms + ' для ' + ad.offer.guests + ' ' + textGuests;
  adElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + ad.offer.checkin + ', выезд до' + ad.offer.checkout;

  var featuresList = adElement.querySelector('.popup__features');
  while (featuresList.lastChild) {
    featuresList.removeChild(featuresList.lastChild);
  }
  for (var i = 0; i < ad.offer.features.length; i++) {
    var li = document.createElement('li');
    li.classList.add('popup__feature');
    li.classList.add('popup__feature--' + ad.offer.features[i]);
    featuresList.appendChild(li);
  }

  adElement.querySelector('.popup__description').textContent = ad.offer.description;

  adElement.querySelector('.popup__photo').src = ad.offer.photos[0];
  for (i = 1; i < ad.offer.photos.length; i++) {
    var adPhoto = adElement.querySelector('.popup__photo').cloneNode();
    adPhoto.src = ad.offer.photos[i];
    adElement.querySelector('.popup__photos').appendChild(adPhoto);
  }

  return adElement;
};

map.insertBefore(renderAd(ads[0]), map.querySelector('.map__filters-container'));
