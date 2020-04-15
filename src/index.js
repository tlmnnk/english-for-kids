import { hamburgerHandler } from './js/hamburger';
import { switchMode } from './js/switch';
import Nav from './js/navigation';
import cards from './js/cards';
import CardList from './js/cardList';

window.addEventListener('load', () => {
    new Nav().renderNavigation();
    hamburgerHandler();
    switchMode();
    new CardList(cards[1]).cardListRender();
});
