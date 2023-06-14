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
        this.inctementPage()
        return data;
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

