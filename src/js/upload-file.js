import showMessage from './show-message.js'; import Modal from './modal.js';

export default function uploadFile() {
  let $inputs = $('.upload-file__input');
  $inputs.on('change', (evt) => {
    let inputN = evt.currentTarget;
    let fileNameN = $(inputN).siblings('.upload-file__file-name');
    let file = inputN.files[0];
    fileNameN.text('');
    
    if (file) {
      if (!['image/jpeg', 'image/png', 'image/gif', 'image/svg+xml'].includes(file.type)) {
        showMessage('Разрешены только изображения.');
        return;
      }

      if (file.size > 2 * 1024 * 1024) {
        showMessage('Файл должен быть менее 2 МБ.');
        return;
      }

      let textString = `Выбранный файл: ${inputN.value.split('\\').pop()}`;
      fileNameN.text(textString);
    }
  })
}
