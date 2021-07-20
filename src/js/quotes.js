export default function quotes() {
  if (window.matchMedia("(min-width: 1024px)").matches) {
    let $container = $('.quotes');
    let $list = $container.find('.quotes__list');
    let $items = $container.find('.quotes__item');
    let $prev = $container.find('.quotes__prev');
    let $next = $container.find('.quotes__next');
    let currentItem = 0;
    let maxIndex = $items.length - 1;
    $items.hide();
    $items.eq(0).show();

    let showNext = () => {
      let nextItem = currentItem + 1 <= maxIndex ? currentItem + 1 : 0;
      $items.eq(currentItem).fadeOut(200, 0).hide(function () {
        $items.eq(nextItem).fadeIn(200, 0).show();
      });

      currentItem = nextItem;
    }

    let showPrev = () => {
      let nextItem = currentItem - 1 >= 0 ? currentItem - 1 : maxIndex;
      $items.eq(currentItem).fadeOut(200, 0).hide(function () {
        $items.eq(nextItem).fadeIn(200, 0).show();
      });

      currentItem = nextItem;
    }

    $prev.on('click', function () {
      showPrev();
    })

    $next.on('click', function () {
      showNext();
    })
  }
}