import { profileNameNode, profileTextNode } from '../utils/constants.js';

export default class UserInfo {
    constructor({ userNameSelector, userInfoSelector }) {
        this._userName = document.querySelector(userNameSelector);
        this._userInfo = document.querySelector(userInfoSelector);
    }

    getUserInfo() {
        this._userName.value = profileNameNode.textContent;
        this._userInfo.value = profileTextNode.textContent;
    }

    setUserInfo(formValues) {

        profileNameNode.textContent = formValues["name"];
        profileTextNode.textContent = formValues["about-myself"];
    }
}