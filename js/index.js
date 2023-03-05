const popupElement = document.querySelector(".popup");
const popupCloseButtonElement = popupElement.querySelector(".popup__close-icon");
const inputElements = popupElement.querySelectorAll(".popup__input-text");
const formElement = popupElement.querySelector(".popup__inputs");
const editButtonElement = document.querySelector(".profile__edit-button");
const userName = document.querySelector(".profile__name");
const userStatus = document.querySelector(".profile__status");

function openPopup() {
    inputElements[0].value = userName.textContent;
    inputElements[1].value = userStatus.textContent;
    popupElement.classList.add("popup_opened");
}

function closePopup() {
    popupElement.classList.remove("popup_opened");
}

function saveEdit(evt) {
    evt.preventDefault();
    userName.textContent = inputElements[0].value;
    userStatus.textContent = inputElements[1].value;
    closePopup();
}


editButtonElement.addEventListener("click", openPopup);
popupCloseButtonElement.addEventListener("click", closePopup);
formElement.addEventListener("submit", saveEdit);