import "./index.css";
import { Section } from "../components/Section.js";
import { PopupWithDeleteButton } from "../components/PopupWithDeleteButton.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { UserInfo } from "../components/UserInfo.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import { api } from "../components/Api.js";
import {
  createCard,
  createCurentUserCard,
  handleOpenPopupProfile,
  handleOpenPopupAddCard,
  handleOpenPopupSetAvatar,
  renderLoading,
} from "../utils/utils.js";
import {
  formCardAddValidation,
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
  popupProfileEdidButton,
  popupAddCardButton,
  popupSetAvatarMessageButton,
} from "../utils/constants.js";

const initialCardList = new Section(
  {
    items: [],
    renderer: (item) => {
      if (userInfo.isCurrentUserOwner(item.owner._id)) {
        const cardUserElement = createCurentUserCard(
          item,
          "#card-user-template",
          () => {
            popupWithImage.open(item);
          }
        );
        initialCardList.addItem(cardUserElement);
      } else {
        const cardElement = createCard(item, "#card-template", () => {
          popupWithImage.open(item);
        });
        initialCardList.addItem(cardElement);
      }
    },
  },
  ".cards"
);

Promise.all([api.getUserInfo(), api.getInitialCards()])
  .then(([userData, cardsData]) => {
    userInfo.setUserInfo(userData);
    initialCardList.items = cardsData;
    initialCardList.renderItems();
  })
  .catch((err) => {
    console.log(err);
  });

export const userInfo = new UserInfo({
  nameSelector: ".profile__name",
  statusSelector: ".profile__status",
  avatarSelector: ".profile__image",
});

export const profilePopup = new PopupWithForm(
  ".popup_el_profile-edit",
  (inputsValue) => {
    renderLoading(popupProfileEdidButton, true);
    api
      .setUserInfo(inputsValue.name, inputsValue.status)
      .then((res) => {
        userInfo.setUserInfo(res);
        profilePopup.close();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        renderLoading(popupProfileEdidButton, false);
      });
  }
);

export const addNewCardPopup = new PopupWithForm(
  ".popup_el_add-card",
  (inputsValue) => {
    renderLoading(popupAddCardButton, true);
    api
      .addNewCard(inputsValue.name, inputsValue.link)
      .then((res) => {
        const cardUserElement = createCurentUserCard(
          res,
          "#card-user-template",
          () => {
            popupWithImage.open(inputsValue);
          }
        );
        initialCardList.addItem(cardUserElement);
        formCardAddValidation.disableButton();
        addNewCardPopup.close();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        renderLoading(popupAddCardButton, false);
      });
  }
);

const popupWithImage = new PopupWithImage(".popup_el_popup-image");

export const popupDelete = new PopupWithDeleteButton(
  ".popup_el_popup-delete",
  () => {
    api
      .deleteCard(popupDelete.currentCard.id)
      .then(() => {
        popupDelete.currentCard.deleteCard();
        popupDelete.close();
      })
      .catch((err) => {
        console.log(err);
      });
  }
);

export const profilePopupAvatar = new PopupWithForm(
  ".popup_el_set-avatar",
  (inputsValue) => {
    renderLoading(popupSetAvatarMessageButton, true);
    api
      .setAvatar(inputsValue.src)
      .then((res) => {
        userInfo.setUserInfo(res);
        profilePopupAvatar.close();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        renderLoading(popupSetAvatarMessageButton, false);
      });
  }
);

buttonEditProfile.addEventListener("click", handleOpenPopupProfile);
popupProfileCloseButtonElement.addEventListener("click", () =>
  profilePopup.close()
);
cardAddButtonElement.addEventListener("click", handleOpenPopupAddCard);
popupAddCardCloseButtonElement.addEventListener("click", () =>
  addNewCardPopup.close()
);
popupCardImageCloseButton.addEventListener("click", () =>
  popupWithImage.close()
);
popupDeleteMessageButton.addEventListener("click", () => popupDelete.close());
userImageOverlayElement.addEventListener("click", handleOpenPopupSetAvatar);
popupSetAvatarCloseButton.addEventListener("click", () =>
  profilePopupAvatar.close()
);
profilePopup.setEventListeners();
addNewCardPopup.setEventListeners();
popupWithImage.setEventListeners();
popupDelete.setEventListeners();
profilePopupAvatar.setEventListeners();
