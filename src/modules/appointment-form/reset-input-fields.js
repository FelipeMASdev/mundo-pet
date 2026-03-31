import * as DOM from '../../utils/dom-elements.js';

export function resetInputFields() {
    DOM.pet.value = '';
    DOM.tutor.value = '';
    DOM.telephone.value = '';
    DOM.service.selectedIndex = 0;
}