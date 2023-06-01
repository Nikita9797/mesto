import { Card } from "./Card.js";
export class CardCurrentUser extends Card {
  constructor(
    data,
    templateSelector,
    handleOnCardClickFunc,
    handleLikeClickOnFunc,
    handleLikeClickOffFunc,
    handleOnTrashButtonClickFunc,
    userId
  ) {
    super(
      data,
      templateSelector,
      handleOnCardClickFunc,
      handleLikeClickOnFunc,
      handleLikeClickOffFunc,
      userId
    );
    this._handleOnTrashButtonClickFunc = handleOnTrashButtonClickFunc;
  }

  _setEventListeners() {
    super._setEventListeners();
    this._elementTrashButton.addEventListener("click", () => {
      this._handleOnTrashButtonClickFunc();
    });
  }

  deleteCard() {
    this._element.remove();
    this._element = null;
  }

  generateCard() {
    super._createCardElements();
    this._elementTrashButton = this._element.querySelector(".card__trash");
    this._setEventListeners();
    return this._element;
  }
}
