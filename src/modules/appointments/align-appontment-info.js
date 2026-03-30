

export function alignAppointmentInfo() {
  const appointmentClients = document.querySelectorAll('.client-wrapper');
  const appointmentTutors = document.querySelectorAll('.appointment-telephone');
  const appointmentServices = document.querySelectorAll('.appointment-service');

  const infoCategories = [appointmentClients, appointmentTutors, appointmentServices];

  infoCategories.forEach(category => {
    let maxItemWidth = 0;

    category.forEach(item => {
      if (item.offsetWidth > maxItemWidth) {
        maxItemWidth = item.offsetWidth;
      }
    });

    maxItemWidth += 32;
    maxItemWidth = maxItemWidth/16 + 'rem';

    category.forEach(item => {
      item.style.width = maxItemWidth;
    });

    maxItemWidth = 0;
      
  });

  
}