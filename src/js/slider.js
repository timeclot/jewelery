export default function slider() {
  const sliderN = $('.slider');
  const wrapperN = $('.slider__wrapper');
  const listN = $('.slider__list');
  const nextN = $('.slider__next');
  const prevN = $('.slider__prev');
  const itemNs = $('.slider__item');
  let itemNumb = 4;
  let step = null;
  const DURATION = 400;
  const INTERVAL = 2000;
  let intervalId = null;
  let isStaticMode = true;

  const setItemNumb = () => {
    if (window.matchMedia("(max-width: 1280px)").matches) {
      itemNumb = 3;
    } else {
      itemNumb = 4;
    }
  }

  const setStep = () => {
    step = (wrapperN.width() / itemNumb);
  }

  const setListWidth = () => {
    const length = itemNs.length;
    const width = step;
    listN.width(length * width);
  }

  const setItemWidth = () => {
    itemNs.each((i, item) => {
      const margin = 10;
      const width = step - margin * 2;
      $(item).css(`margin-left`, margin);
      $(item).css(`margin-right`, margin);
      $(item).css(`width`, width);
    })
  }

  const moveNext = () => {
    if(!listN.is(':animated')) {
      listN.animate({'left': -step}, DURATION, () => {
        listN
          .find('.slider__item:first')
          .appendTo(listN)
          .parent()
          .css({'left': 0});
      });
    }
  }

  const movePrev = () => {
    if(!listN.is(':animated')) {
      listN
        .css({'left': -step})
        .find('.slider__item:last')
        .prependTo(listN)
        .parent()
        .animate({left: 0}, DURATION);
    }
  }

  const stopRotation = () => {
    window.clearInterval(intervalId);
  }

  const runRotation = () => {
    intervalId = window.setInterval(moveNext, INTERVAL);
  }

  const onNextClickHandler = () => {
    moveNext();
  }

  const onPrevClickHandler = () => {
    movePrev();
  }

  const onWrapperMouseoverHandler = () => {
    if (!isStaticMode) {
      stopRotation();
    }
  }

  const onWrapperMouseoutHandler = () => {
    if (!isStaticMode) {
      stopRotation();
      runRotation();
    }
  }

  const sliderInit = () => {
    setItemNumb();
    setStep();
    setItemWidth();
    setListWidth();
  }

  const setRotateMode = () => {
    nextN.on(`click`, onNextClickHandler);
    prevN.on(`click`, onPrevClickHandler);
    wrapperN.on('mouseover', onWrapperMouseoverHandler);
    wrapperN.on(`mouseout`, onWrapperMouseoutHandler);
    sliderInit();
    stopRotation();
    runRotation();
    sliderN.removeClass('slider_static');
    isStaticMode = false;
  }

  const setStaticMode = () => {
    window.clearInterval(intervalId);
    sliderN.addClass('slider_static');
    isStaticMode = true;
  }


  $(window).on(`resize`, () => {
    if (window.matchMedia("(min-width: 1024px)").matches) {
      setRotateMode();
    } else {
      setStaticMode();
    }
  });

  if (window.matchMedia("(min-width: 1024px)").matches) {
    setRotateMode();
  }
}
