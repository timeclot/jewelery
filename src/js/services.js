import Modal from './modal.js';
import { servicesData } from './services-data.js';


export default function services() {
  let modal = new Modal;
  let $links = $('.services__link');
  let currentIndex = 0;
  let maxIndex = $links.length - 1;
  let parm = window.location.href.slice(window.location.href.indexOf('?service')).split(/[&?]{1}[\w\d]+=/);
  if (parm[1] != '' && $.isNumeric(parm[1])) {
    currentIndex = parm[1];
    cardInit(servicesData[currentIndex]);
  }


  function getElement(img, title, description) {
    return $(
      `<div class="service-card">
        <div class="service-card__container">
          <div class="service-card__item1">
            <img src="${img}" width="415" height="510" alt="" class="service-card__picture">
          </div>
          <div class="service-card__item2">
            <h2 class="service-card__title">
              ${title}
            </h2>
            <div class="service-card__description">
              ${description}
            </div>
            <a class="service-card__link btn btn_primary" href="price.html#order-service">
              Оставить заявку
            </a>
          </div>
          <div class="service-card__footer">
            С ценами ювелирной мастерской можно ознакомится <a href="price.html">тут</a>
          </div>
          <button class="btn btn_arrow service-card__prev" type="button">
            <svg width="37" height="38" viewBox="0 1 37 38" fill="none">
              <path
                d="M26.4142 20.5858C27.1953 21.3668 27.1953 22.6332 26.4142 23.4142L13.6863 36.1421C12.9052 36.9232 11.6389 36.9232 10.8579 36.1421C10.0768 35.3611 10.0768 34.0948 10.8579 33.3137L22.1716 22L10.8579 10.6863C10.0768 9.90524 10.0768 8.63891 10.8579 7.85786C11.6389 7.07682 12.9052 7.07682 13.6863 7.85786L26.4142 20.5858ZM24 20L25 20L25 24L24 24L24 20Z"
                fill="currentColor" />
            </svg>
          </button>
          <button class="btn btn_arrow service-card__next" type="button">
            <svg width="37" height="38" viewBox="0 1 37 38" fill="none">
              <path
                d="M26.4142 20.5858C27.1953 21.3668 27.1953 22.6332 26.4142 23.4142L13.6863 36.1421C12.9052 36.9232 11.6389 36.9232 10.8579 36.1421C10.0768 35.3611 10.0768 34.0948 10.8579 33.3137L22.1716 22L10.8579 10.6863C10.0768 9.90524 10.0768 8.63891 10.8579 7.85786C11.6389 7.07682 12.9052 7.07682 13.6863 7.85786L26.4142 20.5858ZM24 20L25 20L25 24L24 24L24 20Z"
                fill="currentColor" />
            </svg>
          </button>
        </div>
      </div>`
    );
  }

  function cardInit(datum) {
    let $card = getElement(datum.img, datum.title, datum.description);
    let $btnPrev = $card.find('.service-card__prev');
    let $btnNext = $card.find('.service-card__next');

    $btnPrev.on('click', (evt) => {
      evt.preventDefault();
      currentIndex = currentIndex - 1 >= 0 ? currentIndex - 1 : maxIndex;
      let href = $links.eq(currentIndex).attr('href');
      cardInit(servicesData[href]);
    })

    $btnNext.on('click', (evt) => {
      evt.preventDefault();
      currentIndex = currentIndex + 1 <= maxIndex ? currentIndex + 1 : 0;
      let href = $links.eq(currentIndex).attr('href');
      cardInit(servicesData[href]);
    })

    modal.show($('body'), $card);
  }

  $links.on('click', (evt) => {
    evt.preventDefault();

    let href = $(evt.currentTarget).attr('href');
    currentIndex = $links.index(evt.currentTarget);
    cardInit(servicesData[href]);
  })
}
