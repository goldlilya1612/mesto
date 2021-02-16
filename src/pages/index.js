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
import Popup from '../components/Popup.js'
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js'
import Api from '../components/Api.js'
import {
    validationConfig,
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


const api = new Api({
    baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-20',
    headers: {
        "authorization": "41e04913-672b-4210-b06d-ef046481fb20",
        "Content-Type": "application/json"
    }
});

//получение данных о пользователя из сервера
const userInformation = api.getUserInfo();
userInformation.then((data) => {
        document.querySelector('.profile__name').textContent = data.name; //имя пользователя
        document.querySelector('.profile__text').textContent = data.about; //информация о пользователе
        document.querySelector('.profile__avatar').src = data.avatar; //картинка пользователя
    })
    .catch(err => console.log(err))

//получение данных о карточках из сервера
const initialCards = api.getInitialCards();
initialCards.then((data) => {
        const cardList = new Section({
                items: data,
                renderer: (item) => {
                    const card = new Card(item, {
                        selector: '.template',
                        popupSelector: '.popup_delete-card',
                        handleCardClick: (item) => {
                            popupImage.open(item);
                        },
                        api: api
                            //apiAddLike: addLike(id)
                            //apiRemoveLike: removeLike(id)
                    }, popupDeleteCard);
                    const cardElement = card.generateCard();

                    cardList.addItem(cardElement);
                },
            },
            initialCardsContainerSelector
        );

        window.cardList = cardList;

        //рендер карточек
        cardList.renderItems();
    })
    .catch(err => console.log(err))


const editForm = new FormValidator(editFormNode, validationConfig);
const addForm = new FormValidator(addFormNode, validationConfig);

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
        initialCards
            .then(data => {
                data = { name: nameOfPicture, link: pictureLink };
                api.addCard(data) //добавление карточки на сервер
                    .then((data) => {
                        addNewCard(data);
                    })
                    .catch(err => console.log(err));
            })
            .catch(err => console.log(err));
    }

});

const popupEditNode = new PopupWithForm({
    popupSelector: '.popup_edit-form',
    submitForm: (formValues) => {
        info.setUserInfo(nameInput, aboutInput);
        api.editInfo(formValues)
            .catch(err => console.log(err));
    }
});

const popupDeleteCard = new Popup({
    popupSelector: '.popup_delete-card'
});

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
        popupSelector: '.popup_delete-card',
        handleCardClick: () => {
            popupImage.open(item);
        },
        api: api
    }, popupDeleteCard);
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