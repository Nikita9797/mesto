export class Section {
  constructor({ items, renderer }, containerSelector) {
    this.items = items;
    this._renderer = renderer;

    this._container = document.querySelector(containerSelector);
  }

  addItem(element) {
    this._container.prepend(element);
  }

  renderItems() {
    this.items.reverse().forEach((item) => {
      this._renderer(item);
    });
  }
}
