export default class FormValidator {
    constructor(form, config) {
        this._formSelector = config.formSelector;
        this._inputSelector = config.inputSelector;
        this._submitButtonSelector = config.submitButtonSelector;
        this._inactiveButtonClass = config.inactiveButtonClass;
        this._inputErrorClass = config.inputErrorClass;
        this._errorClass = config.errorClass;
        this._form = form;

        this._inputList = this._form.querySelectorAll(this._inputSelector);
        this._button = this._form.querySelector(this._submitButtonSelector);
    }

    //проверка валидности формы
    enableValidation() {
        this._setEventListeners();
    }

    _setEventListeners() {
        this._inputList.forEach(input => {
            input.addEventListener('input', () => {
                this._checkInputValidity(input);
                this.setButtonState(this._form.checkValidity());
            })
        });

        this._form.addEventListener('submit', evt => {
            evt.preventDefault();
        });
    }

    //проверка валидности полей
    _checkInputValidity(input) {
        if (input.validity.valid) {
            this._hideError(input);
        } else {
            this._showError(input);
        }
    }

    // отображение ошибки
    _showError(input) {
        const error = this._form.querySelector(`#${input.id}-error`);
        error.textContent = input.validationMessage;
        input.classList.add(this._inputErrorClass);
    }

    // скрытие ошибки
    _hideError(input) {
        const error = this._form.querySelector(`#${input.id}-error`);
        error.textContent = "";
        input.classList.remove(this._inputErrorClass);
    }

    //блокировка-разблокировка кнопки
    setButtonState(isActive) {
        if (isActive) {
            this._button.classList.remove(this._inactiveButtonClass);
            this._button.disabled = false;
        } else {
            this._button.classList.add(this._inactiveButtonClass);
            this._button.disabled = true;
        }
    }

    removeError() {
        this._inputList.forEach(input => {
            this._hideError(input);
        });
    }

}