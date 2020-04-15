import cards from './cards';

export default class Card {
    constructor(card) {
        this.card = card;
    }

    renderCard() {
        return `<div class="card" data-audio="${this.card.audioSrc}">
        <div class="card__inner">
            <div class="card__front">
                <img src="${this.card.image}" alt="">
                <div class="card__header">${this.card.word}</div>
                <span class="card__play"></span>
            </div>
            <div class="card__back">
                <img src="./src/img/angry.jpg" alt="">
                <div class="card__header">${this.card.translation}</div>
            </div>
        </div>
    </div>`;
    }
}