import { Popup } from "./Popup.js";

export class PopupWithForm extends Popup {
    constructor(popupSelector, handleSubmit) {
        super(popupSelector);
        this._handleSubmit = handleSubmit;
        this._form = this._element.querySelector(".popup__inputs");
    }

    _getInputValues() {
        this._inputList = this._element.querySelectorAll(".popup__input-text");
        this._formValues = {};
        this._inputList.forEach(input => {
          this._formValues[input.name] = input.value;
        });
        return this._formValues;
    }

    setEventListeners() {
        super.setEventListeners();
        this._form.addEventListener("submit", evt => {
            evt.preventDefault();
            this._handleSubmit(this._getInputValues());
        });
    }

    close() {
        super.close();
        this._form.reset();
    }
}