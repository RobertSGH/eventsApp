import * as model from './model.js';
import eventView from './views/eventView.js';
import searchView from './views/searchView.js';
import resultsView from './views/resultsView.js';
import paginationView from './views/paginationView.js';
import View from './views/View.js';
import popularView from './views/popularView.js';
import shareView from './views/shareView.js';
import tabsView from './views/tabsView.js';
import locationEventsView from './views/locationEventsView.js';
import bookmarksView from './views/bookmarksView';

const controlEvent = async function () {
  try {
    const id = window.location.hash.slice(1);
    if (!id) return;
    eventView.renderSpinner();

    resultsView.update(model.getSearchResultsPage());
    bookmarksView.update(model.state.bookmarks);
    popularView.update(model.state.popular.results);

    await model.loadEvent(id);

    eventView.render(model.state.event);
  } catch (err) {
    eventView.renderError();
    console.error(err);
  }
};

const controlSearchResults = async function () {
  try {
    resultsView.renderSpinner();
    const query = searchView.getQuery();
    if (!query) return;
    await model.loadSearchResults(query);
    resultsView.render(model.getSearchResultsPage());
    paginationView.render(model.state.search);
  } catch (err) {
    resultsView.renderError();
  }
};

const controlPagination = function (goToPage) {
  resultsView.render(model.getSearchResultsPage(goToPage));
  paginationView.render(model.state.search);
};

const controlPopularEvents = async function () {
  try {
    popularView.renderSpinner();
    await model.loadPopularEvents();
    popularView.render(model.state.popular.results);
    // popularView.update(model.state.popular.results);
    popularView.sliderBtns();
  } catch (err) {
    View.renderError();
  }
};

const controlLocationEvents = async function () {
  try {
    await model.loadLocationEvents();
    locationEventsView.render(model.state.location.results);
    locationEventsView.sliderBtns();
  } catch (err) {
    View.renderError();
  }
};

const controlAddBookmark = function () {
  if (!model.state.event.bookmarked) model.addBookmark(model.state.event);
  else model.deleteBookmark(model.state.event.id);

  eventView.update(model.state.event);

  bookmarksView.render(model.state.bookmarks);
};

const controlBookmarks = function () {
  bookmarksView.render(model.state.bookmarks);
  // if (model.state.bookmarks) return bookmarksView.renderError();
};

const init = function () {
  bookmarksView.addHandlerRender(controlBookmarks);
  eventView.addHandlerRender(controlEvent);
  eventView.addHandlerAddBookmark(controlAddBookmark);
  searchView.addHandlerSearch(controlSearchResults);
  paginationView.addHandlerClick(controlPagination);
  controlPopularEvents();
  controlLocationEvents();
  shareView.share();
  tabsView.tabsMarkup();
};
init();
