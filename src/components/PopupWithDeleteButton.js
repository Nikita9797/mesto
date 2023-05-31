import { Popup } from "./Popup";

export class PopupWithDeleteButton extends Popup {
    constructor(popupSelector, handleSubmit) {
        super(popupSelector);
        this._popup = document.querySelector(popupSelector)
        this._handleSubmit = handleSubmit;
        this._popupDeleteMessageOk = this._popup.querySelector(".popup__button");
    }

    setEventListeners() {
        super.setEventListeners();
        this._popupDeleteMessageOk.addEventListener("click", () => {
            this._handleSubmit()
        })
    }

    open(currentCard) {
        super.open()
        this.currentCard = currentCard;
    }
}