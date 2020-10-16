import { elements, advancedSearchInputs } from './base';
import bookImage from '../assets/book.jpg';

const { limitString } = require('../utilities');

export const getkeywords = (type = 'simple') => {
  if (type === 'advanced') {
    const keywords = advancedSearchInputs.keywords.value;
    return keywords;
  }
  return elements.searchInput.value;
};

// export const getOptionalParams = () =>
export const clearInput = () => {
  elements.searchInput.value = '';
};

export const clearResults = () => {
  elements.searchResList.innerHTML = '';
};

const renderBook = (book) => {
  const markup = `
    <li class="results__item">
        <a class="results__link" href="#${book.id}">
            <figure class="results__fig">
                <img
                src=${
                  book.volumeInfo.imageLinks
                    ? book.volumeInfo.imageLinks.thumbnail
                    : bookImage
                }
                alt="book"
                class="results__img"
                />
            </figure>
            <div class="results__data">
                <h4 class="results__name">${limitString(
                  book.volumeInfo.title,
                  40
                )}</h4>
                <p class="results__author">${
                  book.volumeInfo.authors
                    ? book.volumeInfo.authors.join(', ')
                    : ''
                }</p>
            </div>
        </a>
    </li>
`;

  elements.searchResList.insertAdjacentHTML('beforeend', markup);
};

export const renderResults = (books) => {
  books.forEach(renderBook);
};

export const renderNotFound = () => {
  elements.searchResList.insertAdjacentHTML(
    'afterbegin',
    '<p class="message__not-found"> Result not found </p>'
  );
};

export const showPrevBtn = () => {
  elements.resultsPrevBtn.style.display = 'block';
};

export const showMoreBtn = () => {
  elements.resultsMoreBtn.style.display = 'block';
};

export const hidePrevBtn = () => {
  elements.resultsPrevBtn.style.display = 'none';
};

export const hideMoreBtn = () => {
  elements.resultsMoreBtn.style.display = 'none';
};

export const hidePaginationBtns = () => {
  hideMoreBtn();
  hidePrevBtn();
};

export const activeItemSelection = (id) => {
  const resultsArray = Array.from(document.querySelectorAll('.results__link'));
  resultsArray.forEach((el) => {
    el.classList.remove('results__link--active');
  });
  const selectedBook = document.querySelector(`.results__link[href*="${id}"]`);
  if (selectedBook) {
    selectedBook.classList.add('results__link--active');
  }
};

/*
// Advanced Search functionality
*/

// keywords value is already available by 'getKeywords function above.

// Get all the input values.
export const getStandardInputValues = () => {
  const obj = {
    intitle: advancedSearchInputs.title.value,
    inauthor: advancedSearchInputs.author.value,
    inpublisher: advancedSearchInputs.publisher.value,
    subject: advancedSearchInputs.subject.value,
    isbn: advancedSearchInputs.isbn.value,
  };
  return obj;
};

export const getadditionalInputValues = () => {
  const obj = {
    filter: document.querySelector('input[name=filter]:checked').value,
    startIndex: 0,
    maxResults: '',
    printType: document.querySelector('input[name=printType]:checked').value,
    orderBy: document.querySelector('input[name=orderBy]:checked').value,
  };
  return obj;
};

// clear advanced search inputs

export const resetAdvancedSearchInputs = () => {
  advancedSearchInputs.keywords.value = '';
  advancedSearchInputs.title.value = '';
  advancedSearchInputs.author.value = '';
  advancedSearchInputs.publisher.value = '';
  advancedSearchInputs.subject.value = '';
  advancedSearchInputs.isbn.value = '';
  document.getElementById('radiofilterAll').checked = true;
  document.getElementById('radioAll').checked = true;
  document.getElementById('radioRelevance').checked = true;
};

// check if user provided or entered required values in advanced search form.
export const checkValidity = () => {
  const standardValues = getStandardInputValues();
  const keywords = advancedSearchInputs.keywords.value;
  let bool = false;
  if (keywords) {
    bool = true;
  }
  Object.keys(standardValues).forEach((key) => {
    if (standardValues[key] && key !== 'subject') {
      bool = true;
    }
  });
  return bool;
};
