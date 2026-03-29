import dayjs from 'dayjs';
import {addAppointment} from '../../services/add-apointment.js';

document.querySelector('.form-submit').addEventListener('click', async (event) => {
  event.preventDefault();

  const pet = document.querySelector('#pet').value;
  const tutor = document.querySelector('#tutor').value;
  const telephone = document.querySelector('#telephone').value;
  const service = document.querySelector('#service option:checked').textContent;
  const date = document.querySelector('#date').value;
  const time = document.querySelector('#time').value;

  const when = dayjs(`${date}T${time}`).format('YYYY-MM-DDTHH:mm:ss');

  await addAppointment({ id: Date.now(), pet, tutor, telephone, when, service });

});