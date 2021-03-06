import { elements, showBooksPage, showRelevantResults } from './base';
import bookImage from '../assets/book.jpg';

export const clearPrevBook = () => {
  elements.bookContent.innerHTML = '';
};

export const renderBook = (bookObj, inLibrary, inWishlist) => {
  const markup = `
            <h1 class="book__title">
                 <span>${bookObj.volumeInfo.title}</span>
             </h1>
            <div class="book__data">
                <figure class="book__fig">
                    <img
                        src=${
                          bookObj.volumeInfo.imageLinks
                            ? bookObj.volumeInfo.imageLinks.thumbnail
                            : bookImage
                        }
                        alt="Book Image"
                        class="book__img"
                    />
                </figure>
                <div class="book__details">
                    <p class="book__author">${
                      bookObj.volumeInfo.authors
                        ? bookObj.volumeInfo.authors.join(', ')
                        : ''
                    }</p>
                    <p class="book__publisher">${
                      bookObj.volumeInfo.publisher
                        ? `${bookObj.volumeInfo.publisher},`
                        : ``
                    } ${bookObj.volumeInfo.publishedDate}, ${
    bookObj.volumeInfo.pageCount
  } pages</p>
                    <p class="book__ISBN">${
                      bookObj.volumeInfo.industryIdentifiers
                        ? `ISBN: ${
                            bookObj.volumeInfo.industryIdentifiers[0].identifier
                          }${
                            bookObj.volumeInfo.industryIdentifiers[1]
                              ? `, ${bookObj.volumeInfo.industryIdentifiers[1].identifier}`
                              : ''
                          }`
                        : ''
                    }</p>
                    <div class="book__rating">Rating: ${
                      bookObj.volumeInfo.averageRating
                        ? bookObj.volumeInfo.averageRating
                        : 0
                    }</div>
                    <p class="book__category">${
                      bookObj.volumeInfo.categories
                        ? bookObj.volumeInfo.categories.join(', ')
                        : 'General'
                    }</p>
                    <p class="book__text">
                        ${
                          bookObj.volumeInfo.subtitle
                            ? bookObj.volumeInfo.subtitle
                            : ''
                        }
                    </p>
                </div>
            </div>

            <div class="book__description">
                    <h3>Description</h3>
                    <p> ${
                      bookObj.volumeInfo.description
                        ? bookObj.volumeInfo.description
                        : 'Not Found'
                    }</p>
            </div>

            <div class="book__buttons">
            ${
              bookObj.accessInfo.viewability !== 'NO_PAGES'
                ? `<a href=${bookObj.accessInfo.webReaderLink} class="book__btn--preview btn btn--gray" target="_blank">Read</a>`
                : ''
            }
                
              ${
                bookObj.saleInfo.saleability === 'FOR_SALE'
                  ? `<a href=${bookObj.saleInfo.buyLink} class="book__btn--buy btn btn--pink" target="_blank">Buy now</a>`
                  : ``
              }  
                ${
                  bookObj.accessInfo.viewability !== 'NO_PAGES'
                    ? `
                <button class="book__btn--library btn btn--pink">
                    ${inLibrary ? 'Remove from library' : 'Add to my library'}
                </button>
                `
                    : `
                <button class="book__btn--wishlist btn btn--pink">
                    ${inWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
                </button>
                `
                }
            </div>
`;

  elements.bookContent.insertAdjacentHTML('afterbegin', markup);
};

// show book view from library or wishlist by clicking on book
export const showBookView = (event, libraryOrWishlist) => {
  if (
    event.target.matches(
      `.${libraryOrWishlist}__link, .${libraryOrWishlist}__link *`
    )
  ) {
    showBooksPage();
    window.scrollTo(0, 300);
    if (
      event.target.parentElement.parentElement.matches(
        `.${libraryOrWishlist}__link`
      )
    )
      showRelevantResults(event.target.parentElement.parentElement);
    else if (event.target.parentElement.matches(`.${libraryOrWishlist}__link`))
      showRelevantResults(event.target.parentElement);
  }
};
