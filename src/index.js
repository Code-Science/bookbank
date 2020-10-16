import './sass/main.scss';
import Caller from './models/Caller';
import Library from './models/Library';
import * as resultsView from './views/resultsView';
import * as bookView from './views/bookView';
import * as libraryView from './views/libraryView';
import {
  elements,
  renderSpinner,
  clearSpinner,
  showBooksPage,
  showLibraryPage,
  showAdvancedSearchPage,
  showInitialPage,
  goBack,
  showErrorMessage,
  hideErrorMessage,
  scrollToTop,
  showRelevantResults,
} from './views/base';
import {
  getAdditionalQueryParams,
  changeFilterOption,
} from './views/filterResults';

// state of the application
const state = {
  filterOption: 'all',
  startIndex: 0, // start point of searches, takes care of pagination
};

/*
// GENERAL SEARCH CONTROL...........
*/
const searchControl = async (btn) => {
  // The parameter is a button type that trigger calling this function
  let queryObj;
  if (btn === 'submit') {
    // Get query from view or search input
    showBooksPage();
    const keywords = resultsView.getkeywords();
    const additionalQueryParams = getAdditionalQueryParams(
      state.filterOption,
      state.startIndex
    );
    queryObj = Caller.createRequestObject(
      'general',
      keywords,
      null,
      additionalQueryParams
    );
  } else {
    queryObj = state.search.queryObj; // refered it to the same queryObject that previously was used in search.
    queryObj.additionalQueryParams.startIndex = state.startIndex; // changed the start index to get more books, other than previously seen.(pagination)
  }
  if (queryObj) {
    // create new search instance and add to state
    state.search = new Caller(queryObj, 'general'); // creates a new search object but with different startIndex with different results (pagination)

    // cleaning previous searches
    resultsView.clearInput();
    resultsView.clearResults();
    renderSpinner(elements.searchRes);

    // Get search results according to the query made.
    await state.search.getResult();

    // Render results on IU
    clearSpinner();
    if (state.search.result) {
      resultsView.renderResults(state.search.result);

      // Display of Pagination buttons
      if (state.search.result.length === 10) {
        resultsView.showMoreBtn();
      }
      if (btn === 'more' || state.startIndex >= 10) {
        resultsView.showPrevBtn();
      }

      // Getting id for Full display of first book in results list only on submit
      if (btn === 'submit') {
        const id = elements.searchResList.firstElementChild.firstElementChild.getAttribute(
          'href'
        );
        window.location.hash = id;
      }
    } else {
      resultsView.renderNotFound();
    }
  }
};

elements.searchForm.addEventListener('submit', (event) => {
  event.preventDefault();
  resultsView.hidePaginationBtns();
  state.startIndex = 0;
  searchControl('submit');
});

// Adding event listeners on filter options of search bar.
const filterOptionsElementsArray = Array.from(elements.popupItems);
filterOptionsElementsArray.forEach((el) => {
  el.addEventListener('click', () => {
    state.filterOption = changeFilterOption(el);
  });
});

/*
//  SPECIFIC BOOK REQUEST CONTROL................
*/

const specificRequestControl = async () => {
  const id = window.location.hash.replace('#', '');
  if (id) {
    bookView.clearPrevBook();
    renderSpinner(elements.book);
    const reqObj = Caller.createRequestObject('specific', id);

    // Hightlight selected item
    if (state.search) resultsView.activeItemSelection(id);
    // create new SpecificRequest instance and add to state
    state.specificRequest = new Caller(reqObj, 'specific');

    // Get Book or magazine data
    await state.specificRequest.getResult();

    clearSpinner();
    bookView.renderBook(
      state.specificRequest.result,
      state.library.inLibrary(id)
    );
  }
};

window.addEventListener('hashchange', specificRequestControl);
window.addEventListener('load', specificRequestControl);

/*
//  ADVANCED SEARCH CONTROL
*/

const advancedSearchControl = async () => {
  // hide previous error message if any!
  hideErrorMessage();

  // Get all the query values from results view.
  // check if user provided or entered required values in advanced search form.
  if (resultsView.checkValidity()) {
    showBooksPage();
    scrollToTop();
    const keywords = resultsView.getkeywords('advanced');
    const standardQueryParams = resultsView.getStandardInputValues();
    const additionalQueryParams = resultsView.getadditionalInputValues();
    const queryObj = Caller.createRequestObject(
      'general',
      keywords,
      standardQueryParams,
      additionalQueryParams
    );

    if (queryObj) {
      // create new search instance and add to state
      state.search = new Caller(queryObj, 'general');
      // cleaning previous searches
      resultsView.clearInput();
      resultsView.clearResults();
      renderSpinner(elements.searchRes);
      // Get search results according to the query made.
      await state.search.getResult();
      // Render results on IU
      clearSpinner();
      if (state.search.result) {
        resultsView.renderResults(state.search.result);
        if (state.search.result.length === 10) {
          resultsView.showMoreBtn();
        }
      } else {
        resultsView.renderNotFound();
      }
    }
  } else {
    showErrorMessage();
  }
};

