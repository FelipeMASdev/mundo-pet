import { toggleAppointmentForm } from '../appointments/toggle-appointment-form.js';

const newAppointmentButton = document.querySelector('.new-appointment-button');

newAppointmentButton.addEventListener('click', () => {
  toggleAppointmentForm();
})