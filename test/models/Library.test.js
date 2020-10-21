import chai from 'chai';
import sinon from 'sinon';
import Library from '../../src/models/Library.js';

const { assert } = chai;

describe('Library', () => {
  let lib;
  let bookObj;
  let mock;
  beforeEach(() => {
    lib = new Library();

    // mocking 'persistData' function that would be called inside addItem and deleteItem.
    mock = sinon.mock(lib);
    const expectation = mock.expects('persistData');
    expectation.exactly(1);

    bookObj = {
      id: 'id',
      title: 'title',
      author: 'author',
      img: 'img',
    };
  });
  it('have items Array to store all books', () => {
    assert.instanceOf(lib, Library);
    assert.property(lib, 'itemsArray');
    assert.isArray(lib.itemsArray, 'library books array');
    assert.isEmpty(lib.itemsArray);
  });

  it('Add items', () => {
    assert.isFunction(lib.addItem);
    assert.isEmpty(lib.itemsArray);
    lib.addItem('id', 'title', 'author', 'img'); // testing function, add single item(book) to itemsArray
    mock.verify();
    assert.lengthOf(lib.itemsArray, 1); // length after addition.
    assert.deepInclude(lib.itemsArray, bookObj);
  });

  it('delete items', () => {
    assert.isFunction(lib.deleteItem);
    assert.isEmpty(lib.itemsArray); // initial itemsArray value
    lib.itemsArray.push(bookObj);
    assert.include(lib.itemsArray, bookObj); // proves that it contain the item
    lib.deleteItem(bookObj.id); // checking if it delete the item or not
    mock.verify();
    assert.notInclude(lib.itemsArray, bookObj); // deleted item
    assert.isEmpty(lib.itemsArray); // again is empty after deletion.
  });

  it('check if an item is in library', () => {
    assert.isEmpty(lib.itemsArray); // initial check that library is empty
    const bool = lib.inLibrary(bookObj.id);
    assert.isFalse(bool, 'item is not found in lib');

    lib.addItem(bookObj.id, bookObj.title, bookObj.author); // check by adding item
    mock.verify();
    const anothorBool = lib.inLibrary(bookObj.id);
    assert.isTrue(anothorBool, 'item is found');
  });
});
