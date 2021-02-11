import Popup from './Popup.js'

export default class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
    }

    open(item) {
        const image = document.querySelector('.popup-photo__image');
        const heading = document.querySelector('.popup-photo__heading');
        super.open();
        image.src = item.link;
        image.setAttribute("alt", item.name);
        heading.textContent = item.name;
    }

}