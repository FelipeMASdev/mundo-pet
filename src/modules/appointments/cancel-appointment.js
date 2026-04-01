import * as DOM from '../../utils/dom-elements.js';
import {showAppointments} from './show-appointments.js';
import {deleteAppointment} from '../../services/delete-apointment.js';
import {toggleConfirm} from '../warnings/toggle-confirm.js';
import {createWarning} from '../warnings/create-warning.js';

export async function cancelAppointment(appointmentItem) {

  //Toogling and waiting for confirmation
  toggleConfirm('Tem certeza que deseja cancelar este agendamento?');
  let isConfirmed = await confirmCancelAppointment();

  if (!isConfirmed) {
    return;
  }

  // deleting appointment from server
  const appointmentId = appointmentItem.getAttribute('data-id');
  const appointmentTime = appointmentItem.querySelector('.appointment-time').textContent;
  let response = await deleteAppointment({ id: appointmentId });

  if (response === 'error') {
    createWarning('Não foi possível cancelar o agendamento. Tente novamente mais tarde.', DOM.appointmentsHeaderWrapper, 'error', true);
    return;
  } else if (response === 'sucess') {
    createWarning(`Agendamento de ${appointmentTime} cancelado com sucesso!`, DOM.appointmentsHeaderWrapper, 'sucess', true);
  }

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
