/* eslint-disable class-methods-use-this */
/* eslint-disable no-unused-expressions */
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
    this.isGameStarted = false;
    this.AudioShuffled = [];
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
    document.addEventListener('click', (e) => {
      this.switchClickHandler(e);
      this.startGameBtnHandler(e);
      this.cardClickGameStarted(e);
      console.log(this.isGameStarted);
    });
  }

  switchClickHandler(e) {
    if (e.target.classList.contains('left')) {
      if (!switcher.switchBtnLeft.classList.contains('active-case')) {
        switcher.switchBtnRight.classList.remove('active-case');
        switcher.switchBtnLeft.classList.add('active-case');
        switcher.activeSwitch.style.left = '0%';
        this.mode = MODES.train;
        this.isGameStarted ? this.isGameStarted = false : null;
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
    if (document.querySelector('.game')) {
      document.querySelector('.container').removeChild(document.querySelector('.game'));
      this.cardContainer.classList.toggle('remove-margin');
    }
    this.isGameStarted === true ? this.isGameStarted = false : null;
    this.audioArray ? this.audioArray = [] : null;
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
      // check if this.mode play or train and add propriate styles
      console.log(this.mode);
      this.mode === MODES.play ? this.toggleCardModeStyles() : null;
    }, 500);
    setTimeout(() => {
      this.cardContainer.classList.remove('visiblly-hidden');
    }, 501);
    // this.cardContainer.classList.remove('visiblly-hidden');
    // this.activeCardSet = Object.keys(cardSet)[0];
    this.mode === MODES.play ? this.toggleCardModeStyles() : null;
    this.isGameStarted === true ? this.isGameStarted = false : null;
    this.audioArray ? this.audioArray = [] : null;
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
      this.cardContainer.classList.toggle('remove-margin');

      this.insertStratGameButton();
    }
  }

  insertStratGameButton() {
    const gameStartBtn = '<a class="btn--startgame">Start Game</a>';
    const fragment = `<div class="game">
    <div class="game--stars"></div>
    ${gameStartBtn}
    </div>`;
    document.querySelector('.game') ? document.querySelector('.container').removeChild(document.querySelector('.game'))
      : document.querySelector('.header').insertAdjacentHTML('afterend', fragment);
  }

  startGameBtnHandler(e) {
    if (e.target.classList.contains('btn--startgame')) {
      if(!this.isGameStarted) {
        e.target.innerText = 'reset';
        this.isGameStarted = true;
        this.gameActivates();
        this.toogleCardPoinerStyle();
      } else {
        e.target.innerText = 'start game';
        this.isGameStarted = false;
        this.audioArray = [];
        this.toogleCardPoinerStyle();
      }
    }
  }

  toogleCardPoinerStyle() {
    this.cardContainer.querySelectorAll('.card').forEach((item) => {
      item.classList.toggle('pointer');
    });
  }

  gameActivates() {
    const audioArray = [];
    document.querySelectorAll('.card__play').forEach((item) => audioArray.push(item.getAttribute('data-audio')));
    this.AudioShuffled = this.shuffleArray(audioArray);
    console.log(this.AudioShuffled);
    new Audio(this.AudioShuffled[0]).play();
  }

  cardClickGameStarted(e) {
    if (this.isGameStarted) {
      //new Audio(this.AudioShuffled[0]).play();
      if (e.target.classList.contains('card__img') || e.target.classList.contains('card__front')) {
        const clickedCardAudio = e.path[1].querySelector('.card__play').getAttribute('data-audio');
        if (clickedCardAudio === this.AudioShuffled[0]) {
          this.addStar(0);
        } else {
          this.addStar(1);
        }
      }
         //e.target.querySelector('card__play').getAttribute('data-audio');
        //console.log((clickedCardAudio === this.AudioShuffled[0]) + 'successs!!!!')
    }
  }

  addStar(result) {
    const fragment = `<span class="card__icon card__star${result}"></span>`;
    document.querySelector('.game--stars').insertAdjacentHTML('beforeend', fragment);
  }

  shuffleArray(arra1) {
    let ctr = arra1.length;
    let temp;
    let index;

    while (ctr > 0) {
      index = Math.floor(Math.random() * ctr);
      ctr -= 1;
      temp = arra1[ctr];
      arra1[ctr] = arra1[index];
      arra1[index] = temp;
    }
    return arra1;
  }
}
