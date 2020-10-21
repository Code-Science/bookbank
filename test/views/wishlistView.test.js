import chai from 'chai';
import * as wishlistView from '../../src/views/wishlistView';
import { elements } from '../../src/views/base';

const { assert } = chai;

describe('wishlistView', () => {
  before(() => {
    if (window.__html__) {
      document.body.innerHTML = window.__html__['src/index.html'];
    }
    // connecting elements with testing DOM
    elements.wishlistList = document.querySelector('.wishlist__books');
    elements.emptyWishlistMessage = document.querySelector(
      '.message__empty-wishlist'
    );
  });
  describe('renderWishlistBooks', () => {
    let bookObj;
    before(() => {
      bookObj = {
        id: '1234',
        title: 'javascript',
        author: 'john',
      };
    });
    it('is a function', () => {
      assert.isFunction(wishlistView.renderWishlistBooks);
    });
    it('Render book in wishlist section on UI', () => {
      assert.equal(elements.wishlistList.innerHTML.trim(), '');
      wishlistView.renderWishlistBooks(bookObj);
      assert.notEqual(elements.wishlistList.innerHTML.trim(), '');
      assert.equal(elements.wishlistList.childElementCount, 1);
      assert.equal(
        elements.wishlistList.firstElementChild.className,
        'wishlist__book'
      );
    });
    it('have id as href value', () => {
      assert.equal(
        elements.wishlistList.firstElementChild.firstElementChild.getAttribute(
          'href'
        ),
        `#${bookObj.id}`
      );
    });
    it('"deleteWishlistBook " removes the book from wishlist on UI', () => {
      assert.equal(elements.wishlistList.childElementCount, 1);
      wishlistView.deleteWishlistBook(bookObj.id); // should delete the previously added book
      assert.equal(elements.wishlistList.childElementCount, 0);
    });
  });

  describe('showEmptyWishlistMessage', () => {
    it('is a function', () => {
      assert.isFunction(wishlistView.showEmptyWishlistMessage);
    });
    it(' Display message on UI', () => {
      elements.emptyWishlistMessage.style.display = 'none';
      wishlistView.showEmptyWishlistMessage();
      assert.equal(elements.emptyWishlistMessage.style.display, 'block');
    });
  });
});
