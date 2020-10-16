import { elements } from './base';
import bookImage from '../assets/book.jpg';

export const toggleAddToWishlistBtn = (inWishlist) => {
  const text = inWishlist ? 'Remove from wishlist' : 'Add to my wishlist';
  const btn = document.querySelector('.book__btn--wishlist');
  if (btn) btn.innerText = text;
};

export const renderWishlistBooks = (book) => {
  const markup = `
        <div class="wishlist__book">
            <a
              class="wishlist__link"
              href="#${book.id}" >
              <figure class="wishlist__fig">
                <img
                  src=${book.img ? book.img : bookImage}
                  alt=${book.title}
                  class="wishlist__img"
                />
              </figure>
              <div class="wishlist__data">
                <h4 class="heading-4">${book.title}</h4>
                <p class="wishlist__author">${book.author}</p>
              </div>
            </a>
            <div>
              <button class="wishlist__btn wishlist__btn--delete btn btn--gray" id="${
                book.id
              }">Remove</button>
            </div>
        </div>
    `;

  elements.wishlistList.insertAdjacentHTML('beforeend', markup);
};

export const deleteWishlistBook = (id) => {
  const bookElement = document.querySelector(`.wishlist__link[href*="${id}"]`)
    .parentElement;
  if (bookElement) bookElement.parentElement.removeChild(bookElement);
};

// If there is no Book added in wishlist, then show below message

export const showEmptyWishlistMessage = () => {
  elements.emptyWishlistMessage.style.display = 'block';
};

export const hideEmptyWishlistMessage = () => {
  elements.emptyWishlistMessage.style.display = 'none';
};
