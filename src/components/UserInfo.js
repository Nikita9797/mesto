export class UserInfo {
  constructor({ nameSelector, statusSelector, avatarSelector }) {
    this._nameInput = document.querySelector(nameSelector);
    this._statusInput = document.querySelector(statusSelector);
    this._avataImageSelector = document.querySelector(avatarSelector);
  }

  getUserInfo() {
    return {
      name: this._nameInput.textContent,
      status: this._statusInput.textContent,
    };
  }

  setUserInfo(userInfo) {
    this._nameInput.textContent = userInfo.name;
    this._statusInput.textContent = userInfo.about;
    this._avataImageSelector.src = userInfo.avatar;
    this._id = userInfo._id;
  }

  getUserId() {
    return this._id;
  }

  isCurrentUserOwner(ownerId) {
    return this._id === ownerId;
  }
}
