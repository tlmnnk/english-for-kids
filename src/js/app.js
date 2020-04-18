import { cards } from './cards';
import CardList from './cardList';
import { mainPageCards } from './mainPageCards';
import { MODES } from './constants';
import switcher from './switch';

export default class App {
  constructor() {
    this.cards = cards;
    this.cardContainer = document.querySelector('.cards');
    this.mode = null;
    this.mode2 = null;
    this.nav = document.querySelector('.nav');
    this.serializedCards = this.getCardsSerialize();
    this.activeCardSet = null;
  }

  init() {
    this.initEventListeners();
    this.mainPageRender();
    setInterval(() => {
     // console.log(this.mode);
    }, 1500);
  }

  initEventListeners() {
    this.nav.addEventListener('click', (e) => {
      this.cardListRenderOnMenuItemClick(e);
    });
    document.querySelector('.switch-button').addEventListener('click', (e) => {
      this.switchClickHandler(e);
    });
  }

  switchClickHandler(e) {
    if (e.target.classList.contains('left')) {
      if (!switcher.switchBtnLeft.classList.contains('active-case')) {
        switcher.switchBtnRight.classList.remove('active-case');
        switcher.switchBtnLeft.classList.add('active-case');
        switcher.activeSwitch.style.left = '0%';
        this.mode = MODES.train;
        console.log(this.mode);
        this.toggleCardModeStyles();
        return;
      }
    }
    if (e.target.classList.contains('right')) {
      if (!switcher.switchBtnRight.classList.contains('active-case')) {
        switcher.switchBtnRight.classList.add('active-case');
        switcher.switchBtnLeft.classList.remove('active-case');
        switcher.activeSwitch.style.left = '50%';
        this.mode = MODES.play;
        console.log(this.mode);
        this.toggleCardModeStyles();
      }
    }
  }

  mainPageRender() {
  // this.renderCardList(mainPageCards);
    this.clearCardContainer();
    new CardList(mainPageCards).cardListRender();
    this.styleMainPageCards();
    this.addMainPageOnclick();
    this.activeCardSet = 'Main Page';
    document.querySelector(`a[data="${this.activeCardSet}"]`).classList.add('nav__item--active');
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
          document.querySelector(`a[data="${this.activeCardSet}"]`).classList.remove('nav__item--active');
          document.querySelector(`a[data="${setList}"]`).classList.add('nav__item--active');
          this.activeCardSet = setList;
        } else {
          const setList = e.target.parentNode.parentNode.getAttribute('data');
          this.renderCardList(this.serializedCards[setList]);
          document.querySelector(`a[data="${this.activeCardSet}"]`).classList.remove('nav__item--active');
          document.querySelector(`a[data="${setList}"]`).classList.add('nav__item--active');
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
          document.querySelector(`a[data="${this.activeCardSet}"]`).classList.remove('nav__item--active');
          this.mainPageRender();
          return;
        }
        document.querySelector(`a[data="${this.activeCardSet}"]`).classList.remove('nav__item--active');
        this.activeCardSet = setListTitle;

        this.renderCardList(this.serializedCards[setListTitle]);
        e.target.classList.add('nav__item--active');
        // this.clearCardContainer();
        // new CardList(this.serializedCards[setListTitle]).cardListRender();
      }
    }
  }

  renderCardList(cardSet) {
    this.cardContainer.classList.add('visiblly-hidden');
    setTimeout(() => {
      this.clearCardContainer();
      new CardList(cardSet).cardListRender();
      //check if this.mode play or train and add propriate styles
      console.log(this.mode);
      this.mode === MODES.play ? this.toggleCardModeStyles() : null; 
    }, 500);
    setTimeout(() => {
      this.cardContainer.classList.remove('visiblly-hidden');
    }, 501);
    // this.cardContainer.classList.remove('visiblly-hidden');
    // this.activeCardSet = Object.keys(cardSet)[0];
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

  toggleCardModeStyles() {
    if (this.activeCardSet !== 'Main Page') {
      document.querySelectorAll('.card__header').forEach((item) => {
        item.classList.toggle('hidden');
      });
      document.querySelectorAll('.card__buttons').forEach((item) => {
        item.classList.toggle('hidden');
      });
    }
  }
}
