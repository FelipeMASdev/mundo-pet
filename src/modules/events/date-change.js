import { showAppointments } from "../appointments/show-appointments.js";

const selectDateInput = document.getElementById("selected-date");

selectDateInput.addEventListener("change", (event) => {
  showAppointments({ date: event.target.value });
});