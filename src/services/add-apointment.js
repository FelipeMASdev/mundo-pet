import {apiConfig} from '../services/api-config.js';

export async function addAppointment({ id, pet, tutor, telephone, service, when }) {
  try {
    await fetch(`${apiConfig.baseUrl}/appointments`,{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id, pet, tutor, telephone, service, when }),
    });
    console.log('Agendamento realizado com sucesso!');
  } catch (err) {
    console.log(err);
    console.log('Não foi possível agendar. Tente novamente mais tarde.');
  }
}