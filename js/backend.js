'use strict';

(function () {
  var URL = 'https://js.dump.academy/keksobooking/';

  window.backend = {
    upload: function (data, onLoad, onError) {
      var xhr = new XMLHttpRequest();
      xhr.open('POST', URL);
      xhr.addEventListener('load', function () {
        var error;
        switch (xhr.status) {
          case 200:
            onLoad();
            break;
          case 400:
            error = 'Неверный запрос! ' + 'Статус ответа:' + xhr.status + ' ' + (xhr.statusText || xhr.responseText);
            break;
          case 401:
            error = 'Пользователь не авторизован! ' + 'Статус ответа:' + xhr.status + ' ' + (xhr.statusText || xhr.responseText);
            break;
          case 404:
            error = 'Ничего не найдено! ' + 'Статус ответа:' + xhr.status + ' ' + (xhr.statusText || xhr.responseText);
            break;
          default:
            error = 'Ошибка! ' + 'Статус ответа:' + xhr.status + ' ' + (xhr.statusText || xhr.responseText);
        }
        if (error) {
          onError(error);
        }
      });
      xhr.addEventListener('error', function () {
        onError(new Error('Произошла ошибка соединения! ' + 'Статус ответа:' + xhr.status + ' ' + (xhr.statusText || xhr.responseText)));
      });
      xhr.addEventListener('timeout', function () {
        onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
      });
      xhr.send(data);
    },

    load: function (onLoad, onError) {
      var xhr = new XMLHttpRequest();
      xhr.open('GET', URL + 'data');
      xhr.addEventListener('load', function () {
        var error;
        switch (xhr.status) {
          case 200:
            try {
              onLoad(JSON.parse(xhr.responseText));
            } catch (err) {
              error = 'Ошибка чтения данных! ' + err;
            }
            break;
          case 400:
            error = 'Неверный запрос! ' + 'Статус ответа:' + xhr.status + ' ' + (xhr.statusText || xhr.responseText);
            break;
          case 401:
            error = 'Пользователь не авторизован! ' + 'Статус ответа:' + xhr.status + ' ' + (xhr.statusText || xhr.responseText);
            break;
          case 404:
            error = 'Ничего не найдено! ' + 'Статус ответа:' + xhr.status + ' ' + (xhr.statusText || xhr.responseText);
            break;
          default:
            error = 'Ошибка! ' + 'Статус ответа:' + xhr.status + ' ' + (xhr.statusText || xhr.responseText);
        }
        if (error) {
          onError(error);
        }
      });
      xhr.addEventListener('error', function () {
        onError('Произошла ошибка соединения! ' + 'Статус ответа:' + xhr.status + ' ' + (xhr.statusText || xhr.responseText));
      });
      xhr.addEventListener('timeout', function () {
        onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
      });
      xhr.send();
    }
  };
})();
