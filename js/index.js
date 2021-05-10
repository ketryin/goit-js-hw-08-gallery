import gallery from './gallery-items.js';

const galleryListEl = document.querySelector(".js-gallery");
const modal = document.querySelector('.lightbox');
const modalImgEL = document.querySelector(".lightbox__image");
const closeBtnEl = document.querySelector('[data-action="close-lightbox"]');
const overlay = document.querySelector('.lightbox__overlay');

closeBtnEl.addEventListener('click',onClickCLoseBtn);
galleryListEl.addEventListener('click', onClickImgOpenModal);
overlay.addEventListener('click', onOverlayClick);
modalImgEL.addEventListener('click', onModalImgClick);
window.addEventListener('keydown', onKeyPress);

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

const galleryUrlBigImg = gallery.map(element => element.original);

galleryListEl.innerHTML = galleryMarkupItem;

function onOverlayClick(evt) {
    if (evt.currentTarget === evt.target) {
      onClickCLoseBtn();
    }
}

function onKeyPress(evt) {
  if (!modal.classList.contains('is-open')) {
    return;
  }
    const ESC_KEY_CODE = 'Escape';
    const LEFT_KEY_CODE = 'ArrowLeft';
    const RIGHT_KEY_CODE = 'ArrowRight';
    const isEscKey = evt.code === ESC_KEY_CODE;
    const urlBigImg = modalImgEL.getAttribute("src");
    const indexImg = galleryUrlBigImg.indexOf(urlBigImg);

    if (isEscKey) {
      onClickCLoseBtn();
    } else if (evt.code===LEFT_KEY_CODE) {
      onLeftKeyPress(indexImg)
    } else if (evt.code===RIGHT_KEY_CODE) {
      onRightKeyPress(indexImg)
    }
  

}

function onClickCLoseBtn() {
  modal.classList.remove('is-open');
  modalImgEL.removeAttribute('src');
}
     
function onClickImgOpenModal(evt) {
  evt.preventDefault();

  if (evt.target.nodeName !== 'IMG') {
    return;
  }

  const urlBigImg = evt.target.getAttribute("data-source");
  modal.classList.add('is-open');
  modalImgEL.setAttribute('src', urlBigImg);
  
}

function onLeftKeyPress(index) {
  if (index === 0) {
    return modalImgEL.setAttribute('src', galleryUrlBigImg[galleryUrlBigImg.length-1]);  
  }
  modalImgEL.setAttribute('src', galleryUrlBigImg[index-1]);
}
function onRightKeyPress(index) {
  if (index === galleryUrlBigImg.length-1) {
    return modalImgEL.setAttribute('src', galleryUrlBigImg[0]);  
  }
  modalImgEL.setAttribute('src', galleryUrlBigImg[index+1]);
}

function onModalImgClick() {
  const urlBigImg = modalImgEL.getAttribute("src");
  const indexImg = galleryUrlBigImg.indexOf(urlBigImg);
  onRightKeyPress(indexImg);
}