import {apiConfig} from '../services/api-config.js';

export async function deleteAppointment({ id }) {
  try {
    await fetch(`${apiConfig.baseUrl}/appointments/${id}`, {
      method: 'DELETE',
    });
    return 'sucess';

  } catch (err) {
    console.error(err, 'Não foi possível cancelar o agendamento. Tente novamente mais tarde.');
    return 'error';
  }
}