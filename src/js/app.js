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
    this.nav = document.querySelector('.nav');
    this.serializedCards = this.getCardsSerialize();
    this.activeCardSet = null;
    this.isGameStarted = false;
    this.AudioShuffled = [];
    this.AudioIndicator = 0;
    this.errors = 0;
  }

  init() {
    this.initEventListeners();
    this.mainPageRender();
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
        // this.isGameStarted ? this.toogleCardPoinerStyle() : null;
        this.isGameStarted ? this.isGameStarted = false : null;
        console.log(this.mode);
        this.toggleCardModeStyles();
        this.resetGameParament();
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
        this.resetGameParament();
      }
    }
  }

  mainPageRender() {
  // this.renderCardList(mainPageCards);
    this.clearCardContainer();
    if (document.querySelector('.game').classList.contains('visible2')) {
      document.querySelector('.game').classList.remove('visible2');
    }

    new CardList(mainPageCards).cardListRender();
    this.styleMainPageCards();
    this.addMainPageOnclick();
    this.activeCardSet = 'Main Page';

    document.querySelector(`a[data="${this.activeCardSet}"]`).classList.add('nav__item--active');
    this.resetGameParament();
  }

  // eslint-disable-next-line class-methods-use-this
  styleMainPageCards() {
    document.querySelectorAll('.card__buttons').forEach((item) => {
      item.classList.add('hidden');
      item.parentNode.classList.add('pointer');
    });
  }

  addMainPageOnclick() {
    const addMenuItemActiveAndRenderSet = (setList) => {
      this.renderCardList(this.serializedCards[setList]);
      document.querySelector(`a[data="${this.activeCardSet}"]`).classList.remove('nav__item--active');
      document.querySelector(`a[data="${setList}"]`).classList.add('nav__item--active');
      this.activeCardSet = setList;
      this.resetGameParament();
    };

    this.cardContainer.addEventListener('click', (e) => {
      if (!e.target.classList.contains('cards') && this.activeCardSet === 'Main Page') {
        if (e.target.parentNode.parentNode.classList.contains('card__inner')) {
          const setList = e.target.parentNode.parentNode.parentNode.getAttribute('data');
          addMenuItemActiveAndRenderSet(setList);
        } else {
          const setList = e.target.parentNode.parentNode.getAttribute('data');
          addMenuItemActiveAndRenderSet(setList);
        }
      }
    });
  }

  cardListRenderOnMenuItemClick(e) {
    if (e.target.classList.contains('nav__item')) {
      console.log(document.querySelector(`a[data="${this.activeCardSet}"]`));
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
        // new CardList(this.serializedCards[setListTitle]).cardListRender();
        this.resetGameParament();
      }
    }
  }

  renderCardList(cardSet) {
    this.cardContainer.classList.add('visiblly-hidden');

    setTimeout(() => {
      this.clearCardContainer();
      new CardList(cardSet).cardListRender();
      console.log(this.mode);
      this.mode === MODES.play ? this.toggleCardModeStyles() : null;
    }, 500);

    setTimeout(() => {
      this.cardContainer.classList.remove('visiblly-hidden');
    }, 501);

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
      setTimeout(() => {
        document.querySelectorAll('.card__header').forEach((item) => {
          item.classList.toggle('hidden');
        });
        document.querySelectorAll('.card__buttons').forEach((item) => {
          item.classList.toggle('hidden');
        });
      }, 100);
      document.querySelectorAll('.card__img').forEach((item) => {
        item.classList.toggle('card__img--scale');
      });

      document.querySelector('.card--noclick') ? document.querySelectorAll('.card--noclick').forEach((item) => {
        item.classList.remove('card--noclick');
      }) : null;

      this.insertStratGameButton();
    }
  }

  insertStratGameButton() {
    if (!this.isGameStarted && this.mode === MODES.play && document.querySelector('.game').classList.contains('visible2')) return;
    document.querySelector('.game').classList.toggle('visible2');
  }

  startGameBtnHandler(e) {
    if (e.target.classList.contains('btn--startgame')) {
      if (!this.isGameStarted) {
        e.target.classList.add('nopointer');
        e.target.innerText = 'replay word';

        this.gameActivates();
        this.toogleCardPoinerStyle();
      }
      if (this.isGameStarted) {
        new Audio(this.AudioShuffled[this.AudioIndicator]).play();
      }
    }
  }

  toogleCardPoinerStyle() {
    this.cardContainer.querySelectorAll('.card').forEach((item) => {
      item.classList.toggle('pointer');
    });
  }

  gameActivates() {
    new Audio('audio/startgame.mp3').play();
    this.AudioShuffled.length ? this.AudioShuffled = [] : null;
    this.AudioIndicator ? this.AudioIndicator = 0 : null;
    const audioArray = [];

    document.querySelectorAll('.card__play').forEach((item) => audioArray.push(item.getAttribute('data-audio')));
    this.AudioShuffled = this.shuffleArray(audioArray);
    console.log(this.AudioShuffled);

    setTimeout(() => {
      new Audio(this.AudioShuffled[0]).play();
      this.isGameStarted = true;
      document.querySelector('.btn--startgame').classList.remove('nopointer');
    }, 3100);
  }

  cardClickGameStarted(e) {
    if (this.isGameStarted) {
      // new Audio(this.AudioShuffled[0]).play();
      if (e.target.classList.contains('card__img') || e.target.classList.contains('card__front')) {
        const clickedCardAudio = e.path[1].querySelector('.card__play').getAttribute('data-audio');
        let wrongClickedCard;
        e.target.classList.contains('card__img')
        // eslint-disable-next-line prefer-destructuring
          ? wrongClickedCard = e.path[3] : wrongClickedCard = e.path[2];
        const correctClickedCard = document.querySelector(`span[data-audio="${this.AudioShuffled[this.AudioIndicator]}"]`).parentElement.parentElement.parentElement.parentElement;
        if (clickedCardAudio === this.AudioShuffled[this.AudioIndicator]) {
          new Audio('audio/correct.mp3').play();
          this.addStar(0);
          correctClickedCard.classList.add('card--correct');

          setTimeout(() => {
            correctClickedCard.classList.add('card--noclick');
            correctClickedCard.classList.remove('card--correct');
          }, 350);

          this.AudioIndicator += 1;

          if (this.AudioIndicator === 8) {
            this.endGame();
          } else {
            setTimeout(() => {
              new Audio(this.AudioShuffled[this.AudioIndicator]).play();
            }, 900);
          }
        } else {
          new Audio('audio/fail.mp3').play();
          this.addStar(1);
          wrongClickedCard.classList.add('card--wrong');
          this.errors += 1;

          setTimeout(() => {
            new Audio(this.AudioShuffled[this.AudioIndicator]).play();
            wrongClickedCard.classList.remove('card--wrong');
          }, 800);
        }
      }
    }
  }

  endGame() {
    const hideElements = () => {
      document.querySelector('.header').classList.toggle('overlay');
    };
    this.insertStratGameButton();
    this.isGameStarted = false;
    this.cardContainer.classList.add('visiblly-hidden');

    setTimeout(() => {
      this.clearCardContainer();
    }, 500);

    setTimeout(() => {
      this.cardContainer.classList.remove('visiblly-hidden');
      this.cardContainer.classList.add('cards--endgame');
      this.renderResultPage();
      hideElements();
      console.log(`Errors   =   ${this.errors}`);
      this.errors === 0 ? new Audio('audio/win.mp3').play() : new Audio('audio/lose.mp3').play();
    }, 501);

    setTimeout(() => {
      this.cardContainer.classList.remove('cards--endgame');
      hideElements();
      this.clearCardContainer();
      document.querySelector(`a[data="${this.activeCardSet}"]`).classList.remove('nav__item--active');
      this.mainPageRender();
    }, 5000);
  }

  resetGameParament() {
    document.querySelector('.game--stars').children ? document.querySelector('.game--stars').innerHTML = '' : null;
    document.querySelector('.btn--startgame').textContent === 'replay word'
      ? document.querySelector('.btn--startgame').textContent = 'start game' : null;
    this.isGameStarted === true ? this.isGameStarted = false : null;
    this.audioArray ? this.audioArray = [] : null;
    this.AudioShuffled.length ? this.AudioShuffled : null;
    this.AudioIndicator ? this.AudioIndicator = 0 : null;
    this.errors !== 0 ? this.errors = 0 : null;
  }

  renderResultPage() {
    let fragment = '';
    if (!this.errors) {
      fragment += `<div class="card card--endgame card--win">
        <div class="card__title">you win!</div>
        <div class="card__title">No errors!:)</div>
      </div>`;
    } else {
      fragment += `<div class="card card--endgame card--fail">
      <div class="card__title">you lose!:(</div>
      <div class="card__title">${this.errors} errors!</div>
    </div>`;
    }
    this.cardContainer.insertAdjacentHTML('afterbegin', fragment);
  }

  addStar(result) {
    const fragment = `<span class="card__icon card__star${result}"></span>`;
    document.querySelector('.game--stars').insertAdjacentHTML('afterbegin', fragment);
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
