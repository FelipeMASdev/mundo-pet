import * as DOM from '../../utils/dom-elements.js';
import {showAppointments} from './show-appointments.js';
import {deleteAppointment} from '../../services/delete-apointment.js';
import {toggleConfirm} from '../warnings/toggle-confirm.js';

export async function cancelAppointment(appointmentItem) {

  //Toogling and waiting for confirmation
  const confirmCard = toggleConfirm('Tem certeza que deseja cancelar este agendamento?');
  let isConfirmed = await confirmCancelAppointment();

  if (!isConfirmed) {
    return;
  }

  // deleting appointment from server
  const appointmentId = appointmentItem.getAttribute('data-id');
  console.log('id do agendamento a ser cancelado:', appointmentId);
  await deleteAppointment({ id: appointmentId });

  //reloading appointments after canceling an appointment
  showAppointments({ date: DOM.selectDateInput.value });
}

export async function confirmCancelAppointment() {

  return new Promise((resolve) => { 
    
    //Creating event handler for confirm card buttons
    const resolveHandler = (event) => {
      if (event.target === DOM.confirmButton) {
        toggleConfirm();
        resolve(true);
      } else if (event.target === DOM.noButton) {
        toggleConfirm();
        resolve(false);
      }

      //removing event listeners after resolving the confirmation
      DOM.confirmButton.removeEventListener('click', resolveHandler);
      DOM.noButton.removeEventListener('click', resolveHandler);
    }

    //adding event listeners to confirm card buttons, to call the event handler
    DOM.confirmButton.addEventListener('click', resolveHandler);
    DOM.noButton.addEventListener('click', resolveHandler);
  });
}
