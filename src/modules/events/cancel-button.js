import {cancelAppointment} from '../appointments/cancel-appointment.js';

export function initializeCancelButtons() {
  const cancelButtons = document.querySelectorAll('.cancel-button');

  cancelButtons.forEach(button => {
    button.addEventListener('click', (event) => {
      const appointmentItem = event.target.closest('.appointment-item');
      cancelAppointment(appointmentItem);
    });
  });
}