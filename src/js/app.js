import { cards } from './cards';
import CardList from './cardList';
import { mainPageCards } from './mainPageCards';
import { MODES } from './constants';

export default class App {
  constructor() {
    this.cards = cards;
    this.cardContainer = document.querySelector('.cards');
    this.state = MODES.train;
    this.nav = document.querySelector('.nav');
    this.serializedCards = this.getCardsSerialize();
    this.activeCardSet = 'Main Page';
  }

  init() {
    this.nav.addEventListener('click', (e) => {
      this.cardListRenderOnMenuItemClick(e);
    });
    this.mainPageRender();
  }

  mainPageRender() {
    new CardList(mainPageCards).cardListRender();
    this.styleMainPageCards();
  }

  // eslint-disable-next-line class-methods-use-this
  styleMainPageCards() {
    document.querySelectorAll('.card__buttons').forEach((item) => {
      item.classList.add('hidden');
      item.parentNode.classList.add('pointer');
    });
  }

  cardListRenderOnMenuItemClick(e) {
    if (e.target.classList.contains('nav__item')) {
      const setListTitle = e.target.getAttribute('data');
      if (setListTitle === 'Main Page') {
        this.mainPageRender();
        return;
      }
      if (this.activeCardSet !== setListTitle) {
        this.activeCardSet = setListTitle;
        console.log(setListTitle);
        this.clearCardContainer();
        new CardList(this.serializedCards[setListTitle]).cardListRender();
        console.log(this.serializedCards);
      }
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