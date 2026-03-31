import * as DOM from '../../utils/dom-elements.js';

export function toggleFormInteraction() {
  const formElements = [DOM.tutor, DOM.pet, DOM.telephone, DOM.service, DOM.date, DOM.time, DOM.submitButton];

  formElements.forEach(element => {
    if (element.hasAttribute('disabled')) {
      element.removeAttribute('disabled');
    } else {
      element.setAttribute('disabled', 'true');
    }
  });
}