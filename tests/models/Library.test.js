const { assert } = require('chai');
const Library = require('../../src/models/Library');

describe('Library', () => {
  let lib;
  let bookObj;
  beforeEach(() => {
    lib = new Library();
    bookObj = {
      id: 'id',
      title: 'title',
      author: 'author',
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
    lib.addItem('id', 'title', 'author'); // testing function, add single item(book) to itemsArray
    assert.lengthOf(lib.itemsArray, 1); // length after addition.
    assert.deepInclude(lib.itemsArray, bookObj);
  });

  it('delete items', () => {
    assert.isFunction(lib.deleteItem);
    assert.isEmpty(lib.itemsArray); // initial itemsArray value
    lib.itemsArray.push(bookObj);
    assert.include(lib.itemsArray, bookObj); // proves that it contain the item
    lib.deleteItem(bookObj.id); // checking if it delete the item or not
    assert.notInclude(lib.itemsArray, bookObj); // deleted item
    assert.isEmpty(lib.itemsArray); // again is empty after deletion.
  });

  it('check if an item is in library', () => {
    assert.isEmpty(lib.itemsArray); // initial check that library is empty
    const bool = lib.inLibrary(bookObj.id);
    assert.isFalse(bool, 'item is not found in lib');

    lib.addItem(bookObj.id, bookObj.title, bookObj.author); // check by adding item
    const anothorBool = lib.inLibrary(bookObj.id);
    assert.isTrue(anothorBool, 'item is found');
  });
});
