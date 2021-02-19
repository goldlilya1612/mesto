export default class UserInfo {
    constructor({ userNameSelector, userInfoSelector, userAvatarSelector }) {
        this._userName = document.querySelector(userNameSelector);
        this._userInfo = document.querySelector(userInfoSelector);
        this._userAvatar = document.querySelector(userAvatarSelector);
    }

    getUserInfo() {
        const userInfo = {
            name: this._userName.textContent,
            "about-myself": this._userInfo.textContent
        }

        return userInfo
    }

    setUserInfo(userData) {
        this._userName.textContent = userData.name;
        this._userInfo.textContent = userData.about;
        this._userAvatar.src = userData.avatar;
    }
}