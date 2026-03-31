export function createWarning(message, parent) {

  //preventing warnings that should't happen simultaneously
  if (document.querySelector('[data-id="no-hours-avaible"]')) {
    if(parent.querySelector('#date') || parent.querySelector('#time') ){
      return;
    }   
  }

  //Creating the warning element
  const warning = document.createElement('div');
  warning.classList.add('warning');

  const warningIcon = document.createElement('span');
  warningIcon.classList.add('warning-icon');
  warningIcon.textContent = '!';
  warning.append(warningIcon);

  const warningMessage = document.createElement('span');
  warningMessage.classList.add('warning-message');
  warningMessage.textContent = message;
  warning.append(warningMessage);

  parent.append(warning);

  //Adding event listeners to remove the warning when the user interacts with the input fields
  if (parent.querySelector('input')) { //checking if the warning is for a input field

    //selecting the associated input field
    const input = parent.querySelector('input');

    //removing the warning upon user interaction,
    //removing the event listener when the warning is removed
    const onInputChange = () => {
      warning.remove();
      input.removeEventListener('change', onInputChange);
    };

    input.addEventListener('change', onInputChange);

  } else if (parent.querySelector('select')) { //checking if the warning is for a select field

    //selecting the associated select field
    const select = parent.querySelector('select');

    //removing the warning upon user interaction,
    //removing the event listener when the warning is removed
    const onSelectChange = () => {
      warning.remove();
      select.removeEventListener('change', onSelectChange);
    };
    select.addEventListener('change', onSelectChange);

    //removing the warning upon dynamic changes not triggered by the user,
    //removing the observer when the warning is removed
    const observer = new MutationObserver(() => {
      select.removeEventListener('change', onSelectChange);
      warning.remove();
      observer.disconnect();
    });

    observer.observe(select, { 
      childList: true
    });
  }
  return warning;
}