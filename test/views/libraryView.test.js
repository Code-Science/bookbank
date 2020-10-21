import chai from 'chai';
import * as libraryView from '../../src/views/libraryView';
import { elements } from '../../src/views/base';

const { assert } = chai;

describe('libraryView', () => {
  before(() => {
    if (window.__html__) {
      document.body.innerHTML = window.__html__['src/index.html'];
    }
    // connecting elements with testing DOM
    elements.libList = document.querySelector('.library__books');
    elements.emptyLibraryMessage = document.querySelector(
      '.message__empty-library'
    );
  });
  describe('renderLibraryBooks', () => {
    let bookObj;
    before(() => {
      bookObj = {
        id: '1234',
        title: 'javascript',
        author: 'john',
      };
    });
    it('is a function', () => {
      assert.isFunction(libraryView.renderLibraryBooks);
    });
    it('Render book in library section on UI', () => {
      assert.equal(elements.libList.innerHTML.trim(), '');
      libraryView.renderLibraryBooks(bookObj);
      assert.notEqual(elements.libList.innerHTML.trim(), '');
      assert.equal(elements.libList.childElementCount, 1);
      assert.equal(
        elements.libList.firstElementChild.className,
        'library__book'
      );
    });
    it('have id as href value', () => {
      assert.equal(
        elements.libList.firstElementChild.firstElementChild.getAttribute(
          'href'
        ),
        `#${bookObj.id}`
      );
    });
    it('"deleteLibraryBook" removes the book from library on UI', () => {
      assert.equal(elements.libList.childElementCount, 1);
      libraryView.deleteLibraryBook(bookObj.id); // should delete the previously added book
      assert.equal(elements.libList.childElementCount, 0);
    });
  });

  describe('showEmptyLibraryMessage', () => {
    it('is a function', () => {
      assert.isFunction(libraryView.showEmptyLibraryMessage);
    });
    it(' Display message on UI', () => {
      elements.emptyLibraryMessage.style.display = 'none';
      libraryView.showEmptyLibraryMessage();
      assert.equal(elements.emptyLibraryMessage.style.display, 'block');
    });
  });
});
