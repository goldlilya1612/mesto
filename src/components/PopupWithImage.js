import Popup from './Popup.js'

export default class PopupWithImage extends Popup {
    constructor({ popupSelector }) {
        super({ popupSelector });
        this._image = document.querySelector(popupSelector).querySelector('.popup-photo__image');
        this._heading = document.querySelector(popupSelector).querySelector('.popup-photo__heading');
    }

    open(item) {
        super.open();
        this._image.src = item.link;
        this._image.setAttribute("alt", item.name);
        this._heading.textContent = item.name;
    }

}