export default class Modal {
  constructor() {
    this.$modal = null;
    this.$content = null;
    this.$close = null;
    this.$overlay = null;
  }

  getElement() {
    return $(
      `<div class="modal">
        <button class="modal__overlay btn">
          <span class="noscreen">Закрыть</span>
        </button>
        <div class="modal__container container">
          <button class="modal__close btn icon_close">
            <span class="noscreen">Закрыть</span>
          </button>
          <div class="modal__content">
          </div>
        </div>
      </div>`
    );
  }

  init() {
    this.$modal = this.getElement();
    this.$content = this.$modal.find('.modal__content');
    this.$close = this.$modal.find('.modal__close');
    this.$overlay = this.$modal.find('.modal__overlay');
  }

  watchEvents() {
    this.$close.on('click', () => this.onClickCloseHandler());
    this.$overlay.on('click', () => this.onClickOverlayHandler());
  }

  onClickCloseHandler() {
    this.hide();
  }

  onClickOverlayHandler() {
    this.hide();
  }

  show($parent, content) {
    this.hide();
    this.init();
    this.$content.append(content);
    this.watchEvents();
    $parent.append(this.$modal);
  }

  hide() {
    if (this.$modal !== null) {
      this.$modal.detach();
    }
  }
}
