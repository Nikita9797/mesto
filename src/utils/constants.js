import {FormValidator} from "../components/FormValidator.js";

export const popupProfileEditElement = document.querySelector(".popup_el_profile-edit");
export const popupAddCardElement = document.querySelector(".popup_el_add-card");
export const popupCardImage = document.querySelector(".popup_el_popup-image");
export const popupProfileCloseButtonElement = popupProfileEditElement.querySelector(".popup__close-button");
export const inputUserNameElement = popupProfileEditElement.querySelector(".popup__input-text_el_name");
export const inputUserStatusElement = popupProfileEditElement.querySelector(".popup__input-text_el_status");
export const buttonEditProfile = document.querySelector(".profile__edit-button");
export const popupAddCardCloseButtonElement = popupAddCardElement.querySelector(".popup__close-button");
export const cardAddButtonElement = document.querySelector(".add-button");
export const popupCardImageCloseButton = popupCardImage.querySelector(".popup__close-button");


export const validationConfig = {
  formSelector: '.popup__inputs',
  inputSelector: '.popup__input-text',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_inactive',
  inputErrorClass: 'popup__input-text_type_error',
  errorClass: 'popup__input-text-error_visible'
}

export const formProfileValidation = new FormValidator(validationConfig, popupProfileEditElement);
export const formCardAddValidation = new FormValidator(validationConfig, popupAddCardElement);