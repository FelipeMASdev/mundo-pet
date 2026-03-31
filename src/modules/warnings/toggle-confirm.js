import * as DOM from '../../utils/dom-elements.js';
import {toggleAppointmentInteractions} from '../appointments/toggle-appointment-interactions.js';

export function toggleConfirm(message) {
  if (DOM.confirmCard.classList.contains('disabled')) {
    DOM.confirmCard.classList.remove('disabled');
    DOM.blurFilter.classList.remove('disabled');
    DOM.blurFilter.style.zIndex = "3";
    toggleAppointmentInteractions();

    if (message) {
      DOM.confirmText.textContent = message;
    }
  } else {
    DOM.confirmCard.classList.add('disabled');
    DOM.blurFilter.classList.add('disabled');
    DOM.blurFilter.style.zIndex = "1";
    DOM.confirmText.textContent = 'Confirm?';
    toggleAppointmentInteractions();
  }

  return DOM.confirmCard;
}
