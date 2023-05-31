import './index.css';
import {Section} from "../components/Section.js";
import { PopupWithDeleteButton } from "../components/PopupWithDeleteButton.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { UserInfo } from "../components/UserInfo.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import { api } from "../components/Api.js";
import { createCard, createCurentUserCard, handleOpenPopupProfile, handleOpenPopupAddCard, handleOpenPopupSetAvatar, renderLoading } from "../utils/utils.js";
import {formCardAddValidation,
        buttonEditProfile,
        popupProfileCloseButtonElement,
        cardAddButtonElement,
        popupAddCardCloseButtonElement,
        popupCardImageCloseButton,
        userNameElement,
        userStatusElement,
        userImageElement,
        userImageOverlayElement,
        popupDeleteMessageButton,
        popupSetAvatarCloseButton,
      } from "../utils/constants.js";


api.getUserInfo()
  .then(res => {
    userNameElement.textContent = res.name;
    userStatusElement.textContent = res.about;
    userImageElement.src = res.avatar;
})

api.getInitialCards()
  .then(res => {
    const initialCardList = new Section({
      items: res,
      renderer: (item) => {
        if (initialCardList.isCurrentUserOwner(api.getUserId(), item.owner._id)) {
          const cardUserElement = createCurentUserCard(item, "#card-user-template", () => {
            popupWithImage.open(item);
          });
          initialCardList.addItem(cardUserElement)
        } else {
          const cardElement = createCard(item, "#card-template", () => {
            popupWithImage.open(item);
          });
          initialCardList.addItem(cardElement);
        }
      }
    },
    ".cards"
  );
    return initialCardList
  })
  .then(res => {
    res.renderItems();
  })
  


export const userInfo = new UserInfo({nameSelector: ".profile__name", statusSelector: ".profile__status"});

export const profilePopup = new PopupWithForm(".popup_el_profile-edit", inputsValue => {
  renderLoading(".popup_el_profile-edit", true);
  api.setUserInfo(inputsValue.name, inputsValue.status)
    .finally(() => {
      renderLoading(".popup_el_profile-edit", false);
    })
  userInfo.setUserInfo(inputsValue);
  profilePopup.close();
});


export const addNewCardPopup = new PopupWithForm(".popup_el_add-card", inputsValue => {
  renderLoading(".popup_el_add-card", true);
  api.addNewCard(inputsValue.name, inputsValue.link)
    .then(res => {
      document.querySelector(".cards").prepend(createCurentUserCard(res, "#card-user-template", () => {
        popupWithImage.open(inputsValue);
      }));
      formCardAddValidation.disableButton();
      addNewCardPopup.close();
    })
    .finally(() => {
      renderLoading(".popup_el_add-card", false);
    })
});

const popupWithImage = new PopupWithImage(".popup_el_popup-image");

export const popupDelete = new PopupWithDeleteButton(".popup_el_popup-delete", () => {
  api.deleteCard(popupDelete.currentCard.id)
    .then(() => {
      popupDelete.currentCard.deleteCard();
      popupDelete.close();
    })
});

export const profilePopupAvatar = new PopupWithForm(".popup_el_set-avatar", inputsValue => {
  renderLoading(".popup_el_set-avatar", true);
  api.setAvatar(inputsValue.src)
    .then(res => {
      userImageElement.src = res.avatar;
      profilePopupAvatar.close();
    })
    .finally(() => {
      renderLoading(".popup_el_set-avatar", false);
    })
});


buttonEditProfile.addEventListener("click", handleOpenPopupProfile);
popupProfileCloseButtonElement.addEventListener("click", () => profilePopup.close());
cardAddButtonElement.addEventListener("click", handleOpenPopupAddCard);
popupAddCardCloseButtonElement.addEventListener("click", () => addNewCardPopup.close());
popupCardImageCloseButton.addEventListener("click", () => popupWithImage.close());
popupDeleteMessageButton.addEventListener("click", () => popupDelete.close());
userImageOverlayElement.addEventListener("click", handleOpenPopupSetAvatar);
popupSetAvatarCloseButton.addEventListener("click", () => profilePopupAvatar.close())
profilePopup.setEventListeners();
addNewCardPopup.setEventListeners();
popupWithImage.setEventListeners();
popupDelete.setEventListeners();
profilePopupAvatar.setEventListeners();