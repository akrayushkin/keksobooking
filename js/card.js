'use strict';
(function () {
  var map = document.querySelector('.map');

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

  var ESC_KEYCODE = 27;
  var openPopupEscPress = function (evt) {
    if (evt.keyCode === ESC_KEYCODE) {
      closeCardAd();
    }
  };

  function closeCardAd() {
    var popupCardAd = map.querySelector('.map__card.popup');
    if (popupCardAd) {
      popupCardAd.remove();
    }
    document.removeEventListener('keydown', openPopupEscPress);
  }

  window.card = function (num) {
    closeCardAd();
    map.insertBefore(renderAd(window.mapData[num]), map.querySelector('.map__filters-container'));
    map.querySelector('.popup__close').addEventListener('click', closeCardAd);
    document.addEventListener('keydown', openPopupEscPress);
  };

})();
