import { Card } from "../components/Card.js";
import { api } from "../components/Api.js";
import { CardCurrentUser } from "../components/CardCurrentUser.js";
import {
  profilePopup,
  userInfo,
  addNewCardPopup,
  popupDelete,
  profilePopupAvatar,
} from "../pages/index.js";
import {
  inputUserNameElement,
  inputUserStatusElement,
  formProfileValidation,
  formCardAddValidation,
  formSetAvatarVlidation,
} from "./constants.js";

function createCard(data, templateSelector, handleOnCardClickFunc) {
  const card = new Card(
    data,
    templateSelector,
    handleOnCardClickFunc,
    () => {
      addLikeButtonActive(card, card.id);
    },
    () => {
      removeLikeButtonActive(card, card.id);
    },
    userInfo.getUserId()
  );

  return card.generateCard();
}

function createCurentUserCard(data, templateSelector, handleOnCardClickFunc) {
  const card = new CardCurrentUser(
    data,
    templateSelector,
    handleOnCardClickFunc,
    () => {
      addLikeButtonActive(card, card.id);
    },
    () => {
      removeLikeButtonActive(card, card.id);
    },
    () => {
      popupDelete.open(card);
    },
    userInfo.getUserId()
  );
  return card.generateCard();
}

function addLikeButtonActive(card, cardId) {
  api
    .likeCard(cardId)
    .then((res) => {
      card.setLikes(res.likes);
    })
    .catch((err) => {
      console.log(err);
    });
}

function removeLikeButtonActive(card, cardId) {
  api
    .likeCardDelete(cardId)
    .then((res) => {
      card.setLikes(res.likes);
    })
    .catch((err) => {
      console.log(err);
    });
}

function setInputsValuesProfilePopup() {
  const userInfoObj = userInfo.getUserInfo();
  inputUserNameElement.value = userInfoObj.name;
  inputUserStatusElement.value = userInfoObj.status;
}

function handleOpenPopupProfile() {
  profilePopup.open();
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

function renderLoading(currentPopupButton, isLoading) {
  if (isLoading) {
    currentPopupButton.textContent = "Сохранение...";
  } else {
    currentPopupButton.textContent = "Сохранить";
  }
}

formProfileValidation.enableValidation();
formCardAddValidation.enableValidation();
formSetAvatarVlidation.enableValidation();

export {
  createCard,
  createCurentUserCard,
  handleOpenPopupProfile,
  handleOpenPopupAddCard,
  handleOpenPopupSetAvatar,
  renderLoading,
};
