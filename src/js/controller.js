import * as model from './model.js';
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import resultsView from './views/resultsView.js';
import paginationView from './views/paginationView.js';
import bookmarksView from './views/bookmarksView.js';
import addRecipeView from './views/addRecipeView.js';
import mobileNavView from './views/mobileNavView.js';
import { MODAL_CLOSE_SEC } from './config.js';

import 'core-js/stable';
import 'regenerator-runtime/runtime';
import { async } from 'regenerator-runtime';

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////
// if (module.hot) {
//   module.hot.accept();
// }

const controlRecipes = async function () {
  try {
    const id = window.location.hash.slice(1);
    if (!id) return;
    recipeView.renderSpinner();

    // 0) Update results-view and bookmarks to mark selected search results
    resultsView.update(model.getSearchResultsPage());
    bookmarksView.update(model.state.bookmarks);

    // 1) loading recipe
    await model.loadRecipe(id);

    // 2) Rendering recipe
    recipeView.render(model.state.recipe);
  } catch (err) {
    recipeView.renderError();
  }
};

const controlSearchResults = async function () {
  try {
    resultsView.renderSpinner();

    // 1) Get searched query
    const query = searchView.getQuery();

    // 2) Open Mobile-Nav results view (at mobiles)
    resultsView.openMobileNav();

    // 3) change Nav icon (at mobiles)
    mobileNavView.openIcon();

    // 4)Load search results
    await model.loadSearchResults(query);

    // 5) Render search results
    resultsView.render(model.getSearchResultsPage(1));

    // 6) Render pagination
    paginationView.render(model.state.search);
  } catch (err) {
    console.error(err);
  }
};

const controlPagination = function (goToPage) {
  // 1) Render NEW search results
  resultsView.render(model.getSearchResultsPage(goToPage));

  // 2) Render New pagination
  paginationView.render(model.state.search);
};

const controlServings = function (updataTo) {
  // 1) Update the recipe servings in state
  model.updateServings(updataTo);

  // 2) Update the recipe view
  recipeView.update(model.state.recipe);
};

const controlInitialBookmarks = function () {
  bookmarksView.render(model.state.bookmarks);
};

const controlAddBookmark = function () {
  // 1) Add /Remove bookmark
  if (!model.state.recipe.bookmarked) model.addBookmark(model.state.recipe);
  else if (model.state.recipe.bookmarked)
    model.deleteBookmark(model.state.recipe.id);

  // 2) Update recipe view
  recipeView.update(model.state.recipe);

  // 3) Render bookmarks
  bookmarksView.render(model.state.bookmarks);
};

const controlAddRecipe = async function (newRecipe) {
  try {
    // show loading spinner
    addRecipeView.renderSpinner();

    // Upload the new recipe data
    await model.uploadRecipe(newRecipe);

    // auto-Bookmark uploaded recipe
    model.addBookmark(model.state.recipe);

    // Change ID in URL
    window.history.pushState(null, '', `#${model.state.recipe.id}`);

    // Render recipe
    recipeView.render(model.state.recipe);

    // Render bookmarks view
    bookmarksView.render(model.state.bookmarks);

    // Render success message
    addRecipeView.renderMessage();

    // Close modal window after short period
    setTimeout(function () {
      const modalWindow = document.querySelector('.add-recipe-window');

      if (!modalWindow.classList.contains('hidden'))
        addRecipeView.toggleWindow();
    }, MODAL_CLOSE_SEC * 1000);

    // Return modal view to uploading state
  } catch (err) {
    addRecipeView.renderError(err.message);
  }
};

const controlMobileNav = function () {
  //1) Toggle nav icons in mobileNavView
  mobileNavView.toggleIcon();

  //2) Toggle (show) class in resultsView
  resultsView.toggleMobileNav();
};
/////////////////////////////////////////
// Event Handlers
const init = function () {
  bookmarksView.addHandlerRender(controlInitialBookmarks);

  recipeView.addHandelerRender(controlRecipes);
  recipeView.addHandlerUpdateServings(controlServings);
  recipeView.addHandlerAddBookmark(controlAddBookmark);

  searchView.addHandlerSearch(controlSearchResults);

  paginationView.addHandelerClick(controlPagination);

  addRecipeView._addHandlerUpload(controlAddRecipe);

  mobileNavView.addHandelerClick(controlMobileNav);
};
init();

// event delegation
// debugger;

// const dataArr = [...new FormData()] >>>>> returns array of entries
// const data = Object.fromEntries(dataArr)  >>>>> from array of entries to object
// Object.entries(obj) >>>>>>> from object to array of entries

//window.location.hash.slice(1);
//window.history.pushState(null(state), ''(title) , '#${id}')   >>>>>>>>>> update the url without reloading page
//window.history.back()
//window.history.forward()

//upload recipe algorithm

// jsDocs
// jsdoc.app
