import dayjs from 'dayjs';
import { getAppointments } from '../../services/get-appointments.js';

const periodMorning = document.querySelector('.appointment-list.period-morning');
const periodAfternoon = document.querySelector('.appointment-list.period-afternoon');
const periodNight = document.querySelector('.appointment-list.period-night');

export async function showAppointments({ date }) {
  // calling function to get selected date's appointments from server
  clearRenderedAppointments();

  const schedule = await getAppointments({ date });

  const scheduleMorning = schedule.filter((schedule) => 
    dayjs(schedule.when).hour() < 12);
  const scheduleAfternoon = schedule.filter((schedule) => 
    dayjs(schedule.when).hour() >= 12 && dayjs(schedule.when).hour() < 18);
  const scheduleNight = schedule.filter((schedule) => 
    dayjs(schedule.when).hour() >= 18);

  scheduleMorning.forEach((schedule) => renderAppointment(schedule, periodMorning));
  scheduleAfternoon.forEach((schedule) => renderAppointment(schedule, periodAfternoon));
  scheduleNight.forEach((schedule) => renderAppointment(schedule, periodNight));

}

function renderAppointment(schedule, appointmentList) {
  const appointmentItem = document.createElement('li');
  appointmentItem.classList.add('appointment-item');
  appointmentItem.setAttribute('data-id', schedule.id);

  appointmentItem.innerHTML = `
    <p class="appointment-time">${dayjs(schedule.when).format('HH:mm')}</p>
    <p class="appointment-pet">${schedule.pet}</p>
    <p class="appointment-tutor">${schedule.tutor}</p>
    <p class="appointment-service">${schedule.service}</p>
  `;
  appointmentList.appendChild(appointmentItem);
}

function clearRenderedAppointments() {
  const renderedAppointments = document.querySelectorAll('.appointment-item');
  renderedAppointments.forEach(appointment => appointment.remove());
}