elements.advancedSearchForm.addEventListener('submit', (event) => {
  event.preventDefault();
  resultsView.hidePaginationBtns();
  state.startIndex = 0;
  advancedSearchControl();
});

/*
// Handling the Pagination, Adding event listeners on 'More' and 'prev' buttons in results section.
*/

elements.resultsMoreBtn.addEventListener('click', (event) => {
  event.preventDefault();
  resultsView.hidePaginationBtns();
  state.startIndex += 10;
  searchControl('more');
});

elements.resultsPrevBtn.addEventListener('click', (event) => {
  event.preventDefault();
  resultsView.hidePaginationBtns();
  if (state.startIndex >= 10) {
    state.startIndex -= 10;
  }
  searchControl('prev');
});

/*
// Handling the functionality of adding books to 'my library'.
*/

// Restore library on page load from localStorage
window.addEventListener('load', () => {
  // Creating Library
  state.library = new Library();
  state.library.readStorage();

  // Render Existing Books in library
  if (state.library.itemsArray.length > 0) {
    state.library.itemsArray.forEach((book) =>
      libraryView.renderLibraryBooks(book)
    );
  } else {
    libraryView.showEmptyLibraryMessage();
  }
});

const libraryControl = () => {
  // if book not added in library then add it
  const currentId = state.specificRequest.idObj.id;
  if (!state.library.inLibrary(currentId)) {
    const currentBookObj = state.specificRequest.result;
    const authors = currentBookObj.volumeInfo.authors
      ? currentBookObj.volumeInfo.authors.join(', ')
      : ' ';
    const image = currentBookObj.volumeInfo.imageLinks
      ? currentBookObj.volumeInfo.imageLinks.thumbnail
      : null;

    const newAddition = state.library.addItem(
      currentId,
      currentBookObj.volumeInfo.title,
      authors,
      image
    );
    libraryView.hideEmptyLibraryMessage();
    libraryView.renderLibraryBooks(newAddition);
    libraryView.toggleAddToLibraryBtn(true);
  } else {
    // if book is in library then, remove it

    state.library.deleteItem(currentId);
    libraryView.toggleAddToLibraryBtn(false);

    libraryView.deleteLibraryBook(currentId);
    if (state.library.itemsArray.length === 0) {
      libraryView.showEmptyLibraryMessage();
    }
  }
};

/* As the 'add to my library' button generates with new request and changes, we can't add event listeners on it directly
   for this purpose, we will add event listener on parent element 'book' and then use the event matches method to target the 
   specific child element */

elements.libList.addEventListener('click', (event) => {
  if (event.target.matches('.library__link, .library__link *')) {
    showBooksPage();
    window.scrollTo(0, 300);
    if (event.target.parentElement.parentElement.matches('.library__link'))
      showRelevantResults(event.target.parentElement.parentElement);
    else if (event.target.parentElement.matches('.library__link'))
      showRelevantResults(event.target.parentElement);
  }
});

elements.book.addEventListener('click', (event) => {
  if (event.target.matches('.book__btn--library')) {
    libraryControl();
  }
});

/*
   Nav Buttons Functionality
*/

elements.libraryNavBtn.addEventListener('click', (event) => {
  event.preventDefault();
  showLibraryPage();
});

elements.advancedSearchNavBtn.addEventListener('click', (event) => {
  event.preventDefault();
  showAdvancedSearchPage();
});

elements.homeNavBtn.addEventListener('click', (event) => {
  event.preventDefault();
  showInitialPage();
});

/*
   Back Buttons Functionality from library and advanced search page
*/

[elements.btnBackLibrary, elements.btnBackAdvancedSearch].forEach((el) => {
  el.addEventListener('click', (event) => {
    event.preventDefault();
    goBack();
  });
});

/*
// Initially displayed Content on Home Page
*/

Array.from(elements.initialContentLinks).forEach((el) => {
  el.addEventListener('click', () => {
    showBooksPage();
    window.scrollTo(0, 300);
    showRelevantResults(el);
  });
});
