let editButtonNode = document.querySelector('.profile__edit-button');
let addButtonNode = document.querySelector('.profile__add-button');
let popupNode = document.querySelectorAll('.popup');
let popupCloseButtonEditFormNode = document.querySelector('.popup__close-button_edit-form');
let popupCloseButtonAddFormNode = document.querySelector('.popup__close-button_add-form');

let profileNameNode = document.querySelector('.profile__name');
let profileTextNode = document.querySelector('.profile__text');

let popupFormNode = document.querySelector('.popup__form_edit-form');
let fieldNameNode = document.querySelector('.popup__field_name');
let fieldAboutNode = document.querySelector('.popup__field_about');

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
const popupPhotoNode = document.querySelector('.popup-photo');

renderInitialCards();
bindSaveItemListener();

console.log(popupNode);


function handleEditButtonClick() {
    popupNode[0].classList.add('popup_opened');
    fieldNameNode.value = profileNameNode.textContent;
    fieldAboutNode.value = profileTextNode.textContent;
}

function handleAddButtonClick() {
    popupNode[1].classList.add('popup_opened');
    inputNameOfPicture.value = '';
    inputLink.value = '';
}

function handlePopupCloseButtonEditFormClick() {
    popupNode[0].classList.remove('popup_opened');
}

function handlePopupCloseButtonAddFormClick() {
    popupNode[1].classList.remove('popup_opened');
}

function handlePopupCloseButtonPhotoClick() {
    popupNode[2].classList.remove('popup_opened');
}

function handlePopupFormSubmit() {
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
    photoNode.addEventListener('click', openPhotoPopup);

    return newCard
}

//submit форма с добавлением карточки
function bindSaveItemListener() {
    const createButton = document.querySelector('.popup__create-button');
    const popupAddForm = document.querySelector('.popup__form_add-form');
    popupAddForm.addEventListener('submit', addNewCard);
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
function openPhotoPopup(e) {
    const targetElement = e.target;
    const photoPopup = document.querySelector('.popup-photo');
    const image = document.querySelector('.popup-photo__image');
    const heading = document.querySelector('.popup-photo__heading');
    const elementLink = targetElement.getAttribute('src');

    photoPopup.classList.add('popup_opened');
    image.src = elementLink;
    console.log("работает");
    //heading.textContent = item.name;

}

editButtonNode.addEventListener('click', handleEditButtonClick);
addButtonNode.addEventListener('click', handleAddButtonClick);
popupCloseButtonEditFormNode.addEventListener('click', handlePopupCloseButtonEditFormClick);
popupCloseButtonAddFormNode.addEventListener('click', handlePopupCloseButtonAddFormClick);
popupPhotoNode.addEventListener('click', handlePopupCloseButtonPhotoClick);
popupFormNode.addEventListener('submit', handlePopupFormSubmit);