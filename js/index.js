import gallery from '../gallery-items.js';

const galleryListEl = document.querySelector(".js-gallery");
const modal = document.querySelector('.lightbox');
const modalImgEL = document.querySelector(".lightbox__image");
const closeBtnEl = document.querySelector('[data-action="close-lightbox"]');
const overlay = document.querySelector('.lightbox__overlay');

closeBtnEl.addEventListener('click',onClickCLoseBtn);
galleryListEl.addEventListener('click', onClickImgOpenModal);
overlay.addEventListener('click', onOverlayClick);

const galleryMarkupItem = gallery.reduce(
    (string, item) => string +
        `<li class="gallery__item">
         <a class="gallery__link" href="${item.original}">
         <img class="gallery__image" src="${item.preview}"
            data-source="${item.original}" alt="${item.description}" />
         </a>
         </li>`,
  ""
);

galleryListEl.innerHTML = galleryMarkupItem;

function onOverlayClick(evt) {
    if (evt.currentTarget === evt.target) {
      onClickCLoseBtn();
    }
}

function onEscKeyPress() {
  const ESC_KEY_CODE = 'Escape';
  const isEscKey = event.code === ESC_KEY_CODE;

  if (isEscKey) {
    onClickCLoseBtn();
  }
}

function onClickCLoseBtn() {
  modal.classList.remove('is-open');
  modalImgEL.setAttribute('src', '');
}
     
function onClickImgOpenModal(evt) {
  evt.preventDefault();

  window.addEventListener('keydown', onEscKeyPress);

  if (evt.target.nodeName !== 'IMG') {
    return;
  }

  const urlBigImg = evt.target.getAttribute("data-source");
  modal.classList.add('is-open');
  modalImgEL.setAttribute('src', urlBigImg);
}