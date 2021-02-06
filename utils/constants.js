export {
    validationConfig,
    profileNameNode,
    profileTextNode,
    initialCards,
    initialCardsContainerSelector,
    editButtonNode,
    addButtonNode,
    saveButton,
    createButton,
    addFormNode,
    editFormNode
}

const validationConfig = {
    formSelector: '.popup__form',
    inputSelector: '.popup__field',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_invalid',
    inputErrorClass: 'popup__field_invalid',
    errorClass: 'error'
};

const initialCards = [{
        name: 'Архыз',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
        name: 'Челябинская область',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
        name: 'Иваново',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
        name: 'Камчатка',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
        name: 'Холмогорский район',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
        name: 'Байкал',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
];

const profileNameNode = document.querySelector('.profile__name');
const profileTextNode = document.querySelector('.profile__text');

const initialCardsContainerSelector = '.elements';

const editButtonNode = document.querySelector('.profile__edit-button');
const addButtonNode = document.querySelector('.profile__add-button');
const saveButton = document.querySelector('.popup__save-button');
const createButton = document.querySelector('.popup__create-button');

const addFormNode = document.querySelector('.popup__form_add-form');
const editFormNode = document.querySelector('.popup__form_edit-form');