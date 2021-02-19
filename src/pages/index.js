//info:
//класс Card создает карточку с текстом и ссылкой на изображение
//класс FormValidatorнастраивает валидацию полей формы
//класс Section отвечает за отрисовку элементов на странице
//класс Popup отвечает за открытие и закрытие попапа
//класс PopupWithImage отвечает за открытие и закрытие попапа с картинкой
//класс PopupWithForm отвечает за попап с формой
//класс UserInfo отвечает за управление отображением информации о пользователе на странице.




/* СПАСИБО ЗА КАЧЕСТВЕННОЕ РЕВЬЮ!*/

import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWitQuestion from '../components/PopupWithQuestion.js'
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js'
import Api from '../components/Api.js'
import {
    validationConfig,
    initialCardsContainerSelector,
    editButtonNode,
    addButtonNode,
    profileButtonNode,
    saveButton,
    createButton,
    addFormNode,
    editFormNode,
    changeAvatarFormNode,
    nameInput,
    aboutInput,
    saveButtonOfAvatarPopup
} from '../utils/constants.js';

import '../pages/index.css';


const api = new Api({
    baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-20',
    headers: {
        "authorization": "41e04913-672b-4210-b06d-ef046481fb20",
        "Content-Type": "application/json"
    }
});

let userId = null;


const editForm = new FormValidator(editFormNode, validationConfig);
const addForm = new FormValidator(addFormNode, validationConfig);
const changeAvatarForm = new FormValidator(changeAvatarFormNode, validationConfig);

const cardList = new Section({
        renderer: (item) => {
            cardList.addItem(createCard(item));
        },
    },
    initialCardsContainerSelector
);

const popupImage = new PopupWithImage({
    popupSelector: '.popup-photo'
});

const info = new UserInfo({
    userNameSelector: '.profile__name',
    userInfoSelector: '.profile__text',
    userAvatarSelector: '.profile__avatar'
});

const popupAddNode = new PopupWithForm({
    popupSelector: '.popup_add-form',
    submitForm: (formValues) => {
        const nameOfPicture = formValues["name-of-picture"];
        const pictureLink = formValues["link"];
        renderLoading(true, createButton);
        const data = { name: nameOfPicture, link: pictureLink };
        api.addCard(data) //добавление карточки на сервер
            .then((data) => {
                cardList.addNewItem(createCard(data));
                popupAddNode.close();
            })
            .catch(err => console.log(err));
    }
});

const popupEditNode = new PopupWithForm({
    popupSelector: '.popup_edit-form',
    submitForm: (formValues) => {
        renderLoading(true, saveButton);
        api.editInfo(formValues)
            .then((userData) => {
                info.setUserInfo(userData);
                popupEditNode.close();
            })
            .catch(err => console.log(err))
            .finally(() => renderLoading(false, saveButton, 'Сохранить'))
    }
});

const popupChangeAvatar = new PopupWithForm({
    popupSelector: '.popup_change-avatar',
    submitForm: (inputValues) => {
        renderLoading(true, saveButtonOfAvatarPopup);
        api.updateAvatar(inputValues.link)
            .then((userData) => {
                info.setUserInfo(userData);
                popupChangeAvatar.close();
            })
            .catch(err => console.log(err))
            .finally(() => renderLoading(false, saveButtonOfAvatarPopup, 'Сохранить'))
    }
});

const popupDeleteCard = new PopupWitQuestion({
    popupSelector: '.popup_delete-card'
});

//проверка валидности форм
editForm.enableValidation();
addForm.enableValidation();
changeAvatarForm.enableValidation()


//создание карточки
function createCard(item) {
    const card = new Card(item, {
        selector: '.template',
        handleCardClick: () => {
            popupImage.open(item);
        },
        removeHandler: () => {
            popupDeleteCard.setEventListeners(deleteCard(card));
            popupDeleteCard.open();
        },
        api: api
    }, userId);
    const cardElement = card.generateCard();

    return cardElement
}

//Кнопка 'Сохранение...' во время выполнения запроса
function renderLoading(isLoading, button, buttonText) {
    if (isLoading) {
        button.textContent = 'Сохранение...'
    } else {
        button.textContent = buttonText
    }
}

const deleteCard = (card) => {
    return () => {
        api.removeCard(card._cardId)
            .then(() => {
                popupDeleteCard.close();
                card.removeCard();
            })
            .catch(err => console.log(err))
    }
}

//получение данных о пользователе и карточках из сервера
Promise.all([api.getUserInfo(), api.getInitialCards()])
    .then(values => {
        const [userData, cardsData] = values;
        info.setUserInfo(userData);
        userId = userData._id;
        cardList.renderItems(cardsData);
    })
    .catch(err => console.log(err));


popupImage.setEventListeners();
popupAddNode.setEventListeners();
popupEditNode.setEventListeners();
popupChangeAvatar.setEventListeners();
popupDeleteCard.setEventListeners();

profileButtonNode.addEventListener('click', () => {
    popupChangeAvatar.open();
    changeAvatarForm.setButtonState(changeAvatarFormNode.checkValidity());
    changeAvatarForm.removeError();
})

editButtonNode.addEventListener('click', () => {
    popupEditNode.open();
    const userInfo = info.getUserInfo();
    nameInput.value = userInfo.name;
    aboutInput.value = userInfo["about-myself"];
    editForm.setButtonState(editFormNode.checkValidity());
    editForm.removeError();
});

addButtonNode.addEventListener('click', () => {
    popupAddNode.open();
    addForm.setButtonState(addFormNode.checkValidity());
    addForm.removeError();
});