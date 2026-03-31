import * as DOM from '../../utils/dom-elements.js';
import { toggleAppointmentForm } from '../appointment-form/toggle-appointment-form.js';


const formCloseButton = document.querySelector('#appointment-add .close-button');

formCloseButton.addEventListener('click', () => {
  toggleAppointmentForm();
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    if(DOM.sectionAppointmentAdd.classList.contains('disabled')){
      return
    }
    toggleAppointmentForm();
  }
});