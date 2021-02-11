export default class UserInfo {
    constructor({ userNameSelector, userInfoSelector }) {
        this._userName = document.querySelector(userNameSelector);
        this._userInfo = document.querySelector(userInfoSelector);
    }

    getUserInfo() {
        const userInfo = {
            name: this._userName.textContent,
            "about-myself": this._userInfo.textContent
        }

        return userInfo
    }

    setUserInfo(inputName, inputAbout) {
        this._userName.textContent = inputName.value;
        this._userInfo.textContent = inputAbout.value;
    }
}