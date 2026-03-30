import dayjs from 'dayjs';
import { getAppointments } from '../../services/get-appointments.js';
import {alignAppointmentInfo} from './align-appontment-info.js';
import {initializeCancelButtons} from '../events/cancel-button.js';

const periodMorning = document.querySelector('.appointment-list.period-morning');
const periodAfternoon = document.querySelector('.appointment-list.period-afternoon');
const periodNight = document.querySelector('.appointment-list.period-night');

export async function showAppointments({ date }) {
  console.log('showAppointments function called with date:', date);
  //clering previously rendered appointments to avoid duplicates
  clearRenderedAppointments();

   // calling function to get selected date's appointments from server
  const schedule = await getAppointments({ date });

  // filtering appointments by period of day
  const scheduleMorning = schedule.filter((schedule) => 
    dayjs(schedule.when).hour() < 12);
  const scheduleAfternoon = schedule.filter((schedule) => 
    dayjs(schedule.when).hour() >= 12 && dayjs(schedule.when).hour() < 18);
  const scheduleNight = schedule.filter((schedule) => 
    dayjs(schedule.when).hour() >= 18);

  //rendering appointments in the respective period of day
  scheduleMorning.forEach((schedule) => renderAppointment(schedule, periodMorning));
  scheduleAfternoon.forEach((schedule) => renderAppointment(schedule, periodAfternoon));
  scheduleNight.forEach((schedule) => renderAppointment(schedule, periodNight));

  // calling function to align appointment info in the appointment item
  alignAppointmentInfo();
  // calling function to initialize cancel buttons
  initializeCancelButtons();
}

function renderAppointment(schedule, appointmentList) {
  const appointmentItem = document.createElement('li');
  appointmentItem.classList.add('appointment-item');
  appointmentItem.setAttribute('data-id', schedule.id);

  appointmentItem.innerHTML = `
    <div class="appointment-info">
      <p class="appointment-time">${dayjs(schedule.when).format('HH:mm')}</p>
      <div class="info-wrapper">
        <div class="client-wrapper">
          <p class="appointment-pet">${schedule.pet}/</p>
          <p class="appointment-tutor">${schedule.tutor}</p>
        </div>
        <p class="appointment-telephone">${schedule.telephone}</p>
        <p class="appointment-service">${schedule.service}</p>
      </div>
    </div>
    <img class="cancel-button" src="assets/cancel.svg" alt="cancelar">
  `;
  appointmentList.appendChild(appointmentItem);
}

function clearRenderedAppointments() {
  const renderedAppointments = document.querySelectorAll('.appointment-item');
  renderedAppointments.forEach(appointment => appointment.remove());
}