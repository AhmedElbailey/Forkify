import View from './View.js';
import icons from 'url:../../img/icons.svg';

class BookmarksView extends View {
  _parentElement = document.querySelector('.bookmarks__list');
  _errorMessage = 'No bookmarks yet. Find another recipe and bookmark it ;)';
  _message = '';

  addHandlerRender(handler) {
    window.addEventListener('load', handler);
  }

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
}

export default new BookmarksView();
