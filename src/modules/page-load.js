import dayjs from 'dayjs';
import { showAppointments } from './appointments/show-appointments.js';

showAppointments({ date: dayjs() });