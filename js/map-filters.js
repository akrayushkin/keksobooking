'use strict';
(function () {
  var filters = document.querySelector('.map__filters');
  var selectors = filters.querySelectorAll('select');
  var features = filters.querySelectorAll('.map__checkbox');

  var filterOptions = function (nameOption, valueOption, data) {
    switch (nameOption) {
      case 'housing-type':
        for (let i = 0; i < data.length; i++) {
          if (data[i].offer.type !== valueOption) {
            data.splice(i, 1);
            i--;
          }
        }
        break;
      case 'housing-price':
        switch (valueOption) {
          case 'low':
            for (let i = 0; i < data.length; i++) {
              if (data[i].offer.price >= 10000) {
                data.splice(i, 1);
                i--;
              }
            }
            break;
          case 'middle':
            for (let i = 0; i < data.length; i++) {
              if (data[i].offer.price < 10000 || data[i].offer.price > 50000) {
                data.splice(i, 1);
                i--;
              }
            }
            break;
          case 'high':
            for (let i = 0; i < data.length; i++) {
              if (data[i].offer.price <= 50000) {
                data.splice(i, 1);
                i--;
              }
            }
            break;
        }
        break;
      case 'housing-rooms':
        for (let i = 0; i < data.length; i++) {
          if (data[i].offer.rooms !== +valueOption) {
            data.splice(i, 1);
            i--;
          }
        }
        break;
      case 'housing-guests':
        for (let i = 0; i < data.length; i++) {
          if (data[i].offer.guests !== +valueOption) {
            data.splice(i, 1);
            i--;
          }
        }
        break;
    }
    return data;
  };

  function contains(arr1, arr2) {
    var result = true;
    arr2.forEach(function (item) {
      for (let i = 0; i <= arr1.length; i++) {
        if (i == arr1.length) {
          return result = false;
        }
        if (item == arr1[i]) break;
      }
    })
    return result;
  };

  var filterFeatures = function (data) {
    var arrayChecked = [];
    for (let i = 0; i < features.length; i++) {
      if (features[i].checked) {
        arrayChecked.push(features[i].value);
      }
    }

    for (let i = 0; i < data.length; i++) {
      if (!contains(data[i].offer.features, arrayChecked)) {
        data.splice(i, 1);
        i--;
      }
    }
    return data;
  }

  window.mapFilters = function () {
    var data = window.mapPins.slice();
    for (let i = 0; i < selectors.length; i++) {
      var selectedOption = selectors[i].options[selectors[i].selectedIndex];
      if (selectedOption.value !== 'any') {
        data = filterOptions(selectors[i].name, selectedOption.value, data);
      }
    }
    filterFeatures(data);
    return data;
  };

  var updateFilter = function () {
    window.render(mapFilters());
  };

  var lastTimeout;
  var debounce = function (delayedFunction) {
    if (lastTimeout) {
      window.clearTimeout(lastTimeout);
    }
    lastTimeout = window.setTimeout(function () {
      delayedFunction();
    }, 500);
  };

  for (let i = 0; i < selectors.length; i++) {
    selectors[i].addEventListener('change', function () {
      debounce(updateFilter);
    });
  }

  for (let i = 0; i < features.length; i++) {
    features[i].addEventListener('click', function () {
      debounce(updateFilter);
    });
  }
})();
