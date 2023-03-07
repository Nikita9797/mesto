const popupElement = document.querySelector(".popup");
const popupCloseButtonElement = popupElement.querySelector(".popup__close-button");
const inputUserNameElement = popupElement.querySelector(".popup__input-text_el_name");
const inputUserStatusElement = popupElement.querySelector(".popup__input-text_el_status");
const formElement = popupElement.querySelector(".popup__inputs");
const editButtonElement = document.querySelector(".profile__edit-button");
const userName = document.querySelector(".profile__name");
const userStatus = document.querySelector(".profile__status");

function openPopup() {
    inputUserNameElement.value = userName.textContent;
    inputUserStatusElement.value = userStatus.textContent;
    popupElement.classList.add("popup_opened");
}

function closePopup() {
    popupElement.classList.remove("popup_opened");
}

function saveEdit(evt) {
    evt.preventDefault();
    userName.textContent = inputUserNameElement.value;
    userStatus.textContent = inputUserStatusElement.value;
    closePopup();
}


editButtonElement.addEventListener("click", openPopup);
popupCloseButtonElement.addEventListener("click", closePopup);
formElement.addEventListener("submit", saveEdit);