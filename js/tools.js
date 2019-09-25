'use strict';
(function () {
  window.tools = {
    getRandomInt: function (min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    },

    getArrRandomSort: function (array) {
      var arrCopy = array.slice();
      function compareRandom(a, b) {
        return Math.random() - 0.5;
      }
      arrCopy.sort(compareRandom);
      return arrCopy;
    },

    getRandomStringFromArray: function (array) {
      var arrCopy = array.slice();
      var arrRand = [];
      var that = this;
      for (var i = 0; i < arrCopy.length; i++) {
        var flag = that.getRandomInt(0, 1);
        if (flag) {
          arrRand.push(arrCopy[i]);
        }
      }
      return arrRand;
    },

    setAttributeDisabled: function (elements) {
      for (var i = 0; i < elements.length; i++) {
        if (!elements[i].elements.address && elements[i].disabled) {
          elements[i].disabled = false;
        } else {
          elements[i].disabled = true;
        }
      }
    },

    getCoordsWithScrolling: function (elem) {
      var box = elem.getBoundingClientRect();
      var top = box.top + window.pageYOffset;
      var left = box.left + window.pageXOffset;
      return {
        top: top,
        left: left
      };
    },

    deleteElement: function (elem) {
      var deletedElem = document.querySelector(elem);
      if (deletedElem) {
        deletedElem.remove();
      }
    }
  };
})();
