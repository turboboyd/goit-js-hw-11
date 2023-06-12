import { Notify } from 'notiflix/build/notiflix-notify-aio';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import throttle from 'lodash.throttle';
// // // гудд
// Notify.success('Sol lucet omnibus');
// // // ошика
// // Notify.failure('Qui timide rogat docet negare');

// import { fetchSearch } from './api-key';
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
    .then(hits => {
        clearContainer(),
        renderResult(hits),
        lightbox.refresh();
    })
    .catch(err => {
      console.log(err);
      Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      );
    });
}

// loadMore.addEventListener('click', () =>
//   newServer
//     .fetchSearch()
//     .then(data => {
//       renderResult(data),
//       { height: cardHeight } = document
//   .querySelector(".gallery")
//   .firstElementChild.getBoundingClientRect();

// window.scrollBy({
//   top: cardHeight * 2,
//   behavior: "smooth",
// });
//     })
//     .catch(err => {
//       console.log(err);
//       Notify.failure(
//         'Sorry, there are no images matching your search query. Please try again.'
//       );
//     })
// );

// рендер изображений
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



import throttle from 'lodash.throttle';

// ...

// Добавляем обработчик события scroll с использованием throttle для оптимизации
window.addEventListener('scroll', throttle(handleScroll, 500));

function handleScroll() {
  // Проверяем, достиг ли пользователь конца страницы
  if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
    // Выполняем запрос к API для загрузки следующей порции изображений
    newServer
      .fetchSearch()
      .then(data => {
        // Отображаем новые изображения в галерее
        renderResult(data);
      })
      .catch(err => {
        console.log(err);
        Notify.failure(
          'Sorry, there are no images matching your search query. Please try again.'
        );
      });
  }
}
