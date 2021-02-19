export default class Section {
    constructor({ renderer }, containerSelector) {
        this._renderer = renderer;
        this._container = document.querySelector(containerSelector);
    }

    renderItems(items) {
        items.forEach(item => {
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