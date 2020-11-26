let editButtonNode = document.querySelector('.profile__edit-button');
let popupNode = document.querySelector('.popup');
let popupCloseButtonNode = document.querySelector('.popup__close-button');


let profileNameNode = document.querySelector('.profile__name');
let profileTextNode = document.querySelector('.profile__text');

let popupContainerNode = document.querySelector('.popup__container');
let popupButtonNode = document.querySelector('.popup__save-button');
let fieldNameNode = document.querySelector('.popup__field-name');
let fieldAboutNode = document.querySelector('.popup__field-about');


function handleEditButtonClick() {
    popupNode.classList.add('popup__opened');
    fieldNameNode.value = profileNameNode.textContent;
    fieldAboutNode.value = profileTextNode.textContent;
}

function handlePopupCloseButtonClick() {
    popupNode.classList.remove('popup__opened');
}

function handlePopupContainerSubmit() {
    event.preventDefault();
    profileNameNode.textContent = fieldNameNode.value;
    profileTextNode.textContent = fieldAboutNode.value;
    popupNode.classList.remove('popup__opened');
}


editButtonNode.addEventListener('click', handleEditButtonClick);
popupCloseButtonNode.addEventListener('click', handlePopupCloseButtonClick);
popupContainerNode.addEventListener('submit', handlePopupContainerSubmit)