import * as DOM from '../../utils/dom-elements.js';

export function toggleConfirm(message) {
  if (DOM.confirmCard.classList.contains('disabled')) {
    DOM.confirmCard.classList.remove('disabled');
    DOM.blurFilter.classList.remove('disabled');
    DOM.blurFilter.style.zIndex = "3";

    if (message) {
      DOM.confirmText.textContent = message;
    }
  } else {
    DOM.confirmCard.classList.add('disabled');
    DOM.blurFilter.classList.add('disabled');
    DOM.blurFilter.style.zIndex = "1";
    DOM.confirmText.textContent = 'Confirm?';
  }

  return DOM.confirmCard;
}
