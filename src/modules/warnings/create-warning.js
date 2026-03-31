export function createWarning(message, parent) {

  if (document.querySelector('[data-id="no-hours-avaible"]')) {
    if(parent.querySelector('#date') || parent.querySelector('#time') ){
      console.log('warning is for date input');
      return;
    }   
  }

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

  if (parent.querySelector('input')) {

    const input = parent.querySelector('input');

    const onInputChange = () => {
      warning.remove();
      input.removeEventListener('change', onInputChange);
    };

    input.addEventListener('change', onInputChange);

  } else if (parent.querySelector('select')) {

    const select = parent.querySelector('select');
    
    const onSelectChange = () => {
      warning.remove();
      select.removeEventListener('change', onSelectChange);
    };
    select.addEventListener('change', onSelectChange);

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