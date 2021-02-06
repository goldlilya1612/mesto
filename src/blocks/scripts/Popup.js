export default class Popup {
    constructor({ popupSelector }) {
        this._popupSelector = popupSelector;
        //this._func = func;
    }

    //открытие попапа
    open() {
        document.querySelector(this._popupSelector).classList.add('popup_opened');
        document.addEventListener('keydown', (evt) => this._handleEscClose(evt));
        document.addEventListener('mousedown', (evt) => this._handleOverlayClose(evt));
    }

    //закрытие попапа
    close() {
        document.querySelector(this._popupSelector).classList.remove('popup_opened');
        document.removeEventListener('keydown', (evt) => this._handleEscClose(evt));
        document.removeEventListener('mousedown', (evt) => this._handleOverlayClose(evt));
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
        //document.querySelector(this._popupSelector).addEventListener('submit', this._func);

        const button = document
            .querySelector(this._popupSelector)
            .querySelector('.popup__close-button');

        //Закрытие на "крестик"
        button.addEventListener('click', () => this.close());
    }
}