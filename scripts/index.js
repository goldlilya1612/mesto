const editButtonNode = document.querySelector('.profile__edit-button');
const addButtonNode = document.querySelector('.profile__add-button');
const popupAddFormNode = document.querySelector('.popup_add-form');
const popupEditFormNode = document.querySelector('.popup_edit-form');
const popupPhotoNode = document.querySelector('.popup-photo');


const popupCloseButtonEditFormNode = document.querySelector('.popup__close-button_edit-form');
const popupCloseButtonAddFormNode = document.querySelector('.popup__close-button_add-form');

const profileNameNode = document.querySelector('.profile__name');
const profileTextNode = document.querySelector('.profile__text');

const popupFormNode = document.querySelector('.popup__form_edit-form');
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
const saveButton = document.querySelector('.popup__save-button');
const templateCard = document.querySelector('.template');
const popupAddForm = document.querySelector('.popup__form_add-form');

renderInitialCards();

function handleButtonClick(popup) {
    popup.classList.add('popup_opened');

    fieldNameNode.value = profileNameNode.textContent;
    fieldAboutNode.value = profileTextNode.textContent;

    inputNameOfPicture.reset();
    inputLink.reset();
}

function handlePopupCloseButtonClick(popup) {
    popup.classList.remove('popup_opened');
}

function handlePopupFormSubmit(event) {
    event.preventDefault();
    profileNameNode.textContent = fieldNameNode.value;
    profileTextNode.textContent = fieldAboutNode.value;
    handlePopupCloseButtonEditFormClick();
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
    const photoNode = newCard.querySelector('.element__image');
    photoNode.addEventListener('click', e => openPhotoPopup(e, item));

    return newCard
}

//добавляем НОВУЮ карточку
function addNewCard() {
    event.preventDefault();
    const NameOfPicture = inputNameOfPicture.value;
    const pictureLink = inputLink.value;
    const newCardsHTML = composeCards({ name: NameOfPicture, link: pictureLink });
    initialCardsContainer.prepend(newCardsHTML);
    handlePopupCloseButtonAddFormClick();
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
function openPhotoPopup(e, item) {
    const targetElement = e.target;
    const image = document.querySelector('.popup-photo__image');
    const heading = document.querySelector('.popup-photo__heading');
    const elementLink = targetElement.getAttribute('src');

    popupPhotoNode.classList.add('popup_opened');
    image.src = elementLink;
    image.setAttribute("alt", item.name);
    heading.textContent = item.name;

}

editButtonNode.addEventListener('click', popup => handleButtonClick(popupEditFormNode));
addButtonNode.addEventListener('click', popup => handleButtonClick(popupAddFormNode));
popupPhotoNode.addEventListener('click', popup => handleButtonClick(popupPhotoNode));
popupCloseButtonEditFormNode.addEventListener('click', handlePopupCloseButtonClick);
popupCloseButtonAddFormNode.addEventListener('click', handlePopupCloseButtonClick);

popupAddFormNode.addEventListener('click', popup => handlePopupCloseButtonClick(popupAddFormNode));
popupEditFormNode.addEventListener('click', popup => handlePopupCloseButtonClick(popupEditFormNode));
popupPhotoNode.addEventListener('click', popup => handlePopupCloseButtonClick(popupPhotoNode));
popupFormNode.addEventListener('submit', handlePopupFormSubmit);
popupAddForm.addEventListener('submit', addNewCard);