import Card from './Card.js';
import FormValidator from './FormValidator.js';
import { validationConfig } from './validate.js';

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
export const popupPhotoNode = document.querySelector('.popup-photo');

const popupCloseButtonEditFormNode = document.querySelector('.popup__close-button_edit-form');
const popupCloseButtonAddFormNode = document.querySelector('.popup__close-button_add-form');
const popupPhotoCloseButtonNode = document.querySelector('.popup-photo__close-button');

const profileNameNode = document.querySelector('.profile__name');
const profileTextNode = document.querySelector('.profile__text');

const fieldNameNode = document.querySelector('.popup__field_name');
const fieldAboutNode = document.querySelector('.popup__field_about');


const inputNameOfPicture = document.querySelector('.popup__field_name-of-picture');
const inputLink = document.querySelector('.popup__field_link');


//Добавление первых 6 карточек
initialCards.forEach(item => {
    const card = new Card(item);
    const cardElement = card.generateCard();
    initialCardsContainer.append(cardElement);
})


//проверка валидности формы
const forms = document.querySelectorAll(validationConfig.formSelector);
forms.forEach(formItem => {
    const form = new FormValidator(formItem, validationConfig);
    form.enableValidation();
})


//очистка инпутов
function resetInput(popup, config) {
    const inputs = popup.querySelectorAll(config.inputSelector);
    inputs.forEach(input => {
        input.value = "";
    });
}

//удаления сообщения об ошибке
function removeError(form, config) {
    const inputList = form.querySelectorAll(config.inputSelector);
    inputList.forEach(input => {
        const error = document.querySelector(`#${input.id}-error`);
        error.textContent = "";
        input.classList.remove(config.inputErrorClass);
    });
}

//открытие попапа
export function openPopup(popup) {
    popup.classList.add('popup_opened');
    popup.addEventListener('click', closeByOvelay);
    document.addEventListener('keydown', closeByEscape);
}

//закрытие попапа
function closePopup(popup) {
    popup.classList.remove('popup_opened');
    popup.removeEventListener('click', closeByOvelay);
    document.removeEventListener('keydown', closeByEscape);
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
    const card = new Card({ name: nameOfPicture, link: pictureLink });
    const newCardsHTML = card.generateCard();
    initialCardsContainer.prepend(newCardsHTML);
    closePopup(popupAddNode);
}


// Закрытие по оверлею
function closeByOvelay(evt) {
    if (evt.target.classList.contains('popup_opened')) {
        closePopup(evt.target);
    }
}


// Закрытие на кнопку esc
function closeByEscape(evt) {
    const escapeCode = 27
    if (evt.keyCode === escapeCode) {
        const openedPopup = document.querySelector('.popup_opened')
        closePopup(openedPopup);
    }
}

editButtonNode.addEventListener('click', () => {
    openPopup(popupEditNode)
    fieldNameNode.value = profileNameNode.textContent;
    fieldAboutNode.value = profileTextNode.textContent;
    const form = new FormValidator(forms[0], validationConfig);
    form.setButtonState(saveButton, forms[0].checkValidity());
    removeError(forms[0], validationConfig);
});

addButtonNode.addEventListener('click', () => {
    openPopup(popupAddNode)
    resetInput(popupAddNode, validationConfig);
    const form = new FormValidator(forms[1], validationConfig);
    form.setButtonState(createButton, forms[1].checkValidity());
    removeError(forms[1], validationConfig);
});
popupPhotoCloseButtonNode.addEventListener('click', () => closePopup(popupPhotoNode));
popupCloseButtonEditFormNode.addEventListener('click', () => closePopup(popupEditNode));
popupCloseButtonAddFormNode.addEventListener('click', () => closePopup(popupAddNode));
popupEditNode.addEventListener('submit', handlePopupFormSubmit);
popupAddNode.addEventListener('submit', addNewCard);