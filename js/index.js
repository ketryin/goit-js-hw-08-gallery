const galleryListEl = document.querySelector(".js-gallery");
const modal = document.querySelector('.lightbox');
const modalImgEL = document.querySelector(".lightbox__image");

//create markup
import gallery from '../gallery-items.js';
     
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

//addes markup DOM
galleryListEl.innerHTML = galleryMarkupItem;

//Реализация делегирования на галерее ul.js-gallery 
galleryListEl.addEventListener('click', onClickImgOpenModal);

function onClickImgOpenModal(evt) {

  window.addEventListener('keydown', onEscKeyPress);

  evt.preventDefault();
  if (evt.target.nodeName !== 'IMG') {
    return;
  }
  //Получение url большого изображения
  const urlBigImg = evt.target.getAttribute("data-source");

  //Открытие модального окна по клику на элементе галереи.
  modal.classList.add('is-open');

  //Подмена значения атрибута src элемента img.lightbox__image
  modalImgEL.setAttribute('src', urlBigImg);
} 

//Закрытие модального окна по клику на кнопку button[data-action="close-lightbox"]
const closeBtnEl = document.querySelector('[data-action="close-lightbox"]');
closeBtnEl.addEventListener('click',onClickCLoseBtn);

function onClickCLoseBtn() {
  modal.classList.remove('is-open');
  //Очистка значения атрибута src элемента img.lightbox__image
  modalImgEL.setAttribute('src', '');
}
//Закрытие модального окна по нажатию клавиши ESC.
function onEscKeyPress() {
    const ESC_KEY_CODE = 'Escape';
    const isEscKey = event.code === ESC_KEY_CODE;

  if (isEscKey) {
    onClickCLoseBtn();
  }
}
//Закрытие модального окна по клику на div.lightbox__overlay
const overlay = document.querySelector('.lightbox__overlay');
overlay.addEventListener('click', onOverlayClick);

function onOverlayClick(evt) {
    if (evt.currentTarget === evt.target) {
    onClickCLoseBtn();
  }
}

