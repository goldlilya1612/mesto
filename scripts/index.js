let editButtonNode = document.querySelector('.profile__edit-button');
let popupNode = document.querySelector('.popup');
let popupCloseButtonNode = document.querySelector('.popup__close-button');


let profileNameNode = document.querySelector('.profile__name');
let profileTextNode = document.querySelector('.profile__text');

let popupFormNode = document.querySelector('.popup__form');
let popupButtonNode = document.querySelector('.popup__save-button');
let fieldNameNode = document.querySelector('.popup__field_name');
let fieldAboutNode = document.querySelector('.popup__field_about');


function handleEditButtonClick() {
    popupNode.classList.add('popup_opened');
    fieldNameNode.value = profileNameNode.textContent;
    fieldAboutNode.value = profileTextNode.textContent;
}

function handlePopupCloseButtonClick() {
    popupNode.classList.remove('popup_opened');
}

function handlePopupFormSubmit() {
    event.preventDefault();
    profileNameNode.textContent = fieldNameNode.value;
    profileTextNode.textContent = fieldAboutNode.value;
    handlePopupCloseButtonClick();
}



editButtonNode.addEventListener('click', handleEditButtonClick);
popupCloseButtonNode.addEventListener('click', handlePopupCloseButtonClick);
popupFormNode.addEventListener('submit', handlePopupFormSubmit);