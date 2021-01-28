import { hideError, showError } from './validate.js'

export default class FormValidator {
    constructor(form, config) {
        this._formSelector = config.formSelector;
        this._inputSelector = config.inputSelector;
        this._submitButtonSelector = config.submitButtonSelector;
        this._inactiveButtonClass = config.inactiveButtonClass;
        this._inputErrorClass = config.inputErrorClass;
        this._errorClass = config.errorClass;
        this._form = form;
    }

    //проверка валидности формы
    enableValidation() {
        this._setEventListeners();
    }

    _setEventListeners() {
        const inputList = this._form.querySelectorAll(this._inputSelector);
        const buttonNode = this._form.querySelector(this._submitButtonSelector);

        inputList.forEach(input => {
            input.addEventListener('input', () => {
                this._checkInputValidity(this._form, input, this);
                this.setButtonState(buttonNode, this._form.checkValidity());
            })
        });
    }

    //проверка валидности полей
    _checkInputValidity(form, input, config) {
        if (input.validity.valid) {
            hideError(form, input, config);
        } else {
            showError(form, input, config);
        }
    }

    //блокировка-разблокировка кнопки
    setButtonState(button, isActive) {
        if (isActive) {
            button.classList.remove(this._inactiveButtonClass);
            button.disabled = false;
        } else {
            button.classList.add(this._inactiveButtonClass);
            button.disabled = true;
        }
    }

}