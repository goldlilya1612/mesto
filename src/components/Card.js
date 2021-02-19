export default class Card {

    constructor(data, { selector, handleCardClick, removeHandler, api }, userId) {
        this._name = data.name;
        this._link = data.link;
        this._ownerId = data.owner._id;
        this._cardId = data._id;
        this._likes = data.likes;

        this._selector = selector;
        this._api = api;
        this._handleCardClick = handleCardClick;
        this._removeHandler = removeHandler;

        this._userId = userId;
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
        this._element.querySelector('.element__remove-button').addEventListener('click', this._removeHandler);
        this._element.querySelector('.element__vector').addEventListener('click', this._likeCard.bind(this));
        this._element.querySelector('.element__image').addEventListener('click', () => this._handleCardClick({ name: this._name, link: this._link }));
    }

    //Добавление в разметку данные
    generateCard() {
        this._element = this._getTemplate();
        this._element.querySelector('.element__number-of-likes').textContent = this._likes.length;

        //цвет лайка при рендеринге
        this._likes.forEach(item => {
            if (this._userId == item._id) {
                this._element.querySelector('.element__vector').classList.add('element__vector_active');
            }
        });

        //отображение корзины
        if (this._userId == this._ownerId) {
            this._element.querySelector('.element__remove-button').classList.remove('element__remove-button_invisible');
        } else {
            this._element.querySelector('.element__remove-button').classList.add('element__remove-button_invisible');
        }

        const image = this._element.querySelector('.element__image');
        this._element.querySelector('.element__text').textContent = this._name;
        image.src = this._link;
        image.setAttribute("alt", this._name);

        this._setEventListeners();

        return this._element;
    };

    //Удаление карточки
    removeCard() {
        this._element.remove();
        this._element = null;
    }

    _likeCard(e) {
        if (this._element.querySelector('.element__vector').classList.contains('element__vector_active')) {
            this._api.removeLike(this._cardId)
                .then((res) => {
                    this._likesCounter = res.likes.length;
                    this._element.querySelector('.element__number-of-likes').textContent = this._likesCounter;
                    const targetElement = e.target;
                    targetElement.classList.toggle('element__vector_active');
                })
                .catch(err => console.log(err));

        } else {
            this._api.addLike(this._cardId)
                .then((res) => {
                    this._likesCounter = res.likes.length;
                    this._element.querySelector('.element__number-of-likes').textContent = this._likesCounter;
                    const targetElement = e.target;
                    targetElement.classList.toggle('element__vector_active');
                })
                .catch(err => console.log(err));
        }
    };

}