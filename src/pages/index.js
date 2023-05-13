import './index.css';
import {Section} from "../components/Section.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import {initialCards} from "../scripts/cards.js";
import { UserInfo } from "../components/UserInfo.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import { createCard, handleOpenPopupProfile, handleOpenPopupAddCard } from "../utils/utils.js";
import {formCardAddValidation,
        buttonEditProfile,
        popupProfileCloseButtonElement,
        cardAddButtonElement,
        popupAddCardCloseButtonElement,
        popupCardImageCloseButton,
      } from "../utils/constants.js";


const initialCardList = new Section({
    items: initialCards,
    renderer: (item) => {
      const cardElement = createCard(item, "#card-template", () => {
        popupWithImage.open(item);
      });
      initialCardList.addItem(cardElement);
    }
  },
  ".cards"
);


export const userInfo = new UserInfo({nameSelector: ".profile__name", statusSelector: ".profile__status"});

export const profilePopup = new PopupWithForm(".popup_el_profile-edit", inputsValue => {
  userInfo.setUserInfo(inputsValue);
  profilePopup.close();
});


export const addNewCardPopup = new PopupWithForm(".popup_el_add-card", inputsValue => {
  initialCardList.addItem(createCard(inputsValue, "#card-template", () => {
    popupWithImage.open(inputsValue);
  }));
  formCardAddValidation.disableButton();
  addNewCardPopup.close();
});

const popupWithImage = new PopupWithImage(".popup_el_popup-image");




buttonEditProfile.addEventListener("click", handleOpenPopupProfile);
popupProfileCloseButtonElement.addEventListener("click", () => profilePopup.close());
cardAddButtonElement.addEventListener("click", handleOpenPopupAddCard);
popupAddCardCloseButtonElement.addEventListener("click", () => addNewCardPopup.close());
popupCardImageCloseButton.addEventListener("click", () => popupWithImage.close());
profilePopup.setEventListeners();
addNewCardPopup.setEventListeners();
popupWithImage.setEventListeners();
initialCardList.renderItems();