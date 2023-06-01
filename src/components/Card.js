export class Card {
  constructor(
    data,
    templateSelector,
    handleOnCardClickFunc,
    handleLikeClickOnFunc,
    handleLikeClickOffFunc,
    userId
  ) {
    this._data = data;
    this._name = data.name;
    this._link = data.link;
    this._likeCount = data.likes.length;
    this._templateSelector = templateSelector;
    this.id = data._id;
    this._likes = data.likes;
    this._owner = data.owner;
    this._currentUserId = userId;
    this.handleCardClick = handleOnCardClickFunc;
    this.handleLikeClickOnFunc = handleLikeClickOnFunc;
    this.handleLikeClickOffFunc = handleLikeClickOffFunc;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._templateSelector)
      .content.querySelector(".card")
      .cloneNode(true);

    return cardElement;
  }

  _setEventListeners() {
    this._elementCardImage.addEventListener("click", () => {
      this.handleCardClick();
    });

    this._elementLikeButton.addEventListener("click", () => {
      if (this._isLiked()) {
        this.handleLikeClickOffFunc();
      } else {
        this.handleLikeClickOnFunc();
      }
    });
  }

  setLikes(likes) {
    this._likes = likes;
    this._updateLikesView();
  }

  _updateLikesView() {
    this._likeCounter.textContent = this._likes.length;
    if (this._isLiked()) {
      this._elementLikeButton.classList.add("card__like_active");
    } else {
      this._elementLikeButton.classList.remove("card__like_active");
    }
  }

  _isLiked() {
    const isLiked = this._likes.find((item) => {
      if (item._id === this._currentUserId) {
        return true;
      }
    });

    return isLiked;
  }

  _createCardElements() {
    this._element = this._getTemplate();
    this._elementCardImage = this._element.querySelector(".card__image");
    this._elementLikeButton = this._element.querySelector(".card__like");
    this._likeCounter = this._element.querySelector(".card__like-counter");

    if (this._isLiked()) {
      this._elementLikeButton.classList.add("card__like_active");
    }

    this._elementCardImage.src = this._link;
    this._elementCardImage.alt = this._name;
    this._element.querySelector(".card__text").textContent = this._name;
    this._element.querySelector(".card__like-counter").textContent =
      this._likeCount;
  }

  generateCard() {
    this._createCardElements();
    this._setEventListeners();
    return this._element;
  }
}
