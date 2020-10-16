import { elements } from './base';
import bookImage from '../assets/book.jpg';

export const clearPrevBook = () => {
  elements.bookContent.innerHTML = '';
};

export const renderBook = (bookObj, inLibrary) => {
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
                ? `<a href=${bookObj.accessInfo.webReaderLink} class="book__btn--preview btn btn--gray">Read</a>`
                : ''
            }
                
              ${
                bookObj.saleInfo.saleability === 'FOR_SALE'
                  ? `<a href=${bookObj.saleInfo.buyLink} class="book__btn--buy btn btn--pink">Buy now</a>`
                  : ``
              }  
                <button class="book__btn--library btn btn--pink">
                    ${inLibrary ? 'Remove from library' : 'Add to my library'}
                </button>
            </div>
`;

  elements.bookContent.insertAdjacentHTML('afterbegin', markup);
};
