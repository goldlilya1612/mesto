 import { openPopup, popupPhotoNode } from './util.js';
 export default class Card {

     constructor(data, selector) {
         this._name = data.name;
         this._link = data.link;
         this._selector = selector;
     };

     //Возвращаем разметку
     _getTemplate() {
         const cardElement = document
             .querySelector(this._selector)
             .content.querySelector('.element')
             .cloneNode(true);

         return cardElement;
     };

     _setEventListeners() {
         this._element.querySelector('.element__remove-button').addEventListener('click', this._removeCard.bind(this));
         this._element.querySelector('.element__vector').addEventListener('click', this._likeCard);
         this._element.querySelector('.element__image').addEventListener('click', () => this._openPhotoPopup());
     };

     //Добавление в разметку данные
     generateCard() {
         this._element = this._getTemplate();
         const image = this._element.querySelector('.element__image');

         this._setEventListeners();

         this._element.querySelector('.element__text').textContent = this._name;
         image.src = this._link;
         image.setAttribute("alt", this._name);

         return this._element;
     };

     //Удаление карточки
     _removeCard() {
         this._element.remove();
         this._element = null; // занулляем элемент, чтобы сборщик мусора почистил все с ним связанное
     }

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
 }