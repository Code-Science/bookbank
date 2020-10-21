### BOOKBANK

## General Description:

A book searching/finding web application, that is connected with Google books Api to fetch the requested books data. You can search by keywords or by providing further details like author name, title etc using advanced search option. All the related books would be displayed on UI , upon clicking on one, another request would be made to fetch more details about the book. You can add the book to either library or wishlist, depending on its readability option, and access the book data from there whenever wanted.

## Built Upon

HTML5, CSS3, Vanilla JavaScript, SASS, Webpack, Babel ...

## DETAILS

To control the workflow, MVC (MODEL VIEW CONTROLLER) architecture is used.
All the search/ Request related functionality is provided by Caller class. With every request, a new instance/object would be created containing details about the request. For book searching (Simple and advanced), You need to pass a string ('general') specifying type, and a request object (containing all the details about the request) as arguments.

## For General Search

first create queryObject by taking values from search inputs. Caller class also provides a static method called createRequestObject that returns the request Object by taking type of request (string) as an argument along with additional input details.
```javascript
import Caller from './models/Caller';
```
```javascript
const queryObj = Caller.createRequestObject('general', 'keywordsOrId', standartInputValues,additionalFilteringValues);
```
standardInputValues and additionalFilteringInputValues are optional to pass and contains details in the form of object. Example:
```javascript
const standartInputValues = {
           title: 'Alice in wonderland',
           author: '',
           publisher: '',
           subject: 'fiction',
           isbn: '',
 };

const search = new Caller(queryObject, 'general');
```
search object have createUrl method that generates url string by taking queryObject that is provided. This method is called under the hood by another method 'getResult'.
Then to get the data, getResult method is called, it returns a promise.
```javascript
await search.getResult(); // returns result as well as store result as search object property.

search.result = [
// Array of book Objects
];
```
## Specific Request

For Specific book request (To display full details), request object would contain book id.
```javascript
const reqObj = Caller.createRequestObject('specific', 'id');
const book = new Caller(reqObj, 'specific');
await book.getResult(); // returns result as well as store result as book object property.
```
results would be saved as properties of search or book objects.

book.result = {
// Book details
}

## Library/Wishlist

Upon visiting the App, A library and wishlist objects would be instantiated/created from Library Class.
```javascript
const library = new Library('library'); // string argument is the name of library
const wishlist = new Library('wishlist'); // Both have same models
```
both objects (as instantiated from same prototype) have readStorage method
```javascript
library.readStorage(); // that get data (previously added books in library) from users localStorage.
```
It have items Array where all the book objects are stored.

it also have addItem, deleteItem, inLibrary methods that add or delete items from the object and the third method identifies if an book is already stored in library or not by taking book id as an argument.

## AddItem
```javascript
library.addItem({
id: '4324354',
title: 'Alice in wonderland',
author: 'author',
img: 'if any',
readLink: 'link to read book if any'
});
```
## DeleteItem
```javascript
library.deleteItem('id');
```
// Takes book id as an argument.

## PAGINATION

With every search request, an array, containing maximun 10 book objects, would be obtained. 'More' button would show up to make another request to get more 10 books and so on. when the returned array length becomes less than 10, 'more' button disappears.

## Browsers support

## Browsers support

| [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png" alt="Firefox" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br/>Firefox | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png" alt="Chrome" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br/>Chrome | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_48x48.png" alt="Safari" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br/>Safari | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/opera/opera_48x48.png" alt="Opera" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br/>Opera |
| --------- | --------- | --------- | --------- |
| last 2 versions| last 2 versions| last 2 versions| last 2 versions
