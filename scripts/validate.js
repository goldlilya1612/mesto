enableValidation()

// отображение ошибки
function showError(form, input) {
    const error = form.querySelector(`#${input.id}-error`);
    error.textContent = input.validationMessage;
    input.classList.add('popup__field_invalid');
}

// скрытие ошибки
function hideError(form, input) {
    const error = form.querySelector(`#${input.id}-error`);
    error.textContent = "";
    input.classList.remove('popup__field_invalid');
}

//проверка валидности
function checkInputValidity(form, input) {
    if (input.validity.valid) {
        hideError(form, input);
    } else {
        showError(form, input);
    }
}

//блокировка-разблокировка кнопки
function setButtonState(button, isActive) {
    if (isActive) {
        button.classList.remove('popup__save-button_invalid')
        button.disabled = false;
    } else {
        button.classList.add('popup__save-button_invalid')
        button.disabled = true;
    }
}


function setEventListener(form) {
    const inputList = form.querySelectorAll('.popup__field');
    const ButtonNode = form.querySelector('.popup_button');

    inputList.forEach(input => {
        input.addEventListener('input', (evt) => {
            checkInputValidity(form, input);
            setButtonState(ButtonNode, form.checkValidity());
        })
    })
}

//поиск нужной формы и кнопки
function enableValidation() {
    const forms = document.querySelectorAll('.popup__form');
    forms.forEach(form => {
        setEventListener(form);

        form.addEventListener('submit', evt => {
            evt.preventDefault();
        })

        const ButtonNode = form.querySelector('.popup_button');
        setButtonState(ButtonNode, form.checkValidity());
    });
}

//TODO: при первом открытии форма не валидная
//TODO: закрытие через оверлей