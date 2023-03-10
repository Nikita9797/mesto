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
const popupAddCardCloseButtonElement = popupAddCardElement.querySelector(".popup__close-button");
const inputCardTitleElement = popupAddCardElement.querySelector(".popup__input-text_el_title");
const inputCardURLElement = popupAddCardElement.querySelector(".popup__input-text_el_url");
const formCardElement = popupAddCardElement.querySelector(".popup__inputs");
const cardAddButtonElement = document.querySelector(".add-button");
const popupImageElement = document.querySelector(".popup_el_popup-image");
const cardIcon = popupImageElement.querySelector(".popup__close-icon");



initialCards.forEach(item => cardsElement.prepend(createNewCard(item.link, item.name)));

function openPopup(popup) {
    popup.classList.add("popup_opened");
}

function closePopup(popup) {
    popup.classList.remove("popup_opened");
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

function createNewCard(url, title) {
  const cardTemplate = document.querySelector("#card-template").content;
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  const likeButton = cardElement.querySelector(".card__like");
  const trashButton = cardElement.querySelector(".card__trash");
  const cardImage = cardElement.querySelector(".card__image");

  cardElement.querySelector(".card__image").src = url;
  cardElement.querySelector(".card__image").alt = title;
  cardElement.querySelector(".card__text").textContent = title;

  trashButton.addEventListener("click", deleteCard);
  cardImage.addEventListener("click", createImagePopup);
  likeButton.addEventListener("click", toggleLikeStatus);
  cardImage.addEventListener("click", evt => createImagePopup(evt, url, title));
  cardImage.addEventListener("click", () => openPopup(popupImageElement));
  return cardElement;
}

function addNewCard(evt) {
  evt.preventDefault();
  cardsElement.prepend(createNewCard(inputCardURLElement.value, inputCardTitleElement.value));
  closePopup(popupAddCardElement);

  inputCardURLElement.value = "";
  inputCardTitleElement.value = "";
}

function toggleLikeStatus(evt) {
  evt.target.classList.toggle("card__like_active");
}

function deleteCard(evt) {
  const currentCard = evt.target.closest(".card");
  currentCard.remove();
}

function createImagePopup(evt, url, title) {
  popupImageElement.querySelector(".popup__image").src = url;
  popupImageElement.querySelector(".popup__image").alt = title;
  popupImageElement.querySelector(".popup__sub-text").textContent = title;
}


buttonEditProfile.addEventListener("click", () => openPopup(popupProfileEditElement));
buttonEditProfile.addEventListener("click", setInputsValuesProfilePopup);
popupProfileCloseButtonElement.addEventListener("click", () => closePopup(popupProfileEditElement));
formProfileElement.addEventListener("submit", saveProfileEdit);

cardAddButtonElement.addEventListener("click", () => openPopup(popupAddCardElement));
popupAddCardCloseButtonElement.addEventListener("click", () => closePopup(popupAddCardElement));
formCardElement.addEventListener("submit", addNewCard);

cardIcon.addEventListener("click", () => closePopup(popupImageElement));