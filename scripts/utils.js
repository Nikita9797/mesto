function openPopup(popup) {
    popup.classList.add("popup_opened");
    document.addEventListener("keydown", closePopupByPressOnEsc);
}

function closePopup(popup) {
    popup.classList.remove("popup_opened");
    document.removeEventListener("keydown", closePopupByPressOnEsc);
}

function closePopupByClickOnOverlay(evt, popup) {
    if (evt.target === evt.currentTarget) {
      closePopup(popup);
    }
}

function closePopupByPressOnEsc(evt) {
  if (evt.key === "Escape") {
    const openedPopup = document.querySelector(".popup_opened");
    closePopup(openedPopup); 
  }
}

export {openPopup, closePopup, closePopupByClickOnOverlay};