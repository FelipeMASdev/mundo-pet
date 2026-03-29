import { toggleAppointmentForm } from '../appointment-form/toggle-appointment-form.js';

const newAppointmentButton = document.querySelector('.new-appointment-button');

newAppointmentButton.addEventListener('click', () => {
  toggleAppointmentForm();
})