export const validationConfig = {
    formSelector: '.popup__form',
    inputSelector: '.popup__field',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_invalid',
    inputErrorClass: 'popup__field_invalid',
    errorClass: 'error'
};

const forms = document.querySelectorAll(validationConfig.formSelector);
forms.forEach(form => {
    form.addEventListener('submit', evt => {
        evt.preventDefault();
    });
});

// отображение ошибки
export function showError(form, input, config) {
    const error = form.querySelector(`#${input.id}-error`);
    error.textContent = input.validationMessage;
    input.classList.add(config.inputErrorClass);
}

// скрытие ошибки
export function hideError(form, input, config) {
    const error = form.querySelector(`#${input.id}-error`);
    error.textContent = "";
    input.classList.remove(config.inputErrorClass);
}