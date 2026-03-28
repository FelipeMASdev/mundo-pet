import { toggleAppointmentForm } from '../appointments/toggle-appointment-form.js';

const formCloseButton = document.querySelector('#appointment-form .close-button');

formCloseButton.addEventListener('click', () => {
  toggleAppointmentForm();
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    toggleAppointmentForm();
  }
});