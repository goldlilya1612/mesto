 import { openPopup, popupPhotoNode } from './index.js';
 export default class Card {

     constructor(data) {
         this._name = data.name;
         this._link = data.link;
     };

     //Возвращаем разметку
     _getTemplate() {
         const cardElement = document
             .querySelector('.template')
             .content.querySelector('.element')
             .cloneNode(true);

         return cardElement;
     };

     _setEventListeners() {
         this._element.querySelector('.element__remove-button').addEventListener('click', this._removeCard);
         this._element.querySelector('.element__vector').addEventListener('click', this._likeCard);
         this._element.querySelector('.element__image').addEventListener('click', () => this._openPhotoPopup());
     };

     //Добавление в разметку данные
     generateCard() {
         this._element = this._getTemplate();
         this._setEventListeners();

         this._element.querySelector('.element__text').textContent = this._name;
         this._element.querySelector('.element__image').src = this._link;
         this._element.querySelector('.element__image').setAttribute("alt", this._name);

         return this._element;
     };

     //Удаление карточки
     _removeCard(e) {
         const targetElement = e.target;
         const targetCard = targetElement.closest('.element');
         targetCard.remove();
         console.log(this);
         this._element = this._getTemplate();
         this._removeEventListeners();
     };

     //Лайк карточки
     _likeCard(e) {
         const targetElement = e.target;
         targetElement.classList.toggle('element__vector_active');
     };

     //Открытие попапа с картинкой
     _openPhotoPopup() {
         const image = document.querySelector('.popup-photo__image');
         const heading = document.querySelector('.popup-photo__heading');
         openPopup(popupPhotoNode);
         image.src = this._link;
         image.setAttribute("alt", this._name);
         heading.textContent = this._name;
     }

     _
 }