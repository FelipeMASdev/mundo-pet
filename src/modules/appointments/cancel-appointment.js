import dayjs from 'dayjs';
import {showAppointments} from './show-appointments.js';
import {deleteAppointment} from '../../services/delete-apointment.js';

export async function cancelAppointment(appointmentItem) {
  // deleting appointment from server
  const appointmentId = appointmentItem.getAttribute('data-id');
  await deleteAppointment({ id: appointmentId });

  //reloading appointments after canceling an appointment
  const appointmentDate = document.querySelector('#selected-date');
  showAppointments({ date: appointmentDate.value });
}