import dayjs from 'dayjs';
import { showAppointments } from '../appointments/show-appointments.js';

const selectDateInput = document.getElementById('selected-date');

document.addEventListener('DOMContentLoaded', () => {
  selectDateInput.value = dayjs().format('YYYY-MM-DD');
  showAppointments({ date: selectDateInput.value });
});