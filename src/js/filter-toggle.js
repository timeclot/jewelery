export default function filterToggle() {
  let filterN = $('.catalog__filter');
  let showFilterN = $('.catalog__show-filter');
  let closeFilterN = $('.catalog__hide-filter');

  showFilterN.on('click', () => {
    filterN.addClass('catalog__filter_visible');
  })
  closeFilterN.on('click', () => {
    filterN.removeClass('catalog__filter_visible');
  })
}
