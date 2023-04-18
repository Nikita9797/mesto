const validationConfig = {
  formSelector: '.popup__inputs',
  inputSelector: '.popup__input-text',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_inactive',
  inputErrorClass: 'popup__input-text_type_error',
  errorClass: 'popup__input-text-error_visible'
}

class FormValidator {
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
        if (this._hasInvalidInput(this._formInputs)) {
          this._disableButton(this._formButton);
        } else {
          this._enableButton(this._formButton);
        }
      });
    })
  }


  _checkInputValidity(input) {
    this._currentInputErrorContainer = document.querySelector(`.${input.id}-error`);
    if (input.validity.valid) {
      this._hideErrorMessage(input, this._currentInputErrorContainer);
    } else {
      this._showErrorMessage(input, this._currentInputErrorContainer);
    }
  }

  _showErrorMessage(input, span) {
    span.classList.add(this._errorClass);
    span.textContent = input.validationMessage;
    input.classList.add(this._inputErrorClass);
  }
  
  _hideErrorMessage(input, span) {
    span.classList.remove(this._errorClass);
    span.textContent = "";
    input.classList.remove(this._inputErrorClass);
  }


  _hasInvalidInput(formInputs) {
    return formInputs.some(input => !input.validity.valid);
  }
  
  _enableButton(button,) {
    button.classList.remove(this._inactiveButtonClass);
    button.removeAttribute("disabled");
  }
  
  _disableButton(button) {
    button.classList.add(this._inactiveButtonClass);
    button.setAttribute("disabled", true);
  }
}

export {validationConfig, FormValidator};