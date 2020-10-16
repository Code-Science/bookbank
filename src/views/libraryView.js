import { elements } from './base';
import bookImage from '../assets/book.jpg';

export const toggleAddToLibraryBtn = (inLibrary) => {
  const text = inLibrary ? 'Remove from library' : 'Add to my library';
  const btn = document.querySelector('.book__btn--library');
  if (btn) btn.innerText = text;
};

export const renderLibraryBooks = (book) => {
  const markup = `
        <div class="library__book">
            <a
              class="library__link"
              href="#${book.id}" >
              <figure class="library__fig">
                <img
                  src=${book.img ? book.img : bookImage}
                  alt=${book.title}
                  class="library__img"
                />
              </figure>
              <div class="library__data">
                <h4 class="heading-4">${book.title}</h4>
                <p class="library__author">${book.author}</p>
              </div>
            </a>
            <div>
            ${
              book.readLink
                ? `
                  <a href=${book.readLink} class="library__btn library__read-link btn btn--pink" target="_blank">Read</a>`
                : ''
            }
              <button class="library__btn library__btn--delete btn btn--gray" id="${
                book.id
              }">Remove</button>
            </div>
        </div>
    `;

  elements.libList.insertAdjacentHTML('beforeend', markup);
};

export const deleteLibraryBook = (id) => {
  const bookElement = document.querySelector(`.library__link[href*="${id}"]`)
    .parentElement;
  if (bookElement) bookElement.parentElement.removeChild(bookElement);
};

// If there is no Book added in library, then show below message

export const showEmptyLibraryMessage = () => {
  elements.emptyLibraryMessage.style.display = 'block';
};

export const hideEmptyLibraryMessage = () => {
  elements.emptyLibraryMessage.style.display = 'none';
};
