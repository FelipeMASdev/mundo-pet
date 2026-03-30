let formToggle = false;

const appointmentForm = document.querySelector('#appointment-add');
const blurFilter = document.querySelector('.blurFilter');

const newAppointmentButton = document.querySelector('.new-appointment-button');
const selectDateInput = document.querySelector('#selected-date');
const tutorInput = document.querySelector('#tutor');

export function toggleAppointmentForm() {
  formToggle = !formToggle;
  if (formToggle) {
    appointmentForm.classList.remove('disabled');
    blurFilter.classList.remove('disabled');
    
    newAppointmentButton.setAttribute('disabled', 'true');
    selectDateInput.setAttribute('disabled', 'true');
    tutorInput.focus();
  } else {
    appointmentForm.classList.add('disabled');
    blurFilter.classList.add('disabled');

    newAppointmentButton.removeAttribute('disabled');
    selectDateInput.removeAttribute('disabled');
  }
}