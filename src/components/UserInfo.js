export class UserInfo {
    constructor({nameSelector, statusSelector}) {
        this._nameInput = document.querySelector(nameSelector);
        this._statusInput = document.querySelector(statusSelector);
    }

    getUserInfo() {
        return {"name": this._nameInput.textContent, "status": this._statusInput.textContent};
    }

    setUserInfo(userInfo) {
        this._nameInput.textContent = userInfo.name;
        this._statusInput.textContent = userInfo.status;
    }
}