import {apiConfig} from '../services/api-config.js';

export async function deleteAppointment({ id }) {
  try {
    await fetch(`${apiConfig.baseUrl}/appointments/${id}`, {
      method: 'DELETE',
    });
    console.log('Agendamento cancelado com sucesso!');

  } catch (err) {
    console.log(err);
    console.log('Não foi possível cancelar o agendamento. Tente novamente mais tarde.');
  }
}