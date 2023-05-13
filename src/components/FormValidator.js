export class FormValidator {
  constructor(data, popup) {
    this._formSelector = data.formSelector;
    this._inputSelector = data.inputSelector;
    this._submitButtonSelector = data.submitButtonSelector;
    this._inactiveButtonClass = data.inactiveButtonClass;
    this._inputErrorClass = data.inputErrorClass;
    this._errorClass = data.errorClass;
    this._popup = popup;
  }

  enableValidation() {
    this._form = this._popup.querySelector(this._formSelector);
    this._setEventListener(this._form);
  }

  _setEventListener(form) {
    this._formInputs = Array.from(form.querySelectorAll(this._inputSelector));
    this._formButton = form.querySelector(this._submitButtonSelector);
    this._formInputs.forEach(input => {
      input.addEventListener("input", () => {
        this._checkInputValidity(input);
        if (this._hasInvalidInput()) {
          this.disableButton();
        } else {
          this._enableButton();
        }
      });
    })
  }


  _checkInputValidity(input) {
    this._currentInputErrorContainer = document.querySelector(`.${input.id}-error`);
    if (input.validity.valid) {
      this._hideErrorMessage(input);
    } else {
      this._showErrorMessage(input, input.validationMessage);
    }
  }

  _showErrorMessage(input, errorMessage) {
    this._currentInputErrorContainer.classList.add(this._errorClass);
    this._currentInputErrorContainer.textContent = errorMessage;
    input.classList.add(this._inputErrorClass);
  }
  
  _hideErrorMessage(input) {
    this._currentInputErrorContainer.classList.remove(this._errorClass);
    this._currentInputErrorContainer.textContent = "";
    input.classList.remove(this._inputErrorClass);
  }


  _hasInvalidInput() {
    return this._formInputs.some(input => !input.validity.valid);
  }
  
  _enableButton() {
    this._formButton.classList.remove(this._inactiveButtonClass);
    this._formButton.removeAttribute("disabled");
  }
  
  disableButton() {
    this._formButton.classList.add(this._inactiveButtonClass);
    this._formButton.setAttribute("disabled", true);
  }

  resetValidation() {
    this._formInputs.forEach(input => {
      this._checkInputValidity(input);
      if (this._hasInvalidInput()) {
        this.disableButton();
      } else {
        this._enableButton();
      }
    });
  }
}