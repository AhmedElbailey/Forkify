import View from './View.js';
import icons from 'url:../../img/icons.svg';

class PaginationView extends View {
  _parentElement = document.querySelector('.pagination');

  addHandelerClick(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--inline');
      if (!btn) return;

      const goToPage = +btn.dataset.goto;
      handler(goToPage);
    });
  }

  _generateHtml() {
    const curPage = this._data.page;
    const numPages = Math.ceil(
      this._data.results.length / this._data.numResultsPerPage
    );

    const htmlBtnPrevious = `
            <button data-goto="${
              curPage - 1
            }" class="btn--inline  pagination__btn--prev">
                <svg class="search__icon">
                <use href="${icons}#icon-arrow-left"></use>
                </svg>
                <span>Page ${curPage - 1}</span>
            </button>
       `;
    const htmlBtnNext = `
            <button data-goto="${
              curPage + 1
            }" class="btn--inline  pagination__btn--next">
                <span>Page ${curPage + 1}</span>
                <svg class="search__icon">
                    <use href="${icons}#icon-arrow-right"></use>
                </svg>
            </button>
       `;

    // 1 page , and there are other pages
    if (curPage === 1 && numPages > 1) return htmlBtnNext;
    // last page of many pages
    else if (curPage === numPages && numPages > 1) return htmlBtnPrevious;
    //middle page
    else if (curPage < numPages) return htmlBtnPrevious + htmlBtnNext;
    // 1 page , and there are NO other pages
    else return '';
  }
}

export default new PaginationView();
