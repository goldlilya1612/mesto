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
        const forms = document.querySelectorAll(this._formSelector);

        inputList.forEach(input => {
            input.addEventListener('input', () => {
                this._checkInputValidity(this._form, input, this);
                this.setButtonState(buttonNode, this._form.checkValidity());
            })
        });

        forms.forEach(form => {
            form.addEventListener('submit', evt => {
                evt.preventDefault();
            });
        });
    }

    //проверка валидности полей
    _checkInputValidity(form, input, config) {
        if (input.validity.valid) {
            this._hideError(form, input, config);
        } else {
            this._showError(form, input, config);
        }
    }

    // отображение ошибки
    _showError(form, input, config) {
        const error = form.querySelector(`#${input.id}-error`);
        error.textContent = input.validationMessage;
        input.classList.add(config.inputErrorClass);
    }

    // скрытие ошибки
    _hideError(form, input, config) {
        const error = form.querySelector(`#${input.id}-error`);
        error.textContent = "";
        input.classList.remove(config.inputErrorClass);
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

    removeError(formElement, form, config) {
        const inputList = formElement.querySelectorAll(config.inputSelector);
        inputList.forEach(input => {
            form._hideError(formElement, input, config);
        });
    }

}