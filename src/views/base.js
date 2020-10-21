export const elements = {
  header: document.querySelector('.header'),
  searchForm: document.querySelector('.search__form'),
  searchInput: document.querySelector('.search__field'),
  searchRes: document.querySelector('.results'),
  searchResList: document.querySelector('.results__list'),
  searchResPages: document.querySelector('.results__pages'),
  book: document.querySelector('.book'),
  bookContent: document.querySelector('.book__content'),
  popupItems: document.querySelectorAll('.search__item'),
  popupSelectedItem: document.querySelector('.search__item--selected'),
  likesMenu: document.querySelector('.likes__field'),
  libList: document.querySelector('.library__books'),
  library: document.querySelector('.library'),
  wishlist: document.querySelector('.wishlist'),
  wishlistList: document.querySelector('.wishlist__books'),
  wishlistNavBtn: document.querySelector('.nav__btn--wishlist'),
  initialContent: document.querySelector('.content'),
  initialContentLinks: document.querySelectorAll('.content__link'),
  advancedSearch: document.querySelector('.advanced-search'),
  libraryNavBtn: document.querySelector('.nav__btn--library'),
  advancedSearchNavBtn: document.querySelector('.nav__btn--advanced'),
  btnBackAdvancedSearch: document.querySelector('.advanced-search__btn--back'),
  btnBackLibrary: document.querySelector('.library__btn--back'),
  btnBackWishlist: document.querySelector('.wishlist__btn--back'),
  homeNavBtn: document.querySelector('.nav__btn--home'),
  advancedSearchForm: document.querySelector('.advanced__form'),
  errorMessage: document.querySelector('.message__error'),
  emptyLibraryMessage: document.querySelector('.message__empty-library'),
  emptyWishlistMessage: document.querySelector('.message__empty-wishlist'),
  resultsPrevBtn: document.querySelector('.results__btn--prev'),
  resultsMoreBtn: document.querySelector('.results__btn--more'),
};

export const advancedSearchInputs = {
  author: document.getElementById('inputAuthor'),
  title: document.getElementById('inputTitle'),
  isbn: document.getElementById('inputISBN'),
  keywords: document.getElementById('inputKeywords'),
  publisher: document.getElementById('inputPublisher'),
  subject: document.getElementById('inputCategory'),
};
export const renderSpinner = (parent) => {
  const spinner = `
       <div class="spinner">
            <span class="spinner-inner-1"></span>
            <span class="spinner-inner-2"></span>
            <span class="spinner-inner-3"></span>
       </div>
    `;
  if (parent) {
    parent.insertAdjacentHTML('afterbegin', spinner);
  }
};

export const clearSpinner = () => {
  const spinner = document.querySelector(`.spinner`);
  if (spinner) spinner.parentElement.removeChild(spinner);
};

if (elements.popupSelectedItem) {
  elements.popupSelectedItem.insertAdjacentHTML(
    'beforeend',
    `<i class="fas fa-check"></i>`
  );
}

// Main UI components/Pages of Application
const mainPageElements = [
  elements.library,
  elements.initialContent,
  elements.advancedSearch,
  elements.book,
  elements.searchRes,
  elements.wishlist,
];

let lastPageVisited = 'initialContent';
let currentPage = 'initialContent';

const updateLastPageVisited = (newVisited) => {
  lastPageVisited = currentPage;
  currentPage = newVisited;
};

// Hide all elements
const removeAllElementsFromDisplay = () => {
  mainPageElements.forEach((el) => {
    el.style.display = 'none';
  });
};

// Display only Books of searches
export const showBooksPage = () => {
  removeAllElementsFromDisplay();
  elements.book.style.display = 'block';
  elements.searchRes.style.display = 'block';
  updateLastPageVisited('books');
};

// Display only Library
export const showLibraryPage = () => {
  removeAllElementsFromDisplay();
  elements.library.style.display = 'block';
  updateLastPageVisited('library');
};

// Display only initial page
export const showInitialPage = () => {
  removeAllElementsFromDisplay();
  elements.initialContent.style.display = 'grid';
  updateLastPageVisited('initialContent');
};

// Display only Advanced Search UI page/Component
export const showAdvancedSearchPage = () => {
  removeAllElementsFromDisplay();
  elements.advancedSearch.style.display = 'block';
  updateLastPageVisited('advancedSearch');
};

export const showWishlistPage = () => {
  removeAllElementsFromDisplay();
  elements.wishlist.style.display = 'block';
  updateLastPageVisited('wishlist');
};

export const goBack = () => {
  switch (lastPageVisited) {
    case 'initialContent':
      showInitialPage();
      break;
    case 'books':
      showBooksPage();
      break;
    case 'advancedSearch':
      showAdvancedSearchPage();
      break;
    case 'library':
      showLibraryPage();
      break;
    case 'wishlist':
      showWishlistPage();
      break;
    default:
      showBooksPage();
  }
};

export const hideErrorMessage = () => {
  elements.errorMessage.style.display = 'none';
};

export const scrollToTop = () => {
  window.scrollTo({ top: 200, behavior: 'smooth' });
};

export const showErrorMessage = () => {
  elements.errorMessage.style.display = 'block';
  scrollToTop();
};

// this function search and fetch relevent results to the book element clicked on home page or library
export const showRelevantResults = (bookEle) => {
  const text = bookEle.lastElementChild.firstElementChild.innerText;
  advancedSearchInputs.keywords.value = text;
  const event = new Event('submit', {
    bubbles: true, // Whether the event will bubble up through the DOM or not
    cancelable: true, // Whether the event may be canceled or not
  });
  elements.advancedSearchForm.dispatchEvent(event);
  advancedSearchInputs.keywords.value = '';
};
