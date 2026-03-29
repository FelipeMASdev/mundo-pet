import dayjs from "dayjs";
import { toggleAppointmentForm } from '../appointment-form/toggle-appointment-form.js';
import { addOpeningHours, clearOpeningHours} from '../appointment-form/set-opening-hours.js';
import { validateHour } from '../appointment-form/validate-form.js';

const newAppointmentButton = document.querySelector('.new-appointment-button');
const hourInput = document.querySelector('select[name="time"]');
const dateInput = document.querySelector('input[name="date"]');
const today = dayjs(new Date());

newAppointmentButton.addEventListener('click', () => {
  toggleAppointmentForm();
  clearOpeningHours(hourInput);
  addOpeningHours(hourInput);
  
  //set date for today, or tomorrow if today is Sunday
  if (today.day() === 0){
    dateInput.value = today.add(1, 'day').format('YYYY-MM-DD');
  } else {
    dateInput.value = today.format('YYYY-MM-DD');
  }

  validateHour();
});