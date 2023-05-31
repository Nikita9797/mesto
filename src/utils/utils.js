import { Card } from "../components/Card.js";
import { api } from "../components/Api.js";
import { CardCurrentUser } from "../components/CardCurrentUser.js";
import { profilePopup, userInfo, addNewCardPopup, popupDelete, profilePopupAvatar } from "../pages/index.js";
import { inputUserNameElement, inputUserStatusElement, formProfileValidation, formCardAddValidation, formSetAvatarVlidation } from "./constants.js";

function createCard(data, templateSelector, handleOnCardClickFunc) {
  const card = new Card(data, templateSelector, handleOnCardClickFunc, () => {
    api.likeCard(card.id)
    .then(res => {
      card.likes = res.likes;
    });
  }, () => {
    api.likeCardDelete(card.id)
      .then(res => {
        card.likes = res.likes;
      });
  },
  api.getUserId());

  return card.generateCard();
}

function createCurentUserCard(data, templateSelector, handleOnCardClickFunc) {
  const card = new CardCurrentUser(data, templateSelector, handleOnCardClickFunc, () => {
    api.likeCard(card.id)
    .then(res => {
      card.likes = res.likes;
    });
  }, () => {
    api.likeCardDelete(card.id)
      .then(res => {
        card.likes = res.likes;
      });
  }, () => {
      popupDelete.open(card);
  },
  api.getUserId());
    return card.generateCard();
}


function setInputsValuesProfilePopup() {
  const userInfoObj = userInfo.getUserInfo();
    inputUserNameElement.value = userInfoObj.name;
    inputUserStatusElement.value = userInfoObj.status;
}

function handleOpenPopupProfile() {
  profilePopup.open()
  setInputsValuesProfilePopup();
  formProfileValidation.resetValidation();
}

function handleOpenPopupAddCard() {
  addNewCardPopup.open();
  formCardAddValidation.disableButton();
}

function handleOpenPopupSetAvatar() {
  profilePopupAvatar.open();
  formSetAvatarVlidation.disableButton();
}

function renderLoading(currentPopupSelector, isLoading) {
  const currentPopup = document.querySelector(currentPopupSelector);
  const currentButton = currentPopup.querySelector(".popup__button");
  currentPopup.querySelector(".popup__button").textContent = "Сохранение...";
  if (isLoading) {
    currentButton.textContent = "Сохранение...";
  } else {
    currentButton.textContent = "Сохранить";
  }
}

formProfileValidation.enableValidation()
formCardAddValidation.enableValidation()
formSetAvatarVlidation.enableValidation();

export {createCard, createCurentUserCard, handleOpenPopupProfile, handleOpenPopupAddCard, handleOpenPopupSetAvatar, renderLoading}