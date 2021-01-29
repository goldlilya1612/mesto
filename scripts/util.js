export const popupPhotoNode = document.querySelector('.popup-photo');

//открытие попапа
export function openPopup(popup) {
    popup.classList.add('popup_opened');
    popup.addEventListener('mousedown', closeByOvelay);
    document.addEventListener('keydown', closeByEscape);
}

//закрытие попапа
export function closePopup(popup) {
    popup.classList.remove('popup_opened');
    popup.removeEventListener('mousedown', closeByOvelay);
    document.removeEventListener('keydown', closeByEscape);
}

// Закрытие по оверлею
function closeByOvelay(evt) {
    if (evt.target.classList.contains('popup_opened')) {
        closePopup(evt.target);
    }
}


// Закрытие на кнопку esc
function closeByEscape(evt) {
    if (evt.keyCode === 27) {
        const openedPopup = document.querySelector('.popup_opened')
        closePopup(openedPopup);
    }
}