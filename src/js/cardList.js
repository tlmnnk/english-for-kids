import Card from './card';

export default class CardList {
    constructor(cardSetTopic) {
        this.cardSetTopic = cardSetTopic;
        this.cardsContainer = document.querySelector('.cards');
    }

    cardListRender() {
        let fragment = '';
        this.cardSetTopic.forEach(card => {
            fragment += new Card(card).renderCard();
        });
        this.cardsContainer.insertAdjacentHTML('afterbegin', fragment);
    }
}