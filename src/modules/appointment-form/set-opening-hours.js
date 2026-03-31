import { getOpeningHours } from '../../services/get-opening-hours.js';

export function addOpeningHours(input) {
  const openingHours = getOpeningHours();

  openingHours.forEach((hour) => {
    const option = document.createElement('option');
    option.value = hour;
    option.textContent = hour;
    
    input.appendChild(option);
  });
}

export function clearOpeningHours(input) {
  while (input.options.length > 0) {
    input.remove(0);
  }
}