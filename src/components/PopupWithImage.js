import { Popup } from "./Popup.js";

export class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
        this._popupImageElement = this._element.querySelector(".popup__image");
        this._popupImageText = this._element.querySelector(".popup__sub-text");
    }
    
    open(data) {
        super.open();
        this._popupImageElement.src = data.link;
        this._popupImageElement.alt = data.name;
        this._popupImageText.textContent = data.name;
    }
}