const validationConfig = {
  formSelector: '.popup__inputs',
  inputSelector: '.popup__input-text',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_inactive',
  inputErrorClass: 'popup__input-text_type_error',
  errorClass: 'popup__input-text-error_visible'
}

function enableValidation({formSelector, ...rest}) {
  const forms = Array.from(document.querySelectorAll(formSelector));
  forms.forEach(form => setEventListeners(form, rest));
}

function setEventListeners(form, {inputSelector, submitButtonSelector, ...rest}) {
  const formInputs = Array.from(form.querySelectorAll(inputSelector));
  const formButton = form.querySelector(submitButtonSelector);
  formInputs.forEach(input => {
    input.addEventListener("input", () => {
      checkInputValidity(input, rest);
      if (hasInvalidInput(formInputs)) {
        disableButton(formButton, rest);
      } else {
        enableButton(formButton, rest);
      }
    });
  })
}

function checkInputValidity(input, rest) {
  const currentInputErrorContainer = document.querySelector(`.${input.id}-error`);
  if (input.validity.valid) {
    hideErrorMessage(input, currentInputErrorContainer, rest);
  } else {
    showErrorMessage(input, currentInputErrorContainer, rest);
  }
}

function showErrorMessage(input, span, {errorClass, inputErrorClass}) {
  span.classList.add(errorClass);
  span.textContent = input.validationMessage;
  input.classList.add(inputErrorClass);
}

function hideErrorMessage(input, span, {errorClass, inputErrorClass}) {
  span.classList.remove(errorClass);
  span.textContent = "";
  input.classList.remove(inputErrorClass);
}

function hasInvalidInput(formInputs) {
  return formInputs.some(input => !input.validity.valid);
}

function enableButton(button, {inactiveButtonClass}) {
  button.classList.remove(inactiveButtonClass);
  button.removeAttribute("disabled");
}

function disableButton(button, {inactiveButtonClass}) {
  button.classList.add(inactiveButtonClass);
  button.setAttribute("disabled", true);
}

enableValidation(validationConfig);