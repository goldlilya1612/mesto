const validationConfig = {
    formSelector: '.popup__form',
    inputSelector: '.popup__field',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_invalid',
    inputErrorClass: 'popup__field_invalid',
    errorClass: 'error'
};

// отображение ошибки
function showError(form, input, config) {
    const error = form.querySelector(`#${input.id}-error`);
    error.textContent = input.validationMessage;
    input.classList.add(config.inputErrorClass);
}

// скрытие ошибки
function hideError(form, input, config) {
    const error = form.querySelector(`#${input.id}-error`);
    error.textContent = "";
    input.classList.remove(config.inputErrorClass);
}

//проверка валидности
function checkInputValidity(form, input, config) {
    if (input.validity.valid) {
        hideError(form, input, config);
    } else {
        showError(form, input, config);
    }
}

//блокировка-разблокировка кнопки
function setButtonState(button, isActive, config) {
    if (isActive) {
        button.classList.remove(config.inactiveButtonClass)
        button.disabled = false;
    } else {
        button.classList.add(config.inactiveButtonClass)
        button.disabled = true;
    }
}


function setEventListener(form, config) {
    const inputList = form.querySelectorAll(config.inputSelector);
    const buttonNode = form.querySelector(config.submitButtonSelector);

    inputList.forEach(input => {
        input.addEventListener('input', (evt) => {
            checkInputValidity(form, input, config);
            setButtonState(buttonNode, form.checkValidity(), config);
        })
    })
}

//поиск нужной формы и кнопки
function enableValidation(config) {
    const forms = document.querySelectorAll(config.formSelector);
    forms.forEach(form => {
        setEventListener(form, config);

        form.addEventListener('submit', evt => {
            evt.preventDefault();
        })

        const buttonNode = form.querySelector(config.submitButtonSelector);
        setButtonState(buttonNode, form.checkValidity(), config);
    });
}

enableValidation(validationConfig);