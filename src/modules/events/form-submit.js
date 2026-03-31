import dayjs from 'dayjs';
import * as DOM from '../../utils/dom-elements.js';
import {addAppointment} from '../../services/add-apointment.js';
import { toggleAppointmentForm } from '../appointment-form/toggle-appointment-form.js';
import { showAppointments } from '../appointments/show-appointments.js';
import { createWarning } from '../warnings/create-warning.js';
import { resetInputFields } from '../appointment-form/reset-input-fields.js';

DOM.appointmentForm.addEventListener('submit', async (event) => {
  event.preventDefault();

  //geting necessary data to create an appointment
  const selectedService = DOM.service.options[DOM.service.selectedIndex];
  const when = dayjs(`${DOM.date.value}T${DOM.time.value}`).format('YYYY-MM-DDTHH:mm:ss');

  //calling function to create the appointment
  await addAppointment({ 
    id: Date.now(), pet: DOM.pet.value, tutor: DOM.tutor.value, telephone: DOM.telephone.value, when, service: selectedService.textContent 
  });

  //resetting form fields
  resetInputFields();

  //hiding form and refreshing appointments list
  toggleAppointmentForm();
  showAppointments({ date: DOM.selectDateInput.value });
});

DOM.appointmentForm.addEventListener('invalid', (event) => {
  //finding the first invalid field
  event.preventDefault();
  const firstInvalidField = DOM.appointmentForm.querySelector(':invalid');

  //if the invalid event was triggered by the first invalid field, focus on it
  if (firstInvalidField && event.target === firstInvalidField) {
    firstInvalidField.focus();
    
    const parent = firstInvalidField.closest('.input-wrapper');

    if (event.target.type === 'text') {
      createWarning('Por favor, preencha esse campo corretamente', parent);
    } else if (event.target.type === 'tel') {
      createWarning('Por favor, insira um número de telefone válido', parent);
    } else if (event.target.type === 'date') {
      createWarning('Por favor, selecione uma data', parent);
    }  else if (event.target.tagName.toLowerCase() === 'select') {
      if (event.target.id === 'service') {
        createWarning('Por favor, selecione um serviço', parent);
      } else if (event.target.id === 'time') {
        createWarning('Por favor, selecione um horário', parent);
      }
    }
    
  }
}, true);