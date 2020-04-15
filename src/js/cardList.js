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
        this.audioInit();
    }
    audioInit() {
        document.querySelector('.cards').addEventListener('click', e => {
            if(e.target.classList.contains('card__play')) {
                const url = e.target.getAttribute('data-audio');
                new Audio(url).play();
                console.log('Audio play!....');
            }
        });
    }
}