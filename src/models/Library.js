class Library {
  // control all the my library functionality
  constructor(name) {
    this.itemsArray = [];
    this.name = name;
  }

  addItem(id, title, author, img, readLink = '') {
    const obj = {
      id,
      title,
      author,
      img,
    };
    if (readLink) obj.readLink = readLink;
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
    if (typeof this.name === 'string') {
      localStorage.setItem(this.name, JSON.stringify(this.itemsArray));
    }
  }

  readStorage() {
    const items = JSON.parse(localStorage.getItem(this.name));

    // Restoring from localStorage
    if (items) {
      this.itemsArray = items;
    }
  }
}

export default Library;
