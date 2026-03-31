import * as DOM from '../../utils/dom-elements.js';
import {removeAllWarnings} from '../warnings/remove-all-warnings.js';
import {resetInputFields} from '../appointment-form/reset-input-fields.js';
import {toggleAppointmentInteractions} from '../appointments/toggle-appointment-interactions.js';

let formToggle = false;

export function toggleAppointmentForm() {
  formToggle = !formToggle;
  if (formToggle) {
    DOM.sectionAppointmentAdd.classList.remove('disabled');
    DOM.blurFilter.classList.remove('disabled');
    DOM.tutor.focus();

    toggleAppointmentInteractions();
    
  } else {
    DOM.sectionAppointmentAdd.classList.add('disabled');
    DOM.blurFilter.classList.add('disabled');

    toggleAppointmentInteractions();
    removeAllWarnings();
    resetInputFields();
  }
}