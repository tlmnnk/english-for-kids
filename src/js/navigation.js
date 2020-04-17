import { wordSets } from './cards';

export default class Nav {
  constructor() {
    this.nav = document.querySelector('.nav');
  }

  renderNavigation() {
    let fragment = this.renderNavItem('Main Page');
    wordSets.forEach((item) => {
      fragment += this.renderNavItem(item);
    });
    this.nav.insertAdjacentHTML('afterbegin', fragment);
  }

  // eslint-disable-next-line class-methods-use-this
  renderNavItem(item) {
    return `<li><a class="nav__item" data="${item}">${item}</a></li>`;
  }
}