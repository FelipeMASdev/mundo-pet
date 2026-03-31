import dayjs from "dayjs";
import { getAppointments } from '../../services/get-appointments.js';
import { addOpeningHours, clearOpeningHours} from '../appointment-form/set-opening-hours.js';
import { createWarning } from '../warnings/create-warning.js';

const form = document.querySelector('#appointment-add');

const telephoneInput = form.querySelector('input[name="telephone"]');
const dateInput = form.querySelector('input[name="date"]');
const hourInput = form.querySelector('select[name="time"]');

const today = dayjs(new Date()).format('YYYY-MM-DD');
dateInput.min = today;

async function getAppointmentData(){
  const data = await getAppointments({ date: dateInput.value });
  return data;
}

telephoneInput.addEventListener("input", (event) => {
  validateTelephone(event.target.value);
});

function validateTelephone(telephone) {
  telephone = telephone.replace(/\D/g, '');
  telephone = telephone.replace(/^(\d{11}).*/, '$1');
  telephone = telephone.replace(/^(\d{2})/, '($1)');
  telephone = telephone.replace(/(\d{4,5})(\d{4})/, ' $1-$2');  

  let regex5D = telephone.match(/(\d{5})/g);
  if (regex5D) {
    regex5D[0] = regex5D[0].replace(/(\d)(\d{4})/, '$1 $2');
    telephone = telephone.replace(/(\d{5})/, regex5D[0]);
  }

  telephoneInput.value = telephone;
}

dateInput.addEventListener("input", (event) => {
  validateDate(event.target.value);
});

function validateDate(date) {
  const dayOfWeek = dayjs(date).day();
  if (dayOfWeek === 0) {
    dateInput.value = today;
    alert("Não abrimos aos domingos. Por favor, escolha outra data.");
  } else {
    clearOpeningHours(hourInput);
    addOpeningHours(hourInput);
    validateHour();
  }
  dateInput.min = today;
}

export async function validateHour() {
  //deestructuring options of the hour select input and storing it in an array
  const options = [...hourInput.options];
  
  //getting appointments data for the selected date from server
  const appoinstments = await getAppointmentData();
  let appointmentsTime = [];

  //creating a array of hours that already have an appointment
  appoinstments.forEach(appointment => {
    let appointmentTime = dayjs(appointment.when).format('H:mm');
    //regex to add zero in hours with only one digit
    if(appointmentTime.length === 4){
      appointmentTime = '0' + appointmentTime;
    }
    appointmentsTime.push(appointmentTime);
  });

  //iterating over the options of the hour select input to check if they are valid for scheduling
  options.forEach( option => {
    //checking if the hour is in the past
    const selectedTime = option.value.split(':');
    const fulldate = dayjs(dateInput.value).set('hour', selectedTime[0]).set('minute', selectedTime[1]);
    const isNotHourInPast = fulldate.isAfter(dayjs()); 

    let available;
    
    //chegking if the hour already has an appointment
    if(appointmentsTime.includes(option.value)){
      available = false;
    }else {
      available = true;
    }

    if (isNotHourInPast && available) {
      return;
    } else {
      const hourOption = document.querySelector(`#time option[value="${option.value}"]`);
      hourOption.remove();
    }
  });

  if(hourInput.options.length === 0 && dateInput.value){
    const warning = createWarning(
      'Não há horários disponíveis para esta data. Por favor, escolha outra data.', 
      hourInput.closest('.when-wrapper')
    );
    warning.setAttribute('data-id', 'no-hours-avaible');
  }

}
