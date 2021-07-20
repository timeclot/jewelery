import Modal from './modal.js';
let pictures = [
  'img/categories-wedding-rings.png',
  'img/categories-engagement-rings.png',
  'img/categories-womans-rings.png',
]

let currentSrc = 0;


export default function quickview() {
  let $links = $('.catalog__link');
  let $discountLinks = $('.card-discount__btn');
  let modal = new Modal();
  let $template = $(`<div>${getElement()}</div>`);

  $links.on('click', (evt) => {
    evt.preventDefault();
    modal.show($('body'), $template.html());
    sliderBoxInit();
  });

  $discountLinks.on('click', (evt) => {
    evt.preventDefault();
    modal.show($('body'), $template.html());
    sliderBoxInit();
  });
}

function sliderBoxInit() {
  $('.sliderbox__miniature img').on('click', (evt) => {
    let src = $(evt.currentTarget).attr('src');
    currentSrc = pictures.indexOf(src);
    $('.sliderbox__picture img').attr('src', src);
  });

  $('.sliderbox__prev').on('click', (evt) => {
    currentSrc--;
    if (currentSrc < 0) {
      currentSrc = pictures.length - 1;
    }
    $('.sliderbox__picture img').attr('src', pictures[currentSrc]);
  });

  $('.sliderbox__next').on('click', (evt) => {
    currentSrc++;
    if (currentSrc >= pictures.length) {
      currentSrc = 0;
    }
    $('.sliderbox__picture img').attr('src', pictures[currentSrc]);
  })

}

function renderMiniatures() {
  return pictures.map((src) => (
    `<div class="sliderbox__miniature">
      <img src="${src}" alt="" width="85">
    </div>`
  )).join('');
}

function getElement() {
  return (
    `<div class="quickview">
      <div class="quickview__sliderbox sliderbox">
      <div class="sliderbox__picture">
        <img src="${pictures[currentSrc]}" alt="" width="360">
      </div>
      <div class="sliderbox__list">
        ${renderMiniatures()}
      </div>
      <div>
        <button class="sliderbox__control sliderbox__prev btn icon icon_fill-arrow" type="button"></button>
        <button class="sliderbox__control sliderbox__next btn icon icon_fill-arrow" type="button"></button>
      </div>
    </div>
    <div class="quickview__info">
      <h3 class="quickview__title">Помолвочное кольцо</h3>
      <div class="quickview__vendorcode">Артикул: 481516</div>
      <p class="quickview__descriptin">
        Гладкая шинка кольца, тонкие ажурные завитки
        и сверкающие вставки во главе с одним
        большим драгоценным камнем  не оставят избранницу равнодушной.
      </p>
      <form class="quickview__form">
        <div class="quickview__parameters">
          <div>Цвет золота: <span>белый</span></div>
          <div>Камень: <span>бриллиант</span></div>
        </div>
        <div class="quickview__filter">
          <div>Выберите пробу: <span>585 750</span></div>
          <div>Выберите размер: <span>16 16,5 17 18</span></div>
        </div>
        <div class="quickview__footer">
          <div class="quickview__price">3 000 р*</div>
          <p class="quickview__note">*без учёта стоимости материалов</p>
          <button class="quickview__btn btn btn_primary">В корзину</button>
        </div>
      </form>
    </div>
  </div>
    `
  )
}