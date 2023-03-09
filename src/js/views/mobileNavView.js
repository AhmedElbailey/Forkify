class MobileNavView {
  _parentElement = document.querySelector('.container');

  addHandelerClick(handler) {
    this._parentElement.addEventListener('click', e => {
      const target = e.target.closest('.mobile-nav-btn');
      if (!target) return;
      handler();
    });
  }

  toggleIcon() {
    const iconsContainer = document.querySelector('.mobile-nav-btn');
    iconsContainer.classList.toggle('open-nav');
  }
  openIcon() {
    const iconsContainer = document.querySelector('.mobile-nav-btn');
    iconsContainer.classList.add('open-nav');
  }
}

export default new MobileNavView();
