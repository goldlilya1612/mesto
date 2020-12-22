const heading = document.querySelector('.popup-photo__heading');
const image = document.querySelector('.popup-photo__image');

const photoList = document.querySelector('.element__image');

const editButtonNode = document.querySelector('.profile__edit-button');
const addButtonNode = document.querySelector('.profile__add-button');
const saveButton = document.querySelector('.popup__save-button');
const createButton = document.querySelector('.popup__create-button');


const popupAddNode = document.querySelector('.popup_add-form');
const popupEditNode = document.querySelector('.popup_edit-form');
const popupPhotoNode = document.querySelector('.popup-photo');

const popupAddFormNode = document.querySelector('.popup__form_add-form');
const popupEditFormNode = document.querySelector('.popup__form_edit-form');

const popupCloseButtonEditFormNode = document.querySelector('.popup__close-button_edit-form');
const popupCloseButtonAddFormNode = document.querySelector('.popup__close-button_add-form');
const popupPhotoCloseButtonNode = document.querySelector('.popup-photo__close-button');

const profileNameNode = document.querySelector('.profile__name');
const profileTextNode = document.querySelector('.profile__text');

const fieldNameNode = document.querySelector('.popup__field_name');
const fieldAboutNode = document.querySelector('.popup__field_about');

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

const inputNameOfPicture = document.querySelector('.popup__field_name-of-picture');
const inputLink = document.querySelector('.popup__field_link');
const templateCard = document.querySelector('.template');


renderInitialCards();


//открытие попапа
function openPopup(popup, button, form, config) {
    popup.classList.add('popup_opened');
    popup.addEventListener('click', closeByOvelay);
    document.addEventListener('keydown', closeByEscape);

    if (popup === popupEditNode) {

        fieldNameNode.value = profileNameNode.textContent;
        fieldAboutNode.value = profileTextNode.textContent;
        setButtonState(button, form.checkValidity(), config);
        removeError(form, config);
    }

    if (popup === popupAddNode) {

        resetInput(popup, config);
        setButtonState(button, form.checkValidity(), config);
        removeError(form, config);
    }

}

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
    popupClose(popupEditNode);
}

//добавляем 6 карточек в контейнер
function renderInitialCards() {
    const newInitialCards = initialCards.map(composeCards);
    initialCardsContainer.append(...newInitialCards);
}


//создаем карточки с помощью template
function composeCards(item) {
    const newCard = templateCard.content.cloneNode(true);
    const cardName = newCard.querySelector('.element__text');
    const cardImage = newCard.querySelector('.element__image');
    cardName.textContent = item.name;
    cardImage.src = item.link;
    cardImage.setAttribute("alt", item.name);

    //кнопка корзины для удаления
    const removeButton = newCard.querySelector('.element__remove-button');
    removeButton.addEventListener('click', removeCard)

    //кнопка лайка
    const likeNode = newCard.querySelector('.element__vector');
    likeNode.addEventListener('click', likeCard);

    //картинка
    cardImage.addEventListener('click', () => openPhotoPopup(item));

    return newCard
}

//добавляем НОВУЮ карточку
function addNewCard(event) {
    event.preventDefault();
    const nameOfPicture = inputNameOfPicture.value;
    const pictureLink = inputLink.value;
    const newCardsHTML = composeCards({ name: nameOfPicture, link: pictureLink });
    initialCardsContainer.prepend(newCardsHTML);
    closePopup(popupAddNode);
}

//удаление карточки
function removeCard(e) {
    const targetElement = e.target;
    const targetCard = targetElement.closest('.element');
    targetCard.remove();
}

//лайк карточки
function likeCard(e) {
    const targetElement = e.target;
    targetElement.classList.toggle('element__vector_active');
}

//открытие фото
function openPhotoPopup(item) {
    openPopup(popupPhotoNode);
    image.src = item.link;
    image.setAttribute("alt", item.name);
    heading.textContent = item.name;
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

editButtonNode.addEventListener('click', () => openPopup(popupEditNode, saveButton, popupEditFormNode, validationConfig));
addButtonNode.addEventListener('click', () => openPopup(popupAddNode, createButton, popupAddFormNode, validationConfig));
popupPhotoCloseButtonNode.addEventListener('click', () => closePopup(popupPhotoNode));
popupCloseButtonEditFormNode.addEventListener('click', () => closePopup(popupEditNode));
popupCloseButtonAddFormNode.addEventListener('click', () => closePopup(popupAddNode));
popupEditNode.addEventListener('submit', handlePopupFormSubmit);
popupAddNode.addEventListener('submit', addNewCard);