/* eslint-disable class-methods-use-this */

export default class Stat {
  constructor(cardsSerialized) {
    this.cardContainer = document.querySelector('.cards');
    this.cardsSerialized = cardsSerialized;
    this.statOnWords = this.getActualStat();
  }

  statRender() {
    const table = document.createElement('table');
    let tableHead = `<thead>
    <tr>
      <th>word</th>
      <th>translate</th>
      <th>train clicks</th>
      <th>correct clicks</th>
      <th>error answer</th>
      <th>% of errors</th>
    </tr>
  <thead>
  <tbody>`;
    this.statOnWords.forEach((card) => {
      let fragmentWord = '';
      fragmentWord += `<tr>
      <td>${card.word}</td>
      <td>${card.translation}</td>
      <td>${card.trainClicks}</td>
      <td>${card.correctAnswers}</td>
      <td>${card.errorAnswers}</td>
      <td>${card.errorPprocentage}</td>
    </tr>`;
      tableHead += fragmentWord;
    });
    tableHead += '</tbody>';
    table.insertAdjacentHTML('afterbegin', tableHead);
    this.cardContainer.appendChild(table);
  }

  getActualStat() {
    let actualStat = localStorage.getItem('englishStat');
    if (actualStat === null) {
      actualStat = [];
      Object.entries(this.cardsSerialized).forEach((item) => {
        const cardsObj = item[1].reduce((acc, card) => {
          const tempObj = {};
          tempObj.word = card.word;
          tempObj.translation = card.translation;
          tempObj.trainClicks = +0;
          tempObj.correctAnswers = +0;
          tempObj.errorAnswers = +0;
          tempObj.errorPprocentage = +0;
          acc.push(tempObj);
          return acc;
        }, []);
        actualStat = [...actualStat, ...cardsObj];
      });
    } else { actualStat = JSON.parse(actualStat); }
    return actualStat;
  }

  updateStat(event, isGameStarted, choice, clickedWord) {
    if (!isGameStarted && event.target.classList.contains('card__rotate')) {
      const trainClick = event.path[2].children[1].innerHTML;
      this.statOnWords.forEach((card, i) => {
        if (card.word === trainClick) {
          this.statOnWords[i].trainClicks += 1;

          localStorage.setItem('englishStat', JSON.stringify(this.statOnWords));
        }
      });
      return;
    }
    if ((isGameStarted && event.target.classList.contains('card__img'))
    || (isGameStarted && event.target.classList.contains('card__front'))) {
      clickedWord = clickedWord.slice(clickedWord.indexOf('/') + 1, clickedWord.indexOf('.'));
      if (choice) {
        this.statOnWords.forEach((card, i) => {
          if (card.word === clickedWord) {
            this.statOnWords[i].correctAnswers += 1;
            this.statOnWords[i].errorPprocentage = (this.statOnWords[i].errorAnswers /
            (this.statOnWords[i].correctAnswers + this.statOnWords[i].errorAnswers)) * 100;
            localStorage.setItem('englishStat', JSON.stringify(this.statOnWords));
          }
        });
      } else {
        this.statOnWords.forEach((card, i) => {
          if (card.word === clickedWord) {
            this.statOnWords[i].errorAnswers += 1;
            this.statOnWords[i].errorPprocentage = (this.statOnWords[i].errorAnswers /
              (this.statOnWords[i].correctAnswers + this.statOnWords[i].errorAnswers)) * 100;
            localStorage.setItem('englishStat', JSON.stringify(this.statOnWords));
          }
        });
      }
    }
  }
}
