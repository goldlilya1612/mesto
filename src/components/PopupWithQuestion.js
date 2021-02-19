import Popup from './Popup.js'

export default class PopupWitQuestion extends Popup {
    constructor({ popupSelector }) {
        super({ popupSelector })
        this._popupRemoveButton = document.querySelector('.popup__yes-button');
    }

    setEventListeners(removeCard) {
        this._removeCard = removeCard;
        super.setEventListeners();
        this._popupRemoveButton.addEventListener('click', this._removeCard);
    }

    close() {
        super.close();
        this._popupRemoveButton.removeEventListener('click', this._removeCard);
    }
}