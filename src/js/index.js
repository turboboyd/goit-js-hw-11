import { Notify } from 'notiflix/build/notiflix-notify-aio';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import throttle from 'lodash.throttle';
import NewServer from './api-key';
const newServer = new NewServer();

const galleryWrap = document.querySelector('.gallery');
const searchForm = document.querySelector('.search-form');

searchForm.addEventListener('submit', onFormSubmit);

function onFormSubmit(e) {
  e.preventDefault();
  newServer.query = e.currentTarget.elements.searchQuery.value;
  newServer.resetPage();
  newServer
    .fetchSearch()
    .then(request => {
      if (newServer.query === '') {
        return;
      } else if (request.hits.length === 0) {
        return Notify.failure(
          'Sorry, there are no images matching your search query. Please try again.'
        );
      }
      Notify.success(`Hooray! We found ${request.totalHits} images.`);
      clearContainer(), renderResult(request.hits), lightbox.refresh();
    })
    .catch(err => {
      console.log(err);
      Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      );
    });
}

function renderResult(arry) {
  const markup = arry
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) =>
        `<div class="photo-card">
        <a href="${largeImageURL}"><img width="100%" height= "200" src="${webformatURL}" alt="${tags}" loading="lazy" /></a>
        <div class="info">
            <p class="info-item">
              <b>Likes</b> ${likes}
            </p>
            <p class="info-item">
              <b>Views</b>
            ${views}
            </p>
            <p class="info-item">
              <b>Comments</b>
            ${comments}
            </p>
            <p class="info-item">
              <b>Downloads</b>
            ${downloads}
            </p>
        </div>
    </div>`
    )
    .join('');
  return galleryWrap.insertAdjacentHTML('beforeend', markup);
}

function clearContainer() {
  galleryWrap.innerHTML = '';
}

var lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});

window.addEventListener('scroll', throttle(handleScroll, 500));

function handleScroll() {
  if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
    newServer
      .fetchSearch()
      .then(request => {
        renderResult(request.hits), lightbox.refresh();
        const { height: cardHeight } = document
          .querySelector('.gallery')
          .firstElementChild.getBoundingClientRect();

        window.scrollBy({
          top: cardHeight * 2,
          behavior: 'smooth',
        });
      })
      .catch(err => {
        console.log(err);
        Notify.failure(
          `We're sorry, but you've reached the end of search results.`
        );
      });
  }
}
