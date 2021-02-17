export {
    validationConfig,
    initialCardsContainerSelector,
    editButtonNode,
    addButtonNode,
    saveButton,
    createButton,
    addFormNode,
    editFormNode,
    changeAvatarFormNode,
    nameInput,
    aboutInput,
    profileButtonNode,
    saveButtonOfAvatarPopup
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
const profileButtonNode = document.querySelector('.profile__avatar-button');
const saveButton = document.querySelector('.popup_edit-form').querySelector('.popup__save-button');
const saveButtonOfAvatarPopup = document.querySelector('.popup_change-avatar').querySelector('.popup__save-button');
const createButton = document.querySelector('.popup__create-button');
const addFormNode = document.querySelector('.popup__form_add-form');
const editFormNode = document.querySelector('.popup__form_edit-form');
const changeAvatarFormNode = document.querySelector('.popup__form_change-avatar');