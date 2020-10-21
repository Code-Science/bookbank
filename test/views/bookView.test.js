import chai from 'chai';
import * as bookView from '../../src/views/bookView';
import { elements } from '../../src/views/base';

const { assert } = chai; // TDD setting

describe('bookView', () => {
  before(() => {
    if (window.__html__) {
      document.body.innerHTML = window.__html__['src/index.html'];
    }
    // connecting elements with testing DOM
    elements.bookContent = document.querySelector('.book__content');
  });
  describe('clearPrevBook', () => {
    it('is a function', () => {
      assert.isFunction(bookView.clearPrevBook);
    });
    it('should clear the previous book content', () => {
      elements.bookContent.innerHTML = '<p>here is some text</p>';
      bookView.clearPrevBook();
      assert.equal(elements.bookContent.innerHTML, '');
    });
  });

  describe('renderBook', () => {
    let bookObj;
    before(() => {
      // book object that would be recieved to render on UI.
      bookObj = {
        volumeInfo: {
          title: 'Alice in wonderland',
          imageLinks: {
            thumbnail:
              'http://books.google.com/books/content?id=q7yZDwAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api',
          },
          authors: ['author1', 'author2'],
          publishedDate: '5475647',
          pageCount: 67,
        },
        accessInfo: {
          viewability: 'FULL_PAGES',
        },
        saleInfo: {
          saleability: 'not',
        },
      };
    });

    it('is a function', () => {
      assert.isFunction(bookView.renderBook);
    });

    it('should render book on UI given book details as object', () => {
      const bookInLibrary = true;
      const bookInWishlist = false;
      bookView.renderBook(bookObj, bookInLibrary, bookInWishlist);
      assert.notEqual(elements.bookContent.innerHTML, '');
      assert.equal(
        elements.bookContent.firstElementChild.className,
        'book__title'
      );
      assert.equal(
        elements.bookContent.firstElementChild.firstElementChild.innerText,
        `${bookObj.volumeInfo.title}`
      );
    });
  });
});
