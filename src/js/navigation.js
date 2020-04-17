import { wordSets } from './cards';

export default class Nav {
  constructor() {
    this.nav = document.querySelector('.nav');
  }

  renderNavigation() {
    console.log(this.nav);
    let fragment = this.renderNavItem('Main Page');
    wordSets.forEach(item => {
      fragment += this.renderNavItem(item);
    });
    this.nav.insertAdjacentHTML('afterbegin', fragment);
  }

  renderNavItem(item) {
    return `<li><a class="nav__item" data="${item}">${item}</a></li>`;
  }
}