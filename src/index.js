import { hamburgerHandler } from './js/hamburger';
import Nav from './js/navigation';
import App from './js/app';

window.addEventListener('load', () => {
  new Nav().renderNavigation();
  hamburgerHandler();
  // new CardList(cards[1]).cardListRender();
  new App().init();
});
