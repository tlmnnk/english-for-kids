import cards from './cards';
// import CardList from './js/cardList';
import { MODES } from './constants';

export default class App {
  constructor() {
    this.cards = cards;
    this.state = MODES.train;
    this.nav = document.querySelector('.nav');
  }

  init() {
    this.nav.addEventListener('click', (e) => {
      if (e.target.classList.contains('nav__item')) {
          const setListTitle = e.target.innerText;
          console.log(setListTitle);
      }
    });
  }

  getCardsSerialize() {
    const serializedCards = this.cards[0].reduce((acc, cardSet, i) => {
      const tempObj = {};
      tempObj[cardSet] = this.cards[i + 1];
      Object.assign(acc, tempObj);
      return acc;
    }, []);
    return serializedCards;
  }
}