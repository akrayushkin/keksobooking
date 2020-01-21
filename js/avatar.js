'use strict';
(function () {
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

  var avatarChooser = document.querySelector('.ad-form__field input[type=file]');
  var avatarPreview = document.querySelector('.ad-form-header__preview img');

  var photoContainer = document.querySelector('.ad-form__photo-container');
  var photoChooser = photoContainer.querySelector('.ad-form__upload input[type=file]');
  var photoPreview = photoContainer.querySelector('.ad-form__photo');


  var downloadfile = function (chooser, preview) {
    var file = chooser.files[0];
    var fileName = file.name.toLowerCase();

    var matches = FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });

    if (matches) {
      var reader = new FileReader();

      reader.addEventListener('load', function () {
        preview.src = reader.result;
      });

      reader.readAsDataURL(file);
    }
  };

  avatarChooser.addEventListener('change', function () {
    downloadfile(avatarChooser, avatarPreview);
  });
  photoChooser.addEventListener('change', function () {
    var imgPreview;
    if (!photoPreview.firstChild) {
      var img = document.createElement('img');
      img.style.width = '100%';
      photoPreview.style.display = 'flex';
      photoPreview.style.alignItems = 'center';
      photoPreview.style.justifyContent = 'center';
      imgPreview = photoPreview.appendChild(img);
    } else {
      photoPreview = photoPreview.cloneNode(true);
      photoContainer.appendChild(photoPreview);
      imgPreview = photoPreview.firstChild;
    }

    downloadfile(photoChooser, imgPreview);
  });
})();
