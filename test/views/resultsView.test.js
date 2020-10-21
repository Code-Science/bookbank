import chai from 'chai';
import * as resultsView from '../../src/views/resultsView';
import { elements, advancedSearchInputs } from '../../src/views/base';

const { assert } = chai; // TDD setting

describe('resultsView', () => {
  before(() => {
    if (window.__html__) {
      document.body.innerHTML = window.__html__['src/index.html'];
    }
    // connecting elements with testing DOM
    elements.searchInput = document.querySelector('.search__field');
    elements.searchResList = document.querySelector('.results__list');
    elements.resultsPrevBtn = document.querySelector('.results__btn--prev');
    elements.resultsMoreBtn = document.querySelector('.results__btn--more');
  });

  describe('getKeywords', () => {
    it('is a function', () => {
      assert.isFunction(resultsView.getkeywords);
    });
    it('returns input value', () => {
      elements.searchInput.value = 'Some value';
      const inputValue = resultsView.getkeywords();
      assert.equal(inputValue, 'Some value');
    });
  });

  describe('renderResults', () => {
    let books;
    before(() => {
      books = [
        {
          id: '12345',
          volumeInfo: {
            title: 'java',
            authors: ['author1', 'author2'],
          },
        },
        {
          id: '57432',
          volumeInfo: {
            title: 'python',
            authors: ['author1', 'author2'],
          },
        },
        {
          id: '976433',
          volumeInfo: {
            title: 'javascript',
            authors: ['author1', 'author2'],
          },
        },
      ];
    });
    it('is a function', () => {
      assert.isFunction(resultsView.renderResults);
    });
    it('Render results (In the form of array of book objects) on UI', () => {
      assert.equal(elements.searchResList.innerHTML.trim(), '');
      resultsView.renderResults(books);
      assert.notEqual(elements.searchResList.innerHTML.trim(), '');
      assert.equal(elements.searchResList.childElementCount, 3);
      assert.equal(
        elements.searchResList.firstElementChild.className,
        'results__item'
      );
    });
    it('have id as href value', () => {
      assert.equal(
        elements.searchResList.firstElementChild.firstElementChild.getAttribute(
          'href'
        ),
        `#${books[0].id}`
      );
    });
    it('"clearResults" function clears the previously rendered results', () => {
      assert.notEqual(elements.searchResList.innerHTML.trim(), '');
      resultsView.clearResults();
      assert.equal(elements.searchResList.innerHTML.trim(), '');
    });
  });

  describe('renderNotFound', () => {
    it('is a function', () => {
      assert.isFunction(resultsView.renderNotFound);
    });
    it('Display "results not found" message"', () => {
      resultsView.renderNotFound();
      assert.equal(
        elements.searchResList.innerHTML.trim(),
        '<p class="message__not-found"> Result not found </p>'
      );
      assert.equal(elements.searchResList.childElementCount, 1);
    });
  });

  describe('Pagination buttons handling', () => {
    it('"showPrevBtn" display Prev button on UI', () => {
      assert.isFunction(resultsView.showPrevBtn);
      assert.equal(elements.resultsPrevBtn.style.display, '');
      resultsView.showPrevBtn();
      assert.equal(elements.resultsPrevBtn.style.display, 'block');
    });
    it('"hidePrevBtn" hides Prev button on UI', () => {
      assert.isFunction(resultsView.hidePrevBtn);
      assert.equal(elements.resultsPrevBtn.style.display, 'block');
      resultsView.hidePrevBtn();
      assert.equal(elements.resultsPrevBtn.style.display, 'none');
    });
    it('"showMoreBtn" display "more" button on UI', () => {
      assert.isFunction(resultsView.showMoreBtn);
      assert.equal(elements.resultsMoreBtn.style.display, '');
      resultsView.showMoreBtn();
      assert.equal(elements.resultsMoreBtn.style.display, 'block');
    });
    it('"hideMoreBtn" hides "more" button on UI', () => {
      assert.isFunction(resultsView.hideMoreBtn);
      assert.equal(elements.resultsMoreBtn.style.display, 'block');
      resultsView.hideMoreBtn();
      assert.equal(elements.resultsMoreBtn.style.display, 'none');
    });
  });
  describe('check if user provided or entered required values in advanced search form', () => {
    before(() => {
      // connect advanced search input elements with testing Dom
      advancedSearchInputs.author = document.getElementById('inputAuthor');
      advancedSearchInputs.title = document.getElementById('inputTitle');
      advancedSearchInputs.isbn = document.getElementById('inputISBN');
      advancedSearchInputs.keywords = document.getElementById('inputKeywords');
      advancedSearchInputs.publisher = document.getElementById(
        'inputPublisher'
      );
      advancedSearchInputs.subject = document.getElementById('inputCategory');
      advancedSearchInputs.keywords.value = '';
      advancedSearchInputs.title.value = '';
      advancedSearchInputs.author.value = '';
      advancedSearchInputs.publisher.value = '';
      advancedSearchInputs.isbn.value = '';
    });
    // atleast one of author, title, ISBN, keyword or publisher is required.
    it('"checkValidity" is a function', () => {
      assert.isFunction(resultsView.checkValidity);
    });
    it('Returns false if user didnt provide required input', () => {
      assert.isFalse(resultsView.checkValidity());
    });
    it('Returns true if user provide atleast one of author, title, ISBN, keyword or publisher value', () => {
      advancedSearchInputs.keywords.value = 'Some thing'; // keyword tested
      assert.isTrue(resultsView.checkValidity());
      advancedSearchInputs.keywords.value = '';
      assert.isFalse(resultsView.checkValidity());
      advancedSearchInputs.author.value = 'Jane'; // author tested
      assert.isTrue(resultsView.checkValidity());
      advancedSearchInputs.author.value = '';
      assert.isFalse(resultsView.checkValidity());
      advancedSearchInputs.title.value = 'Jane'; // title tested
      assert.isTrue(resultsView.checkValidity());
      advancedSearchInputs.title.value = '';
      assert.isFalse(resultsView.checkValidity());
      advancedSearchInputs.publisher.value = 'publisher'; // Publisher tested
      assert.isTrue(resultsView.checkValidity());
      advancedSearchInputs.publisher.value = '';
      assert.isFalse(resultsView.checkValidity());
      advancedSearchInputs.isbn.value = 'isbn'; // ISBN tested
      assert.isTrue(resultsView.checkValidity());
    });
  });
});
