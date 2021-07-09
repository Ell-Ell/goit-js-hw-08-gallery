import galleryItems from './app.js';

const refs = {
   openModal: document.querySelector('js-gallery'),
    closeModal: document.querySelector('[data-action="close-lightbox"]'),
    backdrop: document.querySelector('.js-lightbox'),
    lightbox__image: document.querySelector('.lightbox__image'),
    overlay: document.querySelector('.lightbox__overlay'),
};
// -----------------разметка--------------
const CreateMarkupImg = galleryItems.map(({ preview, original, description }) => {
    return `<li class="gallery__item">
                <a
                    class="gallery__link"
                    href="${original}"
                >
                    <img
                        class="gallery__image"
                        src="${preview}"
                        data-source="${original}"
                        alt="${description}"
                    />
                </a>
            </li>`;
});


refs.openModal.insertAdjacentHTML('afterbegin', CreateMarkupImg.join(' '));
// ----------------- add addEventListener--------------
refs.openModal.addEventListener('click', onOpenModal);
 refs.closeModal.addEventListener('click', onCloseModal);
window.addEventListener('keydown', onBackdropPress);