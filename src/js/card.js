import path from 'path';

export default class Card {
    constructor(card) {
        this.card = card;
    }

    renderCard() {
        return `<div class="card"">
        <div class="card__inner">
            <div class="card__front">
                <img src="${this.card.image}" alt="${this.card.word}">
                <div class="card__header">${this.card.word}</div>
                <span class="card__play" data-audio="${this.card.audioSrc}"></span>
            </div>
            <div class="card__back">
                <img src="./src/img/angry.jpg" alt="${this.card.translation}">
                <div class="card__header">${this.card.translation}</div>
            </div>
        </div>
    </div>`;
    }
}