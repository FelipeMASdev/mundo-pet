import * as DOM from '../../utils/dom-elements.js';

export function toggleAppointmentInteractions() {
  const formElements = [DOM.selectDateInput, DOM.newAppointmentButton];

  formElements.forEach(element => {
    if (element.hasAttribute('disabled')) {
      element.removeAttribute('disabled');
    } else {
      element.setAttribute('disabled', 'true');
    }
  });
}