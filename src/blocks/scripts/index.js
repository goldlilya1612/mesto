//info:
//класс Card создает карточку с текстом и ссылкой на изображение
//класс FormValidatorнастраивает валидацию полей формы
//класс Section отвечает за отрисовку элементов на странице
//класс Popup отвечает за открытие и закрытие попапа
//класс PopupWithImage отвечает за открытие и закрытие попапа с картинкой
//класс PopupWithForm отвечает за попап с формой
//класс UserInfo отвечает за управление отображением информации о пользователе на странице.

import Card from './Card.js';
import FormValidator from './FormValidator.js';
import Section from './Section.js';
import PopupWithImage from './PopupWithImage.js';
import PopupWithForm from './PopupWithForm.js';
import UserInfo from './UserInfo.js'
import {
    validationConfig,
    initialCards,
    initialCardsContainerSelector,
    editButtonNode,
    addButtonNode,
    saveButton,
    createButton,
    addFormNode,
    editFormNode
} from '../utils/constants.js';

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


const popupAddNode = new PopupWithForm({
    popupSelector: '.popup_add-form',
    submitForm: (formValues) => {
        const nameOfPicture = formValues["name-of-picture"];
        const pictureLink = formValues["link"];
        addNewCard(nameOfPicture, pictureLink);
    },
});

const popupEditNode = new PopupWithForm({
    popupSelector: '.popup_edit-form',
    submitForm: (formValues) => {
        info.setUserInfo(formValues);
    }
});

const info = new UserInfo({
    userNameSelector: '.popup__field_name',
    userInfoSelector: '.popup__field_about'
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

//добавление НОВОЙ карточки
function addNewCard(nameOfPicture, pictureLink) {

    const newCard = new Section({
            items: [{ name: nameOfPicture, link: pictureLink }],
            renderer: (item) => {
                const card = new Card(item, {
                    selector: '.template',
                    handleCardClick: (item) => {
                        popupImage.open(item);
                    }
                });
                const cardElement = card.generateCard();
                newCard.addNewItem(cardElement);
            }
        },
        initialCardsContainerSelector
    );
    newCard.renderItems();
}


popupImage.setEventListeners();
popupAddNode.setEventListeners();
popupEditNode.setEventListeners();

editButtonNode.addEventListener('click', () => {
    popupEditNode.open();
    info.getUserInfo();
    editForm.setButtonState(saveButton, editFormNode.checkValidity());
    editForm.removeError(editFormNode, editForm, validationConfig);
});

addButtonNode.addEventListener('click', () => {
    popupAddNode.open();
    resetInput(addFormNode);
    addForm.setButtonState(createButton, addFormNode.checkValidity());
    addForm.removeError(addFormNode, addForm, validationConfig);
});