//info:
//класс Card создает карточку с текстом и ссылкой на изображение
//класс FormValidatorнастраивает валидацию полей формы
//класс Section отвечает за отрисовку элементов на странице
//класс Popup отвечает за открытие и закрытие попапа
//класс PopupWithImage отвечает за открытие и закрытие попапа с картинкой
//класс PopupWithForm отвечает за попап с формой
//класс UserInfo отвечает за управление отображением информации о пользователе на странице.

import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js'
import {
    validationConfig,
    initialCards,
    initialCardsContainerSelector,
    editButtonNode,
    addButtonNode,
    saveButton,
    createButton,
    addFormNode,
    editFormNode,
    nameInput,
    aboutInput
} from '../utils/constants.js';

import '../pages/index.css';


const editForm = new FormValidator(editFormNode, validationConfig);
const addForm = new FormValidator(addFormNode, validationConfig);

const cardList = new Section({
        items: initialCards,
        renderer: (item) => {
            const card = new Card(item, {
                selector: '.template',
                handleCardClick: (item) => {
                    popupImage.open(item);
                }
            });
            const cardElement = card.generateCard();

            cardList.addItem(cardElement);
        },
    },
    initialCardsContainerSelector
);


const popupImage = new PopupWithImage({
    popupSelector: '.popup-photo'
});

const info = new UserInfo({
    userNameSelector: '.profile__name',
    userInfoSelector: '.profile__text'
});

const popupAddNode = new PopupWithForm({
    popupSelector: '.popup_add-form',
    submitForm: (formValues) => {
        const nameOfPicture = formValues["name-of-picture"];
        const pictureLink = formValues["link"];
        cardList.items = { name: nameOfPicture, link: pictureLink };
        addNewCard(cardList.items)
    }

});

const popupEditNode = new PopupWithForm({
    popupSelector: '.popup_edit-form',
    submitForm: () => {
        info.setUserInfo(nameInput, aboutInput);
    }
});

//рендер 6 карточек
cardList.renderItems();

//проверка валидности форм
editForm.enableValidation();
addForm.enableValidation();

//очистка инпутов
function resetInput(form) {
    form.reset();
}

//добавление новой карточки
function addNewCard(item) {
    const newCard = new Card(item, {
        selector: '.template',
        handleCardClick: () => {
            popupImage.open(item);
        }
    });
    const cardElement = newCard.generateCard();
    cardList.addNewItem(cardElement);
}

popupImage.setEventListeners();
popupAddNode.setEventListeners();
popupEditNode.setEventListeners();

editButtonNode.addEventListener('click', () => {
    popupEditNode.open();
    const userInfo = info.getUserInfo();
    nameInput.value = userInfo.name;
    aboutInput.value = userInfo["about-myself"];
    editForm.setButtonState(saveButton, editFormNode.checkValidity());
    editForm.removeError(editFormNode, editForm, validationConfig);
});

addButtonNode.addEventListener('click', () => {
    popupAddNode.open();
    resetInput(addFormNode);
    addForm.setButtonState(createButton, addFormNode.checkValidity());
    addForm.removeError(addFormNode, addForm, validationConfig);
});