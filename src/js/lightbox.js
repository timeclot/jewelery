import Modal from './modal.js';

export default function lightbox() {
  const picNs = $('.lightbox-pic');
  let modal = new Modal();
  let pictureN = null;

  const onClickPicHandler = (evt) => {
    const src = evt.currentTarget.getAttribute('data-pic');

    if (src) {
      pictureN = `<img class="modal__picture" src="${src}" alt="">`;
      modal.show($('body'), pictureN);
    }
  }

  if (window.matchMedia("(min-width: 1024px)").matches) {
    picNs.on('click', onClickPicHandler);
  }
}
