import * as DOM from '../../utils/dom-elements.js';

export function createWarning(message, parent, type, autoClose) {

  //preventing warnings that should't happen simultaneously, exept for sunday warning, wich takes precedence over others
  if (document.querySelector('[data-id="no-hours-avaible"]') && type !== 'closedDay') {
    if(parent.querySelector('#date') || parent.querySelector('#time') ) {
      return;
    }   
  }

  if (document.querySelector('[data-id="closedDay"]') ) {
    if(parent.querySelector('#date') || parent.querySelector('#time') ){
      return;
    }   
  }

  //preventing too many warnings in the appointments header, keeping only the 3 most recent ones
  if (parent === DOM.appointmentsHeaderWrapper){
    const warnings = document.querySelectorAll('.warning')
    if(warnings.length >= 3){
      warnings[0].remove();
    }
  }
  
  //preventing multiple warnings in the same parent element, except for the appointments header, where multiple warnings can be shown simultaneously  
  if (parent !== DOM.appointmentsHeaderWrapper && parent.querySelector('.warning')) {  
    return
  };

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

  //delayed append to minimize issues with layout shifts
  setTimeout(() => { 
    parent.append(warning);
  }, 350); 

  if (type === 'sucess') {
    warning.classList.add('sucess-feedback');
  }

  if (autoClose) {
    setTimeout(() => {
      warning.remove();
    }, 6000);
  } else if (parent.querySelector('input')) { //checking if the warning is for a input field
    //selecting the associated input field
    const input = parent.querySelector('input');

    //removing the warning upon user interaction,
    //removing the event listener when the warning is removed
    const onInputChange = () => {
      input.removeEventListener('change', onInputChange);

      // delayed click removal to avoid issues with othe events during  layout shift 
      setTimeout(() => {
        warning.remove();
      }, 300);
    };

    // delay to avoid immediate removal from the same interaction that created the warning.
    setTimeout(() => {
      input.addEventListener('change', onInputChange);
    }, 100);

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