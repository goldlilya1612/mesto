export default class Card {

    constructor(data, { selector, popupSelector, handleCardClick, api }, popupDeleteCard) {

        this._name = data.name;
        this._link = data.link;
        this._userId = data.owner._id;
        this._cardId = data._id;
        this._likes = data.likes;

        this._selector = selector;
        this._api = api;
        this._likesCounter = this._likes.length;
        this._popupSelector = popupSelector;
        this._handleCardClick = handleCardClick;
        this._popupDeleteCard = popupDeleteCard;

        this._popup = document.querySelector(this._popupSelector);
        this._button = this._popup.querySelector('.popup__button');

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
        this._element.querySelector('.element__vector').addEventListener('click', this._likeCard.bind(this));
        this._element.querySelector('.element__image').addEventListener('click', () => this._handleCardClick({ name: this._name, link: this._link }));
    }

    //Добавление в разметку данные
    generateCard() {
        this._element = this._getTemplate();
        this._element.querySelector('.element__number-of-likes').textContent = this._likesCounter;

        this._api.getUserInfo()
            .then((data) => {
                //цвет лайка при рендеринге
                const dataString = JSON.stringify(data);
                this._likes.forEach(item => {
                    const iteemString = JSON.stringify(item);
                    if (dataString == iteemString) {
                        this._element.querySelector('.element__vector').classList.add('element__vector_active');
                    }
                });

                //удаление-добавление иконки корзины
                if (this._userId == data._id) {
                    this._element.querySelector('.element__remove-button').classList.remove('element__remove-button_invisible');
                } else {
                    this._element.querySelector('.element__remove-button').classList.add('element__remove-button_invisible');
                }
            })
            .catch(err => console.log(err));

        const image = this._element.querySelector('.element__image');
        this._element.querySelector('.element__text').textContent = this._name;
        image.src = this._link;
        image.setAttribute("alt", this._name);

        this._setEventListeners();

        return this._element;
    };

    //Удаление карточки
    _removeCard() {
        this._popupDeleteCard.open();
        this._popupDeleteCard.setEventListeners();

        this._button.addEventListener('click', () => {
            this._popupDeleteCard.close();

            this._api.removeCard(this._cardId)
                .then(() => this._element.remove())
                .catch(err => console.log(err));
        });
    }

    _likeCard(e) {
        if (this._element.querySelector('.element__vector').classList.contains('element__vector_active')) {
            this._api.removeLike(this._cardId)
                .then(() => {
                    this._likesCounter--;
                    this._element.querySelector('.element__number-of-likes').textContent = this._likesCounter;
                    const targetElement = e.target;
                    targetElement.classList.toggle('element__vector_active');
                })

        } else {
            this._api.addLike(this._cardId)
                .then(() => {
                    this._likesCounter++;
                    this._element.querySelector('.element__number-of-likes').textContent = this._likesCounter;
                    const targetElement = e.target;
                    targetElement.classList.toggle('element__vector_active');
                })
        }
    };
}