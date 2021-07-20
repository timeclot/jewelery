export default function toggleMenu() {
  const menuN = $('.header__mibile-menu');
  const openBtnN = $('.header__open-menu');
  const closeBtnN = $('.header__close-menu');

  openBtnN.on('click', () => {
    menuN.addClass('header__mibile-menu_visible');
    console.log(menuN);
  })
  closeBtnN.on('click', () => {
    menuN.removeClass('header__mibile-menu_visible');
    console.log('NO banana');
  })
}
