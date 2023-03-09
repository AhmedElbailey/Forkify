import View from './View.js';
import icons from 'url:../../img/icons.svg';

class ResultsView extends View {
  _parentElement = document.querySelector('.results');
  _mobileNavParent = document.querySelector('.search-results');
  _errorMessage = 'No recipes found for your query! Please try again ;)';
  _message = '';

  _generateHtml() {
    const id = window.location.hash.slice(1);

    return this._data
      .map(
        recipeObj => `
            <li class="preview">
                <a class="preview__link ${
                  recipeObj.id === id ? 'preview__link--active' : ''
                }" href="#${recipeObj.id}">
                    <figure class="preview__fig">
                    <img src="${recipeObj.image}" alt="${recipeObj.title}" />
                    </figure>
                    <div class="preview__data">
                        <h4 class="preview__title">${recipeObj.title}</h4>
                        <p class="preview__publisher">${recipeObj.publisher}</p>
                        <div class="preview__user-generated ${
                          recipeObj.key ? '' : 'hidden'
                        }">
                          <svg>
                            <use href="${icons}#icon-user"></use>
                          </svg>
                        </div>
                    </div>
                </a>
            </li>
    `
      )
      .join(' ');
  }

  toggleMobileNav() {
    this._mobileNavParent.classList.toggle('show');
  }
  openMobileNav() {
    this._mobileNavParent.classList.add('show');
  }
}

export default new ResultsView();
