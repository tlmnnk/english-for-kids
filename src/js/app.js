import cards from './cards';
import CardList from './cardList';
import { MODES } from './constants';

export default class App {
  constructor() {
    this.cards = cards;
    this.cardContainer = document.querySelector('.cards');
    this.state = MODES.train;
    this.nav = document.querySelector('.nav');
    this.serializedCards = this.getCardsSerialize();
  }

  init() {
    this.nav.addEventListener('click', (e) => {
      this.cardListRenderOnMenuItemClick(e);
    });
  }

  cardListRenderOnMenuItemClick(e) {
    if (e.target.classList.contains('nav__item')) {
      const setListTitle = e.target.getAttribute('data');
      console.log(setListTitle);
      this.clearCardContainer();
      new CardList(this.serializedCards[setListTitle]).cardListRender();
    }
  }

  clearCardContainer() {
    while (this.cardContainer.firstChild) {
      this.cardContainer.removeChild(this.cardContainer.lastChild);
    }
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