import { hamburgerHandler } from './js/hamburger';
import { switchMode } from './js/switch';
import Nav from './js/navigation';
import App from './js/app';

window.addEventListener('load', () => {
  new Nav().renderNavigation();
  hamburgerHandler();
  switchMode();
  // new CardList(cards[1]).cardListRender();

  new App().init();
});
