export default class Card {
  constructor(card) {
    this.card = card;
  }

  renderCard() {
    return `<div class="card" data="${this.card.word}">
        <div class="card__inner">
            <div class="card__front">
                <img class="card__img" src="${this.card.image}" alt="${this.card.word}">
                <div class="card__header">${this.card.word}</div>
                <div class="card__buttons">
                  <span class="card__icon card__play" data-audio="${this.card.audioSrc}"></span>
                  <span class="card__icon card__rotate"></span>
                </div>
                
            </div>
            <div class="card__back">
                <img class="card__img" src="${this.card.image}" alt="${this.card.translation}">
                <div class="card__header">${this.card.translation}</div>
            </div>
        </div>
    </div>`;
  }
}
