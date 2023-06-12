// const BASE_URL = 'https://pixabay.com/api/';
// const API_KEY = '37071230-d6b04d3068f1a0950a5b376a5';
// import { Notify } from 'notiflix/build/notiflix-notify-aio';
// import throttle from 'lodash.throttle';

// function fetchSearch() {
//   const searchParams = new URLSearchParams({
//     key: API_KEY,
//     image_type: 'photo',
//     orientation: 'horizontal',
//     safesearch: true,
//   });
//   return fetch(`${BASE_URL}?${searchParams}`).then(r => r.json());
// }
import { Notify } from 'notiflix/build/notiflix-notify-aio';

export default class NewServer {
  constructor() {
    this.searchName = '';
    this.numberPage = 1;
  }
  fetchSearch() {
    const BASE_URL = 'https://pixabay.com/api/';
    const API_KEY = '37071230-d6b04d3068f1a0950a5b376a5';

    const searchParams = new URLSearchParams({
      key: API_KEY,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
      per_page: 40,
    });
    return fetch(
      `${BASE_URL}?${searchParams}&q=${this.searchName}&page=${this.numberPage}`
    )
      .then(r => r.json())
      .then(data => {
        if (this.numberPage === 1) {
          Notify.success(`Hooray! We found ${data.totalHits} images.`);
        }
        this.inctementPage()
        return data.hits;
      });
  }

  inctementPage() {
    this.numberPage += 1;
  }

  resetPage() {
    this.numberPage = 1;
  }

  get query() {
    return this.searchName;
  }

  set query(newQuery) {
    return (this.searchName = newQuery);
  }
}

