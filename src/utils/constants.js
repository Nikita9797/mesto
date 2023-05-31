import {FormValidator} from "../components/FormValidator.js";

export const userNameElement = document.querySelector(".profile__name");
export const userStatusElement = document.querySelector(".profile__status");
export const userImageOverlayElement = document.querySelector(".profile__overlay");
export const userImageElement = document.querySelector(".profile__image");
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
const popupDeleteMessage = document.querySelector(".popup_el_popup-delete");
export const popupDeleteMessageButton = popupDeleteMessage.querySelector(".popup__close-button");
const popupSetAvatarMessage = document.querySelector(".popup_el_set-avatar");
export const popupSetAvatarCloseButton = popupSetAvatarMessage.querySelector(".popup__close-button");
export const optionsApi = {
  baseUrl: "https://mesto.nomoreparties.co/v1/cohort-66",
  headers: {
    authorization: "4a6ef0c5-9780-4b1d-beb1-fe5189f66d0b",
    'Content-Type': 'application/json'
  }
}


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
export const formSetAvatarVlidation = new FormValidator(validationConfig, popupSetAvatarMessage);