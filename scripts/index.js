import Card from './Card.js';
import FormValidator from './FormValidator.js';
import { validationConfig } from './validate.js';
import { openPopup, closePopup, popupPhotoNode } from './util.js';

const initialCardsContainer = document.querySelector('.elements');
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

const editButtonNode = document.querySelector('.profile__edit-button');
const addButtonNode = document.querySelector('.profile__add-button');
const saveButton = document.querySelector('.popup__save-button');
const createButton = document.querySelector('.popup__create-button');

const popupAddNode = document.querySelector('.popup_add-form');
const popupEditNode = document.querySelector('.popup_edit-form');

const popupCloseButtonEditFormNode = document.querySelector('.popup__close-button_edit-form');
const popupCloseButtonAddFormNode = document.querySelector('.popup__close-button_add-form');
const popupPhotoCloseButtonNode = document.querySelector('.popup-photo__close-button');

const profileNameNode = document.querySelector('.profile__name');
const profileTextNode = document.querySelector('.profile__text');

const fieldNameNode = document.querySelector('.popup__field_name');
const fieldAboutNode = document.querySelector('.popup__field_about');


const inputNameOfPicture = document.querySelector('.popup__field_name-of-picture');
const inputLink = document.querySelector('.popup__field_link');

const forms = document.querySelectorAll(validationConfig.formSelector);

const editForm = new FormValidator(forms[0], validationConfig);
const addForm = new FormValidator(forms[1], validationConfig);

//Добавление первых 6 карточек
initialCards.forEach(item => {
    initialCardsContainer.append(createCard(item));
})

//создание карточки
function createCard(item) {
    const card = new Card(item, '.template');
    const cardElement = card.generateCard();
    return cardElement
}

//проверка валидности форм
editForm.enableValidation();
addForm.enableValidation();


//очистка инпутов
function resetInput(form) {
    form.reset();
}

function handlePopupFormSubmit(event) {
    event.preventDefault();
    profileNameNode.textContent = fieldNameNode.value;
    profileTextNode.textContent = fieldAboutNode.value;
    closePopup(popupEditNode);
}

//добавляем НОВУЮ карточку
function addNewCard(event) {
    event.preventDefault();
    const nameOfPicture = inputNameOfPicture.value;
    const pictureLink = inputLink.value;
    initialCardsContainer.prepend(createCard({ name: nameOfPicture, link: pictureLink }));
    closePopup(popupAddNode);
}

editButtonNode.addEventListener('click', () => {
    openPopup(popupEditNode)
    fieldNameNode.value = profileNameNode.textContent;
    fieldAboutNode.value = profileTextNode.textContent;
    editForm.setButtonState(saveButton, forms[0].checkValidity());
    editForm.removeError(forms[0], editForm, validationConfig);
});

addButtonNode.addEventListener('click', () => {
    openPopup(popupAddNode)
    resetInput(forms[1]);
    addForm.setButtonState(createButton, forms[1].checkValidity());
    addForm.removeError(forms[1], addForm, validationConfig);
});
popupPhotoCloseButtonNode.addEventListener('click', () => closePopup(popupPhotoNode));
popupCloseButtonEditFormNode.addEventListener('click', () => closePopup(popupEditNode));
popupCloseButtonAddFormNode.addEventListener('click', () => closePopup(popupAddNode));
popupEditNode.addEventListener('submit', handlePopupFormSubmit);
popupAddNode.addEventListener('submit', addNewCard);