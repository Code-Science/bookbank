// For Simple Search

export const getAdditionalQueryParams = (string = 'all', startIndex) => {
  if (string === 'books' || string === 'magazines' || string === 'all') {
    return {
      printType: string,
      startIndex,
    };
  }
  if (
    string === 'free-ebooks' ||
    string === 'paid-ebooks' ||
    string === 'ebooks'
  ) {
    return {
      filter: string,
      startIndex,
    };
  }
  if (string === 'relevance' || string === 'newest') {
    return {
      orderBy: string,
      startIndex,
    };
  }
  return {
    printType: 'all',
    startIndex,
  };
};

export const changeFilterOption = (selectedElement) => {
  const prevSelectedEle = document.querySelector('.search__item--selected');
  const tickIcon = document.querySelector('.fa-check');
  prevSelectedEle.removeChild(tickIcon);
  prevSelectedEle.classList.remove('search__item--selected');
  selectedElement.classList.add('search__item--selected');
  selectedElement.insertAdjacentHTML(
    'beforeend',
    `<i class="fas fa-check"></i>`
  );
  return selectedElement.innerText;
};
