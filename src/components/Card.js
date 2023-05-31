export class Card {
  constructor(data, templateSelector, handleOnCardClickFunc, handleLikeClickOnFunc, handleLikeClickOffFunc, userId) {
    this._data = data;
    this._name = data.name;
    this._link = data.link;
    this._likeCount = data.likes.length;
    this._templateSelector = templateSelector;
    this.id = data._id;
    this.likes = data.likes;
    this._owner = data.owner;
    this._currentUserId = userId;
    this.handleCardClick = handleOnCardClickFunc;
    this.handleLikeClickOnFunc = handleLikeClickOnFunc;
    this.handleLikeClickOffFunc = handleLikeClickOffFunc;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._templateSelector)
      .content
      .querySelector('.card')
      .cloneNode(true);

    return cardElement;
  }

  _setEventListeners() {
    this._elementCardImage.addEventListener("click", () => {
      this.handleCardClick();
    });

    this._elementLikeButton.addEventListener("click", () => {
      if (this.isLike()) {
        this.handleLikeClickOffFunc();
        this._likeCount--
      } else {
        this.handleLikeClickOnFunc();
        this._likeCount++
      }
      this._toggleLikeStatus();
      this._element.querySelector(".card__like-counter").textContent = this._likeCount;
    });

  }

  _createImagePopup() {
    this._popupImageElement.src = this._link;
    this._popupImageElement.alt = this._name;
    this._popupImageText.textContent = this._name;
  }

  _toggleLikeStatus() {
    this._elementLikeButton.classList.toggle("card__like_active");
  }

  isLike() {
    const isLike = this.likes.find(item => {
      if (item._id === this._currentUserId) {
        return true;
      }
    });

    return isLike;
  }


  _createCardElements() {
    this._element = this._getTemplate();
    this._elementCardImage = this._element.querySelector(".card__image");
    this._elementLikeButton = this._element.querySelector(".card__like");
    this._popupImage = document.querySelector(".popup_el_popup-image");
    this._popupImageElement = this._popupImage.querySelector(".popup__image");
    this._popupImageText = this._popupImage.querySelector(".popup__sub-text");
    this._cardIcon = this._popupImage.querySelector(".popup__close-icon");
    this._likeCounter = this._element.querySelector(".card__like-counter");

    if (this.isLike()) {
      this._elementLikeButton.classList.add("card__like_active");
    }

    this._element.querySelector(".card__image").src = this._link;
    this._element.querySelector(".card__image").alt = this._name;
    this._element.querySelector(".card__text").textContent = this._name;
    this._element.querySelector(".card__like-counter").textContent = this._likeCount;
  }


  generateCard() {
    this._createCardElements();
    this._setEventListeners();
    return this._element;
  }
}