import dayjs from 'dayjs';
import {addAppointment} from '../../services/add-apointment.js';
import { toggleAppointmentForm } from '../appointment-form/toggle-appointment-form.js';
import { showAppointments } from '../appointments/show-appointments.js';
import * as DOM from '../../utils/dom-elements.js';

DOM.appointmentForm.addEventListener('submit', async (event) => {
  event.preventDefault();

  const pet = document.querySelector('#pet');
  const tutor = document.querySelector('#tutor');
  const telephone = document.querySelector('#telephone');
  const service = document.querySelector('#service');
  const date = document.querySelector('#date');
  const time = document.querySelector('#time');
  const selectedService = service.options[service.selectedIndex];

  const when = dayjs(`${date.value}T${time.value}`).format('YYYY-MM-DDTHH:mm:ss');

  await addAppointment({ id: Date.now(), pet: pet.value, tutor: tutor.value, telephone: telephone.value, when, service: selectedService.textContent });

  pet.value = '';
  tutor.value = '';
  telephone.value = '';
  service.selectedIndex = 0;

  const selectDateInput = document.getElementById("selected-date");

  toggleAppointmentForm();
  showAppointments({ date: selectDateInput.value });

});

DOM.appointmentForm.addEventListener('invalid', (event) => {
  const firstInvalidField = DOM.appointmentForm.querySelector(':invalid');

  if (firstInvalidField && event.target === firstInvalidField) {
    console.log('Tentativa de envio com campos obrigatorios vazios:', firstInvalidField);
    firstInvalidField.focus();
  }
}, true);