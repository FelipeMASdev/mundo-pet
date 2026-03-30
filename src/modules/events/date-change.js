import { showAppointments } from "../appointments/show-appointments.js";

const selectDateInput = document.getElementById("selected-date");

selectDateInput.addEventListener("change", (event) => {
  console.log(event.target.value);
  showAppointments({ date: event.target.value });
});