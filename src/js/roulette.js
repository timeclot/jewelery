export default class Roulette {
  constructor() {
    this.items = [
      {x: 0, y: 0, isActive: true},
      {x: -26, y: 50, isActive: true},
      {x: -39, y: 150, isActive: false},
      {x: -13, y: 190, isActive: false},
      {x: 13, y: 190, isActive: false},
      {x: 39, y: 150, isActive: false},
      {x: 26, y: 50, isActive: true},
    ];

    this.rouletteN = $(`.roulette`);
    this.listN = $(`.roulette__list`);
    this.itemNs = $(`.roulette__item`);
    this.prevN = $(`.roulette__prev`);
    this.nextN = $(`.roulette__next`);
    this.intervalIt = null;
    this.direction = 'next';
    this.INTERVAL = 2600;
    this.isStaticMode = true;

    if (window.matchMedia("(min-width: 1024px)").matches) {
      this.setRotateMode();
    }

    $(window).bind(`resize`, () => this.onResizeHeandler());
  }

  setEvents() {
    this.prevN.on(`click`, () => this.onClickPrevHandler());
    this.nextN.on(`click`, () => this.onClickNextHandler());
    this.rouletteN.on('mouseover', () => this.onMouseoverRouletteHandler());
    this.rouletteN.on('mouseout', () => this.onMouseoutRouletteHandler());
  }

  startRotation() {
    clearInterval(this.intervalId);
    this.intervalId = setInterval(() => {
      this.move();
      this.setPositions();
    }, this.INTERVAL);
  }

  stopRotation() {
    clearInterval(this.intervalId);
  }

  setPositions() {
    const items = this.items;
    const itemNs = this.itemNs;
    const listN = this.listN;
    const itemW = itemNs.width();
    const caruselWidth = listN.width();

    itemNs.each(function (i, item) {
      const x = (items[i]['x'] / 100) * caruselWidth - itemW / 2;
      const y = items[i]['y'];

      $(item).removeClass('roulette__item_active');
      item.style.transform = `translate(${x}px, ${y}px)`;
      if (items[i]['isActive']) {
        $(item).addClass('roulette__item_active');
      }
    });
  }

  setRotateMode() {
    this.rouletteN.removeClass(`roulette_static`);
    this.setPositions();
    this.startRotation();
    this.setEvents();
    this.isStaticMode = false;
  }

  setStaticMode() {
    this.rouletteN.addClass(`roulette_static`);
    this.stopRotation();

    this.itemNs.each((i, item) => {
      item.style.transform = `translate(0px, 0px)`;
      $(item).removeClass('roulette__item_active');
    });
    this.isStaticMode = true;
  }

  move() {
    const direction = this.direction;
    const items = this.items;
    let newItems = [...items];
    if (direction === 'next') {
      newItems.unshift(newItems.pop());
    } else if (direction === 'prev') {
      newItems.push(newItems.shift());
    }

    this.items = newItems;
  }

  onResizeHeandler() {
    if (window.matchMedia("(max-width: 1024px)").matches) {
      this.setStaticMode();
    } else {
      this.setRotateMode();
    }
  }

  onClickPrevHandler() {
    this.direction = 'prev';
    this.move();
    this.setPositions();
  }

  onClickNextHandler() {
    this.direction = 'next';
    this.move();
    this.setPositions();
  }

  onMouseoverRouletteHandler() {
    if(!this.isStaticMode) {
      this.stopRotation();
    }
  }

  onMouseoutRouletteHandler() {
    if(!this.isStaticMode) {
      this.startRotation();
    }
  }
}
