import {Card} from "./Card.js";
import {initialCards} from "./cards.js";
import {openPopup, closePopup, closePopupByClickOnOverlay} from "./utils.js";
import {FormValidator} from "./FormValidator.js";

const popupProfileEditElement = document.querySelector(".popup_el_profile-edit");
const popupProfileCloseButtonElement = popupProfileEditElement.querySelector(".popup__close-button");
const inputUserNameElement = popupProfileEditElement.querySelector(".popup__input-text_el_name");
const inputUserStatusElement = popupProfileEditElement.querySelector(".popup__input-text_el_status");
const formProfileElement = popupProfileEditElement.querySelector(".popup__inputs");
const buttonEditProfile = document.querySelector(".profile__edit-button");
const userName = document.querySelector(".profile__name");
const userStatus = document.querySelector(".profile__status");
const cardsElement = document.querySelector(".cards");

const popupAddCardElement = document.querySelector(".popup_el_add-card");
const popupAddCardButtonElement = popupAddCardElement.querySelector(".popup__button");
const popupAddCardCloseButtonElement = popupAddCardElement.querySelector(".popup__close-button");
const inputCardTitleElement = popupAddCardElement.querySelector(".popup__input-text_el_title");
const inputCardURLElement = popupAddCardElement.querySelector(".popup__input-text_el_url");
const formCardElement = popupAddCardElement.querySelector(".popup__inputs");
const cardAddButtonElement = document.querySelector(".add-button");


const validationConfig = {
  formSelector: '.popup__inputs',
  inputSelector: '.popup__input-text',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_inactive',
  inputErrorClass: 'popup__input-text_type_error',
  errorClass: 'popup__input-text-error_visible'
}

initialCards.forEach(item => {
  cardsElement.prepend(createCard(item, "#card-template"));
});

function createCard(data, templateSelector) {
  const card = new Card(data, templateSelector);
  return card.generateCard();
}


function setInputsValuesProfilePopup() {
    inputUserNameElement.value = userName.textContent;
    inputUserStatusElement.value = userStatus.textContent;
}

function saveProfileEdit(evt) {
    evt.preventDefault();
    userName.textContent = inputUserNameElement.value;
    userStatus.textContent = inputUserStatusElement.value;
    closePopup(popupProfileEditElement);
}

function handleAddNewCard(evt) {
  evt.preventDefault();
  cardsElement.prepend(createCard({name: inputCardTitleElement.value, link: inputCardURLElement.value}, "#card-template"));
  formCardAddValidation.disableButton();
  closePopup(popupAddCardElement);
  evt.target.reset()
}


const formProfileValidation = new FormValidator(validationConfig, popupProfileEditElement);
formProfileValidation.enableValidation()

function handleOpenPopupProfile() {
    setInputsValuesProfilePopup()
    formProfileValidation.resetValidation();
    openPopup(popupProfileEditElement)
}

const formCardAddValidation = new FormValidator(validationConfig, popupAddCardElement);
formCardAddValidation.enableValidation()

function handleOpencardAddPopup() {
    openPopup(popupAddCardElement)
}




buttonEditProfile.addEventListener("click", handleOpenPopupProfile);
popupProfileCloseButtonElement.addEventListener("click", () => closePopup(popupProfileEditElement));
popupProfileEditElement.addEventListener("click", evt => closePopupByClickOnOverlay(evt, popupProfileEditElement));
formProfileElement.addEventListener("submit", saveProfileEdit);

cardAddButtonElement.addEventListener("click", handleOpencardAddPopup);
popupAddCardCloseButtonElement.addEventListener("click", () => closePopup(popupAddCardElement));
popupAddCardElement.addEventListener("click", evt => closePopupByClickOnOverlay(evt, popupAddCardElement));
formCardElement.addEventListener("submit", handleAddNewCard);