'use strict';
(function () {
  var QUANTITY_AD = 8;
  window.backend.load(window.handler.success, window.handler.error);

  window.handler = {
    success: function (wizards) {
      var fragment = document.createDocumentFragment();

      for (var i = 0; i < QUANTITY_WIZARDS; i++) {
        fragment.appendChild(renderWizard(wizards[i]));
      }
      similarListElement.appendChild(fragment);

      userDialog.querySelector('.setup-similar').classList.remove('hidden');
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
      userDialog.insertAdjacentElement('afterbegin', node);
    }
  };

  function createSimilarAd(quantity) {
    var adArray = [];

    for (var i = 0; i < quantity; i++) {
      var counter = i + 1;
      if (counter < 10) {
        counter = '0' + counter;
      }

      };
      adArray.push(ad);
    }
    return adArray;
  }

  window.mapData = createSimilarAd(QUANTITY_AD);
})();
