import {apiConfig} from '../services/api-config.js';

export async function addAppointment({ id, pet, tutor, telephone, service, when }) {
  try {
    const response = await fetch(`${apiConfig.baseUrl}/appointments`,{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id, pet, tutor, telephone, service, when }),
    });
    return {'status': 'sucess', response: await response.json()};
  } catch (err) {
    console.error(err, 'Não foi possível agendar. Tente novamente mais tarde.');
    return {'status': 'error'};
  }
}