const popupProfileEditElement = document.querySelector(".popup_el_profile-edit");
const popupProfileCloseButtonElement = popupProfileEditElement.querySelector(".popup__close-button");
const inputUserNameElement = popupProfileEditElement.querySelector(".popup__input-text_el_name");
const inputUserStatusElement = popupProfileEditElement.querySelector(".popup__input-text_el_status");
const formProfileElement = popupProfileEditElement.querySelector(".popup__inputs");
const editButtonElement = document.querySelector(".profile__edit-button");
const userName = document.querySelector(".profile__name");
const userStatus = document.querySelector(".profile__status");

const popupAddCardElement = document.querySelector(".popup_el_add-card");
const popupAddCardCloseButtonElement = popupAddCardElement.querySelector(".popup__close-button");
const inputCardTitleElement = popupAddCardElement.querySelector(".popup__input-text_el_title");
const inputCardURLElement = popupAddCardElement.querySelector(".popup__input-text_el_url");
const formCardElement = popupAddCardElement.querySelector(".popup__inputs");
const addCardButtonElement = document.querySelector(".add-button");



const initialCards = [
    {
      name: 'Архыз',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
      name: 'Челябинская область',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
      name: 'Иваново',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
      name: 'Камчатка',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
      name: 'Холмогорский район',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
      name: 'Байкал',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
];

initialCards.forEach(item => createNewCard(item.link, item.name));

function openProfileEditPopup() {
    inputUserNameElement.value = userName.textContent;
    inputUserStatusElement.value = userStatus.textContent;
    popupProfileEditElement.classList.remove("popup_closed");
    popupProfileEditElement.classList.add("popup_opened");
}

function closeProfileEditPopup() {
    popupProfileEditElement.classList.remove("popup_opened");
    popupProfileEditElement.classList.add("popup_closed");
}

function saveProfileEdit(evt) {
    evt.preventDefault();
    userName.textContent = inputUserNameElement.value;
    userStatus.textContent = inputUserStatusElement.value;
    closeProfileEditPopup();
}

function openAddCardPopup() {
  popupAddCardElement.classList.remove("popup_closed");
  popupAddCardElement.classList.add("popup_opened");
}

function closeAddCardPopup() {
  popupAddCardElement.classList.remove("popup_opened");
  popupAddCardElement.classList.add("popup_closed");
}

function createNewCard(url="", title="") {
  const cardTemplate = document.querySelector("#card-template").content;
  const cardsElement = document.querySelector(".cards");
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  const likeButton = cardElement.querySelector(".card__like");
  const trashButton = cardElement.querySelector(".card__trash");
  const cardImage = cardElement.querySelector(".card__image");

  cardElement.querySelector(".card__image").src = url || inputCardURLElement.value;
  cardElement.querySelector(".card__text").textContent = title || inputCardTitleElement.value;

  cardsElement.prepend(cardElement);

  function toggleLikeStatus() {
    likeButton.classList.toggle("card__like_active");
  }

  function deleteCard(evt) {
    const currentCard = evt.target.closest(".card");
    currentCard.remove()
  }

  function openImagePopup() {
    const popupImageElement = document.querySelector(".popup-card");
    const cardIcon = popupImageElement.querySelector(".popup-card__icon");
    
    popupImageElement.querySelector(".popup-card__image").src = cardElement.querySelector(".card__image").src;
    popupImageElement.querySelector(".popup-card__text").textContent = cardElement.querySelector(".card__text").textContent;

    function closeImagePopup() {
      popupImageElement.classList.remove("popup-card_opened");
      popupImageElement.classList.add("popup-card_closed");
    }

    popupImageElement.classList.remove("popup-card_closed");
    popupImageElement.classList.add("popup-card_opened");
    cardIcon.addEventListener("click", closeImagePopup);
  }

  likeButton.addEventListener("click", toggleLikeStatus);
  trashButton.addEventListener("click", deleteCard);
  cardImage.addEventListener("click", openImagePopup);
}

function addNewCard(evt) {
  evt.preventDefault();
  createNewCard();
  closeAddCardPopup();

  inputCardURLElement.value = "";
  inputCardTitleElement.value = "";
}


editButtonElement.addEventListener("click", openProfileEditPopup);
popupProfileCloseButtonElement.addEventListener("click", closeProfileEditPopup);
formProfileElement.addEventListener("submit", saveProfileEdit);

addCardButtonElement.addEventListener("click", openAddCardPopup);
popupAddCardCloseButtonElement.addEventListener("click", closeAddCardPopup);
formCardElement.addEventListener("submit", addNewCard);