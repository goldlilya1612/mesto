export default class Popup {
    constructor({ popupSelector }) {
        this._popupSelector = popupSelector;
        this._popup = document.querySelector(this._popupSelector);
        this._handleEscClose = this._handleEscClose.bind(this);
        this._handleOverlayClose = this._handleOverlayClose.bind(this)
    }

    //открытие попапа
    open() {
        this._popup.classList.add('popup_opened');
        document.addEventListener('keydown', this._handleEscClose);
        this._popup.addEventListener('mousedown', this._handleOverlayClose);
    }

    //закрытие попапа
    close() {
        this._popup.classList.remove('popup_opened');
        document.removeEventListener('keydown', this._handleEscClose);
        this._popup.removeEventListener('mousedown', this._handleOverlayClose);
    }

    // Закрытие на кнопку esc
    _handleEscClose(evt) {
        if (evt.keyCode === 27) {
            this.close();
        }
    }

    // Закрытие по оверлею
    _handleOverlayClose(evt) {
        if (evt.target.classList.contains('popup_opened')) {
            this.close();
        }
    }

    setEventListeners() {
        const button = this._popup.querySelector('.popup__close-button');

        //Закрытие на "крестик"
        button.addEventListener('click', () => this.close());
    }

}