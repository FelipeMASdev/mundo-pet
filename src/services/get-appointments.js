import dayjs from 'dayjs';
import { apiConfig } from '../services/api-config.js';

export async function getAppointments({ date }) {
  //requesting to fetch appointment data
  try{
    const response = await fetch(`${apiConfig.baseUrl}/appointments?_sort=when`);
    const data = await response.json();

    //filtering by the selected date
    const schedule = data.filter((schedule) => dayjs(date).isSame(schedule.when, 'day'));
    
    return schedule;

  } catch (err) {
    console.log(err, 'Não foi possível buscar os agendamentos para o dia selecionado.');
  }
}