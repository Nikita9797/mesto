import {initialCards, Card} from "./Card.js";
import {validationConfig, FormValidator} from "./FormValidator.js";

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


initialCards.forEach(item => {
  const card = new Card(item, "#card-template");
  const cardElement = card.generateCard();
  cardsElement.prepend(cardElement);
});


function openPopup(popup) {
    popup.classList.add("popup_opened");
    document.addEventListener("keydown", closePopupByPressOnEsc);
}

function closePopup(popup) {
    popup.classList.remove("popup_opened");
    document.removeEventListener("keydown", closePopupByPressOnEsc);
}

function closePopupByClickOnOverlay(evt, popup) {
    if (evt.target === evt.currentTarget) {
      closePopup(popup);
    }
}

function closePopupByPressOnEsc(evt) {
  if (evt.key === "Escape") {
    const openedPopup = document.querySelector(".popup_opened");
    closePopup(openedPopup); 
  }
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
  const newCard = new Card({name: inputCardTitleElement.value, link: inputCardURLElement.value}, "#card-template");
  cardsElement.prepend(newCard.generateCard());
  popupAddCardButtonElement.classList.add(validationConfig.inactiveButtonClass);
  popupAddCardButtonElement.setAttribute("disabled", true);
  closePopup(popupAddCardElement);

  inputCardURLElement.value = "";
  inputCardTitleElement.value = "";
}


buttonEditProfile.addEventListener("click", () => openPopup(popupProfileEditElement));
buttonEditProfile.addEventListener("click", setInputsValuesProfilePopup);
buttonEditProfile.addEventListener("click", () => new FormValidator(validationConfig, popupProfileEditElement).enableValidation());
popupProfileCloseButtonElement.addEventListener("click", () => closePopup(popupProfileEditElement));
popupProfileEditElement.addEventListener("click", evt => closePopupByClickOnOverlay(evt, popupProfileEditElement));
formProfileElement.addEventListener("submit", saveProfileEdit);

cardAddButtonElement.addEventListener("click", () => openPopup(popupAddCardElement));
cardAddButtonElement.addEventListener("click", () => new FormValidator(validationConfig, popupAddCardElement).enableValidation());
popupAddCardCloseButtonElement.addEventListener("click", () => closePopup(popupAddCardElement));
popupAddCardElement.addEventListener("click", evt => closePopupByClickOnOverlay(evt, popupAddCardElement));
formCardElement.addEventListener("submit", handleAddNewCard);