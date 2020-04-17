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
    this.activeCardSet = null;
  }

  init() {
    this.nav.addEventListener('click', (e) => {
      this.cardListRenderOnMenuItemClick(e);
    });
    this.mainPageRender();
  }

  mainPageRender() {
    //this.renderCardList(mainPageCards);
    new CardList(mainPageCards).cardListRender();
    this.styleMainPageCards();
    this.addMainPageOnclick();
    this.activeCardSet = 'Main Page';
  }

  // eslint-disable-next-line class-methods-use-this
  styleMainPageCards() {
    document.querySelectorAll('.card__buttons').forEach((item) => {
      item.classList.add('hidden');
      item.parentNode.classList.add('pointer');
    });
  }

  addMainPageOnclick() {
    this.cardContainer.addEventListener('click', (e) => {
      if (!e.target.classList.contains('cards') && this.activeCardSet === 'Main Page') {
        if (e.target.parentNode.parentNode.classList.contains('card__inner')) {
          const setList = e.target.parentNode.parentNode.parentNode.getAttribute('data');
          this.renderCardList(this.serializedCards[setList]);
          this.activeCardSet = setList;
        } else {
          const setList = e.target.parentNode.parentNode.getAttribute('data');
          this.renderCardList(this.serializedCards[setList]);
          this.activeCardSet = setList;
        }
      }
    });
  }

  cardListRenderOnMenuItemClick(e) {
    if (e.target.classList.contains('nav__item')) {
      const setListTitle = e.target.getAttribute('data');
      if (this.activeCardSet !== setListTitle) {
        if (setListTitle === 'Main Page') {
          this.mainPageRender();
          return;
        }
        this.activeCardSet = setListTitle;
        this.renderCardList(this.serializedCards[setListTitle]);
        //this.clearCardContainer();
        //new CardList(this.serializedCards[setListTitle]).cardListRender();
      }
    }
  }

  renderCardList(cardSet) {
    this.cardContainer.classList.add('visiblly-hidden');
    setTimeout(() => {
      this.clearCardContainer();
      new CardList(cardSet).cardListRender();
    }, 500);
    setTimeout(() => {
      this.cardContainer.classList.remove('visiblly-hidden');
    }, 501);
    
    //this.cardContainer.classList.remove('visiblly-hidden');
    //this.activeCardSet = Object.keys(cardSet)[0];
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
