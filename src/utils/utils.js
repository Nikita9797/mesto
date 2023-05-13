import { Card } from "../components/Card.js";
import { profilePopup, userInfo, addNewCardPopup } from "../pages/index.js";
import { inputUserNameElement, inputUserStatusElement, formProfileValidation, formCardAddValidation } from "./constants.js";

function createCard(data, templateSelector, handleFunc) {
  const card = new Card(data, templateSelector, handleFunc);
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

formProfileValidation.enableValidation()
formCardAddValidation.enableValidation()

export {createCard, handleOpenPopupProfile, handleOpenPopupAddCard}