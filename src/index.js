import { hamburgerHandler } from './js/hamburger';
import { switchMode } from './js/switch';
import Nav from './js/navigation';

window.addEventListener('load', () => {
    new Nav().renderNavigation();
    hamburgerHandler();
    switchMode();
});

