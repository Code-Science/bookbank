class Library {
  // control all the my library functionality
  constructor() {
    this.itemsArray = [];
  }

  addItem(id, title, author, img) {
    const obj = {
      id,
      title,
      author,
      img,
    };
    this.itemsArray.push(obj);

    // Persisting data in localstorage
    this.persistData();

    return obj;
  }

  deleteItem(id) {
    const index = this.itemsArray.findIndex((el) => el.id === id);
    if (index !== -1) {
      this.itemsArray.splice(index, 1);

      // Persisting data in localstorage
      this.persistData();
    }
  }

  inLibrary(id) {
    // check if a book is present in library
    const index = this.itemsArray.findIndex((el) => el.id === id);
    if (index !== -1) {
      return true;
    }
    return false;
  }

  persistData() {
    localStorage.setItem('library', JSON.stringify(this.itemsArray));
  }

  readStorage() {
    const items = JSON.parse(localStorage.getItem('library'));

    // Restoring from localStorage
    if (items) {
      this.itemsArray = items;
    }
  }
}

module.exports = Library;
