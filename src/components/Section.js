export default class Section {
    constructor({ items, renderer }, containerSelector) {
        this._renderedItems = items;
        this._renderer = renderer;
        this._container = document.querySelector(containerSelector);
    }

    renderItems() {
        this._renderedItems.forEach(item => {
            this._renderer(item);
        });
    }

    renderNewItem() {
        this._renderer(this._renderedItems);
    }

    addItem(element) {
        this._container.append(element)
    }

    addNewItem(element) {
        this._container.prepend(element)
    }
}