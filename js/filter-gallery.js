const PICTURES_COUNT = 10;
const Filter = {
  DEFAULT: 'filter-default',
  RANDOM: 'filter-random',
  DISCUSSED: 'filter-discussed'
};

const filterElement = document.querySelector('.img-filters');
let currentFilter = Filter.DEFAULT;
let pictures = [];

const sortRandomly = () => pictures.slice().sort(() => Math.random() - 0.5).slice(0, PICTURES_COUNT);

const compareDiscussed = (pictureA, pictureB) => pictureB.comments.length - pictureA.comments.length;
const sortDiscussed = () => pictures.slice().sort(compareDiscussed);

const getFiltredPictures = () => {
  switch (currentFilter) {
    case Filter.RANDOM:
      return sortRandomly();
    case Filter.DISCUSSED:
      return sortDiscussed();
    default:
      return pictures;
  }
};

const setOnFilterClick = (callback) => {
  filterElement.addEventListener('click', (evt) => {
    if (!evt.target.classList.contains('img-filters__button')) {
      return;
    }

    const clickedButton = evt.target;
    if (clickedButton.id === currentFilter) {
      return;
    }

    filterElement
      .querySelector('.img-filters__button--active')
      .classList.remove('img-filters__button--active');

    clickedButton.classList.add('img-filters__button--active');
    currentFilter = clickedButton.id;
    callback(getFiltredPictures());
  });
};

const init = (loadedPictures, callback) => {
  filterElement.classList.remove('img-filters--inactive');
  pictures = [...loadedPictures];
  setOnFilterClick(callback);
};

export {init, getFiltredPictures};
