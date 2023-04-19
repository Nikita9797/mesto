import {openPopup, closePopup, closePopupByClickOnOverlay} from "./utils.js";

export class Card {
  constructor(data, templateSelector) {
    this._name = data.name;
    this._link = data.link;
    this._templateSelector = templateSelector;
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
      this._createImagePopup();
    });

    this._elementCardImage.addEventListener("click", () => {
      openPopup(this._popupImage);
    });

    this._cardIcon.addEventListener("click", () => {
      closePopup(this._popupImage);
    })

    this._popupImage.addEventListener("click", evt => {
      closePopupByClickOnOverlay(evt, this._popupImage);
    })

    this._elementTrashButton.addEventListener("click", () => {
      this._deleteCard();
    });

    this._elementLikeButton.addEventListener("click", () => {
      this._toggleLikeStatus();
    });

  }

  _deleteCard() {
    this._element.remove();
  }

  _createImagePopup() {
    this._popupImageElement.src = this._link;
    this._popupImageElement.alt = this._name;
    this._popupImageText.textContent = this._name;
  }

  _toggleLikeStatus() {
    this._elementLikeButton.classList.toggle("card__like_active");
  }


  generateCard() {
    this._element = this._getTemplate();
    this._elementCardImage = this._element.querySelector(".card__image");
    this._elementLikeButton = this._element.querySelector(".card__like");
    this._elementTrashButton = this._element.querySelector(".card__trash");
    this._popupImage = document.querySelector(".popup_el_popup-image");
    this._popupImageElement = this._popupImage.querySelector(".popup__image");
    this._popupImageText = this._popupImage.querySelector(".popup__sub-text");
    this._cardIcon = this._popupImage.querySelector(".popup__close-icon");
    this._setEventListeners();

    this._element.querySelector(".card__image").src = this._link;
    this._element.querySelector(".card__image").alt = this._name;
    this._element.querySelector(".card__text").textContent = this._name;
  
    return this._element;
  }
}