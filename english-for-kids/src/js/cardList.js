/* eslint-disable no-unused-expressions */
/* eslint-disable class-methods-use-this */
import Card from './card';

export default class CardList {
  constructor(cardSetTopic) {
    this.cardSetTopic = cardSetTopic;
    this.cardsContainer = document.querySelector('.cards');
  }

  cardListRender() {
    let fragment = '';
    this.cardSetTopic.forEach((card) => {
      fragment += new Card(card).renderCard();
    });
    this.cardsContainer.insertAdjacentHTML('afterbegin', fragment);
    this.initEventListeners();
    this.cardsContainer.classList.add('visible');
  }

  initEventListeners() {
    this.cardsContainer.addEventListener('click', (e) => {
      this.rotateCardHandler(e);
    });
    this.flipCardFront();
  }

  // eslint-disable-next-line class-methods-use-this
  audioInit(e) {
    if (e.target.classList.contains('card__play')) {
      const url = e.target.getAttribute('data-audio');
      console.log('audio play!....');
      new Audio(url).play();
    }
  }

  rotateCardHandler(e) {
    if (e.target.classList.contains('card__rotate')) {
      e.target.parentNode.parentNode.parentNode.classList.add('card__inner--rotate');
    }
  }

  flipCardFront() {
    this.cardsContainer.addEventListener('mouseover', (e) => {
      if (e.target === this.cardsContainer) {
        document.querySelectorAll('.card__inner').forEach((item) => {
          item.classList.remove('card__inner--rotate');
          // eslint-disable-next-line no-unused-expressions
        });
      }
    });
  }
}
