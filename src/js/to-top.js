export default function toTop() {
  const toTopN = $('.to-top');
  toTopN.on('click', (evt) => {
    evt.preventDefault();
    $('body,html').animate({scrollTop: 0}, 400);
  });

  $(window).scroll((evt) => {
    const top = $(window).scrollTop();
    if (top >= 600){
      toTopN.addClass('to-top_visible');
    } else {
      toTopN.removeClass('to-top_visible');
    }
  });
}
