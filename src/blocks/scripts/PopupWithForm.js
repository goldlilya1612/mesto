import Popup from './Popup.js'

export default class PopupWithForm extends Popup {
    constructor({ popupSelector, submitForm }) {
        super({ popupSelector });
        this._submitForm = submitForm;
        this._form = document.querySelector(this._popupSelector).querySelector('.popup__form');

    }


    _getInputValues() {
        const inputList = this._form.querySelectorAll('.popup__field');
        this._formValues = {};
        inputList.forEach(input => {
            this._formValues[input.name] = input.value;
        })

        return this._formValues
    }


    close() {
        super.close()
        this._form.reset();
    }

    setEventListeners() {
        this._form.addEventListener('submit', (event) => {
            event.preventDefault();
            this._submitForm(this._getInputValues());
            this.close();
        });
        super.setEventListeners()
    }
}