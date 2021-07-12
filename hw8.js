import galleryItems from './app.js';

// const refs = {
//   openModal: document.querySelector('.js-gallery'),
//   closeModal: document.querySelector('[data-action="close-lightbox"]'),
//   backdrop: document.querySelector('.js-lightbox'),
//   lightbox__image: document.querySelector('.lightbox__image'),
//   overlay: document.querySelector('.lightbox__overlay'),
// };
// // -----------------разметка--------------
// const CreateMarkupImg = galleryItems.map(({ preview, original, description }) => {
//   return `<li class="gallery__item">
//                 <a
//                     class="gallery__link"
//                     href="${original}"
//                 >
//                     <img
//                         class="gallery__image"
//                         src="${preview}"
//                         data-source="${original}"
//                         alt="${description}"
//                     />
//                 </a>
//             </li>`;
// });

// refs.openModal.insertAdjacentHTML('afterbegin', CreateMarkupImg.join(' '));
// // ----------------- add addEventListener--------------
// refs.openModal.addEventListener('click', onOpenModal);
// refs.closeModal.addEventListener('click', onCloseModal);
// refs.overlay.addEventListener('click', onCloseModal);
// window.addEventListener('keydown', onEscPress);
// // ----------------- Мои функции--------------
// function onEscPress(e) {
//   const isEskKey = e.code === 'Escape';
//   if (isEskKey) {
//     onCloseModal();
//   }
// }

// function onCloseModal() {
//   refs.backdrop.classList.remove('is-open');
//   refs.lightbox__image.src = '';
//   refs.lightbox__image.alt = '';
//   refs.closeModal.removeEventListener('click', onCloseModal);
//   refs.overlay.removeEventListener('click', onCloseModal);
//   window.removeEventListener('click', onEscPress);
// }

// function onOpenModal(event) {
//   if (event.target.nodeName !== 'IMG') {
//     return;
//   }
//   event.preventDefault();
//   console.log(event.target.dataset);
//   // current target?
//   refs.lightbox__image.src = 'event.target.dataset.source';
//   refs.lightbox__image.alt = 'event.target.alt';
//   refs.backdrop.classList.add('is-open');
// }
// import galleryItems from './app.js';
const refs = {
  gallery: document.querySelector('.js-gallery'),
  modal: document.querySelector('.js-lightbox'),
  modalImg: document.querySelector('.lightbox__image'),
};
let activeIndex = 0;
const galleryMarkup = galleryItems.map(img => {
  return `
  <li class="gallery__item">
  <a
    class="gallery__link"
    href="${img.original}"
  >
    <img
      class="gallery__image"
      src="${img.preview}"
      data-source="${img.original}"
      alt="${img.description}"
    />
  </a>
</li>
  `;
});
const keyboardManipulation = e => {
  if (e.key === 'Escape') {
    closeModal(e);
  }
  if (e.key === 'ArrowRight' && galleryItems.length - 1 > activeIndex) {
    activeIndex += 1;
    refs.modalImg.src = galleryItems[activeIndex].original;
  }
  if (e.key === 'ArrowLeft' && activeIndex > 0) {
    activeIndex -= 1;
    refs.modalImg.src = galleryItems[activeIndex].original;
  }
};
const openModal = e => {
  e.preventDefault();
  if (e.target.nodeName != 'IMG') {
    return;
  }
  galleryMarkup.forEach((el, ind) => {
    if (el.includes(e.target.src)) {
      activeIndex = ind;
    }
  });
  refs.modal.classList.add('is-open');
  console.log(activeIndex);
  refs.modalImg.src = e.target.dataset.source;
  window.addEventListener('keydown', keyboardManipulation);
};
const closeModal = e => {
  if (e.target.nodeName === 'IMG') {
    return;
  }
  refs.modal.classList.remove('is-open');
  window.removeEventListener('keydown', keyboardManipulation);
};
refs.gallery.insertAdjacentHTML('beforeend', galleryMarkup.join(''));
refs.gallery.addEventListener('click', openModal);
refs.modal.addEventListener('click', closeModal);
