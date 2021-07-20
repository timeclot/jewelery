import Modal from './modal.js';

export default function showMessage(messageText) {
  let modal = new Modal();
  let $text = $(
    `<p class="modal__message">
      ${messageText}
    </p>`
  );

  modal.show($('body'), $text);
  let timerId = setTimeout(() => {
    clearInterval(timerId);
    modal.hide();
  }, 5000)
}
