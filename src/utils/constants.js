export {
    validationConfig,
    initialCardsContainerSelector,
    editButtonNode,
    addButtonNode,
    saveButton,
    createButton,
    addFormNode,
    editFormNode,
    nameInput,
    aboutInput,
}

const nameInput = document.querySelector('.popup__field_name');
const aboutInput = document.querySelector('.popup__field_about');

const validationConfig = {
    formSelector: '.popup__form',
    inputSelector: '.popup__field',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_invalid',
    inputErrorClass: 'popup__field_invalid',
    errorClass: 'error'
};



const initialCardsContainerSelector = '.elements';

const editButtonNode = document.querySelector('.profile__edit-button');
const addButtonNode = document.querySelector('.profile__add-button');
const saveButton = document.querySelector('.popup__save-button');
const createButton = document.querySelector('.popup__create-button');

const addFormNode = document.querySelector('.popup__form_add-form');
const editFormNode = document.querySelector('.popup__form_edit-form');